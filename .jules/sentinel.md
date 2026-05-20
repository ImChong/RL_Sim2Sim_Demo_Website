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
