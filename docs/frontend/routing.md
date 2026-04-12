# Routing

## Overview

Routing is handled by **React Router v7** (`react-router-dom`) using the `<Routes>` and `<Route>` API defined in `src/App.jsx`.

The app has two layout tiers:
1. **Auth routes** — no layout (full-screen login/signup pages)
2. **Main app routes** — wrapped in `RootLayout` (navbar + sidebar + footer)

---

## Route Tree

```
/login             → Login.jsx           (no layout)
/signup            → Signup.jsx          (no layout)
/reset-password    → ForgotPassword.jsx  (no layout)

/ (RootLayout)
├── /                → Landing.jsx
├── /issues          → Issues.jsx
├── /issues/:id      → IssueDetails.jsx
├── /issues/:id/edit → EditIssue.jsx
├── /report-issue    → ReportIssue.jsx
├── /polls           → Polls.jsx          (placeholder)
├── /announcements   → Announcements.jsx  (placeholder)
├── /chat            → CommunityChat.jsx  (placeholder)
├── /district-chat   → DistrictChat.jsx   (placeholder)
├── /help            → HelpCenter.jsx     (placeholder)
├── /donate          → Donate.jsx         (placeholder)
├── /about           → About.jsx
└── /*               → NotFound.jsx
```

---

## RootLayout

`src/layouts/RootLayout.jsx` is the shared layout shell for all main routes. It renders:
- `<Navbar />` — top navigation bar
- `<Sidebar />` — slide-out mobile menu
- `<Outlet />` — the active page content
- `<Footer />` — bottom footer

---

## Navigation

### Programmatic Navigation
```jsx
import { useNavigate } from 'react-router-dom';
const navigate = useNavigate();
navigate('/issues');
navigate(`/issues/${id}`);
navigate(-1); // go back
```

### URL Parameters
```jsx
import { useParams } from 'react-router-dom';
const { id } = useParams(); // from /issues/:id
```

### Links
```jsx
import { Link } from 'react-router-dom';
<Link to="/report-issue">Report an Issue</Link>
```

---

## Route Protection

There is currently **no route-level guard** component (no `ProtectedRoute` wrapper). Instead, individual pages check auth state and redirect if needed:

```jsx
const { isAuthenticated } = useAuth();

useEffect(() => {
    if (!isAuthenticated) {
        navigate('/login');
    }
}, [isAuthenticated]);
```

Pages that require auth: `ReportIssue`, `EditIssue` (and IssueDetails for upvoting/commenting interactions).

---

## Notes

- Auth pages (`/login`, `/signup`, `/reset-password`) intentionally use no layout to provide a fullscreen, focused experience
- The `*` wildcard route renders `NotFound.jsx` for any undefined URL
- `vercel.json` rewrites all paths to `index.html` to support client-side routing on Vercel
