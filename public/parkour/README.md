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
so it is reused rather than duplicated). **If you ever re-pull the upstream
build, re-apply this patch.**

## License / attribution

The underlying testbed is [`zalo/mujoco_wasm`](https://github.com/zalo/mujoco_wasm),
distributed under the MIT License — see `UPSTREAM_LICENSE` in this directory. The
parkour policy, scene, and packaging are from the `php-parkour` project. These
files are third-party content vendored for self-hosting and are not authored by
this repository.
