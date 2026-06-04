# arXiv 2606.03297 摘录

- **采集日期**: 2026-06-04
- **来源**: https://arxiv.org/html/2606.03297
- **关键词**: Humanoid Loco-Manipulation, Sim-to-Real, Online Adaptation

## 问题与动机

人形 loco-manipulation 需在**物块质量**与**拾取/放置高度**变化下保持全身稳定。sim-to-real 时，物体引起的载荷变化与机器人/环境动力学失配在接触阶段耦合，使迁移困难。既有基于历史的 adapter 常将负载相关信号与动力学残差**压入单一潜变量**，在重载操作下鲁棒性不足。

## 方法要点

### 冻结基座

- 基座: **PhysHSI 风格 AMP** 箱体操作策略，低层 PD 跟踪关节目标。
- 预训练后**冻结**基座，仅训练适配模块。

### 双分支历史编码

观测-动作历史 \(\mathcal{H}_t = \{o_{t-H}, a_{t-H}, \ldots, o_t\}\)，共享编码器得 \(e_t = f_{\mathrm{hist}}(\mathcal{H}_t)\)。

| 分支 | 输出 | 作用 |
|------|------|------|
| Object/load \(f_{\mathrm{obj}}\) | \(z_{\mathrm{obj},t}\), \(\hat{m}_t\), \(\hat{\ell}_t\) | 质量与 loaded 状态估计 + 负载相关上下文 |
| Dynamics \(f_{\mathrm{dyn}}\) | \(z_{\mathrm{dyn},t}\) | 动力学/环境失配相关上下文 |

有效载荷: \(m_{\mathrm{eff},t} = \hat{\ell}_t \hat{m}_t\)。

### Split World Models

| 世界模型 | 预测目标 | 意图 |
|----------|----------|------|
| \(W_{\mathrm{obj}}\) | 物体位姿增量 \(\Delta p^{\mathrm{obj}}, \Delta R^{\mathrm{obj}}\) | \(z_{\mathrm{obj}}\) 编码负载/交互 |
| \(W_{\mathrm{dyn}}\) | 下一时刻机器人状态 | \(z_{\mathrm{dyn}}\) 编码动力学残差 |

二者均条件于估计载荷 \(m_{\mathrm{est},t}\)，减轻潜变量重复编码质量。

### GRL 跨分支对抗

- \(A_{\mathrm{obj}\leftarrow\mathrm{dyn}}\): 禁止 \(z_{\mathrm{dyn}}\) 预测物体转移。
- \(A_{\mathrm{robot}\leftarrow\mathrm{obj}}\): 禁止 \(z_{\mathrm{obj}}\) 预测机器人转移。

### 层级 FiLM

\(h' = \gamma(z) \odot h + \beta(z)\)：

- **Object/load FiLM**（\(z_{\mathrm{obj}}, m_{\mathrm{est}}\)）→ **较浅层**：抬升姿态、全身协调等粗粒度行为。
- **Dynamics FiLM**（\(z_{\mathrm{dyn}}\)）→ **较深层/靠近动作头**：补偿动力学失配。

调制层初始化保持冻结策略初始行为；适配器与基座共用同一 RL 目标与奖励。

## 实验设置

- **训练**: Isaac Gym；**验证**: MuJoCo sim-to-sim。
- **质量**: 2 / 4 / 6 kg；**拾放高度**: 0 / 30 / 60 cm；每格 **10** 次试验。
- **指标**: Lift-up success；**Full-task success**（接近→抬起→搬运→放置全流程）。

### 对比方法

| 方法 | 说明 |
|------|------|
| Base (PhysHSI) | 冻结基座 |
| AnyAdapter-style WM-FiLM | 单一潜变量 + 世界模型 FiLM |
| Ours w/o split latent | 无潜变量拆分 |
| Ours w/o hierarchical FiLM | 无层级 FiLM |
| Ours w/o GRL | 无 GRL 解耦 |
| **SplitAdapter** | 完整方法 |

### MuJoCo sim-to-sim Full-task 成功次数（Table 1 汇总）

| 方法 | 2kg (0/30/60cm) | 4kg | 6kg | Full-task 合计 | Lift-up 合计 |
|------|-----------------|-----|-----|----------------|--------------|
| Base | 10/8/9 | 9/10/10 | 5/5/5 | **71/90** | 86/90 |
| WM-FiLM | 10/10/9 | 9/9/10 | 4/6/8 | 75/90 | 86/90 |
| w/o split | 10/9/10 | 9/10/9 | 6/9/9 | 81/90 | 88/90 |
| w/o hier. FiLM | 10/10/10 | 9/10/9 | 7/8/8 | 81/90 | 90/90 |
| w/o GRL | 10/8/10 | 10/10/10 | 8/9/9 | 84/90 | 90/90 |
| **SplitAdapter** | 10/10/10 | 9/10/10 | **10/9/9** | **86/90** | 90/90 |

**要点**: 6 kg 且 0 cm 地面拾取最难；基座与 WM-FiLM 常能抬起但在搬运/放置阶段失稳；SplitAdapter 在全部 6 kg 高度组合上保持高 Full-task 成功率。

### 真实机（Unitree G1，零样本，每条件 3 次）

| 方法 | Full-task | Lift-up |
|------|-----------|---------|
| Base | 16/27 (59.3%) | 22/27 (81.5%) |
| SplitAdapter | **26/27 (96.3%)** | **27/27 (100%)** |

6 kg 条件下基座多能起 lift 但搬运/放置失败（抓握、躯干、平衡）；SplitAdapter 显著改善**搬运与放置阶段**稳定性。

## 消融结论（简要）

1. **去掉 split latent** → Full-task 降幅最大（尤其 6 kg），统一潜变量混合负载与动力学信号。
2. **去掉 GRL** → 一致但较小降幅；分支 specialize 的 predictability gap 变小。
3. **去掉 hierarchical FiLM** → Lift-up 仍高，Full-task 降；层级调制主要利于搬运/放置全身协调。

## 局限（论文 §6）

- 仅刚性箱体抬-运-放，未覆盖可变形物体与更丰富接触操作。
- 真实机试验规模受 G1 单臂约 **3 kg** 额定载荷与重载耐久性限制。

## 主要贡献（三条）

1. 冻结策略 + 载荷/动力学因子化在线适配框架。  
2. Split world model + GRL 解耦的双分支结构。  
3. MuJoCo sim-to-sim 与 G1 真实部署验证，重载场景收益最大。
