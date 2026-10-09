# NEUROCODE
AI debugging and code-learning platform. Express + SQLite backend, single-page frontend in `public/`.

## Run locally (Node 20+)
    npm install
    cp .env.example .env     # set JWT_SECRET; add ANTHROPIC_API_KEY for live AI
    npm run dev              # http://localhost:3000

## Environment variables
JWT_SECRET (required, 24+ chars), ANTHROPIC_API_KEY (optional), ANTHROPIC_MODEL, DB_PATH, PORT.
Without an API key the app runs a clearly labeled demo static analyzer. Code is never executed.

## Database
SQLite file created from `db/schema.sql` (tables: users, sessions). Passwords are bcrypt hashed; JWT sessions last 7 days.

## Deploy (Render)
1. Push this folder to a GitHub repo (`.env` and `data/` are git-ignored).
2. Render > New > Web Service (or Blueprint using render.yaml). Build `npm install`, start `npm start`.
3. Add env vars JWT_SECRET and ANTHROPIC_API_KEY.
4. For history that survives redeploys, attach a persistent disk (paid plan) mounted at /var/data and set DB_PATH=/var/data/neurocode.db. On the free plan the SQLite file resets on redeploy.
Railway (with a volume) and Fly.io work the same way. Vercel/Netlify do not suit this app because SQLite needs a persistent server.

## Known limitations
No code execution sandbox, no automated tests yet, passcode-only accounts (no email recovery).

## Tests
`npm test` runs 43 Python/JavaScript test cases (`tests/analyzer.test.js`) against the demo analyzer: syntax, runtime, logical, correct-code and known-limit cases. The same cases appear in the app under **Test Lab** and in the Analyze page's "Load example" menu.
