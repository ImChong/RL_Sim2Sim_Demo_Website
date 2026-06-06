# Vendored "Perceptive Humanoid Parkour" demo

This directory is a **self-hosted, verbatim mirror** of the interactive MuJoCo
WASM parkour demo originally published at:

- https://php-parkour.github.io/demo.html
  (the inner app: `https://php-parkour.github.io/mujoco_wasm/dist-desktop/index.html`)

It is embedded in this site as an `<iframe>` and exposed through the control
panel's **Policy** dropdown as **"G1 Perceptive Parkour"**. Because it is served
from this same origin, no Content-Security-Policy changes are required.

## What is here

- `dist-desktop/` — the upstream Vite build, copied verbatim except for the one
  patch noted below:
  - `index.html`, `assets/index-*.js` (the MuJoCo WASM is inlined in this bundle),
    `assets/ort-wasm-simd-threaded.jsep-*.wasm` + `assets/ort-wasm-simd-threaded.jsep.mjs`
    (onnxruntime-web 1.24.1 runtime), `assets/favicon-*.png`, and the policy ONNX
    files it actually loads (`*_student.onnx`, `*_depth_backbone.onnx`).
  - The upstream build also shipped an unused `policy.onnx` (a dead default
    fallback that is never fetched — the runtime uses `*_student.onnx`); it was
    dropped to save ~12 MB.
- `assets/scenes/` — exactly the scene/mesh files the bundle preloads into its
  in-memory filesystem at startup (the upstream `assets/scenes/index.json`
  manifest). The active scene is `g1_with_terrain.xml`; its terrain is made of
  box geoms and built-in textures, so the only external assets are the G1 robot
  meshes under `meshes/g1/`.

The bundle fetches scenes with `fetch("../assets/scenes/" + name)` relative to
`dist-desktop/index.html`, so `dist-desktop/` and `assets/` must remain siblings
(this layout preserves that). All upstream paths are relative, so the mirror
works correctly under the site's GitHub Pages base path.

## Local modifications

### Host control bridge (`dist-desktop/host-bridge.js`)

The parent site's control panel drives camera follow, render scale, ground
reflection quality, and reads simulation step rate from the embedded demo via
`postMessage`. The bridge attaches `setFollowEnabled`, `setRenderScale`,
`setReflectionQuality`, and `getSimStepHz` to `window.__parkourDemo`.

The depth HUD (raw + processed previews) gets rounded corners via a display-only
`onBeforeCompile` discard on `depthRawMaterial` / `depthPreviewMaterial`. The
host page sends `depthPreviewCornerRadiusPx` (read from the control panel's
computed `border-radius`) so the preview matches the panel; corner radii are
computed separately for width/height so mobile previews stay circular in pixel
space. Materials stay opaque with `depthWrite`/`depthTest` disabled.
The bridge wraps async `demo.render()` and keeps `autoClear` off until the frame
finishes so the depth HUD scissor pass is not cleared to black.
The `depthInferenceMaterial` render target and `setDepthImage` path are untouched.

### Speed mode (Shift)

Policy keyboard control defaults to **low** speed. Hold **Shift** for fast
speed (replacing the upstream **Y** toggle). The in-demo speed HUD is hidden;
the host panel documents the Shift binding.

### Bundle patches (`dist-desktop/assets/index-*.js`)

The upstream bundle hard-codes its onnxruntime-web runtime location to a CDN:

```js
wQ.wasm.wasmPaths = "https://cdn.jsdelivr.net/npm/onnxruntime-web/dist/"
```

That makes the demo depend on `cdn.jsdelivr.net` at runtime — if the CDN is
unreachable, ORT logs `no available backend found`, the policy never
initializes, the robot goes limp, and the depth image stays black. To make the
demo genuinely self-hosted, that one literal in `dist-desktop/assets/index-*.js`
was replaced with a local object that points at files in this directory:

```js
{ mjs:  new URL("./ort-wasm-simd-threaded.jsep.mjs",          import.meta.url).href,
  wasm: new URL("./ort-wasm-simd-threaded.jsep-6MnTkKum.wasm", import.meta.url).href }
```

`ort-wasm-simd-threaded.jsep.mjs` (the matching onnxruntime-web 1.24.1 loader)
was added next to the existing hashed `.wasm` (byte-identical to the CDN copy,
so it is reused rather than duplicated).

The upstream renderer multiplies floor `mat_texrepeat` by 30 on a 300×300
`PlaneGeometry`, which makes the checker grid far denser than the main-site G1
AMP demo (`100×100` plane, `texrepeat="44 44"` in `scene_g1.xml`). The bundle was
patched to use `100×100` and the MJCF repeat values as-is.

`Reflector.setReflectionQuality` in the bundle must update its internal size /
multisample tracking (`let I` / `let w` and assign `I=ea,w=sa` after resizing);
otherwise the host panel slider stops changing reflection after the first move.

### Visual theme / lighting (`scripts/patch-parkour-visual-theme.mjs`)

The upstream bundle used a bright default background (`0.15 0.25 0.35`), strong
spot/fill lights, and no `NoToneMapping`, which looked washed out next to the
main-site AMP and Tracking demos (`src/simulation/theme.js` + `main.js`). Re-apply
after re-pulling the upstream build:

- Scene background `0.11 0.18 0.28` (dark theme) and Sonic-style hemisphere +
  fill + rim lights matching the main site.
- `renderer.toneMapping = 0` (`NoToneMapping`) with exposure `1`.
- `host-bridge.js` exposes `setVisualTheme` and applies `visualTheme` from the
  parent control panel via `postMessage`.

`assets/scenes/g1_with_terrain.xml` `<visual>` / skybox are kept aligned with
`public/examples/scenes/g1_amp/scene_g1.xml`.

### iOS depth readback (`scripts/patch-parkour-ios-depth.mjs`)

Safari on iPhone/iPad often cannot read **FloatType** render targets via
`readRenderTargetPixels`, which leaves the depth inset black and breaks
perceptive locomotion. Re-apply this patch after re-pulling the upstream bundle.
The patch is **Apple-mobile only** — desktop and Android keep the Float32 path:

- On iPhone/iPad, the original **depth-texture inference pass is kept**, but the
  shader packs linear depth into `[0.3, 3.0]` meters as Uint8 before CPU
  readback. Do **not** replace this with `MeshDepthMaterial` override: that can
  make the HUD visible while distorting depth statistics and causing falls at
  obstacles.
- Linear depth in meters is restored on the CPU via `0.3 + byte * 2.7 / 255`
  (clamped to the camera clipping range).
- `gl.finish()` is called before `readRenderTargetPixels` so Safari flushes GPU
  work before CPU readback.
- The depth preview is refreshed immediately via `_prepareDepthInput()` after
  each capture on Apple hardware (no longer waits for the first backbone
  inference).
- On iPhone/iPad, ORT is forced to **single-threaded** mode with the worker
  proxy disabled.
- On iPhone/iPad, ORT loads the **non-JSEP** `ort-wasm-simd-threaded.wasm`
  (not the JSEP build). WebKit 26 often fails or OOMs with JSEP; desktop keeps
  JSEP for performance.
- On iPhone/iPad, ORT sessions are created **before** MuJoCo scene load
  (`beginPolicyPreload`) with `graphOptimizationLevel: "basic"` and memory
  arena/pattern disabled, then `modelBytes` is dropped after metadata parse.
  This reduces peak WASM heap when MuJoCo and two ONNX sessions share the tab.
- When the policy backbone is unavailable, the depth HUD preview falls back to
  subsampled GPU readback so the inset is not blank during ORT init failures.
- `initPolicy` stores `demo._policyInitError` for the host depth diagnostic.

**If you ever re-pull the upstream build, re-apply all bundle patches.**

## License / attribution

The underlying testbed is [`zalo/mujoco_wasm`](https://github.com/zalo/mujoco_wasm),
distributed under the MIT License — see `UPSTREAM_LICENSE` in this directory. The
parkour policy, scene, and packaging are from the `php-parkour` project. These
files are third-party content vendored for self-hosting and are not authored by
this repository.
