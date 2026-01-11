# Frontend (React + Vite)

Overview

- This is the frontend for the Blogify coding assignment. It's a React app bootstrapped with Vite and styled with Tailwind CSS.

Prerequisites

- Node.js v16+ (recommended v18+)
- npm

Quickstart

1. Install dependencies

```bash
cd frontend/frontend
npm install
```

2. Create environment variables in a `.env` file (in `frontend/frontend`):

```env
VITE_API_URL=http://localhost:5000/api/v1
```

3. Run development server

```bash
npm run dev
```

4. Build for production

```bash
npm run build
```

5. Preview production build locally

```bash
npm run preview
```

Notes about the app

- Dev server default: Vite chooses an available port (commonly 5173 or 5174). Use the URL printed in the terminal.
- The frontend reads `VITE_API_URL` to make API calls (see `src/services/api.js`). Ensure it points at the backend base URL.

Authentication flows

- Signup and login use `/auth/signup` and `/auth/login` via the `authService`.
- On success the app stores `accessToken`, `refreshToken`, and `user` in `localStorage`.
- Token refresh and auth headers are handled by `src/services/api.js` interceptors.

Common commands

- `npm run dev` — start dev server
- `npm run build` — create production build
- `npm run preview` — preview the production build

Troubleshooting


- CORS issues: ensure `CORS_ORIGIN` on the backend permits the frontend origin.
- Environment variables: Vite requires variables prefixed with `VITE_`.

Files of interest

- `src/components/common/Toast.jsx` — toast notification component
- `src/context/AuthContext.jsx` — handles login/signup/logout and localStorage
- `src/services/api.js` — axios instance and interceptors
- `src/services/authService.js` — auth API calls

