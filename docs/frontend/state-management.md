# State Management

## Overview

The frontend uses **React Context API** for global state with no external state library (no Redux, Zustand, etc.).

There are 3 contexts:

| Context | File | Purpose |
|---|---|---|
| `AuthContext` | `src/contexts/AuthContext.jsx` | User authentication state |
| `ThemeContext` | `src/contexts/ThemeContext.jsx` | Light/dark mode |
| `ConfirmContext` | `src/contexts/ConfirmContext.jsx` | Global confirm modal |

All contexts are provided in `src/main.jsx` wrapping the entire app.

---

## AuthContext

### Purpose
Manages the logged-in user's state and exposes all auth functions to the component tree.

### State
```js
{
  user: null | UserObject,   // the logged-in user, null if logged out
  loading: boolean           // true while checking localStorage on mount
}
```

### Exposed Values
```js
{
  user,
  loading,
  isAuthenticated: !!user,   // boolean shorthand
  login(credentials),
  register(userData),
  verifyEmail(data),
  forgotPassword(email),
  resetPassword(data),
  logout()
}
```

### How Auth State Persists
On mount, the context checks `localStorage` for a saved `token` and `user` object:
```js
useEffect(() => {
    const token = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    if (token && savedUser) {
        setUser(JSON.parse(savedUser));
    }
    setLoading(false);
}, []);
```

On login, both are saved:
```js
localStorage.setItem('token', response.token);
localStorage.setItem('user', JSON.stringify(response.user));
```

On logout, both are removed:
```js
localStorage.removeItem('token');
localStorage.removeItem('user');
```

### Usage
```jsx
import { useAuth } from '../contexts/AuthContext';

const { user, isAuthenticated, logout } = useAuth();
```

---

## ThemeContext

### Purpose
Manages and persists the light/dark theme preference.

### State
```js
{
  theme: 'light' | 'dark'
}
```

### How it Works
Applies or removes the `dark` class on `document.documentElement` whenever the theme changes:
```js
document.documentElement.classList.toggle('dark', theme === 'dark');
```

### Usage
```jsx
import { useTheme } from '../contexts/ThemeContext';

const { theme, toggleTheme } = useTheme();
```

---

## ConfirmContext

### Purpose
Provides a global confirm dialog (instead of browser's `window.confirm`). Components can trigger a styled confirmation modal from anywhere.

### Exposed Values
```js
{
  confirm({ title, message, onConfirm })
}
```

### Usage
```jsx
import { useConfirm } from '../contexts/ConfirmContext';

const { confirm } = useConfirm();

const handleDelete = () => {
    confirm({
        title: 'Delete Issue',
        message: 'Are you sure you want to delete this issue?',
        onConfirm: () => deleteIssue(id)
    });
};
```

---

## Local Component State

For data that belongs to a single page (issue list, form fields, loading states), standard `useState` and `useEffect` are used directly in the page component.

Example from `Issues.jsx`:
```js
const [issues, setIssues] = useState([]);
const [loading, setLoading] = useState(true);
const [filters, setFilters] = useState({ category_id: 'all', status: 'all', search: '' });
```

---

## Notes
- There is **no global issues cache** — each page fetches fresh data on mount
- Auth token validation against the backend is not done on mount (only presence is checked in localStorage). Future improvement: validate token on app load
