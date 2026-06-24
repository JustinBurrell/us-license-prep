# US Driver's License Prep

An interactive, single-file study app for the US DMV signs and written knowledge tests, covering all 50 states plus DC. Pick your state and get the signs, road rules, document checklist, and practice tests tailored to your DMV.

## Features

- **50 states + DC.** Select your state on the landing screen; switch anytime from the header. Each state drives its own knowledge-test format, document requirements, residency notes, and DMV link.
- **Signs reference.** Every regulatory, warning, and guide sign, rendered from the federal MUTCD standard with a drawn-SVG fallback when offline.
- **Flashcards.** Flip-card drills for signs and rules, filterable by deck and shuffleable.
- **Practice tests.** Three versions plus a random mix, with the passing threshold scaled to each state's real percentage.
- **Road test guide.** What the examiner scores, the automatic-fails, and a vehicle-readiness checklist.
- **Progress tracking.** Saved in the browser (no login). View per-state or aggregate across every state studied, with a state filter and a most-missed-topics review list.
- **Print-friendly.** A print stylesheet turns it into a clean paper study sheet.

## Tech

Plain HTML, CSS, and vanilla JavaScript in a single file. No build step, no dependencies. Sign images load from Wikimedia Commons (MUTCD, public domain) with offline SVG fallbacks. Progress persists via `localStorage`.

## Run locally

Open `index.html` in any browser. That's it.

## Deploy

Any static host works. On Vercel, import the repo and deploy with no configuration; the included `vercel.json` serves `index.html` at the root.

## Disclaimer

Test formats and state rules are study guidance and can change. Always confirm specifics with your official state DMV before testing.

---

Built by [Justin Burrell](https://www.linkedin.com/in/thejustinburrell/) · [GitHub](https://github.com/JustinBurrell)
