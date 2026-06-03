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

### iOS depth readback (`scripts/patch-parkour-ios-depth.mjs`)

Safari on iOS often cannot read **FloatType** render targets via
`readRenderTargetPixels`, and may also fail sampling **Float DepthTexture**.
Re-apply this patch after re-pulling the upstream bundle:

- Depth is captured with **`scene.overrideMaterial`** (`depthCaptureMaterial`)
  writing linear depth directly into an RGBA8 target (no DepthTexture sampling).
- Linearized depth is decoded back to meters on the CPU from **Uint8** readback.
- The depth preview is refreshed immediately via `_prepareDepthInput()` after
  each capture (no longer waits for the first backbone inference).
- On iPhone/iPad, ORT is forced to **single-threaded** mode with the worker
  proxy disabled.

Real-device testing: `docs/mobile-ios-testing.md`

**If you ever re-pull the upstream build, re-apply all bundle patches.**

## License / attribution

The underlying testbed is [`zalo/mujoco_wasm`](https://github.com/zalo/mujoco_wasm),
distributed under the MIT License — see `UPSTREAM_LICENSE` in this directory. The
parkour policy, scene, and packaging are from the `php-parkour` project. These
files are third-party content vendored for self-hosting and are not authored by
this repository.
