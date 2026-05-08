# Agents 说明

后续修改本仓库的 agents 请先安装并启用 Chrome DevTools MCP：

- 项目地址：<https://github.com/ChromeDevTools/chrome-devtools-mcp>
- Codex CLI 安装命令：`codex mcp add chrome-devtools -- npx chrome-devtools-mcp@latest`
- 标准 MCP 配置可使用命令 `npx -y chrome-devtools-mcp@latest`，以便在前端调试、截图、性能分析和浏览器自动化验证时调用 Chrome DevTools。

提交本仓库时，请参考历史 commit 风格，commit message 使用中文，例如：

- `docs: 增加 agents 开发说明`
- `fix: 修复MuJoCo渲染窗口高度适配`

## Cursor Cloud specific instructions

This is a **purely client-side SPA** (Vue 3 + Vite + Three.js + MuJoCo WASM + ONNX Runtime). No backend, database, or Docker services are needed.

### Quick reference

| Task | Command |
|------|---------|
| Install deps | `npm install` |
| Dev server | `npm run dev` (port 3000, `--host` enabled) |
| Unit tests | `npm test` (Node.js built-in test runner, 28 tests) |
| Production build | `npm run build` |
| E2E smoke test | `node scripts/verify-knockdown-button.mjs` (needs `CHROME_PATH`) |

### Notes for cloud agents

- Node.js >= 20 is required. The VM ships with v22 which is fine.
- Both `package-lock.json` and `pnpm-lock.yaml` exist; use **npm** (matches README and CI).
- No ESLint or Prettier is configured; there is no lint command.
- The Vite dev server binds to `0.0.0.0:3000` (`--host` flag in the `dev` script).
- WASM and ONNX model loading can take several seconds on first page load; wait for the progress dialog to reach 100% before interacting.
- Motion clip controls are accessible via the robot icon button in the top navigation bar (not immediately visible on the main panel).
- Commit messages must be in Chinese following the existing convention (see top of this file).
