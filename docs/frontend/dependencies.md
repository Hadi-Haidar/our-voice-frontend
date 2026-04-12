# Frontend Dependencies

All packages used in the frontend. What they do, where they are used, and how.

---

## react
### Purpose
The core UI library. All components are built as React functional components with hooks.

### Where it is used
Every `.jsx` file in the project.

---

## react-dom
### Purpose
The DOM renderer for React. Renders the root React tree into the HTML `<div id="root">`.

### Where it is used
- `src/main.jsx` — `ReactDOM.createRoot().render()`

---

## react-router-dom
### Purpose
Client-side routing. Enables navigation between pages without full page reloads.

### Where it is used
- `src/App.jsx` — route tree definition
- `src/layouts/RootLayout.jsx` — `<Outlet />`
- All page components — `useNavigate()`, `useParams()`, `Link`

### Example
```jsx
// Route definition
<Route path="/issues/:id" element={<IssueDetails />} />

// Navigation
const navigate = useNavigate();
navigate('/issues');

// URL params
const { id } = useParams();
```

---

## axios
### Purpose
HTTP client for communicating with the backend REST API. Configured in a centralized `apiClient` instance with base URL and JWT auto-injection.

### Where it is used
- `src/services/apiClient.js` — base config and interceptor
- `src/services/authService.js`
- `src/services/issueService.js`
- `src/services/statsService.js`

### Example
```js
// Centralized instance
const apiClient = axios.create({
    baseURL: ENV.API_BASE_URL,
    timeout: 8000,
});

// Auto-inject token
apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

// Usage
const response = await apiClient.get('/issues', { params: { status: 'pending' } });
```

---

## framer-motion
### Purpose
Animation library for smooth, declarative animations on components.

### Where it is used
- Landing page sections (fade-in on scroll)
- Modals and overlays
- Hero section

### Example
```jsx
import { motion } from 'framer-motion';

<motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
>
    Content
</motion.div>
```

---

## leaflet + react-leaflet
### Purpose
Interactive maps. Used to display issue locations and to let users pick a precise location when reporting an issue.

### Where it is used
- `src/components/IssueMap.jsx` — reusable map component
- `src/pages/ReportIssue.jsx` — location picker
- `src/pages/IssueDetails.jsx` — location display

### Example
```jsx
import { MapContainer, TileLayer, Marker } from 'react-leaflet';

<MapContainer center={[33.8938, 35.5018]} zoom={13}>
    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
    <Marker position={[lat, lng]} />
</MapContainer>
```

---

## swiper
### Purpose
Touch-enabled carousel/slider. Used in the hero section of the landing page.

### Where it is used
- `src/components/landing/` — hero section carousel

### Example
```jsx
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';

<Swiper modules={[Autoplay, Pagination]} autoplay={{ delay: 4000 }}>
    <SwiperSlide>Slide 1</SwiperSlide>
    <SwiperSlide>Slide 2</SwiperSlide>
</Swiper>
```

---

## @radix-ui/react-icons
### Purpose
Icon set. Provides consistent, accessible SVG icons used across the entire UI (categories, actions, badges).

### Where it is used
- `src/components/CategoryIcon.jsx` — maps category names to icons
- Issue cards, sidebar, navbar, forms

### Example
```jsx
import { LightningBoltIcon, TrashIcon, HammerIcon } from '@radix-ui/react-icons';

<LightningBoltIcon className="w-5 h-5 text-yellow-500" />
```

---

## react-helmet-async
### Purpose
Manages the document `<head>` (title, meta tags) per page for SEO.

### Where it is used
- Major page components

### Example
```jsx
import { Helmet } from 'react-helmet-async';

<Helmet>
    <title>Issues — Our Voice 🇱🇧</title>
    <meta name="description" content="Browse civic issues reported by citizens in Lebanon." />
</Helmet>
```

---

## tailwindcss
### Purpose
Utility-first CSS framework. Used for all styling — layout, colors, typography, spacing, responsiveness.

### Where it is used
- Every JSX file (class names)
- `tailwind.config.js` — custom theme configuration

### Example
```jsx
<button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
    Report Issue
</button>
```
