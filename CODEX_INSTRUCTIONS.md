# Globe Recipes - Codex Instructions

This document defines coding and workflow rules for **Codex** in the Globe Recipes project.

## 1) Project Scope and Goals

- Build and maintain a SvelteKit web app about world cuisines.
- Keep the UI consistent, responsive, and Bootstrap-based.
- Use MongoDB for persistent data (recipes, users, sessions, favorites).
- Prioritize readability, maintainability, and predictable behavior.

## 2) Tech Stack (Use These)

- Framework: `SvelteKit`
- Styling/UI: `Bootstrap 5` (CSS + bundle already integrated in `src/app.html`)
- Database: `MongoDB` (Atlas/Compass compatible)
- Runtime: `Node.js`
- Deployment target: `Netlify`

## 3) Project Structure Rules

- Keep route-specific pages inside `src/routes/**`.
- Keep reusable UI in `src/lib/components/**`.
- Keep static datasets/constants in `src/lib/data/**`.
- Keep server/database logic in `src/lib/server/**`.
- Keep utility/setup scripts in `scripts/**`.
- Keep public images/assets in `static/**`.

## 4) Frontend Rules (Svelte + Bootstrap)

- Prefer Bootstrap classes and components before writing custom CSS.
- Reuse existing components (for example `PageShell`, `ContentBox`, table/navigation components) instead of duplicating layout.
- Keep pages responsive for mobile, tablet, and desktop.
- Preserve dark mode support when adding/changing UI.
- Use semantic HTML (`h1-h3`, `button`, `label`, `form`, etc.).
- Keep interactions accessible:
  - clear focus/hover states,
  - readable contrast,
  - descriptive button/link labels.

## 5) Routing and Page Behavior

- Keep navigation consistent with existing app routes:
  - `/`, `/continents`, `/create`, `/all-recipes`, `/about`.
- For recipe detail pages, use dynamic id routes: `/all-recipes/[id]`.
- If adding list subviews, keep clear navigation (tabs/pills/links).
- Do not break in-app navigation behavior (SvelteKit client-side routing).

## 6) Backend Rules (Load Functions and Actions)

- Use `+page.server.js` for server-side loading and form actions.
- Validate all incoming form data on the server.
- Return user-friendly error messages.
- Use proper HTTP error semantics (`400`, `401`, `403`, `404`, `500`, `503`) where applicable.
- Keep mutation logic (create/delete/toggle favorite) server-side only.

## 7) Database Rules (MongoDB)

- Read connection settings from env vars:
  - `MONGODB_URI`
  - `MONGODB_DB_NAME`
- Do not hardcode credentials or secrets in code.
- Use collections consistently:
  - `recipes`
  - `users`
  - `sessions`
  - `favorite_recipes`
- Keep indexes aligned with app behavior:
  - recipes: owner/filter/sorting indexes,
  - users: unique username index,
  - sessions: token and expiry indexes,
  - favorites: unique `(userId, recipeId)` index.
- When recipe ids are displayed/used in routes, use Mongo `_id` string values.

## 8) Authentication and Authorization Rules

- Use session-based auth with secure cookie handling.
- Store auth/session secrets in environment variables only.
- Protect routes/actions that require login (for example create recipe, favorite toggles).
- Enforce ownership checks for destructive actions (for example delete own recipe only).

## 9) UI Content and Design Consistency

- Keep typography and button styles consistent with global styles in `src/routes/+layout.svelte`.
- Keep page backgrounds and content-box overlays readable in light and dark mode.
- Favor simple, clear layouts over overly complex custom styling.

## 10) Code Quality Rules

- Prefer small reusable components over very large page files.
- Keep naming consistent and descriptive.
- Avoid dead code and duplicate logic.
- Add concise comments only where logic is not obvious.
- Avoid introducing breaking changes to existing working flows.

## 11) Git and Change Management

- Make focused, logical commits (one topic per commit when possible).
- Use clear human-like commit messages (imperative mood).
- Do not commit `.env` or secret values.
- Keep `.env.example` as non-secret template only.

## 12) Testing and Verification Checklist

Before finishing a change:

- Run build locally (`npm run build`).
- Verify dark/light mode readability on touched pages.
- Verify affected forms/actions (success + validation errors).
- Verify routing and navigation links.
- Verify responsive behavior for changed layouts/components.

## 13) Netlify Deployment Rules

- Keep adapter and deploy config aligned with Netlify setup.
- Ensure required environment variables are configured in Netlify UI.
- Do not expose credentials in logs, screenshots, or committed files.
- If deployment behavior differs from local, first check:
  - env variables,
  - static asset paths under `static/`,
  - server-only code usage.

## 14) Preferred Codex Behavior

When generating or changing code:

- Ask for clarification only if necessary.
- Otherwise make safe, reasonable assumptions and proceed.
- Explain changes briefly and concretely.
- Preserve existing working features unless explicitly asked to redesign them.

## 15) Markdown and README Standards

Use Markdown consistently for `README.md` and project documentation.

- Documentation language for this project is **German**.
- For `README.md`, the provided chapter structure from the course template must **not** be changed (same chapter order and headings).
- Write documentation in clear, short sections with meaningful headings (`#`, `##`, `###`).
- Prefer simple Markdown syntax over complex formatting.
- Use bullet lists for steps/checklists and keep them easy to scan.
- Use bold text for important keywords and inline code formatting for:
  - file paths,
  - commands,
  - environment variables,
  - route names.
- Use fenced code blocks for commands and config examples (for example `bash`, `js`, `json`, `toml`).
- Add links in Markdown style `[text](url)` for docs and references.
- Include images in README with Markdown image syntax when useful:
  - `![description](path-or-url)`
- Keep README content practical and project-specific:
  - setup,
  - environment variables,
  - run/build/deploy steps,
  - important architecture decisions.
- Keep the tone professional and easy to understand for classmates and reviewers.
