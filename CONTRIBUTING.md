# Contributing to Questboard

Thanks for your interest! Questboard is a family chore tracker — contributions that keep it simple, fun, and easy to self-host are most welcome.

## What's welcome

- Bug fixes
- New monsters or chore suggestions (open an issue first so we can discuss)
- UI/UX improvements
- Documentation fixes
- Performance improvements

## What to check before opening a PR

- Keep the scope small. One thing per PR is easier to review.
- Don't add new dependencies without discussing it first.
- Test it on a phone or tablet — that's the primary use case (kitchen display).

## Running locally

**Frontend** (hot-reload on `:5174`):
```bash
cd frontend
npm install
npm run dev
```

**Backend** (auto-reload API on `:5050`):
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload --port 5050
```

The dev server proxies `/api/*` to the backend automatically.

## Project structure

```
frontend/src/
  App.jsx          — main app logic and state
  data.js          — monsters, chores, rewards, loot table
  logic.js          — pure game logic (XP, levels, crits, badges)
  components/      — UI components
backend/
  main.py          — FastAPI server, state persistence
```

Game balance lives in `frontend/src/data.js` — monster HP/gold, reward costs, chore point values.

## Submitting a PR

1. Fork the repo and create a branch from `main`
2. Make your changes
3. Open a pull request with a clear description of what changed and why
4. Screenshots help a lot for visual changes

## Issues

Bug reports and feature ideas are welcome at the [issue tracker](https://github.com/thillygooth/questboard/issues). Please check for duplicates before opening a new one.
