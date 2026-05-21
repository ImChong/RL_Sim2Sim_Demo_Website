# GenCAD 消化摘要（图像条件 CAD 生成）

> **论文**：GenCAD: Image-Conditioned Computer-Aided Design Generation with Transformer-Based Contrastive Representation and Diffusion Priors  
> **作者**：Md Ferdous Alam, Faez Ahmed（MIT）  
> **链接**：https://arxiv.org/abs/2409.16294 · https://gencad.github.io/ · https://github.com/ferdous-alam/GenCAD

## 问题与动机

工程 CAD 普遍采用 **B-Rep（边界表示）**，可精确制造与编辑，但难以直接作为神经网络输入。常见 3D 生成工作使用 mesh/voxel/点云，牺牲了参数化可修改性。GenCAD 的目标是：给定 **CAD 渲染图像**，生成完整的 **参数化 CAD 命令序列（CAD 程序）**，经几何核编译为 B-Rep，而非仅输出不可编辑的三角网格。

## 方法：四步框架

1. **CSR（Command Sequence Reconstruction）**  
   因果 Transformer 自编码器，在无监督/自回归意义下学习 CAD 命令序列潜表示 `z_C`。

2. **CCIP（Contrastive CAD-Image Pretraining）**  
   冻结 CAD 编码器，用对比学习（CLIP 风格）对齐 CAD 潜空间与 **ResNet 图像编码器** 潜空间，使同一模型的图像与程序 embedding 靠近。

3. **CDP（CAD Diffusion Prior）**  
   条件 **潜扩散模型**：以图像潜 `z_M` 为条件，采样 CAD 潜 `z_C`（ResNet-MLP 去噪网络）。

4. **解码**  
   复用 CSR 的 Transformer 解码器，将 `z_C` 自回归解码为命令序列；再用 **OpenCascade** 等内核逐步执行命令得到实体。

训练时 CSR 与解码器权重在后续阶段冻结或复用，以支持大规模数据。

## CAD 作为「语言」

- 每个命令向量化：类型 + 最多 16 个连续参数（总长 17），再 padding 为 **60×17** 矩阵（与 DeepCAD 一致）。
- 草图 token：`Line`、`Arc`、`Circle`；三维 token：`Extrude`；特殊 token：`<SOL>`、`<EOS>` 等。
- 序列具有因果性：解码时使用 causal mask，保持命令顺序依赖。

## 数据

- 基于 **DeepCAD**（源自 ABC / Onshape 设计史），过滤为可编译 3D 实体的 **168,674** 个模型。
- 划分：训练 152,530 / 验证 8,515 / 测试 7,629。
- 图像：对每个 CAD 做多种尺度渲染，有效灰度图约 **840,947** 张，尺寸 **1×448×448**；条件生成实验使用 **等轴测（isometric）** 渲染。
- 操作范围限于 sketch + extrude（无 fillet/revolve 等），与 DeepCAD 子集一致。

## 任务与能力

| 任务 | 说明 |
|------|------|
| **图像条件生成** | 单张渲染图 → 一条 CAD 程序；同一图像可扩散采样得到多样本 |
| **图像条件检索** | 在约 7000 条程序库中按图检索 Top-K；对比 embedding 远优于纯图像相似度检索 |
| **无条件生成** | 支持，但论文重点在条件模型；COV/MMD/JSD 与 DeepCAD 等对齐评测 |

评测：对测试集每图生成约 7500 个形状，随机抽 3000 个算 COV 等（与 DeepCAD 设定对齐）；图像条件实验 **每张图一个样本** 参与多样性统计。

## 实现与复现（仓库）

- **环境**：Docker（推荐）或 conda + `pythonocc-core=7.9.0` + `requirements.txt`。
- **数据/权重**：Google Drive（见 README `data/`、`data/ckpt/`）。
- **训练**：
  - `python train_gencad.py csr -name test -gpu 0`
  - `python train_gencad.py ccip -name test -gpu 0 -cad_ckpt ...`
  - `python train_gencad.py dp -name test -gpu 0 -cad_emb ... -img_emb ...`
- **推理**：`xvfb-run python inference_gencad.py`（无头服务器需虚拟显示）。
- **模块别名**：CSR / CCIP / DP 与论文三步 + 解码对应。

## 与后续 GenCAD-3D 的关系

GenCAD-3D 将同一套「自编码器 → 对比对齐 → 条件扩散 → 解码」迁移到 **点云/网格** 条件，并针对复杂 CAD 序列引入 **SynthBal** 数据平衡。GenCAD 的 CSR 架构与对比-扩散范式是 GenCAD-3D 的直接前驱（论文 §3 明确写明 inspired by GenCAD）。

## BibTeX

```bibtex
@misc{alam2025gencadimageconditionedcomputeraideddesign,
  title={GenCAD: Image-Conditioned Computer-Aided Design Generation with Transformer-Based Contrastive Representation and Diffusion Priors},
  author={Md Ferdous Alam and Faez Ahmed},
  year={2025},
  eprint={2409.16294},
  archivePrefix={arXiv},
  primaryClass={cs.CV},
  url={https://arxiv.org/abs/2409.16294},
}
```
