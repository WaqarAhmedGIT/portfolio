"""Resize and compress portfolio boards for GitHub Pages."""
from pathlib import Path
from PIL import Image

SRC = Path(r"C:\Users\mmuthu\Downloads\Data Waqar 1")
DST = Path(r"c:\ENTOURAGE\PROJECTS\CASESTUDY\WAQAR\assets\images")
DST.mkdir(parents=True, exist_ok=True)

PAPER = (243, 238, 228)


def flatten(im: Image.Image) -> Image.Image:
    if im.mode in ("RGBA", "LA") or (im.mode == "P" and "transparency" in im.info):
        rgba = im.convert("RGBA")
        bg = Image.new("RGB", rgba.size, PAPER)
        bg.paste(rgba, mask=rgba.split()[-1])
        return bg
    return im.convert("RGB")


def save_jpeg(im: Image.Image, dest: Path, max_w: int, quality: int) -> None:
    im = flatten(im)
    w, h = im.size
    if w > max_w:
        nh = int(h * (max_w / w))
        im = im.resize((max_w, nh), Image.Resampling.LANCZOS)
    dest.parent.mkdir(parents=True, exist_ok=True)
    im.save(dest, "JPEG", quality=quality, optimize=True, progressive=True)
    print(f"  {dest.name:22} {w}x{h} -> {im.size[0]}x{im.size[1]}  {dest.stat().st_size // 1024} KB")


jobs = [
    (SRC / "Home" / "01.png", DST / "hero.jpg", 1800, 86),
    (SRC / "Home" / "02" / "My Creative Journey.PNG", DST / "journey.jpg", 1800, 84),
    (SRC / "Home" / "03" / "03.png", DST / "clients.jpg", 2000, 86),
]

work_dir = SRC / "Home" / "04"
for i in range(1, 18):
    src = work_dir / f"{i}.png"
    if not src.exists():
        src = work_dir / f"{i}.jpg"
    if not src.exists():
        raise SystemExit(f"Missing work file {i}")
    max_w = 2000 if i >= 9 else 1672
    jobs.append((src, DST / f"work-{i:02d}.jpg", max_w, 82))

print(f"Writing {len(jobs)} images to {DST}")
for src, dest, max_w, quality in jobs:
    with Image.open(src) as im:
        save_jpeg(im, dest, max_w, quality)
print("Done.")
