# Components Reference

A reference guide for all reusable components in `src/components/`.

---

## Navbar
**File:** `src/components/Navbar.jsx`

Top navigation bar visible on all main app routes.

**Features:**
- Logo and brand name ("Our Voice")
- Navigation links (desktop)
- Language switcher (EN/AR)
- Dark/light mode toggle
- Login/Signup buttons (if not authenticated)
- Profile dropdown (if authenticated)
- Hamburger menu trigger for mobile sidebar
- Scroll-based transparency behavior

---

## Sidebar
**File:** `src/components/Sidebar.jsx`

Mobile slide-out navigation menu accessible via hamburger button.

**Features:**
- All navigation links
- Dark/light mode toggle
- Login/Signup or Logout (based on auth state)
- Category quick links

---

## Footer
**File:** `src/components/Footer.jsx`

Simple page footer. Displays copyright and branding.

---

## CategoryIcon
**File:** `src/components/CategoryIcon.jsx`

Maps a category name string to its corresponding Radix UI icon component.

**Props:**
- `name` — the category `name_en` string (e.g., `"Electricity"`)
- `className` — optional CSS classes

**Example:**
```jsx
<CategoryIcon name="Electricity" className="w-5 h-5 text-yellow-500" />
```

**Icon Map:**
| Category | Icon |
|---|---|
| Infrastructure | `HammerIcon` |
| Waste Management | `TrashIcon` |
| Electricity | `LightningBoltIcon` |
| Traffic | `ExclamationTriangleIcon` |
| Environment | `LeafIcon` |
| Health | `PlusCircledIcon` |

---

## IssueMap
**File:** `src/components/IssueMap.jsx`

A Leaflet map wrapper. Used both for selecting a location (ReportIssue) and displaying a pinned location (IssueDetails).

**Props:**
- `lat` — latitude number
- `lng` — longitude number
- `interactive` — boolean, enables click-to-select behavior
- `onLocationSelect(lat, lng)` — callback when user clicks map (if interactive)

**Example:**
```jsx
// Display mode
<IssueMap lat={33.8938} lng={35.5018} />

// Selection mode
<IssueMap interactive onLocationSelect={(lat, lng) => setCoords({ lat, lng })} />
```

---

## CustomSelect
**File:** `src/components/CustomSelect.jsx`

A styled dropdown select component. Used for category and status filters.

**Props:**
- `options` — array of `{ value, label }` objects
- `value` — current selected value
- `onChange(value)` — callback
- `placeholder` — optional placeholder text

---

## ConfirmModal
**File:** `src/components/ConfirmModal.jsx`

A reusable confirmation dialog. Triggered via `ConfirmContext`.

**Rendered by:** `ConfirmContext` (not used directly in components — use `useConfirm()` instead).

**Example usage:**
```jsx
const { confirm } = useConfirm();
confirm({
    title: 'Delete Issue',
    message: 'This action cannot be undone.',
    onConfirm: () => handleDelete()
});
```

---

## LanguageSwitcher
**File:** `src/components/LanguageSwitcher.jsx`

Toggles between English and Arabic UI. Sets `dir="rtl"` on the document for Arabic.

**Usage:** Embedded inside `Navbar` and `Sidebar`.

---

## ProfileDropdown
**File:** `src/components/ProfileDropdown.jsx`

User avatar button that opens a dropdown with:
- My Profile link
- Settings link
- Logout button

**Usage:** Rendered in `Navbar` when `isAuthenticated === true`.

---

## NotificationBadge
**File:** `src/components/NotificationBadge.jsx`

A small count badge displayed on top of an icon (e.g., notifications bell).

**Props:**
- `count` — number to display

---

## PageHeader
**File:** `src/components/PageHeader.jsx`

Simple section heading component used at the top of inner pages.

**Props:**
- `title` — heading text
- `subtitle` — optional subtext

---

## Toast
**File:** `src/components/Toast.jsx`

In-app notification message (success, error, info). Appears temporarily after an action.

---

## Landing Section Components (`src/components/landing/`)

Sub-components that build the Landing page, each is a self-contained section:

| Component | Section |
|---|---|
| `HeroSection.jsx` | Swiper carousel hero with CTA buttons |
| `ProblemsSection.jsx` | "Everyday issues go unheard" grid |
| `HowItWorksSection.jsx` | 4-step platform flow |
| `StatsSection.jsx` | Live platform stats (reported, votes, citizens, resolved) |
| `TrustSection.jsx` | "Built on trust and transparency" feature cards |
| `CTASection.jsx` | Final call-to-action section |
