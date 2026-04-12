# Landing Page Feature

## Purpose
The public-facing homepage. Introduces the platform to new visitors, showcases live platform stats, explains how it works, and provides clear CTAs to report or browse issues.

---

## Page / Files

| File | Route | Description |
|---|---|---|
| `src/pages/Landing.jsx` | `/` | Assembles all landing sections |
| `src/components/landing/` | — | Individual section components |
| `src/services/statsService.js` | — | Fetches live platform statistics |

---

## Sections

### 1. Hero Section
**Component:** `HeroSection.jsx`

- **Swiper carousel** with multiple slides (uses `swiper` library)
- Background: `lebanon_hero.png` with dark overlay
- Displays: headline, subtitle, two CTA buttons (Browse Issues / Report Issue)
- Animated with Framer Motion
- Responsive with mobile-optimized text sizing

### 2. Problems Section
**Component:** `ProblemsSection.jsx`

- Title: "Everyday issues go unheard"
- Grid of 4 cards showing common Lebanese problems:
  - Electricity Cuts
  - Water Interruptions
  - Road Damage
  - Internet Issues
- Each card has an icon, title, and description

### 3. How It Works Section
**Component:** `HowItWorksSection.jsx`

- Title: "How the platform works"
- 4 numbered steps:
  1. Submit an Issue
  2. Community Support
  3. Public Visibility
  4. Track Progress
- Each step has an icon, title, and short description

### 4. Stats Section
**Component:** `StatsSection.jsx`

- Displays 4 live counters:
  - Reported Issues
  - Community Votes
  - Active Citizens
  - Resolved Problems
- Data fetched from `GET /api/stats` via `statsService.fetchStats()`
- Falls back to `statsMock.js` data if the API times out (2 second timeout)

### 5. Trust Section
**Component:** `TrustSection.jsx`

- Title: "Built on trust and transparency"
- 4 trust points:
  - Community-Driven
  - Transparent
  - Independent
  - Local Focus

### 6. CTA Section
**Component:** `CTASection.jsx`

- Final call-to-action
- Two buttons: Report Issue / Browse Issues
- Simple paragraph text explaining the platform's philosophy

---

## Stats Fetching Flow

```
1. StatsSection mounts
2. Calls statsService.fetchStats()
3. If GET /api/stats responds within 2 seconds → use live data
4. If API fails or times out → use statsMock.js (static fallback)
5. Numbers animate/render on screen
```

---

## API Calls Used

| Method | Endpoint | Description |
|---|---|---|
| GET | `/stats` | Live platform statistics |

---

## i18n Keys Used

```
hero.badge
hero.title
hero.subtitle
hero.browseIssues
hero.reportIssue
hero.fastSubmit
hero.transparentVotes
hero.communityDriven
problems.title
problems.subtitle
problems.electricity.title
problems.water.title
problems.roads.title
problems.internet.title
howItWorks.title
howItWorks.steps.submit.title
howItWorks.steps.support.title
stats.reportedIssues
stats.communityVotes
stats.activeCitizens
stats.resolvedProblems
trust.title
trust.points.community.title
cta.title
cta.reportIssue
cta.browseIssues
```

---

## Dependencies Used
- `swiper` — hero section carousel
- `framer-motion` — section animations
- `axios` (via `statsService`) — live stats
- `react-router-dom` — CTA button navigation

---

## Notes
- All sections are bilingual — text switches between EN/AR from the translations file
- The landing page has no authentication requirement — fully public
- The hero carousel replaces a static image for richer visual engagement
