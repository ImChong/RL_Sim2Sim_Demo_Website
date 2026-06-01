# Vendored "Perceptive Humanoid Parkour" demo

This directory is a **self-hosted, verbatim mirror** of the interactive MuJoCo
WASM parkour demo originally published at:

- https://php-parkour.github.io/demo.html
  (the inner app: `https://php-parkour.github.io/mujoco_wasm/dist-desktop/index.html`)

It is embedded in this site as an `<iframe>` and exposed through the control
panel's **Policy** dropdown as **"G1 Perceptive Parkour"**. Because it is served
from this same origin, no Content-Security-Policy changes are required.

## What is here

- `dist-desktop/` — the upstream Vite build, copied verbatim:
  - `index.html`, `assets/index-*.js` (the MuJoCo WASM is inlined in this bundle),
    `assets/ort-wasm-simd-threaded.jsep-*.wasm` (onnxruntime-web),
    `assets/favicon-*.png`, and the policy ONNX files
    (`*_student.onnx`, `*_depth_backbone.onnx`, `policy.onnx`).
- `assets/scenes/` — exactly the scene/mesh files the bundle preloads into its
  in-memory filesystem at startup (the upstream `assets/scenes/index.json`
  manifest). The active scene is `g1_with_terrain.xml`; its terrain is made of
  box geoms and built-in textures, so the only external assets are the G1 robot
  meshes under `meshes/g1/`.

The bundle fetches scenes with `fetch("../assets/scenes/" + name)` relative to
`dist-desktop/index.html`, so `dist-desktop/` and `assets/` must remain siblings
(this layout preserves that). All upstream paths are relative, so the mirror
works correctly under the site's GitHub Pages base path.

## License / attribution

The underlying testbed is [`zalo/mujoco_wasm`](https://github.com/zalo/mujoco_wasm),
distributed under the MIT License — see `UPSTREAM_LICENSE` in this directory. The
parkour policy, scene, and packaging are from the `php-parkour` project. These
files are third-party content vendored for self-hosting and are not authored by
this repository.
