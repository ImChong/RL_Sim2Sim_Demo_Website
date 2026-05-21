# 原始摘录：GenCAD GitHub README

**来源**：https://github.com/ferdous-alam/GenCAD（`readme.md` on `main`）  
**收录日期**：2026-05-21

---

## 项目标题

Image-conditioned Computer-Aided Design Generation with Transformer-based Contrastive Representation and Diffusion Priors

## 链接

- Paper (TMLR 2025): https://openreview.net/pdf?id=e817c1wEZ6
- arXiv: https://arxiv.org/abs/2409.16294
- Project: https://gencad.github.io/

## 数据与权重

- **Dataset**：Google Drive → 放入 `data/`
- **Pretrained Models**：Google Drive → 放入 `data/ckpt/`

## 环境

- **Docker（推荐）**：`docker build -t gencad:latest .`，训练示例 `docker run -it gencad:latest conda run -n gencad_env python train_gencad.py csr -name test -gpu 0`
- **Manual**：conda `gencad_env` python=3.10，`pythonocc-core=7.9.0`，`pip install -r requirements.txt`

## 训练命令

```bash
# CSR Model
python train_gencad.py csr -name test -gpu 0

# CCIP Model
python train_gencad.py ccip -name test -gpu 0 -cad_ckpt "model/ckpt/ae_ckpt_epoch1000.pth"

# Diffusion Prior
python train_gencad.py dp -name test -gpu 0 -cad_emb 'data/embeddings/cad_embeddings.h5' -img_emb 'data/embeddings/sketch_embeddings.h5'
```

## 推理

```bash
xvfb-run python inference_gencad.py
```

无头可视化需挂载 `data/images`、`assets`、`results` 并使用 `xvfb-run`。

## 其他

- STL→PNG：`python stl2img.py -src ... -dst ...`
- Evaluation：README 标注 "Coming soon"
