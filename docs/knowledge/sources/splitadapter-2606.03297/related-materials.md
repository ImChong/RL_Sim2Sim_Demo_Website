# SplitAdapter 相关资料链接

采集日期: 2026-06-04。下列为论文中直接依赖或对比的方法、工具与平台，便于与本仓库 G1 sim2sim / sim2real 工作对照。

## 核心依赖与基线

| 名称 | 角色 | 链接 |
|------|------|------|
| **PhysHSI** | 冻结的 AMP 风格箱体操作基座策略 | https://arxiv.org/abs/2510.11072 |
| **AnyAdapter / Any2Track** | WM-FiLM 统一潜变量自适应基线 | 见论文 [31]（Any2Track 运动跟踪自适应） |
| **AMP** | 对抗运动先验，基座策略训练范式 | Peng et al., TOG 2021 |
| **FiLM** | 层级特征调制 | Perez et al., AAAI 2018 |
| **GRL** | 梯度反转层，跨分支对抗解耦 | Ganin & Lempitsky, ICML 2015 |

## 仿真与部署

| 名称 | 用途 | 链接 |
|------|------|------|
| **Isaac Gym** | 训练环境 | NeurIPS 2021 |
| **MuJoCo** | sim-to-sim 验证 | https://mujoco.org/ |
| **Unitree G1** | 真实机零样本部署平台 | Unitree 官方文档 / 产品页 |

## 同领域近期工作（论文 Related Work 提及）

| 名称 | 简述 |
|------|------|
| ULTRA | 统一多模态人形全身 loco-manipulation 控制器 |
| Pro-HOI | 感知根引导、长时程搬箱 |
| ResMimic | 残差策略 + 预训练运动跟踪 |
| FALCON | 力自适应上下身分解 loco-manipulation |
| RMA / A-RMA | 腿足快速电机自适应 |
| DWL / WMR | 人形运动世界模型重建类方法 |
| HAIC | 动力学感知世界模型的人形敏捷交互 |

## 与本仓库（RL Sim2Sim Demo）的关联点

- **机器人**: 真实实验使用 **Unitree G1**，与本站默认 G1 MJCF / policy 场景一致。
- **仿真栈**: 训练 Isaac Gym + 验证 **MuJoCo**，与本站 MuJoCo WASM sim2sim 技术路线一致。
- **策略形态**: 冻结 ONNX 类 policy + 在线自适应模块，与未来在本站集成「适配器 / 世界模型头」的扩展方向相关。
- **任务**: 刚性箱体抬-运-放，载荷与拾取高度变化；与本站 tracking / manipulation motion 数据管线可对照，但**尚未**提供可下载的 SplitAdapter 推理权重。
