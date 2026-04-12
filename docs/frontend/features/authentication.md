# Authentication Feature

## Purpose
Allows citizens to create accounts, verify their email with an OTP code, log in, and reset forgotten passwords.

---

## Pages / Files

| File | Route | Description |
|---|---|---|
| `src/pages/Signup.jsx` | `/signup` | Registration form |
| `src/pages/Login.jsx` | `/login` | Login form |
| `src/pages/ForgotPassword.jsx` | `/reset-password` | Forgot + reset password flow |
| `src/contexts/AuthContext.jsx` | global | Auth state and functions |
| `src/services/authService.js` | — | API calls for auth |

---

## Registration Flow

```
1. User fills: Full Name, Email, Password
2. Frontend validates: all fields required, password >= 6 chars
3. Call authService.register(userData)
4. Backend returns success + sends OTP to email
5. Page transitions to OTP verification step
6. User enters 6-digit OTP
7. Call authService.verifyEmail({ email, otp_code })
8. On success → redirect to /login
```

---

## Login Flow

```
1. User enters email and password
2. Call authService.login({ email, password })
3. Backend returns { token, user }
4. Token saved to localStorage
5. User object saved to localStorage
6. AuthContext updates user state
7. Redirect to /issues (or previous page)
```

---

## Forgot Password Flow

```
1. User enters their email address
2. Call authService.forgotPassword(email)
3. Backend sends OTP to email
4. Page transitions to OTP + new password step
5. User enters: OTP code + new password
6. Call authService.resetPassword({ email, otp_code, new_password })
7. On success → redirect to /login
```

---

## Auth State

Managed by `AuthContext`. Persisted in `localStorage`:
- `token` — JWT string (auto-attached to all API requests)
- `user` — JSON string of user object

The `apiClient` Axios interceptor reads the token automatically:
```js
apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});
```

---

## Protecting Pages

Pages requiring auth manually redirect if not authenticated:
```jsx
const { isAuthenticated } = useAuth();
useEffect(() => {
    if (!isAuthenticated) navigate('/login');
}, [isAuthenticated]);
```

---

## API Calls Used

| Method | Endpoint | Description |
|---|---|---|
| POST | `/auth/register` | Create account |
| POST | `/auth/verify-email` | Confirm OTP |
| POST | `/auth/login` | Login, get token |
| POST | `/auth/forgot-password` | Send reset OTP |
| POST | `/auth/reset-password` | Reset with OTP |

---

## i18n Keys Used

```
auth.login.title
auth.login.subtitle
auth.login.emailPlaceholder
auth.login.passwordPlaceholder
auth.login.forgotPassword
auth.login.continueButton
auth.signup.title
auth.signup.namePlaceholder
auth.forgotPassword.title
auth.forgotPassword.otpPlaceholder
auth.forgotPassword.resetButton
```

---

## Dependencies Used
- `axios` (via `authService` + `apiClient`) — API requests
- `react-router-dom` — navigation after login/register
- `AuthContext` — global state update

---

## Notes
- Auth pages use **no layout** (no navbar/sidebar) for fullscreen focused UX
- OTP codes expire in 10 minutes (enforced on the backend)
- Unverified accounts are blocked from logging in (backend enforces this)
- Token is stored in `localStorage` (no httpOnly cookie — future improvement for security)
