# Digital Wardrobe Manager

A small full-stack app — **React** (CDN, no build step) + **Express.js** + **MySQL** —
built so that every topic on your list has a working, runnable example in it.

## What it does
Add clothing items (name, category, color, season), see them rendered as garment
"hang-tag" cards, mark favorites, log wears, and delete items. Data is stored in MySQL
and served through an Express API.

## Project structure
```
wardrobe-manager/
├── backend/
│   ├── server.js              # Express app, routes
│   ├── db.js                  # MySQL connection (mysql2)
│   ├── routes/wardrobe.js     # CRUD API endpoints
│   ├── database/init.sql      # auto-run schema (integrated into API startup)
│   ├── sql/                   # standalone SQL files for the MySQL topics
│   ├── package.json
│   └── .env.example
└── frontend/
    ├── index.html              # React app (class + functional components, hooks)
    └── styles.css
```

## How to run it

1. **Install MySQL** locally (or use one you already have running).
2. **Backend setup**
   ```bash
   cd backend
   npm install
   cp .env.example .env
   # edit .env with your MySQL username/password
   npm start
   ```
   The server prints `Hello World` to the terminal console and starts on
   `http://localhost:5000`. It automatically runs `database/init.sql` on
   first boot, so the database and table are created for you — no manual
   step needed.

3. **Open the app**: visit `http://localhost:5000` in your browser. The
   Express server serves the React frontend directly, so there's nothing
   extra to build or start for the frontend.

4. Other routes to try:
   - `http://localhost:5000/hello` → topic 4a, plain "Hello World" response
   - `http://localhost:5000/console-hello` → topic 4c, open devtools console
   - `http://localhost:5000/about` → topic 4b, second route on the small site
   - `http://localhost:5000/api/wardrobe/items` → the CRUD API (topic 4d)

## Topic → file map

| Topic | Where |
|---|---|
| 2a. Counter, class component | `frontend/index.html` → `ClassCounter` |
| 2b. Counter, functional component | `frontend/index.html` → `FunctionCounter` |
| 2c. Button click handling | `frontend/index.html` → `StyleTipButton` |
| 2d. Conditional rendering | `frontend/index.html` → `WardrobeList` (empty state) |
| 2e. String literals | `frontend/index.html` → `Greeting` |
| 3a. useState hook | `FunctionCounter`, `AddItemForm`, etc. |
| 3b. useEffect + API fetch | `App` component's `useEffect` |
| 3c. Props sharing | `WardrobeList` → `ItemCard` |
| 3d. Forms | `AddItemForm` |
| 3e. map() rendering | `WardrobeList` |
| 4a. Hello World route | `backend/server.js` → `/hello` |
| 4b. Multiple routes | `backend/server.js` → `/`, `/about`, `/api/status` |
| 4c. Console log via Express | `backend/server.js` → `/console-hello` |
| 4d. CRUD with Express | `backend/routes/wardrobe.js` |
| 4e. API–MySQL connection | `backend/db.js` |
| 5a. Create DB + table (CLI) | `backend/sql/01_create_database.sql` |
| 5b. Create/insert/update queries | `backend/sql/02_insert_update_queries.sql` |
| 5c. Subqueries | `backend/sql/03_subqueries.sql` |
| 5d. Workbench script file | `backend/sql/04_workbench_script.sql` |
| 5e. Database dir + init.sql wired into API | `backend/database/init.sql` + `backend/db.js` |

## Notes
- The frontend loads React/Babel from a CDN and transforms JSX in the
  browser, so there's no `npm install` or build step for it — open it and
  it runs. This keeps the project "simple" as requested; for a production
  app you'd normally move to a bundler (Vite/CRA) instead.
- All database credentials live in `.env` (never commit a real one).
