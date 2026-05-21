# 原始摘录：GenCAD-3D arXiv 论文要点

**来源**：https://arxiv.org/abs/2509.15246（HTML v1）  
**收录日期**：2026-05-21

---

## 标题

GenCAD-3D: CAD Program Generation using Multimodal Latent Space Alignment and Synthetic Dataset Balancing

**期刊**：Mechanical Design (JMD)

## 主要贡献（论文 §1）

1. **GenCAD-3D Framework**：模态专用编码器 + 对比学习对齐 CAD 与几何潜空间 + 条件潜扩散 → 跨模态检索、几何→CAD 重建、CAD 序列生成。
2. **Specialized 3D Encoders**：mesh（FeaStNet）相对纯点云：命令准确率最高约 15% 相对提升，参数准确率约 3%；Top-1 检索（2048 库）最高约 11%。
3. **SynthBal**：平衡/扩展训练集；无效 CAD 率 3.44% → 0.845%；高复杂度 Chamfer 中位误差最多约降 89%。
4. **Complexity-Normalized Evaluation**：按序列长度归一化的评测指标。
5. **Public Release**：多模态几何数据集、编码器、SynthBal、51 件真实扫描+CAD 对。

## 架构（§3，继承 GenCAD）

1. CAD 程序 Transformer 自编码器（因果 mask，与 GenCAD 相同）
2. 对比学习：冻结 CAD 编码器，训练几何编码器对齐 `z_C` 与 `z_M`
3. 条件潜扩散：`p(z_C | z_M)`，去噪器为 ResNet-MLP
4. 解码为 CAD 命令 → OpenCascade 编译 B-Rep

对比损失（batch 内 InfoNCE，余弦相似度，温度 τ 可学习）。

## 模态与编码器（§4）

- **CAD**：60×17 矩阵；Line/Arc/Circle/Extrude/EOS；OpenCascade 执行。
- **Point Cloud**：DGCNN，2048 点 bootstrap，对比 300 epoch，生成 1M epoch。
- **PC+N**：6D 特征，同 DGCNN 结构。
- **Mesh**：FeaStNet + DiffusionNet 式密度加权 mean-pool；不规则 mesh 专用 batching。

## 数据（§5 开头）

- 扩展 DeepCAD（178,238 程序）至多模态几何表示。
- 公开 51 件 3D 打印+激光扫描件及对应 CAD（物理扫描伪影难以纯合成复现）。

## 相关工作定位（§2 摘要）

- 逆向工程传统方法需大量人工；GenCAD-3D 全自动输出完整参数化 CAD 程序。
- 与 CAD-MLLM、Point2Cyl、CAD-SIGNet、TransCAD 等对比：后者多限 sketch-extrude 或依赖基础模型 embedding；本工作自学习 mesh/点云对齐且不依赖已有 foundation model。
- SynthBal 针对 **复杂度长尾**，区别于 DeepCAD/ContrastCAD 的 random replacement 类增强。

## 应用场景（Introduction）

零件停产需替换时：激光扫描 → 逆向为 CAD 程序 → 再制造；现有商业工具仍需专家拟合曲面。
