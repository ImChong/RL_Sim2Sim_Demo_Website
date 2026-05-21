# 原始摘录：GenCAD arXiv 论文要点

**来源**：https://arxiv.org/abs/2409.16294（HTML v1）  
**收录日期**：2026-05-21

---

## 标题

GenCAD: Image-Conditioned Computer-Aided Design Generation with Transformer-Based Contrastive Representation and Diffusion Priors

## Abstract（英文摘要核心句）

Introduces GenCAD: autoregressive transformers + latent diffusion to transform **image inputs** into **parametric CAD command sequences**. Integrates contrastive learning for multimodal engineering design representations. Outperforms SOTA on precision/modifiability; strong on **long sequences**; enables **image-based CAD retrieval** (>15× vs image-to-image search). Output is editable CAD programs, not just meshes/voxels/point clouds.

## 贡献（论文列举）

1. Transformer autoregressive model for CAD sequence representation learning; more accurate reconstruction than SOTA.
2. GenCAD image-conditional generative model; conditional generation beats unconditional on diversity, fidelity, statistical distance.
3. Contrastive learning enables image-based CAD retrieval.

## 方法模块命名

| 缩写 | 全称 | 作用 |
|------|------|------|
| CSR | Command Sequence Reconstruction | Transformer AE，学习 `z_C` |
| CCIP | Contrastive CAD-Image Pretraining | 对齐 CAD 与图像潜空间 |
| CDP | CAD Diffusion Prior | 图像条件采样 CAD 潜变量 |
| — | Transformer decoder | `z_C` → 命令序列 |

## CAD 命令 token（§3.1 摘要）

- Special: `<SOL>`, `<EOS>`
- Sketch: Line, Circle, Arc
- 3D: Extrude（含平面姿态、拉伸距离、布尔运算类型等共 10 个参数）
- 每命令向量 17 维（1 类型 + 16 参数），序列 padding 为 60×17

## 数据（§3.2）

- DeepCAD 过滤：168,674 可编译模型；152,530 / 8,515 / 7,629 划分
- 图像：840,947 灰度 1×448×448；条件实验用 isometric 渲染

## 公开 rebuttal 补充（arXiv 页）

- COV/MMD/JSD 遵循 DeepCAD 等文献标准；约 7500 测试形状，抽 3000 算 COV，重复 3 次取均值
- 图像来自 DeepCAD 测试集渲染，与 CAD 划分一致
- 图 10 为 handpicked 单样本；图 11 展示同图多样性
