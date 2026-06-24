# CLAUDE.md

Context and working conventions for this repository. Read this before making changes.

## What this project is

An interactive, client-side study app for the US DMV signs and written knowledge tests, covering all 50 states plus DC. The user picks their state on a landing screen and gets signs, road rules, a document checklist, practice tests, a road-test guide, and progress tracking, all tailored to that state. It is a portfolio project for Justin Burrell.

There is **no backend**. Everything runs in the browser. Progress persists via `localStorage`. Sign images load from Wikimedia Commons (MUTCD, public domain) with drawn-SVG fallbacks when offline.

## Current state of the codebase

Right now the entire app is a single file: `index.html` (HTML + CSS in a `<style>` block + JavaScript in a `<script>` block). It works and is deployed, but the single-file structure is the first thing to improve.

## The immediate goal: split the single file into a clean structure

Break `index.html` into maintainable files **without changing behavior or appearance**. Target structure:

```
/
  index.html          # markup only; links the css and js
  /css
    styles.css         # all styles from the current <style> block
  /js
    states.js          # the STATES data object (50 states + DC) and any per-state lookups
    signs.js           # the sign SVG library (S{}), MUTCD map, signMarkup()
    data.js            # RULES, RULE_CARDS, TESTS, RT_SKILLS, RT_FAILS, DOC builders, TEST_PARTS
    app.js             # rendering, tabs, flashcards, quiz, progress, landing/state logic
  vercel.json
  README.md
  CLAUDE.md
```

Load order in `index.html` matters: `states.js` -> `signs.js` -> `data.js` -> `app.js`. Keep everything in plain browser globals (no bundler, no modules/imports) so it still runs by just opening `index.html`. Do not introduce a build step or framework. Do not add dependencies.

### Rules for the split

- **Behavior and visuals must stay identical.** After splitting, the app should look and work exactly as before. Verify each tab, the landing screen, state switching, flashcards, all three practice tests, progress (per-state and all-states with the filter), and print.
- Move code verbatim where possible; only change what's needed to share across files (e.g. ensure functions/consts referenced across files are global).
- Keep the MUTCD image + SVG fallback logic intact.
- Keep `localStorage` keys unchanged (`ncdmv_progress_<ABBR>`, `ncdmv_state`) so existing users keep their progress.
- Keep the print stylesheet working.

## Architecture notes (how it works today)

- **State system:** `STATES` is keyed by abbreviation, each with `{name, abbr, dmv, q, pass, pct, residency}`. `applyState(abbr)` updates the shield, header, badges, title, and re-renders all state-dependent content. `CUR` holds the active state.
- **Per-state content:** test format (`q`/`pass`/`pct`), document cards (`buildDocCols()`), residency note, DMV link, and the quiz pass threshold (`passThreshold()`) all derive from `CUR`. The signs and core road rules are shared (federal MUTCD + near-universal US rules).
- **Landing:** a full-screen overlay (`#landing`) shows first. Selection is remembered for the session via `sessionStorage`; the persistent site footer appears once a state is chosen.
- **Progress:** stored per state under `ncdmv_progress_<ABBR>`. The Progress tab toggles between this-state and all-states (aggregated across every `ncdmv_progress_*` key), with a state filter in the all-states view and a most-missed-topics list.
- **Signs:** `S{}` holds inline SVGs; `MUTCD{}` maps sign keys to Commons filenames; `signMarkup()` returns an `<img>` (real sign) with the drawn SVG as an `onerror` fallback.

## Important constraints

- **Accuracy honesty:** per-state test numbers (question count, passing score) are study guidance and can change. The app states this on the landing screen, the rules tab, and the footer. Keep those disclaimers. Do not present figures as official.
- **No personal data.** The app must stay generic for any user. Do not reintroduce anything specific to one person.
- **No login, no backend, no tracking.** Progress is local-only by design.
- **Footer credit stays:** the site footer credits Justin Burrell with LinkedIn and GitHub links. Keep it.

## After the split: good follow-up work

- Validate or update each state's `q`/`pass` against official handbooks; add a `verified` flag per state.
- Add a few genuinely state-specific rule notes (right-on-red, move-over specifics) where they differ.
- Light accessibility pass (focus states, aria labels, keyboard nav on tabs).
- Optional: a small favicon and social/OG meta tags for sharing.

## Commit conventions

Use **Conventional Commits**: `type(scope): short summary` in the imperative mood, lowercase summary, no trailing period.

Types: `feat`, `fix`, `refactor`, `style`, `docs`, `chore`, `perf`, `test`.

Scopes (suggested): `states`, `signs`, `quiz`, `progress`, `landing`, `print`, `build`, `repo`.

Examples:
- `refactor(build): split index.html into css and js modules`
- `feat(progress): add state filter to all-states view`
- `fix(signs): correct keep-left arrow fallback`
- `docs(readme): document local run and deploy steps`
- `chore(repo): add vercel.json and gitignore`

Guidelines:
- One logical change per commit; keep them small and reviewable.
- The refactor should land as a series of commits (one per file extracted, plus a final wiring commit), not one giant commit.
- Don't mix a refactor with behavior changes in the same commit.
- Write commit bodies when the summary isn't self-explanatory (what and why).

## Deploy

Static site. `vercel.json` serves `index.html` at the root with `cleanUrls`. Every push to `main` auto-deploys on Vercel. No build command, no environment variables.
