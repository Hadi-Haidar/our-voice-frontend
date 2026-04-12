# Frontend Setup

## Prerequisites

- Node.js v18 or later
- npm v9 or later
- The backend server running (locally or deployed)

---

## Step 1 — Clone and Install

```bash
git clone <frontend-repo-url>
cd our-voice
npm install
```

---

## Step 2 — Configure Environment Variables

Create a `.env` file in the root:

```bash
VITE_API_BASE_URL=http://localhost:5000/api
```

For production, set this to the deployed backend URL:

```bash
VITE_API_BASE_URL=https://your-backend.vercel.app/api
```

---

## Step 3 — Run the Dev Server

```bash
npm run dev
```

The app starts at `http://localhost:5173`.

---

## Step 4 — Build for Production

```bash
npm run build
```

Output goes to the `dist/` folder.

---

## Vercel Deployment

The `vercel.json` handles client-side routing:

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/" }]
}
```

Set the environment variable `VITE_API_BASE_URL` in the Vercel dashboard under Settings → Environment Variables.

> **Note:** Vite environment variables must be prefixed with `VITE_` to be available in the browser.

---

## Common Issues

| Problem | Solution |
|---|---|
| API requests fail with CORS error | Make sure `FRONTEND_URL` in the backend `.env` matches `http://localhost:5173` |
| Map doesn't load | Make sure Leaflet CSS is imported in the component or `main.jsx` |
| Page reloads give 404 on Vercel | Make sure `vercel.json` rewrites are configured |
