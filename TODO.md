# 项目待办事项 (TODO List)

该文件记录了项目的后续开发计划、学习目标及功能扩展建议。

## 🚀 功能开发
- [ ] **键盘控制速度指令 (WASD)**
    - [ ] 在 `Demo.vue` 中添加键盘事件监听。
    - [ ] 实现速度指令的平滑平移（防止指令突变导致机器人摔倒）。
    - [ ] 将键盘输入转换为 `VelocityCommand` 并传递给仿真引擎。
- [ ] **可视化交互增强**
    - [ ] [建议] 在屏幕上显示当前的虚拟摇杆或速度箭头，实时反馈指令值。
    - [ ] [建议] 支持游戏手柄 (Gamepad API) 接入。
- [ ] **模型集成与部署**
    - [ ] [建议] 支持在网页端动态切换不同的训练模型（如“速度跟踪” vs “走跑一体” vs “AMP 拟人运动”）。
    - [ ] 将 **AMP_mjlab** 的训练结果集成部署到本网页，并验证推理性能。

## 🧠 模型训练与学习
- [ ] **学习拟人行走与多算法训练**
    - [ ] 深入研究 [unitree_rl_mjlab](https://github.com/unitreerobotics/unitree_rl_mjlab) 的奖励函数设计与课程学习应用（如走跑切换）。
    - [ ] 复现 [AMP_mjlab](https://github.com/ccrpRepo/AMP_mjlab) 算法，通过对抗运动先验提升机器人动作的拟人度。
    - [ ] 掌握 **Sim-to-Real** 的关键技术，包括动力学随机化 (Domain Randomization) 与奖励函数调优。
- [ ] **训练与导出宇树 G1 运动模型**
    - [ ] 搭建 Isaac Gym 或 MuJoCo 训练环境，训练稳定的速度跟踪或拟人化 Policy。
    - [ ] 将训练好的模型导出为本项目所需的 **sim2sim 格式**（ONNX policy + MuJoCo 场景文件）。

## 🛠 系统优化
- [ ] **参数化控制频率 (Control Frequency)**
    - [ ] 修改 `src/simulation/main.js`，支持从 `tracking_policy.json` 读取 `control_dt` 或 `decimation`。
    - [ ] 确保仿真频率 (`timestep`) 与模型推理频率 的同步逻辑可配置，以匹配 `unitree_rl_mjlab` 的训练设置。
- [ ] **仿真性能优化**
    - [ ] [建议] 针对移动端优化 WebAssembly 的内存占用。
    - [ ] [建议] 优化 ONNX 推理频率与物理仿真频率的同步逻辑。
- [ ] **多地形支持**
    - [ ] [建议] 在仿真场景中加入斜坡、台阶等地形，测试模型的鲁棒性。

---
*提示：完成任务后请将 `[ ]` 改为 `[x]`。*
