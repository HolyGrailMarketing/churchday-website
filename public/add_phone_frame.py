"""
add_phone_frame.py
------------------
Wraps each input screenshot in a realistic iPhone-style phone frame
and saves the result to an output folder.

Usage:
    python add_phone_frame.py <image1> <image2> ...   # specific files
    python add_phone_frame.py                          # process all PNGs/JPGs in current dir
"""

import sys
import os
from pathlib import Path
from PIL import Image, ImageDraw, ImageFilter

# ── tunables ──────────────────────────────────────────────────────────────────
FRAME_COLOR   = (20, 20, 22)          # near-black bezel
FRAME_COLOR2  = (40, 40, 44)          # slightly lighter for depth
SCREEN_RADIUS = 50                    # corner radius of the screen area
BEZEL_TOP     = 110                   # space above screen (notch area)
BEZEL_BOTTOM  = 90                    # space below screen (home indicator)
BEZEL_SIDE    = 22                    # left/right bezel width
BUTTON_COLOR  = (35, 35, 38)         # side button colour
OUTPUT_DIR    = Path("framed")        # output folder name

def rounded_rectangle_mask(size, radius):
    """Return an RGBA mask image with a rounded-rectangle white area."""
    w, h = size
    mask = Image.new("L", (w, h), 0)
    d    = ImageDraw.Draw(mask)
    d.rounded_rectangle([(0, 0), (w - 1, h - 1)], radius=radius, fill=255)
    return mask

def add_phone_frame(screenshot_path: Path, output_dir: Path) -> Path:
    """Wrap *screenshot_path* in a phone frame and save to *output_dir*."""
    screen = Image.open(screenshot_path).convert("RGBA")
    sw, sh = screen.size                    # screen width / height

    # ── canvas size ───────────────────────────────────────────────────────────
    fw = sw + BEZEL_SIDE * 2               # frame width
    fh = sh + BEZEL_TOP + BEZEL_BOTTOM     # frame height
    OUTER_RADIUS = SCREEN_RADIUS + BEZEL_SIDE

    # ── draw frame body ───────────────────────────────────────────────────────
    frame = Image.new("RGBA", (fw, fh), (0, 0, 0, 0))
    d = ImageDraw.Draw(frame)

    # outer body with rounded corners
    d.rounded_rectangle(
        [(0, 0), (fw - 1, fh - 1)],
        radius=OUTER_RADIUS,
        fill=FRAME_COLOR,
    )

    # subtle inner highlight for depth (1-px lighter ring)
    d.rounded_rectangle(
        [(2, 2), (fw - 3, fh - 3)],
        radius=OUTER_RADIUS - 2,
        fill=FRAME_COLOR2,
        outline=None,
    )
    # re-draw the main body inside to preserve depth illusion
    d.rounded_rectangle(
        [(4, 4), (fw - 5, fh - 5)],
        radius=OUTER_RADIUS - 4,
        fill=FRAME_COLOR,
    )

    # ── side buttons ──────────────────────────────────────────────────────────
    btn_x = fw - 3
    # power button
    d.rounded_rectangle([(btn_x, fh // 4), (fw + 4, fh // 4 + 80)],
                        radius=3, fill=BUTTON_COLOR)
    # volume buttons (left side)
    d.rounded_rectangle([(-4, fh // 4), (2, fh // 4 + 55)],
                        radius=3, fill=BUTTON_COLOR)
    d.rounded_rectangle([(-4, fh // 4 + 70), (2, fh // 4 + 125)],
                        radius=3, fill=BUTTON_COLOR)
    # mute toggle
    d.rounded_rectangle([(-4, fh // 4 - 50), (2, fh // 4 - 10)],
                        radius=3, fill=BUTTON_COLOR)

    # ── dynamic island / notch ────────────────────────────────────────────────
    island_w, island_h = 120, 34
    island_x = (fw - island_w) // 2
    island_y = 18
    d.rounded_rectangle(
        [(island_x, island_y), (island_x + island_w, island_y + island_h)],
        radius=17,
        fill=(10, 10, 10),
    )

    # ── home indicator ────────────────────────────────────────────────────────
    ind_w = 120
    ind_h = 5
    ind_x = (fw - ind_w) // 2
    ind_y = fh - 20
    d.rounded_rectangle(
        [(ind_x, ind_y), (ind_x + ind_w, ind_y + ind_h)],
        radius=3,
        fill=(80, 80, 85),
    )

    # ── paste screenshot with rounded corners ─────────────────────────────────
    screen_mask = rounded_rectangle_mask((sw, sh), SCREEN_RADIUS)
    screen_rgba = screen.copy()
    screen_rgba.putalpha(screen_mask)

    frame.paste(screen_rgba, (BEZEL_SIDE, BEZEL_TOP), screen_rgba)

    # ── add a subtle glass reflection ─────────────────────────────────────────
    glare = Image.new("RGBA", (fw, fh), (0, 0, 0, 0))
    gd    = ImageDraw.Draw(glare)
    gd.rounded_rectangle(
        [(BEZEL_SIDE, BEZEL_TOP),
         (BEZEL_SIDE + sw, BEZEL_TOP + sh)],
        radius=SCREEN_RADIUS,
        fill=(255, 255, 255, 12),
    )
    # gradient-like: lighter at top-left corner
    for i in range(60):
        alpha = int(18 * (1 - i / 60))
        gd.line(
            [(BEZEL_SIDE + i, BEZEL_TOP),
             (BEZEL_SIDE, BEZEL_TOP + i)],
            fill=(255, 255, 255, alpha),
        )
    frame = Image.alpha_composite(frame, glare)

    # ── outer phone rounded mask (clip the buttons that extend outside) ────────
    phone_mask = rounded_rectangle_mask((fw, fh), OUTER_RADIUS)
    # keep buttons visible by NOT masking their area fully
    frame_final = Image.new("RGBA", (fw, fh), (0, 0, 0, 0))
    frame_final.paste(frame, mask=phone_mask)

    # ── save ──────────────────────────────────────────────────────────────────
    output_dir.mkdir(parents=True, exist_ok=True)
    out_name = screenshot_path.stem + "_framed.png"
    out_path = output_dir / out_name
    frame_final.save(out_path, "PNG")
    print(f"  ✓ {out_path}")
    return out_path


def main():
    if len(sys.argv) > 1:
        paths = [Path(p) for p in sys.argv[1:]]
    else:
        # default: all images in the current directory
        cwd   = Path(".")
        paths = list(cwd.glob("*.png")) + list(cwd.glob("*.jpg")) + list(cwd.glob("*.jpeg"))
        paths = [p for p in paths if "_framed" not in p.stem]

    if not paths:
        print("No images found. Pass image paths as arguments or run in a folder with PNG/JPG files.")
        sys.exit(1)

    print(f"Processing {len(paths)} image(s)…")
    for p in paths:
        if not p.exists():
            print(f"  ✗ {p} not found, skipping.")
            continue
        add_phone_frame(p, OUTPUT_DIR)

    print(f"\nDone! Framed images are in the '{OUTPUT_DIR}' folder.")


if __name__ == "__main__":
    main()
