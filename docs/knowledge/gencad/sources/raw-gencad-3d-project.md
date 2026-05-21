# 原始摘录：GenCAD-3D 项目页

**来源**：https://gencad3d.github.io/  
**收录日期**：2026-05-21

---

## 标题

GenCAD-3D: CAD Program Generation using Multimodal Latent Space Alignment and Synthetic Dataset Balancing

**作者**：Nomi Yu, Md Ferdous Alam, A. John Hart, Faez Ahmed — MIT

## 能力展示（页面）

- **Generation / Retrieval** from: Point Cloud, Point Cloud + Normal, Mesh
- 复杂度档位：Simple / Medium / Complex / Very Complex
- 可展示生成的 CAD Program

## Abstract（原文）

CAD programs, structured as parametric sequences of commands that compile into precise 3D geometries, are fundamental to accurate and efficient engineering design processes. Generating these programs from nonparametric data such as point clouds and meshes remains a crucial yet challenging task...

We introduce GenCAD-3D, a multimodal generative framework utilizing contrastive learning for aligning latent embeddings between CAD and geometric encoders, combined with latent diffusion models for CAD sequence generation and retrieval. Additionally, we present **SynthBal**, a synthetic data augmentation strategy...

Experiments: SynthBal boosts reconstruction accuracy, reduces invalid CAD models, improves high-complexity geometries.

## SynthBal Performance

页面说明：SynthBal 显著改善相对原始不平衡数据集所生成 CAD 程序的质量。

## BibTeX（项目页，注意标题拼写）

```bibtex
@article{yu2025gencad3dreverseengineercadprogram,
            title={GenCAD=3D: CAD Program Generation using Multimodal Latent Space Alignment and Synthetic Dataset Balancing}, 
            author={Nomi Yu, Md Ferdous Alam, A John Hart, Faez Ahmed},
            year={2025},
            journal={JMD},
            eprint={https://arxiv.org/abs/2509.15246},
        }
```

（正式引用请以 arXiv/JMD 官方 BibTeX 为准；消化文档使用 `GenCAD-3D` 标准写法。）
