# Vendored "Perceptive BFM" demo

Self-hosted mirror of the interactive MuJoCo WASM demo originally published at:

- https://acodedog.github.io/perceptive-bfm/demo.html
  (inner app: `https://acodedog.github.io/perceptive-bfm/mujoco_wasm_dist/index.html`)

Embedded in this site as an `<iframe>` and exposed through the control panel's
**Policy** dropdown as **"G1 Perceptive BFM"**, below **G1 Tracking**. Served
from the same origin so no Content-Security-Policy changes are required.

## What is here

- `dist-desktop/` — upstream Vite build (`index.html`, `assets/index-*.js`,
  `assets/index-*.css`, bundled ORT wasm), policy ONNX files under `models/`,
  motion clips under `motions/`, and G1 scene assets under `scenes/`.

## Local modifications

### Loading reporter (`dist-desktop/loader-progress.js`)

Copied from the parkour embed. Reports download/init progress to the parent page
via `postMessage` (`source: 'parkour-loader'`) so the host loading dialog stays
in sync with other policies.

### Embedded chrome (`dist-desktop/index.html`)

- Loads `loader-progress.js` before the app bundle.
- Hides the upstream "← Paper" link when embedded in the host page.

## License / attribution

The underlying testbed is [`zalo/mujoco_wasm`](https://github.com/zalo/mujoco_wasm)
(MIT). The Perceptive BFM policy, scenes, and packaging are from the
[Perceptive BFM](https://acodedog.github.io/perceptive-bfm/) project. These files
are third-party content vendored for self-hosting.
