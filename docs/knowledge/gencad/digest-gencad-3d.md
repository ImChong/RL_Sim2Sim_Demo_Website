# GenCAD-3D 消化摘要（多模态几何 → CAD 程序）

> **论文**：GenCAD-3D: CAD Program Generation using Multimodal Latent Space Alignment and Synthetic Dataset Balancing  
> **作者**：Nomi Yu, Md Ferdous Alam, A. John Hart, Faez Ahmed（MIT）  
> **期刊**：Journal of Mechanical Design (JMD)  
> **链接**：https://arxiv.org/abs/2509.15246 · https://gencad3d.github.io/ · https://github.com/yunomi-git/GenCAD-3D

## 问题与动机

从 **点云、网格** 等非参数化扫描数据恢复 **可编辑 CAD 程序** 是逆向工程核心需求，但现有生成模型受 **DeepCAD 等数据集复杂度长尾分布** 制约：简单模型占多数，复杂长序列样本稀少，平均指标掩盖高复杂度失败。GenCAD-3D 提出：

1. 多模态 **潜空间对齐**（CAD ↔ 几何）+ **条件潜扩散** 生成/检索；
2. **SynthBal** 合成数据平衡，提升复杂 CAD 覆盖与规模。

## 方法概览

继承 [GenCAD](./digest-gencad.md) 流水线，替换/扩展几何编码器：

```text
CAD Transformer 自编码器（因果，与 GenCAD 相同）
    ↓ 冻结 CAD 编码器
对比学习：z_C ↔ z_M（几何模态专用编码器）
    ↓
条件潜扩散：p(z_C | z_M)
    ↓
解码器 → CAD 程序 → OpenCascade → B-Rep
```

### 几何编码器

| 模态 | 编码器 | 输入特征 | 参数量级 |
|------|--------|----------|----------|
| 点云 (PC) | DGCNN | 3D 坐标，KNN 图卷积 | ~2.60M |
| 点云+法向 (PC+N) | DGCNN | 6D（坐标+法向），表面均匀采样 | ~2.60M |
| 网格 (Mesh) | FeaStNet | 顶点 6D + 边结构，密度加权 mean-pool | ~2.66M |

对比损失为 CLIP 式 InfoNCE（余弦相似度 + 可学习温度 τ）。训练时 **冻结** CAD 自编码器编码端，仅训练几何编码器以对齐 `z_C` 与 `z_M`。

扩散先验：ResNet-MLP 去噪器，将几何潜与带噪 CAD 潜拼接后预测噪声；各模态单独训练 prior。

### SynthBal

- 针对 DeepCAD **序列长度（命令 数）分布失衡**，为欠采样长度合成 CAD 程序。
- 流程（仓库可选复现）：`generate_augmented_dataset` → `combine_augmented_dataset` → `create_synthetic_splits`。
- 效果（论文）：无效生成率 **3.44% → 0.845%**；高复杂度 Chamfer 中位误差最高约 **89%** 下降；复杂几何重建显著优于未平衡数据。

### 复杂度归一化评测

提出按 **序列长度归一化** 的指标，避免简单样本主导平均值，使高复杂度 CAD 上的进步可见。

## CAD 程序表示

与 DeepCAD / GenCAD 一致：

- 命令：Line、Arc、Circle、Extrude、EOS（padding 用 EOS）。
- 矩阵：**60×17**（命令类型 + 16 参数列）。
- 编译：OpenCascade 顺序执行至程序结束。

## 数据与公开资源

基于 DeepCAD **178,238** 条程序扩展多模态几何；HuggingFace 发布：

| 数据集 | 体量（约） | 内容 |
|--------|------------|------|
| GenCAD3D | 127 GB | CAD、点云、网格、STL、STEP 等 |
| GenCAD3D_Scans | 700 MB | 真实激光扫描 + CAD（51 件 3D 打印件） |
| GenCAD3D_SynthBal | 109 GB | SynthBal 增强多模态 |
| GenCAD3D_SynthBal_1M | 9 GB | 仅 CAD 程序（百万级合成） |

- **权重**：https://huggingface.co/yu-nomi/GenCAD_3D（`results/Autoencoder`、`Contrastive`、`Diffusion` 等目录结构）
- 配置：下载后修改 `paths.py` 中 `DATA_PATH`

## 训练与推理（仓库）

**环境**：`torch`（测试于 2.7.1）、`requirements.txt`、`pythonocc-core=7.9.0`（mamba）。

**快速推理**：

```bash
# 自有 STL
python -m diffusion.evaluation.visualize_diffusion_inference \
  -encoder_type mesh_feast -contrastive_model_name mesh_SynthBal_1M_SBD \
  -filenames examples_files/00152170.stl

# 数据集样本
python -m diffusion.evaluation.visualize_diffusion_samples \
  -encoder_type pc -contrastive_model_name pcn_SynthBal_1M_SBD
```

`contrastive_model_name` 可选：`pc_SynthBal_1M_SBD`、`pcn_SynthBal_1M_SBD`、`mesh_SynthBal_1M_SBD`。

**导出到 CAD 软件**：通过 Onshape API（`GenCADGenerator.program_to_cad`），需配置 `secret_key` / `access_key`。

**三阶段训练**：

1. Autoencoder：`python -m autoencoder.gencad.train_gencad ...`（SynthBal 用 `--data_root GenCAD3D_SynthBal/`）
2. Contrastive：`python -m contrastive.train_contrastive_model -encoder_type pc|mesh_feast ...`
3. Diffusion：先生成 embedding，再 `train_cond_diffusion`

## 实验结论（精选）

- **网格 vs 点云**：命令准确率最高约 **15%** 相对提升，参数准确率约 **3%**；Top-1 检索在 2048 规模库上最高约 **11%** 提升。
- **SynthBal**：全面降低无效 CAD、改善长序列重建；对使用 SynthBal 训练的下游模型亦有益。
- **与 Point2Cyl / CAD-SIGNet / TransCAD 等**：后者多限于 sketch-extrude 且显式预测草图面；本架构不假设命令类型，可扩展更丰富命令库（当前实验仍用 sketch-extrude 子集）。

## 与 GenCAD 的差异（速记）

| 维度 | GenCAD | GenCAD-3D |
|------|--------|-----------|
| 条件模态 | 2D 渲染图 | 点云 / PC+N / 网格 |
| 应用侧重 | 概念设计、图生 CAD、图检索 | 逆向工程、扫描 → CAD |
| 数据增强 | 多尺度渲染 | **SynthBal** 序列长度平衡 |
| 代码结构 | 单文件 `train_gencad.py` | `autoencoder` / `contrastive` / `diffusion` 包 |

## BibTeX

```bibtex
@article{yu2025gencad3dreverseengineercadprogram,
  title={GenCAD-3D: CAD Program Generation using Multimodal Latent Space Alignment and Synthetic Dataset Balancing},
  author={Nomi Yu and Md Ferdous Alam and A John Hart and Faez Ahmed},
  year={2025},
  journal={JMD},
  eprint={2509.15246},
  archivePrefix={arXiv},
  url={https://arxiv.org/abs/2509.15246},
}
```
