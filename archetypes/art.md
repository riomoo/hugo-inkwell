---
title: "{{ replace .File.ContentBaseName "-" " " | title }}"
date: {{ .Date }}
weight: 10
artist: ""
description: ""
tags: []

# --- Media: use ONE of the three below ---

# A local file in /static (or a page bundle), any format the browser
# supports: jxl, avif, webp, jpg, jpeg, png, gif.
image: ""

# A local video file: mp4, mov, webm, mkv, m4v.
video: ""

# A link to art hosted elsewhere. If the URL points straight at an
# image/video file it's embedded directly on the page; otherwise
# (a gallery page, a social post, etc.) it's shown as a "View on
# <site> ↗" link-out instead.
externalURL: ""

# Optional: overrides the grid thumbnail, and doubles as the video
# poster frame or the link-out preview image.
thumbnail: ""

# Optional: extra images shown below the main piece.
# gallery:
#   - src: "images/art/piece-sketch.png"
#     alt: "Early sketch"
---

Notes about this piece go here.
