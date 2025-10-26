# Tickify - Ticket Management App ([React|Vue] Version)

A robust ticket management web app built for HNG-13 Stage 2. Features landing page, auth (login/signup with validation/toasts), dashboard (stats/logout), and CRUD tickets (real-time val, localStorage persistence). Identical UI across frameworks (wave hero, circles, 1440px max, responsive).

## Frameworks & Libraries Used
- **[React|Vue.js 3]**: Core framework.
- **[react-router-dom|vue-router]**: SPA routing with protected guards.
- **[react-hot-toast|vue-toastification]**: Inline/toast notifications.
- **[lucide-react|lucide-vue-next]**: Icons (Menu, X, Eye, etc.).
- **Vanilla CSS**: Responsive (Flex/Grid, media queries), semantic HTML, accessibility (ARIA, focus).
- **localStorage**: Simulated auth/tickets (no backend).

## Setup & Run Locally
1. Clone repo: `git clone [REPO_URL] && cd tickify-[react|vue]`.
2. Install deps: `npm install`.
3. Run dev server: `npm start` ([React: localhost:3000|Vue: localhost:5173]).
4. Build for prod: `npm run build` ([React: serve build|Vue: serve dist]).

## Switching Versions
- **React**: [GitHub Repo](https://github.com/[user]/tickify-react) | [Netlify Live]([URL]).
- **Vue**: [GitHub Repo](https://github.com/[user]/tickify-vue) | [Netlify Live]([URL]).
- **Twig**: Coming soon—static templates with PHP sim.

## UI Components & State Structure
- **Landing**: Static hero (wave SVG, circles, CTAs), features cards, footer.
- **Auth (Login/Signup)**: Forms with v-model/reactive, real-time val (computed errors), password toggle, toasts on submit.
- **Dashboard**: Stats cards (computed from tickets ref), sidebar nav (props/emits), logout clears localStorage.
- **Tickets**: Form (reactive form, val on input/blur), list (v-for cards with status classes), CRUD (save/load localStorage, confirm delete).
- **State**: Reactive refs/reactive for form/errors/tickets, computed for stats/hasErrors, onMounted for guards/load.

## Accessibility & Notes
- Semantic HTML (`<main>`, `<section>`, `<label for>`, ARIA-describedby for errors).
- Focus visible (`:focus { outline: 2px solid #60A5FA; }`), keyboard nav (buttons/links).
- Responsive: Mobile stack/column, desktop row/grid (900px+ breakpoint).
- Notes: localStorage sim (no real API); test in incognito for fresh session. No known issues—Lighthouse accessibility 95%+.

## Test User Credentials
- Signup any email (e.g., test@example.com), password >=6 chars.
- Login with created creds.
- Create tickets: Title required, status dropdown, desc optional (>=10 chars if filled).

This project was built as part of the HNG 13 Frontend Track Stage 2
Created by Muhammed Kabiru Nasiru — Frontend Developer passionate about design, interactivity, and AI-driven web experiences.