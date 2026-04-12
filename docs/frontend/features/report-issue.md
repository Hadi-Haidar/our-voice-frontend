# Report Issue Feature

## Purpose
Allows authenticated citizens to report a new civic issue. Collects all required information including title, description, category, location text, optional map coordinates, media, and anonymity preference.

---

## Pages / Files

| File | Route | Description |
|---|---|---|
| `src/pages/ReportIssue.jsx` | `/report-issue` | Main report form |
| `src/components/IssueMap.jsx` | — | Interactive map for location picking |
| `src/services/issueService.js` | — | `createIssue()`, `uploadMedia()` |

---

## Flow

```
1. User navigates to /report-issue
2. Auth check → redirect to /login if not authenticated
3. Categories fetched from GET /api/issues/categories
4. User fills the form:
   a. Title (required)
   b. Description (required)
   c. Category (required, dropdown)
   d. Location text (required, typed input)
   e. Map pin (optional — click map to select lat/lng)
   f. Image/Video upload (optional)
   g. Anonymous toggle (optional)
5. On submit:
   a. If media file selected → POST /api/issues/upload-media → get URL
   b. POST /api/issues with all data
6. On success → navigate to /issues/:newId
```

---

## Form Fields

| Field | Type | Required | Notes |
|---|---|---|---|
| `title` | text input | ✅ | Short issue title |
| `description` | textarea | ✅ | Detailed description |
| `category_id` | dropdown | ✅ | Fetched from API |
| `location_text` | text input | ✅ | User-typed location (e.g., "Beirut, Hamra") |
| `lat` | number | ❌ | Set by map click |
| `lng` | number | ❌ | Set by map click |
| `image_url` | file upload | ❌ | Image pre-uploaded, URL sent |
| `video_url` | text / file | ❌ | Video URL or pre-uploaded |
| `is_anonymous` | toggle | ❌ | Default: false |

---

## Media Upload Strategy

1. User selects an image file
2. Frontend calls `issueService.uploadMedia(file)` → `POST /api/issues/upload-media`
3. Backend uploads to Supabase Storage, returns public URL
4. URL stored in form state as `image_url`
5. URL is included in the final `POST /api/issues` payload

This separates the upload from the issue creation for reliability.

---

## Map Integration

The `IssueMap` component in interactive mode:
- Shows a map centered on Lebanon
- On click → sets `lat` and `lng` in form state
- Shows a draggable marker at the selected position

```jsx
<IssueMap
    interactive
    onLocationSelect={(lat, lng) => {
        setFormData((prev) => ({ ...prev, lat, lng }));
    }}
/>
```

---

## Anonymous Posting

A toggle switch sets `is_anonymous: true` in the payload. The backend will replace the author name with `"Anonymous"` in all public responses.

---

## API Calls Used

| Method | Endpoint | Description |
|---|---|---|
| GET | `/issues/categories` | Populate category dropdown |
| POST | `/issues/upload-media` | Upload image/video first |
| POST | `/issues` | Submit the issue |

---

## Dependencies Used
- `axios` (via `issueService`) — API calls
- `react-router-dom` — redirect after success
- `leaflet` / `react-leaflet` — map picker
- `AuthContext` — auth guard check

---

## Notes
- Page is **protected** — unauthenticated users are redirected to `/login`
- Media upload has a 30-second timeout (set in `apiClient` for that specific call)
- The form is submitted as JSON (not multipart) after the media is pre-uploaded
