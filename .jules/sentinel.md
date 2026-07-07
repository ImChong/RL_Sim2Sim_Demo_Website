## 2026-05-04 - [CSP Security Enhancement]
**Vulnerability:** Missing Content Security Policy (CSP).
**Learning:** Added a baseline CSP meta tag to index.html to defend against XSS while allowing required WebAssembly/WebWorkers and Google Fonts/Analytics to function properly.
**Prevention:** Implement strict but functional CSP in frontend applications during initial setup.

## 2026-05-04 - [Reverse Tabnabbing Protection]
**Vulnerability:** External links using `target="_blank"` without `rel="noopener noreferrer"`.
**Learning:** External links missing `rel="noopener noreferrer"` can allow the opened tab to access `window.opener`, potentially allowing it to redirect the original page to a malicious site.
**Prevention:** Always include `rel="noopener noreferrer"` on anchor tags or buttons that open links in a new tab (`target="_blank"`).

## 2026-05-20 - [Denial of Service via Uncontrolled File Upload]
**Vulnerability:** Missing file size limits when users upload motion JSON files.
**Learning:** Calling `file.text()` or `JSON.parse()` on excessively large files can block the UI thread or cause an Out-of-Memory (OOM) error, leading to a Denial of Service (DoS).
**Prevention:** Enforce strict file size limits (e.g., 5MB) on user-uploaded files before attempting to read or parse them into memory.
## 2026-05-21 - [Restrict CSP Evaluation to WebAssembly Only]
**Vulnerability:** Broad `unsafe-eval` in CSP.
**Learning:** The application uses WebAssembly (WASM) for MuJoCo and ONNX, which requires evaluation permissions. Using `unsafe-eval` grants permission to evaluate standard JavaScript strings as well, increasing XSS risks. `wasm-unsafe-eval` is a safer modern alternative that permits WASM evaluation while continuing to block regular JS `eval()`.
**Prevention:** Use `wasm-unsafe-eval` instead of `unsafe-eval` in Content Security Policies when evaluation is only needed for WebAssembly modules.

## 2026-05-24 - [Emscripten CSP Requires unsafe-eval on Mobile Safari]
**Vulnerability:** Simulation failed to load on iOS/mobile with `EvalError` under CSP (`wasm-unsafe-eval` only).
**Learning:** MuJoCo and ONNX Runtime Web ship Emscripten glue that calls `new Function()` at runtime. `wasm-unsafe-eval` alone does not satisfy that path; Safari on iOS enforces the restriction strictly. Keep both `'unsafe-eval'` and `'wasm-unsafe-eval'` in `script-src` until dependencies stop using dynamic function construction.
**Prevention:** When adopting stricter CSP for WASM apps, verify on mobile Safari—not only desktop Chrome—before removing `'unsafe-eval'`.

## 2026-05-24 - [Information Exposure via Error Messages]
**Vulnerability:** Leaking stack traces or sensitive system information to the user by exposing `error.toString()`.
**Learning:** Catching and rendering raw errors (`error.toString()`) in the UI can expose sensitive internal application details, stack traces, or environment data which an attacker might find useful.
**Prevention:** Fail securely by checking if the error is an `Error` instance and rendering only `error.message` combined with a generic fallback message (e.g., "An unexpected error occurred"), rather than the raw error.

## 2026-05-29 - [Denial of Service via Unbounded Recursive JSON Expansion]
**Vulnerability:** protobufjs allows recursive JSON descriptor expansion without depth limits (GHSA-jggg-4jg4-v7c6).
**Learning:** Loading untrusted protobuf JSON descriptors with deeply nested 'nested' namespace objects could cause the JavaScript call stack to be exhausted, resulting in a Denial of Service (DoS) during descriptor loading in dependencies like onnxruntime-web.
**Prevention:** Override sub-dependencies (like `protobufjs`) via package manager configurations (`pnpm.overrides`) to patched versions to protect the application while awaiting an upstream fix.

## 2026-05-29 - [Uninitialized Memory Disclosure in WebSockets]
**Vulnerability:** ws implementation is vulnerable to uninitialized memory disclosure when a TypedArray is passed as the reason argument in websocket.close() (GHSA-58qx-3vcg-4xpx).
**Learning:** Even development dependencies (like puppeteer-core which uses ws) can carry security risks if run on unpatched versions.
**Prevention:** Regularly audit and override sub-dependencies using tools like `pnpm audit` and `pnpm.overrides` to secure against lower-level API misuses.

## 2024-05-30 - Replace unsafe-eval with wasm-unsafe-eval for WebAssembly components
**Vulnerability:** The application's Content-Security-Policy (CSP) `script-src` directive contained `'unsafe-eval'`.
**Learning:** This was likely introduced to allow WebAssembly (like MuJoCo and ONNX) to execute, but `'unsafe-eval'` is too broad and permits general JavaScript evaluation vulnerabilities (e.g. from `eval()` and `new Function()`).
**Prevention:** Always use `'wasm-unsafe-eval'` instead of `'unsafe-eval'` in the CSP when the application needs to run WebAssembly but wants to block general JS execution vulnerabilities.

## 2026-06-02 - Secure Error Messages in UI
**Vulnerability:** The application was exposing raw `error.message` directly to the UI when an internal error occurred during simulation loading in `src/views/Demo.vue`.
**Learning:** This is considered a security risk as it can leak stack traces or sensitive internal system information to the user.
**Prevention:** Always fail securely by rendering a generic fallback message (e.g., 'An unexpected error occurred') while logging the actual error to the console for debugging.
## 2026-06-17 - [Dependency Updates for Security]
**Vulnerability:** Outdated dependencies `vite` (CVE-2026-53571, CVE-2026-53632) and `protobufjs` (CVE-2026-54269) allowed vulnerabilities such as server.fs bypass and path handling leaks.
**Learning:** Security vulnerabilities often stem from sub-dependencies or out-of-date tooling like dev servers, not just main runtime code.
**Prevention:** Regularly run `pnpm audit` and bump dependencies (using overrides if necessary) to stay ahead of known CVEs.

## 2026-06-25 - [Iframe Privilege Escalation]
**Vulnerability:** `<iframe>` elements missing the `sandbox` attribute.
**Learning:** Iframes without a `sandbox` attribute inherit a wide range of permissions, including the ability to navigate the top-level parent window. This could be exploited by embedded third-party content (like Netron viewer or external demos) to perform malicious redirects or unauthorized DOM manipulation.
**Prevention:** When embedding untrusted or external content via `<iframe>`, always include the `sandbox` attribute (e.g., `sandbox="allow-scripts allow-same-origin allow-downloads allow-popups"`) to apply the Principle of Least Privilege and restrict the frame's capabilities.

## 2026-06-27 - [CSP Object Injection & Mixed Content]
**Vulnerability:** Missing `object-src 'none'` and `block-all-mixed-content` in CSP.
**Learning:** Without `object-src 'none'`, attackers could potentially inject malicious `<object>` or `<embed>` elements (e.g. Flash/Java) if an injection flaw exists. Without `block-all-mixed-content`, active network attacks could downgrade HTTPS connections by loading HTTP subresources.
**Prevention:** Always include `object-src 'none'; block-all-mixed-content;` in the baseline Content-Security-Policy to proactively disable legacy plugins and enforce secure transport.

## 2026-06-28 - [Fetch Timeout Security Enhancement]
**Vulnerability:** Missing timeout on network requests in `fetchWithProgress.js`.
**Learning:** `fetch` requests without a timeout can cause the application to hang indefinitely if the server is unresponsive, potentially leading to resource exhaustion or a poor user experience.
**Prevention:** Always implement a timeout (e.g., using `AbortController`) for network requests to ensure they fail gracefully.

## 2026-06-28 - [Insecure Randomness Security Enhancement]
**Vulnerability:** Weak random number generation using `Math.random()`.
**Learning:** `Math.random()` is not cryptographically secure, which could lead to predictable outcomes in simulation generation or terrain seeding.
**Prevention:** Use `window.crypto.getRandomValues()` instead of `Math.random()` to ensure strong random number generation for security or unpredictability.

## 2026-06-29 - [Zip Slip Path Traversal]
**Vulnerability:** Path traversal (Zip Slip) vulnerability in file download handling.
**Learning:** Writing files directly to the MuJoCo WASM virtual filesystem (`mujoco.FS.writeFile`) using paths sourced from external/downloaded files (like `files.json`) without validation allows malicious paths (e.g., `../` or `/`) to write outside the intended working directory.
**Prevention:** Always validate relative paths to prevent directory traversal by checking against regex like `/(^|\/)\.\.(\/|$)/` and checking for absolute paths (`startsWith('/')`) before performing file system operations.
## 2026-07-07 - Unresponsive network requests application hang (DoS)
**Vulnerability:** External `fetch` calls lacked timeout mechanisms, which could cause the application to hang indefinitely if the external server is unresponsive.
**Learning:** The native `fetch` API does not have a default timeout. Unresponsive endpoints can keep connections open, tying up resources.
**Prevention:** Wrap all external network requests with an `AbortController` timeout or use a timeout-aware helper function.
