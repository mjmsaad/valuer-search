# Changelog — Wickman's Valuer Search

All changes to the Valuer Search app are documented here. Newest changes listed first.

---

## [1.9.25] — 26 March 2026 · Date Formatting

### Fixed
- **Auction dates now show ordinal suffixes** — dates in both email and PDF now display as "Wednesday 1st April", "Friday 10th April" etc. rather than "Wednesday 1 April"

---

## [1.9.0] — 26 March 2026 · Email & PDF Export

### New
- **Email export** — a new Email button in the My List panel opens a modal to enter the recipient's name, then displays a fully formatted valuation email in a copy window. Clicking "Copy all" copies the rich HTML email to the clipboard — pastes into Gmail or Outlook web with all formatting intact (fonts, colours, table layout, bullet points, links)
- **PDF export** — a PDF button opens a name modal then generates a branded A4 PDF in a new tab. A dark toolbar with a burgundy "Save as PDF" button hides the toolbar and triggers the print dialog. Output includes the Wickman's logo, burgundy section headings, full valuation table and all standard sections
- **Recipient name modal** — both email and PDF exports prompt for the recipient's name before generating. Used to personalise the "Dear [Name]" salutation. Supports pressing Enter to confirm
- **Auto-calculated auction dates** — both exports automatically include the next two upcoming auction dates, computed from a live iCal holiday calendar. Adelaide deadlines (9 days prior) and Melbourne deadlines (7 days prior) automatically roll back to the previous workday if they fall on a public holiday
- **Returns portal hyperlink** — the shipping section in both exports includes a clickable "returns portal" hyperlink to the AusPost returns portal, rendered in Wickman's burgundy

---

## [1.8.75] — 26 March 2026 · Email Content & Layout

### Improved
- **Original Wickman's email wording restored** — all body text restored verbatim to the original template, including the full notes section, hammer price disclaimer, R/L/H key, commission terms, packaging warnings, SA and VIC drop-off addresses, shipping instructions, and next steps with original step labels (Read and Sign, Prepare for Drop-Off, Drop Off or Ship)
- **R/L/H key in compact left-bordered box** — grouped all five lines as a single compact unit with minimal line spacing
- **"Things to Keep in Mind" moved after Upcoming Auctions** — section order now matches the original template
- **No logo or signature in email** — intentionally omitted; both handled by the user's Outlook signature block
- **Consistent Arial font throughout** — all email elements explicitly declare Arial to prevent app fonts leaking into the copy window

### Fixed
- **Email table text appearing non-black** — added explicit `color:#1A1714` inline on every `td`
- **Email rendering as raw HTML** — removed `white-space:pre-wrap` from copy window CSS; now renders rich HTML correctly via `dangerouslySetInnerHTML`

---

## [1.8.50] — 26 March 2026 · PDF Layout & Formatting

### Improved
- **A4 page layout with proper margins** — PDF uses `@page { size: A4; margin: 20mm 25mm }` with content constrained to 170mm wide, centred on the page
- **Section page-break control** — "Things to Keep in Mind", "Getting your wine to us", and "Next Steps" are wrapped in `page-break-inside:avoid` so they never split across pages
- **Wickman's logo at top of PDF** — embedded as a base64 data URI with a burgundy rule below it
- **PDF footer removed**

### Fixed
- **PDF popup blocked by browser** — `window.open()` was called after an `await`, making it look non-user-initiated. Fixed by opening the window synchronously in the button's `onClick` handler

---

## [1.8.25] — 24 March 2026 · Team Member Email Fix

### Fixed
- **Team member emails in trending panel** — the team member section was showing UUID fragments instead of email addresses. Fixed by adding a `user_profiles` table in Supabase — each user writes their email on login, and the trending panel looks up emails from this table

---

## [1.8.0] — 24 March 2026 · Wine Detail Page

### New
- **Wine detail overlay** — click ⓘ on any row to open a full-screen overlay with the wine's price history chart, headline stats and a complete table of all recorded sales
- **Price history chart** — plots High, Ave and Low prices across all auction dates using Chart.js with an interactive tooltip
- **ⓘ info button column** — dedicated column with a persistent ⓘ button on every row, opening the detail overlay without triggering click-to-copy
- **Column header icons** — clipboard icon for the copy column, ⓘ for the info column

### Fixed
- **Blank page on load** — caused by accumulated JSX structural errors. App was fully rewritten from scratch, restoring all features cleanly

---

## [1.7.0] — 23 March 2026 · Trending Bar Improvements

### Improved
- **Search count inside each bar** — count sits on the right end of the bar. Gold for top 3, grey for others
- **Bars increased in height to 18px**
- **Top 10 search terms shown** — increased from 5

### Fixed
- **Team member initials from email not UUID** — initials now derived from the first letter of the user's email address

---

## [1.6.0] — 23 March 2026 · Trending Panel Redesign

### New
- **Three-column layout** — most searched terms (left), team member breakdown (centre), insights (right)
- **Searches today + daily average stat tiles**
- **Top vintage searched** — most frequently searched vintage year with count
- **Most used source filter**
- **Most active day of the week**

### Improved
- **Bar alignment fixed at all screen sizes** — bars scale fluidly using percentage widths

---

## [1.5.0] — 23 March 2026 · My List Persistence

### Fixed
- **My list resets on page refresh** — list now saved to browser localStorage (`wickman_list`) and restored on every page load

---

## [1.4.0] — 23 March 2026 · Trending Searches

### New
- **Collapsible trending searches panel** — toggle bar between search bar and results, shows top searched terms across the whole team
- **Most searched terms — 7d / 30d / All time filter** — top 7 queries with proportional bars. Click any term to run that search instantly
- **Searches by team member** — breakdown of searches per logged-in user in the selected period
- **Automatic search logging** — every search silently logged to Supabase `search_logs` with user ID, query and timestamp

### Improved
- **Trending layout** — bar and count pinned right with search term filling remaining space via CSS grid

### Fixed
- **Trending panel not visible** — moved to correct position between search bar and results table
- **Trending data not loading** — added array validation, error logging and Accept header to the API call

---

## [1.3.0] — 23 March 2026 · Realtime Online Count

### New
- **Realtime online user count** — green dot and live count in the header showing how many team members have the app open. Powered by Supabase Realtime Presence, updates instantly via WebSocket
- **Counts active browser sessions** — count drops automatically when someone closes the tab or signs out

---

## [1.2.0] — 23 March 2026 · My List Panel

### New
- **Collapsible "My list" slide-out panel** — fixed to the right edge with a ◀ tab
- **Add rows across multiple searches** — click + on any row; the list persists as you search different terms
- **Copy entire list to clipboard** — tab-separated values paste into Excel with each field in its own cell
- **Live count badge on closed tab**
- **Clear entire list** — single button in the panel footer

---

## [1.1.0] — 20 March 2026 · Click-to-Copy

### New
- **Click anywhere on a row to copy** — copies Vintage, Wine, Qty, Size, Reserve, Low, High as tab-separated values
- **Copy confirmation** — row flashes green and a "✓ Copied to clipboard" toast appears for 1.8 seconds

---

## [1.0.0] — 19 March 2026 · Initial Build

### Search & Data
- **NEW** Keyword search across all fields — query splits into individual words, all must match
- **NEW** Auction source filter dropdown
- **NEW** Keyword highlights in results — matching words highlighted in gold
- **NEW** Vintage as first column with gold badge styling
- **NEW** Pagination — 50 rows per page with smart ellipsis display
- **IMPROVED** Server-side sorting across all 110,000 rows via Supabase
- **IMPROVED** Wine column — full name wraps instead of truncating
- **FIXED** Table header alignment — sticky header was floating over the first two data rows

### Security & Authentication
- **NEW** Supabase private database backend — raw data cannot be downloaded
- **NEW** Login screen with email/password authentication via Supabase Auth
- **NEW** Session persistence via browser localStorage
- **NEW** Authenticated API calls with Bearer token and Row Level Security

### Design & Branding
- **NEW** Wickman's brand redesign — cream/white, Cormorant Garamond headings, wine-red accents, gold badges, Inter body text
- **NEW** Wickman's SVG logo on login screen and in app header
- **NEW** Dark mode toggle — preference saved between sessions
- **IMPROVED** Logo adapts to dark mode — text inverts, red corkscrew unchanged
- **NEW** Auction source colour-coded chips
- **NEW** Price colour coding — high in green, average in wine-red, null as dash
- **NEW** Active keyword pill badges below the search bar
- **NEW** Logged-in user email and Sign Out button in header

### Hosting & Deployment
- **NEW** Hosted on GitHub Pages
- **NEW** Automated deployment via GitHub Actions on push to main
- **NEW** `push.sh` one-command deploy script
- **NEW** Local dev server — `npm run dev` at `localhost:5173`

---

## Summary

| Version | Date | Highlight |
|---------|------|-----------|
| 1.9.25 | 26 Mar 2026 | Date ordinal formatting |
| 1.9.0 | 26 Mar 2026 | Email & PDF export |
| 1.8.75 | 26 Mar 2026 | Email content & layout |
| 1.8.50 | 26 Mar 2026 | PDF layout & formatting |
| 1.8.25 | 24 Mar 2026 | Team member email fix |
| 1.8.0 | 24 Mar 2026 | Wine detail page |
| 1.7.0 | 23 Mar 2026 | Trending bar improvements |
| 1.6.0 | 23 Mar 2026 | Trending panel redesign |
| 1.5.0 | 23 Mar 2026 | My list persistence |
| 1.4.0 | 23 Mar 2026 | Trending searches |
| 1.3.0 | 23 Mar 2026 | Realtime online count |
| 1.2.0 | 23 Mar 2026 | My list panel |
| 1.1.0 | 20 Mar 2026 | Click-to-copy |
| 1.0.0 | 19 Mar 2026 | Initial build |

| Change type | Count |
|-------------|-------|
| New features | 38 |
| Improvements | 13 |
| Bug fixes | 13 |
| **Total** | **64** |

---

*Valuer Search is an internal tool for the Wickman's Fine Wine & Whisky Auctions team.*
*Data is stored securely in Supabase and is not publicly accessible. Authentication is required.*
