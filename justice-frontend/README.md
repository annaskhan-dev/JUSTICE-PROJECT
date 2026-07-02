# JusticeEase — Frontend

A premium, minimalist frontend for a legal-tech platform. Built with React 18, React Router, Vite, and Tailwind CSS.

## Design tokens

- **Background:** Deep ink navy (`#0B1220` / `ink-900`), near-black at edges
- **Brand accent:** Antique gold (`#C9A24B` / `gold-400`) — pulled from the reference moodboard
- **Secondary:** Cool slate (`#8893A6` / `slate-350`) for supporting text
- **Display type:** Fraunces (serif, used sparingly for headlines)
- **Body type:** Inter
- **Utility/data type:** IBM Plex Mono (category tags, IDs, eyebrow labels)
- **Signature element:** a custom gold ring-and-dot cursor (`CustomCursor.jsx`) that widens over anything clickable — a quiet nod to legal precision

The provided logo (`src/assets/images/logo.png`) is used in the navbar, footer, and auth screens, set on a soft white badge so it reads cleanly against the dark background.

## Getting started

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build to /dist
```

## Connecting your backend

1. Set `VITE_API_URL` in `.env` to your Node.js/PHP server.
2. `src/services/api.js` already has `login`, `register`, `searchLaw`, and `submitContact` functions shaped to match standard REST responses — swap the mock bodies inside `Home.jsx`, `Login.jsx`, `Register.jsx`, and `SearchBar.jsx` for these calls (each spot is marked with a `// Swap for: api...` comment).
3. `src/data/lawArticles.js` is a mock dataset matching the shape `GET /law/search` should return. Replace the local `.filter()` call in `SearchBar.jsx` with the real API call once it's live.
4. `AuthContext.jsx` stores the user + token in memory and `localStorage` as a starting point — move to httpOnly cookies once your backend issues real sessions.

## Structure

```
src/
├── assets/images/        # logo + hero imagery
├── assets/styles/        # Tailwind entrypoint + global CSS
├── components/           # Navbar, CustomCursor, LawCard, SearchBar
├── context/AuthContext.jsx
├── data/lawArticles.js   # mock law dataset
├── pages/                # Home, Login, Register, SearchResults
├── services/api.js       # central fetch wrapper
├── App.jsx
└── main.jsx
```
