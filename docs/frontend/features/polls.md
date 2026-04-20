# Polls & Paid Requests

The Polls module allows users to view, vote, and request community polls to gauge public interest on specific improvements.

## Files
- `src/pages/Polls.jsx`
- `src/pages/RequestPoll.jsx`
- `src/services/pollsService.js` (Mock service, to be integrated with backend)

## Features

### Public Poll Feed (`Polls.jsx`)
- **Feed Listing:** Displays a list of active and past polls.
- **Filtering & Sorting:** Users can filter by "Active", "Voted", or "Sponsored" and sort by "Newest" or "Popular".
- **Voting Options:** Logged-in users can select an option and submit their vote.
- **Live Results:** After a vote is placed, the poll immediately converts to a result view showing a percentage bar for all options.
- **Sponsored Polls:** Highlighted with a special "Paid" badge and green UI elements to distinguish them from standard polls.

### Request Paid Poll (`RequestPoll.jsx`)
- **Paid Feature:** Users can spend their in-app balance dollars (mocked) to request a sponsored poll for greater visibility.
- **Form Inputs:** 
  - Question text field
  - Dynamic options list (add up to 5, remove down to 2)
  - Slider for poll duration (calculates cost based on $0.50/day rate)
- **Validation:** Enforces maximum options, required text fields, and balance sufficiency.
- **Success State:** Shows a dedicated success UI before redirecting back to the active polls feed.

## Recent UI/UX Updates
- Overhauled responsive layout and button scaling for mobile-first user experience.
- Standardized UI to a "flat" style (removed drop shadows), using clean solid borders and consistent active states.
- Enhanced `CustomSelect` dropdown component ensuring full responsive inline behavior without bottom-sheet modals.
- Introduced `ErrorBoundary` integration and replaced traditional native alerts with the application's unified `Toast` component structure.
