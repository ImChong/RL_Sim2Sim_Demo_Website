# SplitAdapter 项目页摘录

- **采集日期**: 2026-06-04
- **来源**: https://splitadapter.github.io/
- **说明**: 以下为项目主页公开文本的结构化摘录，非逐字 PDF。

## 标题与作者

**SplitAdapter: Load-Aware Humanoid Loco-Manipulation via Factorized Adaptation**

Jeonguk Kang, Hanbyel Cho, Sanghyun Kang, Donghan Koo  
Future Robot AI Group, Samsung Electronics  
**Venue**: arXiv Preprint

## 外部链接（项目页按钮）

| 类型 | URL | 备注 |
|------|-----|------|
| Paper / arXiv | https://arxiv.org/abs/2606.03297 | 项目页「Paper」「arXiv」均指向此链接 |
| Code | `#`（占位） | 截至采集日 GitHub 链接未公开 |

## 主页摘要（Abstract）

Humanoid loco-manipulation requires stable whole-body control under varying object masses and pickup/placement heights. This becomes particularly challenging in sim-to-real transfer, where object-induced load variation and robot-side dynamics mismatch interact during physical contact. Existing history-based adapters often compress these factors into a single latent representation, which can weaken robustness under heavy-load manipulation.

We propose **SplitAdapter: Load-Aware Humanoid Loco-Manipulation via Factorized Adaptation**, which freezes a pretrained box manipulation policy and extends it with object/load and dynamics-aware context encoders trained with split world-model objectives, GRL-based cross-adversarial regularization, and hierarchical Feature-wise Linear Modulation (FiLM).

In sim-to-sim experiments and real-world deployment, SplitAdapter improves Full-task success over the base policy and world-model FiLM baselines across object masses of **2, 4, and 6 kg** and pickup/placement heights of **0, 30, and 60 cm**, with the largest improvements under heavy-load conditions.

## 方法概览（Method Overview 图注）

A frozen humanoid manipulation policy is adapted with object/load and dynamics-aware context encoders. The resulting factorized latents are trained with split world-model objectives, regularized with GRL-based separation, and injected through hierarchical FiLM modulation.

- 方法示意图: `./assets/images/fig1_ocean_overview_final3.jpg`

## 演示视频（项目页列出的 mp4 路径）

| 区块 | 相对路径 |
|------|----------|
| 代表性演示 | `./assets/videos/representative.mp4` |
| 重载 2 kg / 0 cm | `./assets/videos/heavy_2kg_0cm.mp4` |
| 重载 4 kg / 0 cm | `./assets/videos/heavy_4kg_0cm.mp4` |
| 重载 6 kg / 0 cm | `./assets/videos/heavy_6kg_0cm.mp4` |
| 高度 6 kg / 30 cm | `./assets/videos/height_6kg_30cm.mp4` |
| 高度 6 kg / 60 cm | `./assets/videos/height_6kg_60cm.mp4` |
| 额外视频 | `./assets/videos/extra_videos.mp4` |

## 主页宣传要点（Hero 文案）

- 因子化（factorized）人形 loco-manipulation 自适应框架
- 可稳健抬起并搬运最高 **6 kg** 载荷，含困难的**地面拾取（floor-lift）**任务
- **零样本（zero-shot）** 迁移到真实机器人
