# Folder Structure

```
our-voice/
├── index.html              # HTML entry point (loads main.jsx)
├── vite.config.js          # Vite config
├── tailwind.config.js      # Tailwind theme and purge config
├── postcss.config.js       # PostCSS config (Tailwind + Autoprefixer)
├── .env                    # VITE_API_BASE_URL
├── vercel.json             # Vercel SPA rewrite rules
└── src/
    ├── main.jsx            # App entry — ReactDOM.createRoot, providers
    ├── App.jsx             # Route definitions
    ├── index.css           # Global base styles
    │
    ├── assets/             # Static assets: images, icons
    │   └── lebanon_hero.png  # Hero section background image
    │
    ├── config/
    │   └── env.js          # Reads VITE_API_BASE_URL from import.meta.env
    │
    ├── contexts/
    │   ├── AuthContext.jsx    # User auth state + functions
    │   ├── ThemeContext.jsx   # Light/dark mode toggle
    │   └── ConfirmContext.jsx # Global confirm modal
    │
    ├── data/
    │   └── statsMock.js    # Fallback stats data (used when API fails)
    │
    ├── hooks/              # Custom hooks (future home for useIssues, etc.)
    │
    ├── i18n/
    │   └── translations.js # All UI strings in English + Arabic
    │
    ├── layouts/
    │   └── RootLayout.jsx  # Shared layout: Navbar + Sidebar + Outlet + Footer
    │
    ├── components/
    │   ├── Navbar.jsx            # Top navigation bar
    │   ├── Sidebar.jsx           # Mobile slide-out menu
    │   ├── Footer.jsx            # Page footer
    │   ├── CategoryIcon.jsx      # Maps category name → Radix icon
    │   ├── IssueMap.jsx          # Leaflet map wrapper
    │   ├── CustomSelect.jsx      # Styled dropdown select
    │   ├── ConfirmModal.jsx      # Reusable confirm dialog
    │   ├── LanguageSwitcher.jsx  # EN/AR toggle
    │   ├── NotificationBadge.jsx # Badge for notification count
    │   ├── ProfileDropdown.jsx   # User avatar + dropdown menu
    │   ├── PageHeader.jsx        # Reusable page title bar
    │   ├── Toast.jsx             # Notification toast
    │   ├── landing/              # Landing page section components
    │   └── ReportIssue/          # Sub-components for ReportIssue page
    │
    ├── pages/
    │   ├── Landing.jsx           # Homepage with hero, stats, how-it-works
    │   ├── Issues.jsx            # Issue list with filters and search
    │   ├── IssueDetails.jsx      # Single issue view: comments, upvote, map
    │   ├── ReportIssue.jsx       # Form to create a new issue
    │   ├── EditIssue.jsx         # Form to edit an existing issue
    │   ├── Login.jsx             # Login page
    │   ├── Signup.jsx            # Registration page
    │   ├── ForgotPassword.jsx    # Forgot + reset password (OTP flow)
    │   ├── About.jsx             # About the platform
    │   ├── NotFound.jsx          # 404 page
    │   ├── Polls.jsx             # (placeholder)
    │   ├── Announcements.jsx     # (placeholder)
    │   ├── CommunityChat.jsx     # (placeholder)
    │   ├── DistrictChat.jsx      # (placeholder)
    │   ├── HelpCenter.jsx        # (placeholder)
    │   └── Donate.jsx            # (placeholder)
    │
    └── services/
        ├── apiClient.js      # Axios instance with base URL + auth interceptor
        ├── authService.js    # login, register, verifyEmail, forgotPassword, resetPassword, logout
        ├── issueService.js   # getAllIssues, getIssueById, createIssue, updateIssue, deleteIssue,
        │                     # toggleUpvote, addComment, updateComment, deleteComment, uploadMedia
        └── statsService.js   # fetchStats() (with 2s timeout and mock fallback)
```

---

## Key Conventions

### Services Layer
All API calls go through the `services/` folder — never directly from components. This keeps components clean and makes the API layer easy to update.

### Context vs Local State
- **Context**: Auth state, theme, global confirm dialog
- **Local state**: Page-specific data (issue list, form values, loading states)

### Translation Keys
All user-visible text uses the `i18n/translations.js` system. Access via a `useTranslation()` hook or direct import. Keys follow dot notation: `"hero.title"`, `"auth.login.title"`.
