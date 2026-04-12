# Issues List Feature

## Purpose
Allows citizens to browse all reported civic issues with filtering, searching, and category selection. This is the main discovery page of the platform.

---

## Pages / Files

| File | Route | Description |
|---|---|---|
| `src/pages/Issues.jsx` | `/issues` | Issues list with filters |
| `src/services/issueService.js` | — | API calls |
| `src/components/CategoryIcon.jsx` | — | Category icon display |
| `src/components/Sidebar.jsx` | — | Mobile navigation (includes quick links) |

---

## Flow

```
1. Page mounts → fetchIssues() called
2. GET /api/issues (with active filter params)
3. Issues rendered as cards
4. User changes filters → fetchIssues() called again with new params
5. User clicks a card → navigate to /issues/:id
```

---

## Filters

| Filter | Type | Description |
|---|---|---|
| `category_id` | select | Filter by issue category |
| `status` | select | Filter by status (`all`, `pending`, `in_progress`, `solved`) |
| `search` | text input | Search in title, description, location text |

All filters are passed as query parameters to `GET /api/issues`.

---

## Issue Card

Each issue in the list shows:
- Category icon + name
- Issue title
- Location text
- Status badge
- Upvote count
- Comment count
- Author name (or "Anonymous")
- Created date

---

## Status Badges

| Status | Display Color |
|---|---|
| `pending` | Yellow |
| `in_progress` | Blue |
| `solved` | Green |

---

## API Calls Used

| Method | Endpoint | Description |
|---|---|---|
| GET | `/issues` | Fetch all issues (with filters) |
| GET | `/issues/categories` | Fetch categories for filter dropdown |

---

## i18n Keys Used
```
issues.title
nav.issues
```

---

## Dependencies Used
- `axios` (via `issueService`) — API calls
- `react-router-dom` — navigation to issue detail
- `CategoryIcon` component

---

## Notes
- The `has_upvoted` field per issue is set by the backend (if the user is logged in — token decoded from header)
- No server-side pagination is currently implemented — all matching issues are returned
