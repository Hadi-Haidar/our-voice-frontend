# Issue Details Feature

## Purpose
Displays the full details of a single civic issue. Includes the description, media, map location, upvote button, comment section, and status management for the issue author.

---

## Pages / Files

| File | Route | Description |
|---|---|---|
| `src/pages/IssueDetails.jsx` | `/issues/:id` | Full issue view |
| `src/pages/EditIssue.jsx` | `/issues/:id/edit` | Edit form for issue author |
| `src/components/IssueMap.jsx` | — | Location display on map |
| `src/services/issueService.js` | — | All issue/comment/upvote API calls |

---

## Flow

```
1. Page mounts with :id from URL params
2. GET /api/issues/:id → full issue data with comments and upvotes
3. Render:
   - Title, category badge, status badge
   - Description
   - Image or video (if present)
   - Map (if lat/lng present)
   - Upvote button with count
   - Comment section
   - Author actions (if current user is the author)
```

---

## Upvote

- Shows current upvote count
- Button toggles between "Upvote" and "Upvoted" based on `has_upvoted`
- On click → `POST /api/issues/:id/upvote`
- UI updates immediately (optimistic or after response)
- Requires authentication — shows login prompt if not logged in

---

## Comments

### Viewing
- All comments fetched with the issue in `GET /api/issues/:id`
- Each comment shows: author name, text, date
- Own comments show Edit and Delete buttons

### Adding
```
1. User types in comment text input
2. On submit → POST /api/issues/:id/comments
3. New comment appended to list
4. Input field cleared
```

### Editing (own comments)
```
1. User clicks Edit on their comment
2. Comment text becomes an editable input
3. On save → PATCH /api/issues/:id/comments/:comment_id
4. Comment updated in list
```

### Deleting (own comments)
```
1. User clicks Delete
2. Confirm dialog shown (via ConfirmContext)
3. On confirm → DELETE /api/issues/:id/comments/:comment_id
4. Comment removed from list
```

---

## Issue Author Actions

If the current user is the issue author, they see additional controls:

| Action | Behavior |
|---|---|
| **Edit** | Navigate to `/issues/:id/edit` |
| **Delete** | Confirm dialog → DELETE issue → redirect to `/issues` |
| **Change Status** | Dropdown to select `pending`, `in_progress`, or `solved` → PATCH `/issues/:id/status` |

---

## Map Display

If the issue has `lat` and `lng` set:
```jsx
<IssueMap lat={issue.lat} lng={issue.lng} />
```

Shows a static (non-interactive) map with a marker pinned at the issue location.

---

## API Calls Used

| Method | Endpoint | Description |
|---|---|---|
| GET | `/issues/:id` | Fetch full issue |
| POST | `/issues/:id/upvote` | Toggle upvote |
| POST | `/issues/:id/comments` | Add comment |
| PATCH | `/issues/:id/comments/:cid` | Edit comment |
| DELETE | `/issues/:id/comments/:cid` | Delete comment |
| PATCH | `/issues/:id/status` | Change issue status |
| DELETE | `/issues/:id` | Delete the issue |

---

## Dependencies Used
- `axios` (via `issueService`) — all API calls
- `react-router-dom` — `useParams()`, `useNavigate()`
- `leaflet` / `react-leaflet` — map display
- `AuthContext` — check ownership and authentication
- `ConfirmContext` — delete confirmation dialogs

---

## Notes
- Author detection: `issue.author.id === user.id` (comparing IDs)
- Anonymous issues hide the author name — `author.id` is `null` in the response
- The full comment list is loaded with the initial issue request (no lazy loading)
