# Benjamine Franklin C — Portfolio Website

A multi-page personal portfolio built with plain HTML, CSS, and JavaScript — no build tools, no frameworks, no dependencies to install. Just open it or host it as-is.

## What's inside

```
portfolio-website/
├── index.html         ← Home
├── about.html
├── skills.html
├── experience.html
├── projects.html
├── education.html
├── contact.html
├── 404.html            ← shown automatically for broken links on GitHub Pages
├── css/
│   └── style.css        ← one shared stylesheet (light + dark theme)
├── js/
│   └── script.js        ← nav, theme toggle, animations, contact form
└── README.md
```

Features: dark/light mode toggle (remembers your choice), mobile-friendly nav with an overlay menu, scroll-reveal animations, a scroll progress bar, a back-to-top button, and a contact form that opens the visitor's email app addressed to you.

## Hosting on GitHub Pages (step by step)

**The #1 mistake people make:** uploading the *outer folder* instead of its *contents*, so `index.html` ends up nested one level too deep (e.g. `portfolio-website/index.html` instead of just `index.html` at the repo root). GitHub Pages only looks for `index.html` at the top level of the repo — so follow these steps exactly.

### 1. Create the repository
- Go to [github.com/new](https://github.com/new)
- Name it anything, e.g. `portfolio-website` — or name it `yourusername.github.io` if you want it as your main profile site
- Keep it **Public**
- Do **not** check "Add a README" (this project already has one)
- Click **Create repository**

### 2. Upload the files correctly
On the empty repo page, click **"uploading an existing file"**.

Then, on your computer:
1. Unzip the project if it's zipped
2. Open the unzipped `portfolio-website` folder so you can see its *contents* — `index.html`, `about.html`, `css/`, `js/`, etc.
3. Select **all of those files and folders** (not the outer folder itself) and drag them into the GitHub upload box

Check the file list on GitHub afterward — it should look exactly like the tree above, with `index.html` sitting directly in the root, not inside another folder.

Scroll down and click **Commit changes**.

### 3. Turn on GitHub Pages
- Go to **Settings** → **Pages** (left sidebar)
- Under "Build and deployment" → Source: choose **Deploy from a branch**
- Branch: `main`, folder: **`/ (root)`** → **Save**
- Wait 1–2 minutes, refresh the page — a green box will show your live URL

### 4. Your live URL
```
https://yourusername.github.io/portfolio-website/
```
(If your repo is named `yourusername.github.io`, it's just `https://yourusername.github.io/` with no extra path.)

Always click the link from Settings → Pages rather than typing it — it's easy to get the repo name or trailing slash wrong.

## Updating the site later

Any time you edit a file and want the live site to update:
1. On GitHub, open the file → click the pencil (edit) icon
2. Make your change → **Commit changes**
3. Give it about a minute, then refresh the live site

Or, if you're comfortable with git locally:
```bash
git add .
git commit -m "Update site"
git push
```

## Editing content

- **Text content** — each page's content lives directly in its `.html` file, in plain readable markup
- **Colors / fonts / spacing** — all defined once in `css/style.css` using CSS variables at the top (`:root` for light mode, `[data-theme="dark"]` for dark mode)
- **Behavior** (nav, theme toggle, animations, form) — `js/script.js`, shared by every page
