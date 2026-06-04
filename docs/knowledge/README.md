# 知识库（Knowledge Base）

本目录存放与本仓库（RL Sim2Sim Demo、人形机器人策略与 sim2real）相关的**原始资料**与**消化笔记**，供后续开发、选型与 issue/PR 讨论时检索。

## 目录结构

| 路径 | 说明 |
|------|------|
| [`index.json`](./index.json) | 机器可读索引（条目 ID、标题、来源、消化文档路径） |
| [`sources/<entry-id>/`](./sources/) | 原始资料：官网摘要、arXiv 摘录、BibTeX、相关链接清单等 |
| [`digests/<entry-id>.md`](./digests/) | 人工消化后的中文笔记（方法要点、实验结论、与本仓库的关联） |

## 使用约定

1. **原始资料**只收录可公开引用的文本与元数据，不提交大型 PDF/视频二进制；论文全文请通过 arXiv 或项目页链接获取。
2. 新增条目时同步更新 `index.json`，并在 `sources/<entry-id>/manifest.json` 中记录采集日期与 URL。
3. 消化文档使用中文撰写，commit message 遵循仓库 `AGENTS.md` 约定。

## 条目列表

| ID | 标题 | 消化文档 |
|----|------|----------|
| `splitadapter-2606.03297` | SplitAdapter: Load-Aware Humanoid Loco-Manipulation via Factorized Adaptation | [digests/splitadapter-2606.03297.md](./digests/splitadapter-2606.03297.md) |
