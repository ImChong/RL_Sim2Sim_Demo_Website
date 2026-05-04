## 2026-05-04 - [CSP Security Enhancement]
**Vulnerability:** Missing Content Security Policy (CSP).
**Learning:** Added a baseline CSP meta tag to index.html to defend against XSS while allowing required WebAssembly/WebWorkers and Google Fonts/Analytics to function properly.
**Prevention:** Implement strict but functional CSP in frontend applications during initial setup.
