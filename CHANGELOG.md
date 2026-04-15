# Valuer Search Changelog

## v3.1.1 — Calculator Light Mode & Panel Behaviour Fixes
*April 2026*

### Fixes
- **Calculator light mode** — modal now fully adapts to light mode: white background, dark title text, burgundy drawer title, and solid ghost-style buttons for Copy, Clear and Copy All — all previously invisible due to `rgba(255,255,255)` values rendering on a white surface
- **My List auto-close** — panel no longer flashes closed and re-opens when adding an item while it is already open. The 2-second auto-close only fires when the panel was closed before the item was added

---

## v3.1.0 — Light/Dark Mode Polish & Panel Unification
*April 2026*

### Panel Tab Navigation
- Unified My List, History, and Flags into a single shared tab bar embedded directly inside each panel — slides in/out as part of the panel, no separate floating element
- All three panels standardised to 380px width with 2.5px burgundy left border
- Single `activePanel` state replaces three separate boolean states

### Light Mode Fixes
- VIC cutoff label now uses `var(--vic-lbl-c)` — readable in both modes
- Sidebar corkscrew logo wrap reduced to 56px to align border with header
- Comprehensive single-source light mode override block — eliminated 97 conflicting duplicate overrides hardcoding dark values in light mode
- `btn-pdf` visible in light mode. Calc inputs, history items, flag entries, list items all corrected
- Paste-from-spreadsheet uses `var(--dk-*)` vars instead of light-only palette vars

### My List Panel
- "Clear entire list" promoted from tiny underlined link to full-width ghost button
- Confirm prompt matches the button height, padding and type scale — no layout shift
- Paste-from-spreadsheet section enlarged (font 10→11px, textarea 60→80px, padding scaled)
- Hover states added for confirm-go, confirm-cancel, and clear buttons in dark mode

### Calculator
- Subtitle changed from "Median recent hammer price" to "Average hammer price"

### Code Quality (Audit)
- 5 duplicate CSS selectors removed
- 16 dark hex values corrected in light mode override block
- 0 duplicate light mode overrides remaining

---

## v3.0.0 — Dark/Light Mode, Sidebar Redesign
*See previous changelog entries*
