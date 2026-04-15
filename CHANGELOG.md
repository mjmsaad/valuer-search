# Changelog — Wickman's Valuer Search

All changes to the Valuer Search app are documented here. Newest first. Current version: **v3.1.1**.

---

## [3.1.1] — 16 April 2026 · Calculator Light Mode & Panel Behaviour Fixes

### Fixed
- **Calculator light mode** — the modal now fully adapts to light mode with a white background, dark title text, burgundy drawer title, and solid ghost-style Copy, Clear and Copy All buttons. All were previously invisible due to `rgba(255,255,255)` values rendering on a white surface
- **My List auto-close** — the panel no longer flashes closed and re-opens when adding an item while it is already open. The 2-second auto-close now only fires when the panel was closed before the item was added

---

## [3.1.0] — 16 April 2026 · Light/Dark Mode Polish & Panel Unification

### New
- **Unified panel tab navigation** — My List, History, and Flags now share a single tab bar embedded directly inside each panel. The tab bar slides in and out with the panel as one unit — no separate floating element, no alignment issues
- **Full light mode support for panels** — all three slide-out panels now respond to the active theme. Backgrounds, text, borders and interactive elements use CSS variables throughout

### Improved
- **VIC cutoff label legibility** — label now uses `var(--vic-lbl-c)` and is readable in both light and dark modes
- **Sidebar logo alignment** — logo wrap height reduced to 56px so its border aligns correctly with the header border line
- **Light mode override cleanup** — removed 97 conflicting duplicate overrides that were hardcoding dark values in light mode. Replaced with a single authoritative block
- **Light mode legibility** — PDF button, calculator inputs, history items, flag entries and list item text all corrected
- **"Clear entire list" button** — promoted from a tiny underlined link to a full-width ghost button matching the app's design language
- **Confirm prompt consistency** — the "Clear all N items?" prompt now occupies the same height and padding as the Clear button with no layout shift on click
- **Paste-from-spreadsheet section** — enlarged throughout: font 10→11px, textarea height 60→80px, padding scaled. Buttons use consistent classes with proper hover states

### Fixed
- **Calculator subtitle** — changed from "Median recent hammer price" to "Average hammer price" — the extra word caused text to wrap and push the Retail column out of alignment
- **Code audit** — 5 duplicate CSS selectors removed, 16 dark hex values corrected in light mode blocks, 1 empty stray rule removed. Zero issues remaining after audit

---

## [3.0.0] — 14 April 2026 · Full UI Redesign — Dark Theme & Sidebar Navigation

### New
- **Burgundy icon-only sidebar** — replaces the top header navigation. A 52px fixed sidebar sits on the left at all times, showing icon + label for every section. Active item highlighted with a white left border and brighter icon. Tooltips appear on hover. Corkscrew logo sits at the top of the sidebar
- **All panels now slide from the right** — My List, History, Flagged, and Calculator all animate in from the right edge. The sidebar remains fully accessible regardless of which panel is open. Panels are mutually exclusive and each has a × close button
- **Sidebar navigation order** — Search · My List · Flagged · History · Calculator · (divider) · Blank Email · Sami-Odi · Sign out
- **Calculator as centred modal** — clicking ⊞ Calc opens a full modal overlay with three columns: Retail calculator, Auction calculator, and a live scrolling team history feed. Each column scrolls independently. History is searchable. Backdrop click or × closes it
- **Auction date header bar** — the topbar now shows only auction information: wine count, Next Auction pill, date range in 17px Cormorant Garamond serif, and SA/VIC cutoff date pills with a days-remaining badge. SA pill has an amber tint and gold text; VIC is clearly secondary
- **Dark slate theme** — the entire main content area is now dark (`#111210` background). Table rows, search section, panels, and all UI elements updated to the dark palette. Price colours (rose reserve, amber low, sage green high) read clearly on dark
- **Corkscrew logo in sidebar** — the Wickman\'s corkscrew mark replaces the W letterform at the top of the sidebar, embedded as a transparent PNG on the burgundy background

### Improved
- **Header simplified** — the sticky header is now purely an auction status bar. Calculator, Blank Email, History, Flagged and all navigation have moved to the sidebar
- **My List tab removed** — the vertical slide-out tab on the right edge is gone. My List is accessed exclusively via the sidebar, eliminating the redundant duplicate entry point
- **Panel animations unified** — all four panels (My List, History, Flagged, Calculator) use identical `right` transition animations (`0.28s ease`). Previously Flagged used a `left` axis transition and Calculator popped in without animation
- **Calculator scroll fixed** — switching Calculator to a modal with defined height and `height:100%` on grid columns means each column scrolls independently within the modal frame. Overscroll contains to the modal — the results table behind it no longer scrolls
- **Sidebar icons** — icons at 17px with 55% opacity at rest, 85% on hover, 100% active. Labels at 7px. Significantly more readable than the earlier faded 14px icons
- **Cutoff date pills** — both SA and VIC dates are now 17px, matching the auction range date for visual consistency. SA is gold (#FFD580), VIC is 75% white. Days badges are visible on both
- **VIC closes label** — lifted from near-invisible `#2A2820` to 40% white, matching the SA label treatment

### Fixed
- **My List tab overlapping results** — the vertical panel-tab that remained after the sidebar redesign has been removed
- **Calc modal scroll springing back** — fixed by changing `max-height` to a defined `height` on the modal, propagating `height:100%` to grid columns so they have a real constraint to overflow against
- **Hook order violation (white screen)** — a `useEffect` scroll-lock was inserted after conditional early returns in App, violating React\'s Rules of Hooks. The hook ran on some renders and not others, causing React to crash with "Rendered more hooks than during the previous render"
- **Duplicate function declarations** — multiple rounds of JSX manipulation caused the entire RowCalc through App block (~135,000 chars) to be duplicated in the file, causing Babel "already declared" errors. Duplicate removed
- **JSX structural corruption** — several panel-tab removal operations incorrectly cut into adjacent JSX blocks, orphaning the LoginScreen login-card form and leaving it either inside App\'s return or after `export default App`. Corrected with targeted reconstruction
- **History and Flag panels** — converted from left-side slide panels to right-side, matching all other panels. Close buttons added to all panel headers

---

---

## [2.5.0] — 13 April 2026 · Blank Email & Auction Date Tile

### New
- **Blank valuation email** — a gold \"✉ Blank email\" button in the header generates the full valuation email template without the table. All sections remain intact (auction dates, notes, getting your wine to us, next steps) — just no data table. Available at all times regardless of whether My List has items. Also appears in the My List footer alongside Email and PDF for in-flow access
- **Auction date tile** — a collapsible tile below the header shows the next upcoming Wickman's auction. Collapsed state shows the auction date range and SA/VIC cutoff date pills at a glance. Clicking expands to a 4-column grid showing SA closes, VIC closes, Opens, and Closes — each with a colour-coded days-remaining badge (amber for cutoffs, green for auction dates). Pre-loads on login using the same iCal feed as the email/PDF exports. Hidden on mobile


---

## [2.4.2] — 13 April 2026 · Mobile Flag Feature & Panel Fixes

### New
- **Size flagging on mobile** — a ⚑ button on every search result card lets you flag an incorrect size directly from mobile. Tapping it slides up a bottom sheet with the wine name, current listed size, a quick-tap size grid (Half, Magnum, Double Magnum etc.), and an optional note field. Submit is greyed until a size is picked. Flagged cards get an amber border and a note showing the suggested size below the price pills
- **Flag panel on mobile** — an amber ⚑ badge appears in the mobile header top-right when there are active flags. Tapping it opens a bottom sheet listing all active flags across the team with size discrepancy, who flagged it, and Mark resolved / Dismiss actions per entry. Resolved flags shown greyed below

### Fixed
- **Double \"Flag recorded\" popup on mobile** — submitting a flag on mobile was triggering both the mobile bottom sheet confirmed state and the desktop fixed popover in the top-left simultaneously. Fixed by snapshotting the form before the async call, explicitly clearing `flagPopover` before submitting, and adding an `isMobile` guard so the desktop popover never renders on mobile
- **History panel lost all formatting** — the history panel JSX had drifted to use entirely different class names from the CSS (`hist-panel-header` vs `hist-panel-hdr`, `hist-entry` vs `hist-item` etc.). None of the styling was applying. All class names corrected throughout
- **Flag panel now opens on left side** — the Flagged panel was opening on the right, sitting behind and overlapping the My List tab. Moved to left side alongside History. Opening either left panel now closes the other automatically
- **My List no longer shrinks the results table** — `paddingRight: 340px` was being added to the main content area when My List opened, physically squishing the table. Removed — My List now overlays the results like all other panels
- **All panels aligned below header red line** — all three side panels were at `top: 52px`, placing them inside the header. Corrected to `top: 66px` so all panels start flush below the wine-red border line
- **Random session logouts** — the app had no JWT refresh logic. Added `refreshSession()` to call Supabase's refresh token endpoint before expiry, plus a background refresh every 45 minutes while the app is open


---

## [2.4.1] — 10 April 2026 · Panel & Session Fixes

### Fixed
- **History panel formatting lost** — the history panel JSX had been rewritten with entirely different class names from the CSS (`hist-panel-header` vs `hist-panel-hdr`, `hist-entry` vs `hist-item`, `hist-btn-regen` vs `hist-regen-btn` etc.). None of the styling was applying, leaving plain unstyled text. All class names corrected to match the CSS
- **Flag panel moved to left side** — the Flagged panel was opening on the right, sitting behind and overlapping the My List tab. Moved to the left side alongside History
- **Flag and History panels mutually exclusive** — opening one now automatically closes the other. Previously both could be open simultaneously, with one rendering behind the other
- **My List panel shrinking results** — the main content area had `paddingRight: 340px` added dynamically when My List opened, physically squishing the table. Removed — My List now overlays like the other panels
- **All panels misaligned with header** — all three side panels were at `top: 52px`, placing them 12px inside the header. Corrected to `top: 66px` (64px header + 2px wine border line) so panels start flush below the red border line
- **Random session logouts** — the app used a hand-rolled session manager with no token refresh logic. When the JWT expired (default 1 hour), it deleted the session and logged the user out silently. Added a `refreshSession()` function that calls Supabase's refresh token endpoint before giving up, plus a background interval that silently refreshes the token every 45 minutes while the app is open
\

---

## [2.4.0] — 10 April 2026 · Size Flags & Text Notes

### New
- **Size flag feature** — hover any Size cell in the search results to reveal a ⚑ button. Click it to flag the listed size as incorrect, pick the correct size from a quick-tap grid (Half, Magnum, Double Magnum etc.), add an optional note, and submit. Flags are stored in Supabase and immediately visible to all team members
- **Flagged items panel** — a ⚑ Flagged (n) button in the header slides in a panel showing all active flags across the team. Each entry shows the wine, who flagged it, the size discrepancy and the note. Two actions per flag: Mark resolved or Dismiss
- **Text notes in paste-from-spreadsheet** — the Reserve, Low and High cells now accept free-text notes (e.g. \"Not suitable for auction\", \"Need more information\") when pasting from a spreadsheet. Notes appear in italic grey in My List, the email and the PDF — placed in the correct column, not forced into Reserve

### Fixed
- **Note appearing in wrong column** — text notes in the Low or High cell were displaying under the Reserve column due to a colspan approach that merged all three price columns. Each column now renders independently so notes sit in the correct column
- **Text notes not showing in PDF** — the PDF uses a separate row builder (`buildPDFHTML`) with its own price formatter that only understood numbers. Updated to pass text through the same way as the email builder
- **Mixed Lots note added to NOTES section** — \"Lots marked with Mixed Lots means that as they fall under our value threshold, if listing these items, they will be listed unreserved, starting at $10 and/or in mixed lots of 6 starting at $20.\" added as item 4 in the NOTES section of both email and PDF (after More Information Needed)


---

## [2.3.3] — 3 April 2026 · Mobile Feature Pack

### New
- **Pagination on mobile** — prev/next arrows and numbered page pills pinned between the last card and the bottom nav. Current page highlighted dark. Ellipsis for skipped pages on long result sets. Tapping any page scrolls to the top automatically
- **My List edit controls** — every My List card has an Edit button that expands inline controls: qty stepper (−/+) and From→To size selectors matching the desktop panel exactly. Auction date and qty badge always visible on collapsed rows. Tap Done to collapse
- **Dark mode toggle pill** — replaced the buried icon in the mobile header with a labelled Light/Dark toggle pill. The track animates between states on tap
- **Last Auction date in detail sheet** — added as a gold-highlighted stat tile in the ⓘ bottom sheet alongside Last sale, Average, Total sales and Source. Data was already fetched, just not shown on mobile
- **Swipe to add on search cards** — swipe a result card right to add it to My List (green background reveals). Swipe left to dismiss. Added cards get a subtle green border. Non-passive touch listener ensures swipe doesn't fight vertical scroll

### Fixed\

---

## [2.3.1] — 1 April 2026 · Mobile Polish

### Improved
- **Option C pill search header** — the mobile search bar is now a full rounded pill with horizontal source filter chips (All sources, Wickmans, AWA etc.) populated from the database. Replaces the previous square search bar. Tapping a chip filters results instantly without a dropdown
- **Fully unified colour flow** — the search header now uses the same background as the card area (`var(--cream)`) in both light and dark mode. Previously the header used `var(--text)` which inverted the colour scheme. Logo adapts — burgundy in light mode, gold in dark mode
- **Device-only mobile detection** — mobile layout now triggers via user agent string detection only (iPhone, iPad, Android, etc.), not screen width. Desktop browsers at any window size always get the full table view

### Fixed
- **iOS zoom on input tap** — all mobile inputs are now `font-size:16px` and the viewport has `maximum-scale=1, user-scalable=no`, preventing iOS Safari from auto-zooming when tapping the search bar
- **Bottom nav cutoff** — card scroll area now has `padding-bottom:60px` so results are never hidden behind the fixed bottom nav
- **Calculator scroll bleed** — `overscroll-behavior:contain` added to the calculator and detail bottom sheets so scrolling inside them no longer scrolls the results behind
- **Calculator close button** — added an × button to the top right of the calculator sheet header. Previously the only way to close it was tapping the dim overlay
- **Desktop split-view false trigger** — removed the `touch + narrow window` fallback from mobile detection that was incorrectly triggering the mobile layout on Chrome/macOS in split view


---

## [2.3.0] — 30 March 2026 · Mobile Layout

### New
- **Mobile layout at 768px breakpoint** — at screen widths of 768px and below the desktop table is replaced with a card-based layout. All features remain accessible on mobile
- **Variant D result cards** — each search result is displayed as a compact card with the wine name, vintage badge, and three horizontal price pills (Reserve, Low, High) with colour coding matching the desktop. All three values are always visible without tapping
- **+ List and ⓘ buttons per card** — both actions sit side by side on the top row of every card. + List toggles the wine in/out of My List; ⓘ opens the detail bottom sheet
- **Bottom sheet detail** — tapping ⓘ slides up a sheet from the bottom of the screen over the dimmed search results. Shows all three prices plus Last sale, Average, Total sales and Source. Tap outside or swipe down to dismiss
- **My List mobile screen** — tapping My List in the bottom nav opens a full-screen overlay showing all added wines in the same card format as search results. Each card shows R/L/H prices. × removes a wine
- **Copy, Email and PDF on mobile** — Copy rows, ✉ Email and ⬇ PDF buttons are pinned just above the bottom nav bar on the My List screen
- **Bottom navigation bar** — fixed to the bottom of the screen with four tabs: Search, My List (with red count badge), Calc and Tools (opens Sami-Odi Identification Tool in a new tab)
- **Header simplified on mobile** — History, Sami-Odi, Calculator and other header controls are hidden on mobile since they are replaced by the bottom nav


---

## [2.2.3] — 30 March 2026 · Valuation History

### New
- **Valuation History panel** — ⏱ History button in the header slides in a panel from the left edge of the screen. Shows all email and PDF exports made by any team member, newest first
- **Auto-saves on every export** — every time an email is copied or a PDF is generated, a record is saved automatically to Supabase (`valuation_history` table). No extra steps required
- **Searchable by recipient** — filter the history list by typing a recipient name into the search box at the top of the panel
- **Expandable entries** — click any history entry to expand it and see the full item list with vintage badges and High prices for each wine
- **Re-generate** — clicking Re-generate loads the saved items back into My List and pre-fills the recipient name, then opens the export modal ready to send again
- **Load to My List** — loads all wines from a past export into My List in one click, without opening the export modal
- **Export type badges** — each entry is labelled Email or PDF so you can see at a glance what was sent
- **Smart date labels** — entries from today show time (e.g. \"Today 2:14pm\"), yesterday shows \"Yesterday\", older entries show the date
- **Left-side panel** — slides in from the left to avoid any overlap with the My List panel which lives on the right

### Requires
- Supabase table: `valuation_history` (id, user_id, recipient_name, export_type, items JSONB, created_at) with RLS and grants applied


---

## [2.2.2] — 28 March 2026 · Sami-Odi Identification Tool Link

### New
- **Sami-Odi Identification Tool link** — a header button links directly to the Sami-Odi Identification Tool (mjmsaad.github.io/Sami-Odi-Identification-Tool). Opens in a new tab. Sits to the left of the Calculator button in the header bar. Styled as a secondary grey button with a ↗ arrow to signal external navigation

---\

---

## [2.2.1] — 27 March 2026 · Valuation Table Fixes

### Improved
- **Vertical column rules** — thin ruled lines between every column in both email and PDF valuation tables, helping the eye track across long wine names
- **Colour-coded price columns** — Reserve in burgundy, Low in gold, High in green in both the header row and data rows. Matches the colour language used throughout the app
- **Right-aligned numbers** — Qty, Reserve, Low and High columns are now right-aligned for cleaner reading
- **Email table reflows freely** — removed `white-space:nowrap` from all data cells so the table adapts to whatever width Outlook provides. Headers remain locked to one line. Table can now be freely resized after pasting into Outlook
- **Removed outer email max-width** — the email HTML wrapper no longer constrains the table to 680px

### Fixed
- **PDF table headers** — a global `th` CSS rule in the PDF stylesheet was overriding all inline styles, forcing headers to uppercase, 9px font and small padding regardless of what the inline styles specified. Fixed to match email: 11px, sentence case, 7px 12px padding


---

## [2.2.0] — 27 March 2026 · Pricing Calculator

### New
- **Header calculator drawer** — ⊞ Calculator button in the header opens a full-width drawer with both Retail and Auction methods side by side. Caret rotates to indicate open/closed state. Search results remain visible below
- **Retail formula** — enter a retail price; Base = Retail × 75%, then Reserve = Base × 85%, Low = Base × 95%, High = Base × 120%
- **Auction formula** — enter an average auction price; Reserve = Avg × 85%, Low = Avg × 95%, High = Avg × 120%
- **Per-row Calc button in My List** — each row now has a Calc button alongside Edit and ×. Opens a compact inline calculator below that row with a gold left border. Supports both Retail and Auction tabs
- **Copy R · L · H** — copies the three values tab-separated to clipboard, ready to paste into a spreadsheet. Available in both the header drawer and per-row calculator
- **Apply to row** — in the per-row calculator, Apply pushes Reserve/Low/High values directly into the row and closes the calculator automatically
- **Shared team history** — all calculations with a wine name are saved to Supabase (`calculator_history` table). The history table shows wine name, vintage, who ran the calculation, method, input price and R/L/H. Searchable by wine name. All team members see all entries
- **History saves on Copy and Add to List** — any action that produces output saves to history if a wine name is present, not just Add to List
- **+ List from history** — any past calculation in the history table can be added directly to My List with one click
- **⎘ Copy from history** — copy R/L/H from any history row without re-entering the values

### Fixed
- Added `grant select, insert, delete on calculator_history to authenticated` — without this, RLS policies were irrelevant and all requests returned 403
- Removed silent `catch(e) {}` from saveCalcHistory — errors now log to console with status and Supabase error detail
- Valuation table header labels (Reserve, Low, High) now use non-breaking spaces before the parenthetical letters — `Reserve&nbsp;(R)` — preventing Outlook from wrapping them across two lines
- Alternating row colours corrected — first data row is now white (`#ffffff`), alternating rows use warm grey (`#F5F2EE`), so they read as clearly distinct from the dark header row


---

## [2.1.0] — 26 March 2026 · My List Panel Redesign

### New
- **Drag to reorder** — each row has a drag handle on the left. Drag any row to reposition it in the list. A burgundy drop-line shows where the item will land on release
- **Collapsed rows by default** — rows show wine name and vintage badge on line 1, auction date · qty badge · price on line 2. Controls are hidden until needed, keeping the list clean and scannable
- **Edit / Done toggle** — clicking Edit expands inline controls beneath that row. A burgundy left border marks the open row. Clicking Done collapses it
- **Stacked From → To controls** — when expanded, Qty stepper and Apply adjustment checkbox sit on the top row; From and To size selectors sit perfectly aligned on the row below, connected by an arrow
- **Vintage badge inline with name** — vintage year shown as a gold badge directly after the wine name on line 1, matching the main results table treatment
- **Bottle count in header** — panel header now shows total bottle count (sum of all qty values) alongside the row count badge

### Improved
- **Panel widened to 340px** — extra 60px gives wine names significantly more room before truncating


---

## [2.0.25] — 26 March 2026 · Size Normalisation & Bidirectional Price Adjustment

### New
- **FROM / TO size selectors** — each My List row now has two size dropdowns: FROM (what size the database price is for) and TO (the size you want to output). The price multiplier is calculated as `TO ÷ FROM` so it scales correctly in both directions — e.g. a 1500ml DB price can be scaled down to a 700ml output price
- **Multiplier opt-in checkbox** — a `× adj` checkbox per row controls whether the price adjustment is applied. Unticked by default on all rows so no prices are ever changed unless explicitly requested. Label shows ▲ adj when scaling up and ▼ adj when scaling down

### Fixed
- **Size normalisation** — DB size strings like \"Magnum (1.5L)\", \"1.5L\", \"150cl\" now correctly map to the 1500ml dropdown option. Previously the matching ran smallest-to-largest so \"50ml\" was found as a substring inside \"1500ml\", defaulting everything to 50ml. Check order now runs largest-to-smallest
- **Duplicate variable declaration** — `effM` was declared twice inside the email and PDF row builders, blocking the Vite compile. Removed the redundant declarations


---

## [2.0.0] — 26 March 2026 · Valuation Table Columns & PDF Fix

### New
- **Qty column in valuation table** — both email and PDF now include a Qty column between Wine and Size, showing the quantity set in My List (defaults to 1)\

---

## [1.9.75] — 26 March 2026  ·  Qty, Size & Paste from Spreadsheet

### New
- **Qty stepper on each My List row** — Every item in My List now has a −/+ stepper button to set the quantity. Defaults to 1 when a row is added. The quantity carries through to clipboard copy, email and PDF output.
- **Size selector with price multiplier** — A dropdown on every My List row lets you select the bottle size. Selecting a non-750ml size automatically multiplies the Reserve, Low and High prices by the appropriate factor. The adjusted prices and size carry through to the email and PDF output.
- **Expanded bottle size list** — The size dropdown covers all major wine and spirits formats: 50ml (Miniature), 100ml, 200ml, 350ml, 375ml (Half), 500ml, 700ml, 750ml (Standard), 1000ml, 1500ml (Magnum), 1750ml, 3000ml (Double Magnum), 4500ml (Jeroboam), 6000ml (Imperial), 9000ml (Salmanazar), 12000ml (Balthazar), and 15000ml (Nebuchadnezzar). Each has a calibrated multiplier relative to 750ml.
- **Paste from spreadsheet** — A 'Paste rows from spreadsheet' button in the My List footer expands a textarea. Copy rows from Excel or Google Sheets with columns Vintage, Wine, Qty, Size, Reserve, Low, High and paste directly — the app parses the tab-separated data and adds each row to My List as a manual entry instantly.
- **All paste column tags highlighted** — All seven column labels (Vintage, Wine, Qty, Size, Reserve, Low, High) are shown as gold-on-dark tags above the paste textarea so the expected column order is always visible without needing to remember it.

### Improved
- **Manual entries bypass price multiplier** — Rows added via paste or marked as manual are not affected by the size multiplier. Prices entered manually are assumed to already reflect the correct bottle size and are output exactly as entered in the panel, email and PDF.

---

## [1.9.5] — 26 March 2026  ·  My List & Presence Improvements

### New
- **My List auto-pop on add** — When a row is added to My List the panel slides open for 2 seconds then automatically closes, giving a clear visual confirmation without permanently blocking the results view. Manually opening the panel via the tab keeps it open as normal.

### Improved
- **Auction cutoff uses Adelaide close date** — The upcoming auctions shown in email and PDF now refresh to the next auction once the Adelaide submission deadline passes, rather than waiting until the auction start date. Since Adelaide has the earliest deadline this ensures the output is always actionable.
- **Online count via heartbeat ping** — Each open browser tab now writes a silent presence ping to the database every 30 seconds. The header count polls for unique users active in the last 60 seconds every 15 seconds. Presence pings are automatically filtered from trending search stats so they don't pollute the data.
- **Team member emails loaded on login** — The user_profiles lookup that maps user IDs to email addresses now runs immediately on login rather than waiting for the trending panel to open, so team member names are always available when the panel is first viewed.

### Fixed
- **Online count stuck at 1** — The previous implementation was hardcoded to 1. Now dynamically counts unique active users via the heartbeat ping system.

---

## [1.9.25] — 26 March 2026  ·  Date Formatting

### Fixed
- **Auction dates now show ordinal suffixes** — Dates in both the email and PDF export now display as 'Wednesday 1st April', 'Friday 10th April' etc. rather than plain numbers like 'Wednesday 1 April'. Applied to all auction start, end, Adelaide closes and Melbourne closes dates.

---

## [1.9.0] — 26 March 2026 · Email & PDF Export

### New
- **Email export** — a new Email button in the My List panel opens a modal to enter the recipient's name, then displays a fully formatted valuation email in a copy window. Clicking \"Copy all\" copies the rich HTML email to the clipboard — pastes into Gmail or Outlook web with all formatting intact (fonts, colours, table layout, bullet points, links)
- **PDF export** — a PDF button opens a name modal then generates a branded A4 PDF in a new tab. A dark toolbar with a burgundy \"Save as PDF\" button hides the toolbar and triggers the print dialog. Output includes the Wickman's logo, burgundy section headings, full valuation table and all standard sections
- **Recipient name modal** — both email and PDF exports prompt for the recipient's name before generating. Used to personalise the \"Dear [Name]\" salutation. Supports pressing Enter to confirm
- **Auto-calculated auction dates** — both exports automatically include the next two upcoming auction dates, computed from a live iCal holiday calendar. Adelaide deadlines (9 days prior) and Melbourne deadlines (7 days prior) automatically roll back to the previous workday if they fall on a public holiday
- **Returns portal hyperlink** — the shipping section in both exports includes a clickable \"returns portal\" hyperlink to the AusPost returns portal, rendered in Wickman's burgundy


---

## [1.8.75] — 26 March 2026 · Email Content & Layout

### Improved
- **Original Wickman's email wording restored** — all body text restored verbatim to the original template, including the full notes section, hammer price disclaimer, R/L/H key, commission terms, packaging warnings, SA and VIC drop-off addresses, shipping instructions, and next steps with original step labels (Read and Sign, Prepare for Drop-Off, Drop Off or Ship)
- **R/L/H key in compact left-bordered box** — the reserve/low/high key is displayed in a tight left-bordered box with minimal line spacing, grouping all five lines as a single compact unit
- **\"Things to Keep in Mind\" moved after Upcoming Auctions** — section order now matches the original template
- **No logo or signature in email** — intentionally omitted; both are handled by the user's Outlook signature block. Email starts directly with \"Dear [Name]\"
- **Consistent Arial font throughout** — all email elements explicitly declare Arial to prevent app fonts leaking into the copy window

### Fixed
- **Email table text appearing non-black** — added explicit `color:#1A1714` inline on every `td` so colours cannot be overridden by email clients
- **Email rendering as raw HTML** — removed `white-space:pre-wrap` from the copy window CSS; the window now uses `dangerouslySetInnerHTML` to render rich HTML correctly


---

## [1.8.50] — 26 March 2026 · PDF Layout & Formatting

### Improved
- **A4 page layout with proper margins** — PDF uses `@page { size: A4; margin: 20mm 25mm }` with content constrained to 170mm wide centred on the page
- **Section page-break control** — \"Things to Keep in Mind\", \"Getting your wine to us\", and \"Next Steps\" are each wrapped in `page-break-inside:avoid` so they never split across pages; a section that doesn't fit at the bottom of a page moves entirely to the next
- **Wickman's logo at top of PDF** — logo embedded as a base64 data URI with a burgundy rule below it
- **PDF footer removed** — the \"Generated by Valuer Search · Confidential\" footer has been removed

### Fixed
- **PDF popup blocked by browser** — `window.open()` was being called after an `await`, making it look non-user-initiated to the browser. Fixed by opening the window synchronously inside the button's `onClick` and passing it into the PDF handler


---

## [1.8.25] — 24 March 2026 · Team Member Email Fix

### Fixed
- **Team member emails in trending panel** — the team member section was showing UUID fragments (e.g. `c7f3a2b1\…`) instead of email addresses. Fixed by adding a `user_profiles` table in Supabase — each user writes their own email on login, and the trending panel looks up emails from this table


---

## [1.8.0] — 24 March 2026 · Wine Detail Page

### New
- **Wine detail overlay** — click the \ⓘ button on any row to open a full-screen overlay showing the wine's price history chart, headline stats (all-time high, average, low, last sale, trend vs previous sale) and a complete table of all recorded sales sorted newest first
- **Price history chart** — plots High, Ave and Low prices across all auction dates using Chart.js. Interactive tooltip shows all three values per date. Colour coded — green for High, wine-red for Ave, grey for Low
- **\ⓘ info button column** — a dedicated column with a persistent \ⓘ button on every row. Clicking it opens the detail overlay without triggering the click-to-copy on the rest of the row
- **Column header icons** — the copy column shows a clipboard SVG icon and the info column shows \ⓘ so both are self-explanatory without text labels

### Fixed
- **Blank page on load** — caused by accumulated JSX structural errors across many patch edits. App was fully rewritten from scratch to resolve, restoring all features in a clean, stable file


---

## [1.7.0] — 23 March 2026 · Trending Bar Improvements

### Improved
- **Search count inside each bar** — the count number now sits on the right end of the bar itself rather than as a separate column. Gold text for the top 3, grey for lower-ranked terms
- **Bars increased in height to 18px** — to comfortably display the count label inside without crowding
- **Top 10 search terms shown** — increased from 5 to 10

### Fixed
- **Team member initials from email not UUID** — initials were being derived from the UUID, showing nonsensical characters. Fixed to use the first letter of the user's email address


---

## [1.6.0] — 23 March 2026 · Trending Panel Redesign

### New
- **Three-column layout** — redesigned as a clean grid: most searched terms (left), team member breakdown (centre), insights (right)
- **Searches today + daily average stat tiles** — live count of searches run today, and average searches per day for the selected period
- **Top vintage searched** — the most frequently searched vintage year extracted from queries, with search count
- **Most used source filter** — tracks which auction house filter is applied most often
- **Most active day of the week** — analyses timestamps to surface which day sees the highest team search activity

### Improved
- **Bar alignment fixed at all screen sizes** — bars scale fluidly using percentage widths rather than fixed pixels


---

## [1.5.0] — 23 March 2026 · My List Persistence

### Fixed
- **My list resets on page refresh** — list items are now saved to browser localStorage under the key `wickman_list` and restored automatically on every page load. Items persist across refreshes and return visits until manually cleared


---

## [1.4.0] — 23 March 2026 · Trending Searches

### New
- **Collapsible trending searches panel** — a slim toggle bar between the search bar and results. Click to expand and see the top searched terms across the whole team, ranked by frequency with bar chart
- **Most searched terms — 7d / 30d / All time filter** — top 7 queries shown with proportional bars and counts. Click any term to instantly run that search
- **Searches by team member** — breakdown of searches per logged-in user in the selected period
- **Automatic search logging** — every search is silently logged to a Supabase `search_logs` table with user ID, query and timestamp. No action needed from users

### Improved
- **Trending layout** — bar and count pinned together on the right with the search term filling remaining space on the left using CSS grid. Fixes misalignment at different screen widths

### Fixed
- **Trending panel not visible** — panel was being rendered outside the main content area. Moved to the correct position between the search bar and results table
- **Trending data not loading** — fetch response was not being validated as an array, causing silent failures when the API returned an error object. Added array validation, error logging and an explicit Accept header


---

## [1.3.0] — 23 March 2026 · Realtime Online Count

### New
- **Realtime online user count in header** — a green dot and live user count shows how many team members have the app open at that moment. Powered by Supabase Realtime Presence, updates instantly via WebSocket with no page refresh needed
- **Counts active browser sessions** — if two team members have the app open simultaneously the count shows 2, dropping automatically when someone closes the tab or signs out


---

## [1.2.0] — 23 March 2026 · My List Panel

### New
- **Collapsible \"My list\" slide-out panel** — fixed to the right edge of the screen with a \◀ tab. Click to open or close
- **Add rows across multiple searches** — click + on any row to add it to the panel. The list persists as you change your search query, so you can build comparable sales from multiple searches
- **Copy entire list to clipboard** — the \"Copy N rows\" button copies all added rows as tab-separated values. Pasting into Excel places each row on its own line with each field in its own cell
- **Live count badge on closed tab** — the row count is always visible on the tab even when the panel is closed
- **Clear entire list** — single button in the panel footer to wipe all rows and start fresh


---

## [1.1.0] — 20 March 2026 · Click-to-Copy

### New
- **Click anywhere on a row to copy** — copies the first 7 fields (Vintage, Wine, Qty, Size, Reserve, Low, High) to the clipboard as tab-separated values. Pasting into Excel places each field into its own cell
- **Copy confirmation — green flash + toast** — the clicked row flashes green and a \"\✓ Copied to clipboard\" toast appears at the bottom of the screen for 1.8 seconds


---

## [1.0.0] — 19 March 2026 · Initial Build

### Search & Data
- **NEW** Keyword search across all fields — query splits into individual words, all must match. Typing `grange 1998` finds Penfolds Grange Shiraz 1998 even though the words appear separately
- **NEW** Auction source filter dropdown — filter results to a specific auction house (Langtons, MW Wines, etc.)
- **NEW** Keyword highlights in results — matching words highlighted in gold in the results table
- **NEW** Vintage as first column — moved to first position with gold badge styling for faster scanning
- **NEW** Pagination — 50 rows per page with smart ellipsis display for large page counts
- **IMPROVED** Server-side sorting across all 110,000 rows — sorting via Supabase across the entire dataset, not just the 50 rows on screen. Page resets to 1 when sort changes
- **IMPROVED** Wine column — full name visible — long names wrap to a second line instead of truncating. Column width increased to 420px
- **FIXED** Table header alignment — sticky header was floating over the first two data rows due to an incorrect top offset

### Security & Authentication
- **NEW** Supabase private database backend — all 110,000 wine entries in a private Supabase PostgreSQL database. Raw data cannot be downloaded; only search results are returned
- **NEW** Login screen with email/password authentication via Supabase Auth
- **NEW** Session persistence — login session stored in browser localStorage, users stay logged in across visits
- **NEW** Authenticated API calls — all queries use the user's Bearer token. Row Level Security blocks all unauthenticated access

### Design & Branding
- **NEW** Wickman's brand redesign — cream/white backgrounds, Cormorant Garamond serif headings, wine-red accents, gold vintage badges, Inter body text
- **NEW** Wickman's SVG logo on login screen and in app header
- **NEW** Dark mode toggle — preference saved and persists between sessions
- **IMPROVED** Logo adapts to dark mode — text inverts to white; red corkscrew box and white icon unchanged in both modes
- **NEW** Auction source colour-coded chips — green for Langtons, gold for MW Wines, grey for others
- **NEW** Price colour coding — high prices in green, average prices in wine-red, null values as a dash
- **NEW** Active keyword tags displayed as pill badges below the search bar
- **NEW** Logged-in user email and Sign Out button in the header

### Hosting & Deployment
- **NEW** Hosted on GitHub Pages — free, always-on, no server required
- **NEW** Automated deployment via GitHub Actions — pushing to main triggers an automatic build and deploy, typically complete in 2\–3 minutes
- **NEW** `push.sh` one-command deploy script
- **NEW** Local development server — `npm run dev` previews changes at `localhost:5173`

---

## Summary

| | |
|---|---|
| **New Features** | 92 |
| **Improvements** | 41 |
| **Bug Fixes** | 48 |
| **Total Changes** | 181 |
| **Versions** | 30 |

| Version | Date | Highlight | New | Improved | Fixed |
|---------|------|-----------|-----|----------|-------|
| 3.1.1 | 16 April 2026 | Calculator Light Mode & Panel Behaviour Fixes | — | — | 2 |
| 3.1.0 | 16 April 2026 | Light/Dark Mode Polish & Panel Unification | 2 | 7 | 2 |
| 3.0.0 | 14 April 2026 | Full UI Redesign — Dark Theme & Sidebar Navigation | 7 | 7 | 6 |
| 2.5.0 | 13 April 2026 | Blank Email & Auction Date Tile | 2 | — | — |
| 2.4.2 | 13 April 2026 | Mobile Flag Feature & Panel Fixes | 2 | — | 6 |
| 2.4.1 | 10 April 2026 | Panel & Session Fixes | — | — | 6 |
| 2.4.0 | 10 April 2026 | Size Flags & Text Notes | 3 | — | 3 |
| 2.3.3 | 3 April 2026 | Mobile Feature Pack | 5 | — | — |
| 2.3.1 | 1 April 2026 | Mobile Polish | — | 3 | 5 |
| 2.3.0 | 30 March 2026 | Mobile Layout | 8 | — | — |
| 2.2.3 | 30 March 2026 | Valuation History | 10 | — | — |
| 2.2.2 | 28 March 2026 | Sami-Odi Identification Tool Link | 1 | — | — |
| 2.2.1 | 27 March 2026 | Valuation Table Fixes | — | 5 | 1 |
| 2.2.0 | 27 March 2026 | Pricing Calculator | 10 | — | 4 |
| 2.1.0 | 26 March 2026 | My List Panel Redesign | 6 | 1 | — |
| 2.0.25 | 26 March 2026 | Size Normalisation & Bidirectional Price Adjustment | 2 | — | 2 |
| 2.0.0 | 26 March 2026 | Valuation Table Columns & PDF Fix | 7 | 4 | 2 |
| 1.9.0 | 26 March 2026 | Email & PDF Export | 5 | — | — |
| 1.8.75 | 26 March 2026 | Email Content & Layout | — | 5 | 2 |
| 1.8.50 | 26 March 2026 | PDF Layout & Formatting | — | 4 | 1 |
| 1.8.25 | 24 March 2026 | Team Member Email Fix | — | — | 1 |
| 1.8.0 | 24 March 2026 | Wine Detail Page | 4 | — | 1 |
| 1.7.0 | 23 March 2026 | Trending Bar Improvements | — | 3 | 1 |
| 1.6.0 | 23 March 2026 | Trending Panel Redesign | 5 | 1 | — |
| 1.5.0 | 23 March 2026 | My List Persistence | — | — | 1 |
| 1.4.0 | 23 March 2026 | Trending Searches | 4 | 1 | 2 |
| 1.3.0 | 23 March 2026 | Realtime Online Count | 2 | — | — |
| 1.2.0 | 23 March 2026 | My List Panel | 5 | — | — |
| 1.1.0 | 20 March 2026 | Click-to-Copy | 2 | — | — |
| 1.0.0 | 19 March 2026 | Initial Build | — | — | — |

---

*Valuer Search is an internal tool for the Wickman's Fine Wine & Whisky Auctions team.*
*Data is stored securely in Supabase and is not publicly accessible. Authentication is required.*
