# iPhone / iPad 真机测试指南

云环境里的 Chrome「iPhone 模拟」**不能替代**真机 Safari。要在真实 iPhone 上验证深度图与跑酷越障，可按下面几种方式接入。

## 方式一：同一 Wi‑Fi 访问本机 dev 服务器（推荐）

1. 电脑与 iPhone 连接**同一 Wi‑Fi**。
2. 在项目根目录启动开发服务器（需监听局域网）：

   ```bash
   npm install
   npm run dev
   ```

   本仓库 `dev` 脚本已带 `--host`，默认端口 **3000**。

3. 在电脑上查局域网 IP，例如：

   ```bash
   # macOS / Linux
   ipconfig getifaddr en0
   # 或
   hostname -I
   ```

4. iPhone Safari 打开：

   ```text
   http://<电脑局域网IP>:3000/
   ```

   例：`http://192.168.1.23:3000/`

5. 在控制面板 **Policy** 中选择 **G1 Perceptive Parkour**，等待加载到 100%。
6. 点击演示画面获得焦点，按住 **Shift + W**（外接键盘）或按页面说明操作。

> 若无法访问：检查电脑防火墙是否放行 3000 端口；确保不是「访客网络」隔离。

---

## 方式二：内网穿透（不在同一 Wi‑Fi 时）

在电脑上先 `npm run dev`，再开一个隧道，把公网 URL 发到手机：

```bash
# Cloudflare Tunnel（无需注册也可用临时域名）
cloudflared tunnel --url http://127.0.0.1:3000

# 或 ngrok
ngrok http 3000
```

终端会输出 `https://xxxx.trycloudflare.com` 或 `https://xxxx.ngrok.io`，用 iPhone Safari 打开即可。

---

## 方式三：验证 GitHub Pages 线上版

修复合并后，站点会部署到：

```text
https://imchong.github.io/RL_Sim2Sim_Demo_Website/
```

**务必强制刷新缓存**，否则可能仍是旧 bundle：

- 关闭该站点所有 Safari 标签页，重新打开；或
- 设置 → Safari → 清除历史与网站数据（仅该站）；或
- 在地址栏 URL 后加随机参数：`?v=20260603`

在 Mac 上可用 Safari「开发」菜单连接 iPhone 查看控制台（需 USB + 开启 Web 检查器）。

---

## 真机快速自检（Safari 控制台）

若已用 Mac 连接 iPhone Web Inspector，在 **跑酷 iframe** 控制台执行：

```javascript
const d = window.__parkourDemo;
({
  policyReady: d?.policyController?.isReady,
  depthAvg: (() => {
    const p = d?.depthPreviewPixels; if (!p?.length) return 0;
    let s = 0; for (let i = 0; i < p.length; i += 4) s += p[i];
    return s / (p.length / 4);
  })(),
  depthFrame0: d?.depthFrame?.[0],
  captureMode: d?.depthCaptureMaterial ? 'overrideMaterial' : 'depthTexture'
})
```

| 字段 | 正常 | 异常 |
|------|------|------|
| `policyReady` | `true` | `false` → ONNX/WASM 未加载 |
| `depthAvg` | 通常 **> 30** | **≈ 0** → 深度捕获仍失败 |
| `captureMode` | `overrideMaterial` | `depthTexture` → 仍是旧 bundle |

无 Mac 时，可看深度小窗：应出现**灰度地形**，不是纯黑块。

---

## 常见问题

### 1. 线上仍是黑块

- PR 是否已合并并触发 Pages 部署（Actions 里 `pages-build-deployment` 成功）。
- 是否清缓存；旧 `index-*.js` 可能被 Safari 强缓存。
- 当前线上若只有「Uint8 readback」补丁而无「overrideMaterial 直写深度」，真机 Safari 仍可能全黑——需包含 **depthCaptureMaterial** 的版本。

### 2. 机器人趴地不动

深度图黑 + 机器人limp，通常是 **ONNX Runtime WASM** 在 iPhone 上初始化失败（内存或线程限制）。可尝试：

- 关闭其他标签页，释放内存；
- 使用 Wi‑Fi 而非弱网，确保 ~13MB student 模型下载完整；
- 控制台是否有 `Failed to initialize policy` / `no available backend found`。

### 3. 没有物理键盘

跑酷 demo 设计为 **W/A/D + Shift** 键盘控制；纯触屏只能看自动行为，难以手动验证「按住 W 越障」。真机验证越障建议：

- 外接蓝牙键盘；或
- 用 Mac 远程调试在桌面浏览器里模拟（仅验证逻辑，非真机 WebGL）。

---

## 录屏验证（开发机）

```bash
npm run dev
npm run verify:record-parkour-ios
```

输出：`artifacts/parkour-ios-depth-verify.mp4`（Chrome 模拟 iPhone，用于 CI/回归，**不能代替真机**）。

---

## 没有真机时，iOS 开发一般怎么做？

云 Agent / Linux CI **无法接入物理 iPhone**，这和「做 iOS App 的团队怎么测」是同一类问题，常见分层如下：

| 层级 | 做法 | 能测什么 | 不能替代什么 |
|------|------|----------|--------------|
| **1. 自动化回归（CI）** | Puppeteer/Playwright + iPhone UA + 移动端视口；或 WebKit 无头（若环境有） | 逻辑、布局、脚本是否报错、深度值是否非零 | 真机 GPU、内存、Safari 内核差异 |
| **2. Mac + iOS Simulator** | Xcode 自带 **Simulator**，跑 Mobile Safari，Web Inspector 调试 | 比 Chrome 伪装 UA **更接近** iOS Safari；WebGL 路径更像真机 | 仍非真实 GPU/内存压力 |
| **3. Mac + 真机 USB** | iPhone 连 Mac，Safari → 开发 → 选设备，**远程 Web Inspector** | **金标准**之一：真实 Safari、真实 WebGL、真实内存 | 需要 Mac + 线 |
| **4. 云真机平台** | [BrowserStack](https://www.browserstack.com/)、[LambdaTest](https://www.lambdatest.com/)、[Sauce Labs](https://saucelabs.com/) 等租用远程 iPhone | 无 Mac 也能点真机 Safari、录屏、看控制台 | 付费、排队、网络到被测 URL |
| **5. 内网穿透 + 自测** | `npm run dev` + 局域网 IP / cloudflared，开发者用自己的 iPhone 打开 | 真实用户路径，零平台费 | 人工、不可全自动 |

**原生 iOS App** 还会用：Xcode Simulator（UI/逻辑）、TestFlight（外测）、App Store Connect（崩溃日志）。  
**Web / WASM（本项目）** 没有 TestFlight，核心是：**Simulator 或云真机 + 至少一台 physical iPhone 抽测**。

本仓库当前策略：

- **CI / Agent**：`npm run verify:record-parkour-ios` 录屏 + 深度亮度/越障断言（Chrome 模拟）。
- **合并前建议**：作者在 Mac Simulator 或真机 Safari 过一遍（见上文方式一～三）。
- **真机仍黑时**：用 Web Inspector 看 `depthCaptureMaterial` 与 `depthAvg`（上文自检脚本）。
