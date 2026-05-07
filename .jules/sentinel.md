## 2026-05-04 - [CSP Security Enhancement]
**Vulnerability:** Missing Content Security Policy (CSP).
**Learning:** Added a baseline CSP meta tag to index.html to defend against XSS while allowing required WebAssembly/WebWorkers and Google Fonts/Analytics to function properly.
**Prevention:** Implement strict but functional CSP in frontend applications during initial setup.

## 2026-05-04 - [Reverse Tabnabbing Protection]
**Vulnerability:** External links using `target="_blank"` without `rel="noopener noreferrer"`.
**Learning:** External links missing `rel="noopener noreferrer"` can allow the opened tab to access `window.opener`, potentially allowing it to redirect the original page to a malicious site.
**Prevention:** Always include `rel="noopener noreferrer"` on anchor tags or buttons that open links in a new tab (`target="_blank"`).
