# Frontend Documentation

## Purpose
The frontend is a **Single Page Application (SPA)** built with React 19 and Vite. It provides the citizen-facing UI for browsing, reporting, and interacting with civic issues.

---

## Tech Stack

| Tool | Purpose |
|---|---|
| **React 19** | UI component library |
| **Vite** | Build tool and dev server |
| **TailwindCSS** | Utility-first CSS framework |
| **React Router v7** | Client-side routing |
| **Axios** | HTTP requests to the backend |
| **Framer Motion** | Animations and transitions |
| **Leaflet + React Leaflet** | Interactive map |
| **Swiper** | Hero section carousel |
| **Radix UI Icons** | Icon system |

---

## Folder Structure

```
our-voice/src/
├── App.jsx              # Route definitions
├── main.jsx             # App entry, providers setup
├── index.css            # Global base styles
├── assets/              # Static images and files
├── components/          # Reusable UI components
├── config/              # Environment config (env.js)
├── contexts/            # React Contexts (Auth, Theme, Confirm)
├── data/                # Mock/static data (statsMock.js)
├── hooks/               # Custom React hooks
├── i18n/                # Translations (translations.js)
├── layouts/             # Page layouts (RootLayout)
├── pages/               # Full page components
└── services/            # API communication layer
```

---

## How to Run

```bash
cd our-voice
npm install

# Create .env and set the backend URL
echo "VITE_API_BASE_URL=http://localhost:5000/api" > .env

npm run dev
# Runs on http://localhost:5173
```

---

## 📖 Detailed Docs

| Document | Description |
|---|---|
| [setup.md](./setup.md) | Local setup instructions |
| [folder-structure.md](./folder-structure.md) | Full directory explained |
| [styling-guide.md](./styling-guide.md) | Colors, fonts, spacing, components |
| [dependencies.md](./dependencies.md) | All packages with purpose and examples |
| [state-management.md](./state-management.md) | Contexts, auth state, theme |
| [routing.md](./routing.md) | All routes and navigation structure |
| [components.md](./components.md) | Reusable component reference |
| [features/authentication.md](./features/authentication.md) | Login, signup, OTP, password reset |
| [features/issues.md](./features/issues.md) | Issues list and browse |
| [features/report-issue.md](./features/report-issue.md) | Report issue form |
| [features/issue-details.md](./features/issue-details.md) | Issue detail page |
| [features/landing.md](./features/landing.md) | Landing page sections |
