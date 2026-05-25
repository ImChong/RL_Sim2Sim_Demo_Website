# Sim2Sim 演示 ↔ 论文知识映射

本文档将知识库中的两篇主论文与本仓库可运行资产一一对应，便于开发、写 README 或扩展新策略。

## 策略与场景

| Demo 选项 | 配置文件 | 场景 MJCF | ONNX | 对应论文 |
|-----------|----------|-----------|------|----------|
| G1 AMP Walk/Run/Getup | `amp_policy_walk_run_getup.json` | `g1_amp/scene_g1.xml` | `walk_run_getup/model_60000.onnx` | SDAMP (2605.18611) |
| G1 Tracking | `tracking_policy_latest.json` | `g1/g1.xml` | `tracking/policy_latest.onnx` | Heracles 底层 tracker (2603.27756) |

入口代码：

- 默认策略路径：`src/simulation/main.js` → AMP 配置  
- UI 切换：`src/views/Demo.vue` → `policies[]`、`reloadPolicy` / `reloadScene`

## 观测管线对照

### AMP（SDAMP 对齐）

| 论文观测分量 | `observationHelpers` 名称 | 流程图节点（`pipelineAtomicNodes`） |
|--------------|---------------------------|-------------------------------------|
| 机体角速度 | `RootAngVelB` | 根角速度 |
| 投影重力 \(g_z\) 门控 | `ProjectedGravityB` | 投影重力 |
| 速度指令 | `Command` | 指令 vx / vy / yaw |
| 关节位置 | `JointPos` | 关节位置 |
| 关节速度 | `JointVel` | 关节速度 |
| 上一拍动作 | `PrevActions` | （合并展示） |
| 4 帧历史 → 384 维 | `history_length: 4` | 图左侧 history 拼接 |

### Tracking（Heracles §3.3 子集）

| 论文分量 | 本仓库 obs 名称 |
|----------|-----------------|
| 投影重力 | `ProjectedGravityB` |
| 根角速度 | `RootAngVelB` |
| 关节位/速 | `JointPos`（多 `pos_steps`）、`JointVel` |
| 参考根速、关节、姿态误差 | `TrackingCommandObsRaw`、`TargetJointPosObs`、`TargetRootZObs`、`TargetProjectedGravityBObs` |
| 上一拍动作 | `PrevActions`（history 3） |
| 顺应性标志 | `ComplianceFlagObs`（demo 扩展） |

Heracles 中间层输出的 `m'_t` **未**在浏览器中实现；当前参考直接来自 `trackingHelper` 加载的 motion JSON。

## 动作数据（LAFAN1 / 参考片段）

`public/examples/checkpoints/g1/motions.json` 中与 SDAMP §III-D 同名的条目：

| 名称 | 文件 | 论文角色 |
|------|------|----------|
| walk1_subject1 | `walk1_subject1.json` | walk 参考 |
| run1_subject2 | `run1_subject2.json` | run 参考 |
| fallAndGetUp2_subject2 | `fallAndGetUp2_subject2.json` | recovery 参考 |

在 **Tracking** 策略下可从 UI 播放上述片段，观察跟踪器行为；**AMP** 策略不依赖运行时 motion 索引，但训练语义与三条参考一致。

## 训练与导出溯源

`amp_policy_walk_run_getup.json` → `onnx.source`：

```json
{
  "training_repo": "AMP_mjlab",
  "training_run": "logs/rsl_rl/g1_amp_locomotion/2026-05-20_15-57-18",
  "checkpoint": "model_60000.pt"
}
```

论文声明真机 50 Hz 部署；浏览器仿真步长由 `simFreq` 与 MuJoCo `timestep` 决定，与训练 `control_dt` 对齐时需读 JSON 内 decimation（若有）。

## UI 功能 ↔ 论文实验

| UI | 论文/实验 |
|----|-----------|
| 速度滑条（AMP） | 速度跟踪 / \(\hat{v}_t\) 条件化 locomotion |
| 击倒测试 | 扰动后恢复能力（粗测，非真机俯卧/仰卧） |
| Motion 选择（Tracking） | 参考轨迹切换，对应 Heracles 的 \(m_t\) 来源 |
| Compliance 开关 | 跟踪器柔顺调制（扩展功能） |
| 模型 I/O 流程图 | 观测拼接与 ONNX 输入的可视化调试 |

## 推荐阅读顺序

1. [`sdamp-unified-locomotion.md`](./sdamp-unified-locomotion.md) — 理解当前默认 AMP 策略  
2. [`heracles-generative-middleware.md`](./heracles-generative-middleware.md) — 理解 Tracking 策略局限与未来中间层  
3. [`../sources.json`](../sources.json) — 引用与外链

## 知识库维护清单

- [ ] Heracles 代码发布后补充 `sources.json` 仓库链接  
- [ ] 若 SDAMP 公开独立仓库，与 AMP_mjlab 关系写清  
- [ ] 新策略接入时在本文档增行映射表
