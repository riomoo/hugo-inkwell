# Inkwell: Hugo Theme for Serial Fiction

A dark-mode, book-reader-first Hugo theme built for writing long-form serial fiction with Volumes, Chapters, Characters, and Glossaries. Comfy to read, easy on the eyes, and fully mobile-friendly.

## License

[![Custom badge](https://git.jester-designs.com/riomoo/hugo-inkwell/media/branch/main/docs/images/svgs/PIL.svg)](LICENSE)

---

## Features

- Dark mode only: warm amber accents, low-contrast palette that doesn't tire the eyes
- Volume > Chapter structure: nested navigation with collapsible sidebar tree
- Per-volume glossaries: filter entries by volume, tag, or browse alphabetically
- Character pages: profile images, attribute tables, reference galleries, related characters
- Image format agnostic: place any browser-supported format (AVIF, JXL, WebP, PNG, JPG, GIF, etc.) in your static directory and it renders as-is
- Reading progress bar: thin amber bar at the very top of the viewport
- Word count & reading time: per-chapter metadata
- Drop cap: automatic on first paragraph of every chapter
- Lightbox: click any `figure` image or character gallery image to enlarge
- Shortcodes: `callout`, `spoiler`, `figure`, `scene-break`, `char`, `term`, `volume-glossary`
- Mobile-first: responsive layout with slide-in sidebar drawer on small screens
- Lora + Cinzel: serif body font paired with a classical display font for headings

---

## Installation

### As a Git Submodule (recommended)

```bash
cd your-hugo-site
git submodule add https://github.com/riomoo/hugo-inkwell themes/hugo-inkwell
```

Then in your `config.yaml`:
```yaml
theme: hugo-inkwell
```

### Manual

Download and extract the theme into `themes/hugo-inkwell/`.

---

## Quick Start

The recommended content structure is:

```
content/
├── _index.md               # Homepage (story tagline, description)
├── volumes/
│   ├── _index.md           # Volumes list page
│   ├── volume-one/
│   │   ├── _index.md       # Volume page (cover, description, chapter list)
│   │   ├── chapter-01.md
│   │   └── chapter-02.md
│   └── volume-two/
│       ├── _index.md
│       └── chapter-01.md
├── characters/
│   ├── _index.md
│   ├── sael.md
│   └── veth.md
└── glossary/
    ├── _index.md
    ├── aehr.md
    └── meridian.md
```

### Create a new chapter

```bash
hugo new volumes/volume-one/chapter-03.md --kind chapter
```

### Create a new character

```bash
hugo new characters/my-character.md --kind characters
```

### Create a glossary entry

```bash
hugo new glossary/my-term.md --kind glossary
```

---

## Configuration Reference

Copy `exampleSite/config.yaml` to your site root and customize:

```yaml
params:
  storyTitle: "My Story"
  storyTagline: "A tagline for the header"
  author: "Author Name"
  coverImage: "images/cover.avif"   # homepage hero cover

  showReadingProgress: true   # amber progress bar at top
  showWordCount: true
  showReadingTime: true
  showChapterNav: true        # prev/next at bottom of chapters
  showTableOfContents: true   # floating TOC for long chapters
  tocDepth: 3

  dateFormat: "January 2, 2006"
  footerText: "Custom footer text (markdown ok)"
```

---

## Front Matter Reference

### Volume (`volumes/volume-name/_index.md`)

```yaml
---
title: "Volume Title"
description: "Short description shown on the volumes page."
volumeNumber: "I"          # Roman numeral displayed as label
weight: 1                  # Sort order
status: "Complete"         # Optional badge: Complete, Ongoing, Hiatus
cover: "images/vol1.avif"  # Cover image
---
Optional prose shown above the chapter list.
```

### Chapter

```yaml
---
title: "Chapter Title"
subtitle: "Optional italic subtitle"
chapter: 1               # Number shown in metadata and sidebar
weight: 1                # Sort order within the volume
date: 2024-01-01
tags: ["tag1", "tag2"]
---
Chapter prose here.
```

### Character

```yaml
---
title: "Character Name"
description: "One-line description for the character grid."
role: "Protagonist"
group: "Faction Name"     # Groups characters on the list page
emoji: "🧭"               # Fallback if no image
image: "images/characters/name.avif"

aliases: ["Nickname", "Other Name"]

attributes:
  - key: "Age"
    value: "27"
  - key: "Affiliation"
    value: "None"

gallery:
  - src: "images/characters/name-ref.avif"
    alt: "Reference sheet"

appearances:
  - /volumes/volume-one

related:
  - other-character-slug

links:
  - label: "Art by Someone"
    url: "https://example.com"
---
Full biography in Markdown.
```

### Glossary Entry

```yaml
---
title: "Term Name"
description: "Short definition — shown in tooltips and the glossary list."
volume: "Volume One"      # For filtering on the glossary page
tags: ["place", "magic"]
---
Full expanded definition in Markdown.
```

> **Note:** The `description` field is the only source used for glossary tooltips and list previews. It is read directly from front matter and is never derived from page content. Always fill it in.

---

## Shortcodes

### `{{< callout >}}`

```
{{< callout type="note" title="Custom Title" >}}
Content here. Markdown is supported.
{{< /callout >}}
```

Types: `note` (blue), `warn` (amber), `danger` (rose), `lore` (purple)  
Title defaults to the type name if not set.

---

### `{{< spoiler >}}`

```
{{< spoiler >}}Hidden text revealed on click.{{< /spoiler >}}
```

---

### `{{< scene-break >}}`

```
{{< scene-break >}}
```

Renders a centered `∗ ∗ ∗` separator.

---

### `{{< figure >}}`

```
{{< figure src="images/map.avif" alt="The map of Aehr" caption="Veth's map of the Meridian, circa 1409." >}}
```

Renders an image with lightbox support and an optional caption. Place the image file in your site's `static/` directory and reference it by path. Any browser-supported format works.

---

### `{{< char >}}`

```
{{< char name="Veth" slug="veth" >}}
```

Renders an inline character link to `/characters/veth`. If no character page exists, renders styled plain text. The `slug` defaults to a URL-ified version of `name` if not set.

---

### `{{< term >}}`

```
{{< term term="Meridian" >}}
```

Renders an `<abbr>` with the term's front matter `description` as the tooltip. Links to `/glossary/meridian` if the page exists. You can override the tooltip text inline with `def="…"`.

---

### `{{< volume-glossary >}}`

```
{{< volume-glossary volume="Volume One" >}}
```

Embeds all glossary entries tagged with a given volume, sorted alphabetically. Use this in a volume's `_index.md` or a dedicated glossary sub-page.

---

## Images

Place image files in your site's `static/` directory and reference them by path in front matter or shortcodes:

```yaml
image: "images/characters/sael.avif"
```

```
{{< figure src="images/map.png" alt="A map" >}}
```

The theme renders images exactly as provided; it does not attempt to guess or generate alternate format variants. Use whichever format you prefer; all formats supported by modern browsers (AVIF, JXL, WebP, PNG, JPG, GIF, etc.) work without any extra configuration.

---

## Customization

### Custom CSS

```yaml
params:
  customCSS: "css/custom.css"
```

Place `static/css/custom.css` in your site root. Override any CSS variable:

```css
:root {
  --ink-accent: #7eb8d4;        /* swap amber for blue */
  --ink-reading-width: 65ch;    /* narrower reading column */
  --ink-bg: #0a0a10;            /* deeper background */
}
```

### Fonts

The theme loads Lora and Cinzel from Google Fonts. To use self-hosted fonts, override in your custom CSS:

```css
:root {
  --ink-reading-font: 'Your Body Font', serif;
  --ink-heading-font: 'Your Display Font', serif;
}
```

---

## Directory Structure

```
hugo-inkwell/
├── archetypes/
│   ├── chapter.md
│   ├── characters.md
│   ├── glossary.md
│   └── default.md
├── layouts/
│   ├── _default/
│   │   ├── baseof.html
│   │   ├── single.html
│   │   └── list.html
│   ├── characters/
│   │   ├── list.html
│   │   └── single.html
│   ├── glossary/
│   │   ├── list.html
│   │   └── single.html
│   ├── volumes/
│   │   ├── list.html
│   │   ├── single.html        ← volume index page
│   │   └── chapter.html       ← chapter reading view
│   ├── partials/
│   │   ├── head.html
│   │   ├── topbar.html
│   │   ├── sidebar.html
│   │   ├── footer.html
│   │   ├── lightbox.html
│   │   ├── image.html
│   │   ├── volume-card.html
│   │   └── character-card.html
│   ├── shortcodes/
│   │   ├── callout.html
│   │   ├── char.html
│   │   ├── figure.html
│   │   ├── scene-break.html
│   │   ├── spoiler.html
│   │   ├── term.html
│   │   └── volume-glossary.html
│   └── index.html
├── static/
│   ├── css/inkwell.css
│   └── js/inkwell.js
├── exampleSite/
│   ├── config.yaml
│   └── content/
│       ├── _index.md
│       ├── volumes/...
│       ├── characters/...
│       └── glossary/...
├── theme.toml
├── LICENSE
└── README.md
```

---

## Volume image size

Volume covers should be 400x600px (2:3 portrait ratio)

## Hosting with Nginx
 
Hugo builds a static site into the `public/` directory. Nginx just serves the files directly.
 
### 1. Build your site
 
```bash
hugo --minify
```
 
This outputs everything to `public/`. Copy or sync that directory to your server, e.g.:
 
```bash
rsync -avz --delete public/ user@yourserver:/var/www/yoursite/
```
 
### 2. Nginx configuration
 
```nginx
server {
    listen 8080;
    listen [::]:8080;
    server_name yoursite.com www.yoursite.com;
 
    root /var/www/yoursite;
    index index.html;
 
    # Clean URLs — Hugo generates index.html files in subdirectories,
    # so /volumes/volume-one/ resolves to /volumes/volume-one/index.html
    location / {
        try_files $uri $uri/ $uri.html =404;
    }
 
    # Custom 404 page (Hugo generates this if you have a layouts/404.html)
    error_page 404 /404.html;
    location = /404.html {
        internal;
    }
 
    # Cache static assets
    location ~* \.(css|js|woff2|woff|ttf)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
 
    # Cache images — adjust max-age to taste
    location ~* \.(avif|jxl|webp|png|jpg|jpeg|gif|ico|svg)$ {
        expires 6M;
        add_header Cache-Control "public";
    }
 
    # Gzip
    gzip on;
    gzip_types text/plain text/css application/javascript application/json image/svg+xml;
    gzip_min_length 1024;
}
```
 
### 3. Enable and reload
 
```bash
sudo ln -s /etc/nginx/sites-available/yoursite /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```
