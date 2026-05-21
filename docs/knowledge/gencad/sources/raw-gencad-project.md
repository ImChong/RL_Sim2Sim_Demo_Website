# 原始摘录：GenCAD 项目页

**来源**：https://gencad.github.io/  
**收录日期**：2026-05-21

---

## 标题与作者

GenCAD: Image-conditioned Computer-Aided Design Generation with Transformer-based Contrastive Representation and Diffusion Priors

- Md Ferdous Alam, Faez Ahmed
- Massachusetts Institute of Technology

## Abstract（原文）

We present GenCAD, an image-conditional CAD generation model. Our model not only generates the 3D CAD but also the entire parameterized CAD command history, CAD program, as output.

The complexity of CAD data structures such as boundary representation (B-rep) makes it difficult to train efficient AI models. Due to the ease of data availability, common approaches often resort to representations like meshes, voxels, or point clouds, which sacrifice the accuracy and modifiability of true CAD models that are critical for engineering tasks, manufacturing and design space exploration. Here we propose GenCAD, an image conditional generative model that generates parametric CAD command sequences, also known as CAD programs, that can be converted to a 3D solid model using a geometry kernel. At the core of GenCAD, we develop a strong representation learning framework for multiple modalities of computational engineering designs.

Our proposed GenCAD architecture is a combination of four critical steps; 1) an autoregressive transformer encoder is used for learning the latent representation of the CAD command sequences, 2) a contrastive learning-based model is used to learn the joint representations of the latent spaces between CAD command sequences and CAD-images, 3) a latent diffusion model that can generate the latent representation of CAD command sequences conditioned on CAD-images, and 4) finally, a decoder model that can convert cad latents into a sequence of parametric CAD commands. Most importantly, GenCAD does not merely generate a 3D solid but also the entire CAD program.

## 演示能力（页面描述）

- **Image-conditional CAD generation**：从渲染图创建 CAD 模型。
- **Sample diversity**：同一图像可得到多个 CAD 样本。
- **Image-conditional CAD retrieval**：从约 7000 个 CAD 程序库中检索 Top-3。

## BibTeX（项目页提供）

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
