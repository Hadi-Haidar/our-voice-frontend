# Styling Guide

## Overview
The frontend uses **TailwindCSS** for all styling. This guide documents the design system: colors, fonts, spacing, and reusable component patterns.

---

## Fonts

The project uses system-default or standard web fonts. Typography is handled through Tailwind's built-in font utilities.

| Usage | Class |
|---|---|
| Headings | `font-bold` |
| Subheadings | `font-semibold` |
| Body text | `font-normal` |
| Small/muted text | `font-medium text-sm` |

---

## Color Palette

The UI supports both **light** and **dark** modes via `ThemeContext`. Colors are applied conditionally based on the active theme.

### Primary Colors

| Purpose | Light Mode | Dark Mode |
|---|---|---|
| Primary action (buttons, links) | `blue-600` | `blue-500` |
| Primary hover | `blue-700` | `blue-400` |
| Background page | `gray-50` or `white` | `gray-900` |
| Background card | `white` | `gray-800` |
| Border | `gray-200` | `gray-700` |
| Text primary | `gray-900` | `gray-100` |
| Text secondary/muted | `gray-500` | `gray-400` |

### Status Badge Colors

| Status | Color |
|---|---|
| `pending` | Yellow — `bg-yellow-100 text-yellow-800` |
| `in_progress` | Blue — `bg-blue-100 text-blue-800` |
| `solved` | Green — `bg-green-100 text-green-800` |

### Category Colors
Category icons use contextual colors:
- Electricity → Yellow (`text-yellow-500`)
- Infrastructure → Orange (`text-orange-500`)
- Waste → Green (`text-green-600`)
- Traffic → Red (`text-red-500`)
- Environment → Emerald (`text-emerald-500`)
- Health → Blue (`text-blue-500`)

---

## Spacing

The project follows Tailwind's default spacing scale. Common conventions:

| Usage | Tailwind Class |
|---|---|
| Page horizontal padding | `px-4 sm:px-6 lg:px-8` |
| Section vertical padding | `py-12 md:py-20` |
| Card padding | `p-4` or `p-6` |
| Button padding | `px-4 py-2` |
| Gap between items | `gap-4` or `gap-6` |

---

## Responsive Breakpoints

Following Tailwind's default breakpoint system:

| Prefix | Min Width | Target |
|---|---|---|
| *(none)* | 0px | Mobile first |
| `sm:` | 640px | Large phones |
| `md:` | 768px | Tablets |
| `lg:` | 1024px | Laptop |
| `xl:` | 1280px | Desktop |

---

## Common Component Styles

### Primary Button
Used for main actions (submit, continue, login).
```jsx
<button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium">
    Submit
</button>
```

### Outline Button
Used for secondary actions (cancel, back).
```jsx
<button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors">
    Cancel
</button>
```

### Text Input
```jsx
<input
    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800"
/>
```

### Card
```jsx
<div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
    {/* content */}
</div>
```

### Status Badge
```jsx
// pending
<span className="px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
    Pending
</span>

// in_progress
<span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
    In Progress
</span>

// solved
<span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
    Solved
</span>
```

---

## Dark Mode

Dark mode is controlled by `ThemeContext`. The `dark` class is toggled on the root `<html>` element, and Tailwind's `dark:` prefix classes handle the styling.

```jsx
// ThemeContext toggles:
document.documentElement.classList.toggle('dark');

// In components:
<div className="bg-white dark:bg-gray-900">
```

---

## Animations

Framer Motion is used for animations. Common patterns:

### Fade In
```jsx
<motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.4 }}
>
```

### Slide Up (cards, sections)
```jsx
<motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
>
```

### Scale on Hover (interactive elements)
```jsx
<motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
```

---

## RTL Support

Arabic language enables RTL layout. This is applied by setting `dir="rtl"` on the document root.

- Text alignment flips automatically
- Flex row direction adapts with `rtl:flex-row-reverse` where needed
- Padding/margin direction classes use `ltr:` / `rtl:` variants where needed
