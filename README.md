# Frontend Codebase Guidelines (React + Vite + TypeScript - Modular Architecture)

📁 Base Directory: /src

> 🧭 **Architecture Context**: This project follows a **Modular Frontend + Microservices** approach
>
> * Each frontend feature is isolated in its own module.
> * Backend services communicate via APIs and are independently deployed.

## How to Contribute a Feature:

1.  Create a new folder inside `src/features` with the feature name (e.g., `attendance`, `qms`).

2.  Add the following subfolders/files:

    *   `/pages`: Page components that are rendered via routes.
    *   `/components`: UI elements used in the feature.
    *   `api.ts`: Axios or fetch-based API functions for this feature only. **Use `.ts`, not `.tsx`, since no JSX is used.**
    *   `types.ts`: Define TypeScript interfaces/types for your feature.

3.  **Create a feature-specific route file inside your feature folder:**
    *   Name it `YourFeatureNameRoutes.tsx` (e.g., `qmsRoutes.tsx`, `libraryRoutes.tsx`).
    *   Keep all routes related to this feature within this file.
    *   **Ensure these internal routes are wrapped in their own `<Routes>` component and use relative paths.**

4.  Register the feature's top-level route in `src/routes.tsx`.
    *   Use `React.lazy` for lazy-loading the feature's primary route component (e.g., `LibraryRoutes`).
    *   Map the feature's base path using the `/*` wildcard (e.g., `<Route path="/Library/*" element={<LibraryRoutes />} />`).
    *   Wrap the main `<Routes>` in `src/routes.tsx` with `<Suspense fallback={<div>Loading...</div>}>`.

5.  Use `.tsx` for all components/pages, even if no JSX is used, for consistency.

6.  Add a `README.md` inside the feature folder if the logic or structure grows complex.

## Tools and Conventions:

*   Use TypeScript strictly.
*   Prefer lazy loading routes.
*   Follow Tailwind CSS naming conventions (if used).
*   Follow React best practices: controlled components, lifting state, prop drilling only if needed.

## Do NOT:

*   Do not import components or logic from another feature directly.
*   Do not place general-purpose functions/components in a specific feature folder.
*   Do not use global state without purpose — prefer local state or feature-scoped logic.

## Helpful Tips:

*   Keep each feature independent and testable.
*   Use consistent naming and code comments.
*   Use absolute imports via `vite.config.ts` aliasing if necessary (e.g., `@/features/qms/...`).
*   Include a `__tests__/` folder or colocate tests for components where applicable.

---

## 🧑‍💻 GitHub Workflow Guidelines (Dev ↔ Main)

> 🔀 We use two primary branches: `dev` (development) and `main` (production-ready).

### ✅ General Rules:

*   **Everyone should work only in `dev` branch.**
*   Never commit or push directly to `main`.
*   After finishing a feature or fix, push changes directly to `dev`.
*   Once tested on `dev`, create a Pull Request to `main`.

### 🧾 Steps to Contribute:

1.  **Checkout and pull latest `dev`**:

    ```bash
    git checkout dev
    git pull origin dev
    ```

2.  **Do your changes directly on `dev`**

3.  **Add, Commit & Push:**

    ```bash
    git add .
    git commit -m "feat: <your-change-description>"
    git push origin dev
    ```

4.  **Create a Pull Request:**

    *   Go to GitHub.
    *   Compare: `dev` → `main`
    *   Add reviewers if needed.

### 🛑 Do NOT:

*   Push directly to `main`.
*   Merge untested features.
*   Skip the pull request process for `dev → main`.

---

Updated: \[24-June-2025]