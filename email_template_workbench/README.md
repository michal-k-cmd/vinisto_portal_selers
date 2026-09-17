# email_template_workbench

Internal development tool for previewing and composing HTML email templates used by the Vinisto backend.

The app provides a small React frontend and a Node/Express backend that:

- lists available `.template` email files,
- composes them with a shared `Layout.template` and partials (Header/Footer/…),
- replaces placeholder tags from a JSON config,
- hot‑reloads the preview when any template or config file changes.

---

## Tech stack

- React 18.2
- TypeScript
- Vite (dev server, frontend tooling)
- pnpm
- Node.js 22.x
- Express
- chokidar (file watching)
- Server‑Sent Events (SSE) for live reload

---

## Directory structure

Within the main repository:

