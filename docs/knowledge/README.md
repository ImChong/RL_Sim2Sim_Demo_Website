# 知识库（Knowledge Base）

本目录收录与本仓库 **RL Sim2Sim 演示** 相关的人形控制论文与资料，经消化后与 `public/examples` 中的策略、动作片段及 `src/simulation` 观测管线建立对应关系。

## 使用方式

| 路径 | 说明 |
|------|------|
| [`sources.json`](./sources.json) | 原始资料元数据（标题、链接、BibTeX、与本仓库关联） |
| [`digests/`](./digests/) | 中文消化笔记：方法要点、公式、与本 demo 的对照 |
| [`digests/sim2sim-demo-mapping.md`](./digests/sim2sim-demo-mapping.md) | 两篇工作与本网页策略/场景/动作的映射表 |

## 已收录原始资料

1. **SDAMP** — [Unified Walking, Running, and Recovery for Humanoids via State-Dependent Adversarial Motion Priors](https://arxiv.org/html/2605.18611v1)（arXiv:2605.18611）
2. **Heracles** — [Bridging Precise Tracking and Generative Synthesis for General Humanoid Control](https://arxiv.org/abs/2603.27756)（arXiv:2603.27756，[PDF](https://arxiv.org/pdf/2603.27756)）
3. **相关资料** — 见 `sources.json` 中 `related` 条目（AMP、LAFAN1、训练仓库、项目主页等）

## 与本仓库的直接关联

- **G1 AMP Walk/Run/Getup**（`amp_policy_walk_run_getup.json`）对应 SDAMP 一类「走跑起身一体」策略；观测含 `ProjectedGravityB`、`Command`，与论文门控信号一致。
- **G1 Tracking**（`tracking_policy_latest.json`）对应 Heracles 论文中的底层物理跟踪器范式；本 demo 尚未集成 Heracles 扩散中间层。
- **LAFAN1 参考动作** — `motions.json` 已包含论文所述 `walk1_subject1`、`run1_subject2`、`fallAndGetUp2_subject2`。

后续扩展知识库时：在 `sources.json` 增加条目，在 `digests/` 新增消化稿，并更新 `sim2sim-demo-mapping.md`。
