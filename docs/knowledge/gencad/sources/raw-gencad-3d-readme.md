# 原始摘录：GenCAD-3D GitHub README

**来源**：https://github.com/yunomi-git/GenCAD-3D（`README.md` on `main`）  
**收录日期**：2026-05-21

---

## 论文与资源

- **Project Page**: https://gencad3d.github.io/
- **Paper**: https://arxiv.org/abs/2509.15246
- **Code**: https://github.com/yunomi-git/GenCAD-3D
- **Dataset**: https://huggingface.co/datasets/yu-nomi/GenCAD_3D
- **Weights**: https://huggingface.co/yu-nomi/GenCAD_3D

## 数据集（解压至 `data_path/`，配置 `paths.py`）

| 名称 | 体量 | 内容 |
|------|------|------|
| GenCAD3D | 127 GB | CAD、点云、网格、STL、STEP |
| GenCAD3D_Scans | 700 MB | 原始/清洁扫描、CAD、点云、网格 |
| GenCAD3D_SynthBal | 109 GB | SynthBal 增强数据 |
| GenCAD3D_SynthBal_1M | 9 GB | 仅 CAD 程序 |

## 权重目录结构

```
./results
  Autoencoder/
  Contrastive/
  Diffusion/
```

## 环境

```bash
pip install torch torchvision torchaudio  # tested torch 2.7.1
pip install -r requirements.txt
mamba install -c conda-forge pythonocc-core=7.9.0
```

## Quickstart 推理

```bash
python -m diffusion.evaluation.visualize_diffusion_inference \
  -encoder_type mesh_feast -contrastive_model_name mesh_SynthBal_1M_SBD \
  -filenames examples_files/00152170.stl

python -m diffusion.evaluation.visualize_diffusion_samples \
  -encoder_type pc -contrastive_model_name pcn_SynthBal_1M_SBD
```

## Onshape 导出

配置 API key JSON 后：

```bash
python -m GenCADGenerator.program_to_cad -url <onshape_url> -cad_path example_files/00152170_gen_cad.h5
```

## 训练流水线（节选）

**Autoencoder**

```bash
python -m autoencoder.gencad.train_gencad -name autoencoder_model -epoch 1000 -lr 5e-3 -b 512 -gpu 0 -sf 100 --warm_up 2000
# SynthBal:
python -m autoencoder.gencad.train_gencad ... --data_root GenCAD3D_SynthBal/
```

**Contrastive**

```bash
python -m contrastive.train_contrastive_model -encoder_type pc -name pcn_contrastive_model \
  -num_workers 24 -use_normals --autoencoder_model_name Autoencoder_SynthBal_1MFT -dataset GenCAD3D
```

**Diffusion**

```bash
python -m diffusion.generate_diffusion_embeddings ...
python -m diffusion.train_cond_diffusion ...
```

## SynthBal 复现（可选）

```bash
python -m autoencoder.synthbal.generate_augmented_dataset -name GenCAD3D_SynthBal --input_dataset GenCAD3D
python -m autoencoder.synthbal.combine_augmented_dataset -name GenCAD3D_SynthBal
python -m autoencoder.synthbal.create_synthetic_splits -name GenCAD3D_SynthBal --input_dataset GenCAD3D
```
