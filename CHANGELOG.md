# Changelog — Wickman's Valuer Search

All changes to the Valuer Search app are documented here.

---

## [1.4.0] — 23 March 2026

### Search & Data
- **NEW** Collapsible trending searches panel — a slim toggle bar between the search bar and results. Click to expand and see the top searched terms across the whole team
- **NEW** Most searched terms — ranked list with bar chart showing the top 7 queries. Filter by 7 days, 30 days or all time. Click any term to instantly run that search
- **NEW** Searches by team member — breakdown of how many searches each logged-in user has run, with a total count for the selected period
- **NEW** Automatic search logging — every search is silently logged to a Supabase `search_logs` table with the user ID, query and timestamp. No action needed from users — data accumulates automatically as the app is used
- **NEW** Panel collapsed by default — the trending section takes up no space until opened, keeping the results view clean
- **FIXED** Trending panel not visible — panel was being rendered outside the main content area. Moved to correct position between search bar and results table
- **FIXED** Trending data not loading — fetch response was not being validated as an array, causing silent failures. Added error checking and Accept header to the API call

---

## [1.3.0] — 23 March 2026

### Search & Data
- **NEW** Realtime online user count — a live green dot and user count in the header shows how many people have the app open at that moment. Updates instantly for all users via Supabase Realtime Presence — no page refresh needed
- **NEW** Counts active browser sessions — if two team members have the app open simultaneously the count shows 2, updating in real time as people open or close the app

---

## [1.2.0] — 23 March 2026

### Search & Data
- **NEW** Collapsible "My list" panel — a slide-out panel fixed to the right edge of the screen. Click the ◀ tab to open and close it
- **NEW** Add rows to list across multiple searches — click + on any row to add it to the panel. The list persists as you search different terms so you can build up a set of comparable sales from multiple queries
- **NEW** Copy entire list to clipboard — the "Copy N rows" button in the panel copies all added rows as tab-separated values. Pasting into Excel or Google Sheets places each row on its own line with each field in its own cell
- **NEW** List badge on closed tab — the row count is always visible on the tab even when the panel is closed, so you always know how many rows you have queued
- **NEW** Clear entire list — single button in the panel footer to wipe the list and start fresh

---

## [1.1.0] — 20 March 2026

### Search & Data
- **NEW** Click-to-copy row — click anywhere on a result row to copy the first 7 fields (Vintage, Wine, Qty, Size, Reserve, Low, High) to the clipboard as tab-separated values. Pasting into Excel or Google Sheets places each field into its own cell
- **NEW** Copy confirmation — clicking a row flashes the entire row green and shows a "✓ Copied to clipboard" toast at the bottom of the screen for 1.8 seconds

---

## [1.0.0] — 19 March 2026

### Search & Data
- **NEW** Keyword search across all fields — query splits into individual words, all must match. Typing `grange 1998` finds Penfolds Grange Shiraz 1998 even though the words appear separately in the record
- **NEW** Auction source filter dropdown — filter results to a specific house (Langtons, MW Wines, etc.)
- **NEW** Keyword highlights in results — matching words highlighted in gold in the results table
- **NEW** Vintage as first column — moved to first position with gold badge styling for faster scanning
- **NEW** Pagination — 50 rows per page with smart ellipsis display for large page counts
- **IMPROVED** Server-side sorting across all pages — sorting by Vintage, Wine, Reserve, Low, High, Ave, Last Sale now sorts all 110,000 rows via Supabase, not just the 50 visible on screen. Page resets to 1 when sort changes
- **IMPROVED** Wine column — full name visible — long names like Cabernet Sauvignon wrap to a second line instead of truncating. Column width increased to 420px
- **FIXED** Table header alignment — sticky header was floating over the first two data rows due to an incorrect top offset. Fixed to sit correctly at the top of the scroll container

### Security & Authentication
- **NEW** Supabase database backend — all 110,000 wine entries moved from a CSV file into a private Supabase database. Raw data cannot be downloaded; only search results are returned via the API
- **NEW** Login screen with email/password authentication via Supabase Auth — only users created in Supabase can access the app
- **NEW** Session persistence — login session stored in browser localStorage so users stay logged in across visits
- **NEW** Authenticated API calls — all database queries use the user's Bearer token. Database policy only allows authenticated users to read data

### Design & Branding
- **NEW** Wickman's brand redesign — cream/white backgrounds, Cormorant Garamond serif headings, wine-red accents, gold vintage year badges
- **NEW** Wickman's SVG logo on login screen — official logo shown centered above the sign-in card
- **NEW** Wickman's SVG logo in app header — logo in the top-left sticky header bar
- **NEW** Dark mode toggle — button in the header switches between light and dark themes. Preference saved and persists between sessions
- **IMPROVED** Logo adapts to dark mode — logo text inverts to white in dark mode. The red corkscrew box and white corkscrew icon remain unchanged in both modes
- **NEW** Auction source chips — colour-coded labels: green for Langtons, gold for MW Wines, grey for others
- **NEW** Price colour coding — high prices in green, average prices in wine-red, null values shown as a dash
- **NEW** Active keyword tags displayed as pill badges below the search bar
- **NEW** Logged-in user email and Sign Out button in the header

### Hosting & Deployment
- **NEW** Hosted on GitHub Pages — free, always-on, no server required
- **NEW** Automated deployment via GitHub Actions — pushing to main triggers an automatic build and deploy
- **NEW** push.sh deploy script — simplified one-command deployment from the project folder
- **NEW** Local development server — run npm run dev to preview changes at localhost:5173 before deploying

---

## Summary

| Type | Count |
|------|-------|
| New features | 19 |
| Improvements | 3 |
| Bug fixes | 2 |
| **Total** | **24** |

---

*Valuer Search is an internal tool for the Wickman's Fine Wine & Whisky Auctions team.*
*Data is stored securely in Supabase and is not publicly accessible.*
