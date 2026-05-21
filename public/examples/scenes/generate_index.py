from pathlib import Path
import json
import re

_HERE = Path(__file__).parent
_MESH_FILE_RE = re.compile(r'<mesh\b[^>]*\bfile="([^"]+)"', re.IGNORECASE)
_MESHDIR_RE = re.compile(r'<compiler\b[^>]*\bmeshdir="([^"]*)"', re.IGNORECASE)


def _mesh_assets_for_xml(xml_path: Path) -> list[str]:
    text = xml_path.read_text(encoding="utf-8")
    meshdir_match = _MESHDIR_RE.search(text)
    meshdir = meshdir_match.group(1) if meshdir_match else ""
    meshdir_path = Path(meshdir) if meshdir else Path(".")
    assets: list[str] = []
    for mesh_file in _MESH_FILE_RE.findall(text):
        asset_path = (xml_path.parent / meshdir_path / mesh_file).resolve()
        try:
            relative = asset_path.relative_to(_HERE.resolve())
        except ValueError:
            continue
        if asset_path.is_file():
            assets.append(str(relative).replace("\\", "/"))
    return assets


if __name__ == "__main__":
    files_to_download: set[str] = set()
    for xml_path in sorted(_HERE.rglob("*.xml")):
        relative_xml = xml_path.relative_to(_HERE)
        files_to_download.add(str(relative_xml).replace("\\", "/"))
        files_to_download.update(_mesh_assets_for_xml(xml_path))

    index_path = _HERE / "files.json"
    with open(index_path, mode="w", encoding="utf-8") as f:
        json.dump(sorted(files_to_download), f, indent=2)
        f.write("\n")
