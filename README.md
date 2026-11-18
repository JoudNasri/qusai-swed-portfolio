# Qusai Swed — Portfolio (React + Vite)

## Run locally
```bash
npm install
npm run dev        # http://localhost:5173
```

## Build
```bash
npm run build      # output in /dist
```

## Edit content
Everything (texts, contacts, projects, services) is in **`src/data/site.js`**.
- Contact details: `site.email`, `site.phone`, `site.whatsapp`, `site.instagram`, `site.linkedin`
- Add a project: put `name-1-lg.webp` + `name-1-sm.webp` in `public/images/`, then add an entry to `projects`
- Career Overview: fill `about.experience` and the section appears automatically on the About page

## Deploy
- **Vercel**: import the repo, framework = Vite. `vercel.json` already handles page routes.
- **Hostinger**: upload the contents of `/dist` to `public_html`. `.htaccess` is included for page routes.
- **Sub-folder / no rewrites**: `VITE_BASE=./ VITE_HASH_ROUTER=1 npm run build`

## Colours (src/index.css → :root)
Blood `--blood-*` (≈60%) · Ivory `--ivory` (≈30%) · Gold `--gold-*` (≈10%, accents only)
