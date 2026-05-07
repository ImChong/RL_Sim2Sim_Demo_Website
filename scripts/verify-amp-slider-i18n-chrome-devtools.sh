#!/usr/bin/env bash
set -euo pipefail

export PATH="/home/ubuntu/.nvm/versions/node/v22.22.2/bin:$PATH"
export CI=1

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

CHROME_BIN="${CHROME_BIN:-/usr/bin/google-chrome-stable}"
PROFILE_DIR="${PROFILE_DIR:-/tmp/mcp-verify-profile}"
RDP_PORT="${RDP_PORT:-9222}"
NPMX=(npx -y --package=chrome-devtools-mcp@latest chrome-devtools)

# chrome-devtools evaluate_script --output-format=json wraps the return value inside message markdown.
ev_returned_ok() {
  python3 - "$1" <<'PY'
import json, re, sys
raw = sys.argv[1]
try:
    outer = json.loads(raw)
except json.JSONDecodeError:
    print("False")
    sys.exit(0)
if isinstance(outer, dict) and outer.get("result") == "ok":
    print("True")
    sys.exit(0)
msg = outer.get("message") if isinstance(outer, dict) else ""
if isinstance(msg, str):
    m = re.search(r"```json\s*\n?(.*?)\n?```", msg, re.DOTALL)
    if m:
        try:
            inner = json.loads(m.group(1).strip())
            print(str(inner == "ok"))
            sys.exit(0)
        except json.JSONDecodeError:
            pass
print("False")
PY
}

cleanup() {
  "${NPMX[@]}" stop 2>/dev/null || true
  if [[ -n "${CHROME_PID:-}" ]] && kill -0 "$CHROME_PID" 2>/dev/null; then
    kill "$CHROME_PID" 2>/dev/null || true
  fi
}
trap cleanup EXIT

"${NPMX[@]}" stop 2>/dev/null || true
rm -rf "$PROFILE_DIR"
mkdir -p "$PROFILE_DIR"

"$CHROME_BIN" --headless=new \
  --remote-debugging-port="$RDP_PORT" \
  --user-data-dir="$PROFILE_DIR" \
  --no-sandbox \
  --disable-dev-shm-usage \
  --disable-extensions \
  --window-size=1400,900 \
  --enable-unsafe-swiftshader \
  about:blank &
CHROME_PID=$!

for _ in $(seq 1 30); do
  if curl -sf "http://127.0.0.1:${RDP_PORT}/json/version" >/dev/null; then
    break
  fi
  sleep 0.2
done

"${NPMX[@]}" start --browserUrl="http://127.0.0.1:${RDP_PORT}"

"${NPMX[@]}" navigate_page --type=url --url=http://127.0.0.1:5173/ --timeout=180000
"${NPMX[@]}" resize_page 1400 900
"${NPMX[@]}" navigate_page --type=reload --timeout=180000

echo "--- Waiting for controls ready (policy select enabled in a11y snapshot) ---"
WAIT_OK=""
for _ in $(seq 1 120); do
  SNAP_TRY="$(mktemp)"
  if timeout 45 "${NPMX[@]}" take_snapshot --output-format=json >"$SNAP_TRY" 2>/dev/null; then
    if python3 - "$SNAP_TRY" <<'PY'
import json, sys, re
path = sys.argv[1]
raw = open(path, encoding="utf-8").read()
# take_snapshot may prefix text; find outermost {"snapshot":...}
m = re.search(r"\{\s*\"snapshot\"\s*:\s*\{", raw)
if not m:
    sys.exit(1)
start = m.start()
depth = 0
in_str = False
esc = False
for i in range(start, len(raw)):
    c = raw[i]
    if in_str:
        if esc:
            esc = False
        elif c == "\\":
            esc = True
        elif c == '"':
            in_str = False
        continue
    if c == '"':
        in_str = True
        continue
    if c == "{":
        depth += 1
    elif c == "}":
        depth -= 1
        if depth == 0:
            blob = raw[start : i + 1]
            try:
                data = json.loads(blob)
            except json.JSONDecodeError:
                sys.exit(1)
            root = data.get("snapshot") or data
            state = {"pol": False}

            def walk(node):
                if isinstance(node, dict):
                    role = (node.get("role") or "").lower()
                    name = (node.get("name") or "") or ""
                    if role == "combobox":
                        nl = name.lower()
                        if ("policy" in nl or nl.strip() in ("select policy", "选择策略")) and node.get("disabled") is not True:
                            uid = node.get("uid") or node.get("id")
                            if uid:
                                state["pol"] = True
                    for v in node.values():
                        walk(v)
                elif isinstance(node, list):
                    for x in node:
                        walk(x)

            walk(root)
            cam_ok = "Camera follow" in raw
            sys.exit(0 if cam_ok and state["pol"] else 1)
sys.exit(1)
PY
      then
      WAIT_OK=1
      rm -f "$SNAP_TRY"
      break
    fi
  fi
  rm -f "$SNAP_TRY"
  sleep 2
done

if [[ -z "$WAIT_OK" ]]; then
  echo "FAIL: timed out waiting for Camera follow + enabled policy combobox in accessibility snapshot"
  exit 1
fi

echo "--- Open policy menu and choose AMP (single DOM script) ---"
COMBO_OUT="$(timeout 45 "${NPMX[@]}" evaluate_script --output-format=json 'async () => {
  const sel = document.querySelector(".controls-card .v-select");
  if (!sel) return "no-select";
  const chevron = sel.querySelector(".v-field__append-inner");
  const field = sel.querySelector(".v-field");
  const cb = sel.querySelector("[role=combobox], [aria-haspopup=listbox]");
  (chevron || field)?.click?.();
  await new Promise((r) => setTimeout(r, 150));
  cb?.focus?.();
  cb?.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowDown", bubbles: true }));
  await new Promise((r) => setTimeout(r, 800));
  const items = [
    ...document.querySelectorAll(
      ".v-overlay__content .v-list-item, .v-overlay__content [role=option], [role=listbox] [role=option], .v-list-item--nav"
    ),
  ];
  const hit = items.find((el) => /RTX4090|AMP Walk/i.test(el.innerText || ""));
  if (!hit) return "missing-items:" + items.length;
  hit.click();
  return "ok";
}' 2>/dev/null || echo '{"result":"timeout"}')"
if [[ "$(ev_returned_ok "$COMBO_OUT")" != True ]]; then
  echo "FAIL: policy menu / AMP selection: $COMBO_OUT"
  exit 1
fi

echo "--- Waiting for AMP velocity labels (English) ---"
VEL_OK=""
for _ in $(seq 1 90); do
  SNAPV="$(mktemp)"
  if timeout 45 "${NPMX[@]}" take_snapshot --output-format=json >"$SNAPV" 2>/dev/null && grep -q "Velocity X" "$SNAPV"; then
    VEL_OK=1
    rm -f "$SNAPV"
    break
  fi
  rm -f "$SNAPV"
  sleep 2
done

if [[ -z "$VEL_OK" ]]; then
  echo "FAIL: Velocity X not found in accessibility snapshot after selecting AMP"
  exit 1
fi

echo "--- Toggle UI language to Chinese (button 中文) ---"
LANG_OUT="$(timeout 35 "${NPMX[@]}" evaluate_script --output-format=json '() => {
  const btn = [...document.querySelectorAll("button")].find((b) => /^(中文|English)$/.test((b.textContent || "").trim()));
  if (!btn) return "no-btn";
  btn.click();
  return "ok";
}' 2>/dev/null || echo '{"result":"timeout"}')"
if [[ "$(ev_returned_ok "$LANG_OUT")" != True ]]; then
  echo "FAIL: language toggle: $LANG_OUT"
  exit 1
fi

sleep 2

SNAPZ="$(mktemp)"
timeout 45 "${NPMX[@]}" take_snapshot --output-format=json >"$SNAPZ" 2>/dev/null || true
if grep -q "X 方向速度" "$SNAPZ" && grep -q "Y 方向速度" "$SNAPZ" && grep -q "偏航角速度" "$SNAPZ"; then
  rm -f "$SNAPZ"
  echo "PASS: AMP slider titles show Chinese after language toggle."
  exit 0
fi

echo "FAIL: expected Chinese slider titles not found in accessibility snapshot."
head -c 2500 "$SNAPZ"
rm -f "$SNAPZ"
