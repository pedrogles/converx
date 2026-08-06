# AGENTS.md — Converx

## 1. Project mission

Modernize the existing **Converx** currency converter in the **same Git repository**.

The current application is a React 18 + Vite + JavaScript SPA. Migrate it to a production-ready architecture using:

- Next.js with App Router
- TypeScript with `strict: true`
- React Server Components by default
- Client Components only where interaction is required
- Tailwind CSS
- React Hook Form
- Zod for runtime validation
- Native `fetch` instead of Axios
- Vercel-compatible deployment

Preserve the product name, business purpose, favicon assets, relevant Portuguese copy, and useful existing behavior. Improve the implementation rather than blindly reproducing the old code.

The final application must be secure, accessible, responsive, SEO-friendly, maintainable, and suitable as a professional portfolio project.

---

## 2. Mandatory operating rules

Before changing code:

1. Inspect the full repository structure.
2. Read `package.json`, `.gitignore`, `.env`, `README.md`, the conversion page, API service, context, form, result component, styles, and Vercel configuration.
3. Run `git status` and report the current branch and uncommitted changes.
4. Never delete, replace, initialize, or modify the `.git` directory.
5. Never push, merge, create tags, rewrite Git history, or commit unless the user explicitly requests it. When commits are authorized, every commit must follow the Conventional Commits rules defined below.
6. Never print, copy, expose, or persist secret values in logs, documentation, source files, generated reports, or responses.
7. Do not make destructive changes when the working tree contains unrelated user changes.
8. For a destructive or ambiguous decision, stop and explain the risk before proceeding.
9. Work incrementally. Keep the application buildable at the end of each phase.
10. Do not claim that a command passed unless it was actually executed successfully.

Create and maintain these temporary migration documents while working:

- `MIGRATION_PLAN.md`
- `MIGRATION_STATUS.md`

`MIGRATION_PLAN.md` must describe the intended phases, affected files, risks, and rollback strategy before major changes begin.

`MIGRATION_STATUS.md` must track completed work, pending work, validation commands, failures, and technical decisions.

Remove these temporary documents at the end only if the user requests it.

---

## 3. Git workflow and Conventional Commits

### Branch model

The mandatory integration flow is:

```text
feature/* -> dev -> main
```

Branch responsibilities:

- `main`: production branch. It must always represent a releasable, validated state.
- `dev`: integration and homologation branch. Completed work is merged here first.
- `feature/*`: short-lived branches created from `dev` for new functionality or substantial migration work.
- `fix/*`: short-lived branches created from `dev` for non-production bug fixes.
- `hotfix/*`: exceptional branches created from `main` for urgent production corrections. After validation, merge the same correction into both `main` and `dev`.
- `refactor/*`, `perf/*`, `test/*`, `docs/*`, and `chore/*`: allowed when the branch purpose is more precise than `feature/*`. All normal work still flows into `dev` before `main`.

Do not commit directly to `main` or `dev`.

Before starting implementation:

1. Run `git status`, `git branch --show-current`, and `git branch --all`.
2. Confirm that the working tree has no unrelated changes.
3. Confirm whether `dev` exists locally and on `origin`.
4. If `dev` does not exist, stop and ask the user before creating it from `main`.
5. Update local references with `git fetch --prune`.
6. Switch to `dev` and update it using fast-forward only:
   `git pull --ff-only origin dev`
7. Create a short-lived working branch from the updated `dev`.

For the first migration phase, the preferred branch is:

```text
feature/nextjs-migration
```

When the migration is split into smaller pull requests, prefer branches such as:

```text
chore/migration-baseline
feature/nextjs-foundation
feature/secure-exchange-api
feature/currency-converter
feature/seo-accessibility
test/converter-quality-gates
```

Prefer smaller, reviewable branches over one very large and long-lived branch when the phases can be safely integrated independently.

### Pull request flow

The expected lifecycle is:

1. Create the working branch from `dev`.
2. Implement one coherent scope.
3. Run all applicable quality gates.
4. Review the diff and remove unrelated changes.
5. Commit atomically with Conventional Commits.
6. Push only after explicit user authorization.
7. Open or prepare a pull request from the working branch into `dev`.
8. Merge into `dev` only after checks pass and the user authorizes the merge.
9. Validate the integrated application and preview deployment from `dev`.
10. Promote `dev` into `main` through a separate pull request.
11. Merge into `main` only after production-readiness checks pass and the user authorizes the release.
12. Create version tags or releases only when explicitly requested.

Never bypass `dev` by merging a normal feature branch directly into `main`.

### Merge policy

Preferred merge policy:

- use **Squash and merge** for small feature branches with noisy intermediate commits
- use **Rebase and merge** only when the branch already contains clean, atomic commits
- avoid merge commits unless preserving branch topology is intentionally required
- never use `git push --force`
- use `git push --force-with-lease` only when the user explicitly authorizes a justified history rewrite
- never resolve conflicts by discarding changes without reviewing both sides

Before recommending or performing a merge:

```text
npm run lint
npm run typecheck
npm run test
npm run build
```

Run `npm run test:e2e` when E2E tests are configured and applicable.

### Conventional Commits

Every authorized commit must follow:

```text
<type>(<optional-scope>): <imperative summary>
```

Allowed primary types:

- `feat`: new user-facing capability
- `fix`: bug correction
- `refactor`: internal restructuring without changing intended behavior
- `perf`: measurable performance improvement
- `test`: tests or testing infrastructure
- `docs`: documentation only
- `style`: formatting only, with no behavioral change
- `chore`: maintenance, tooling, or repository configuration
- `build`: build system or dependency changes
- `ci`: continuous integration changes
- `revert`: revert of a previous commit

Rules:

- write commit messages in English
- use lowercase type and optional lowercase scope
- use imperative mood
- keep the subject concise and specific
- do not end the subject with a period
- keep one logical concern per commit
- do not mix formatting, refactoring, dependency upgrades, and features without a clear reason
- include a body when the motivation, risk, migration path, or trade-off is not obvious
- use `BREAKING CHANGE:` in the footer when applicable
- reference issues in the footer when an issue identifier exists
- never use vague subjects such as `update files`, `changes`, `fix stuff`, or `final commit`

Examples:

```text
chore(repo): add migration planning documents
build(next): initialize app router foundation
refactor(api): move exchange provider calls to server
feat(converter): add validated currency conversion flow
fix(form): normalize Brazilian decimal input
perf(rates): cache supported currencies and exchange rates
feat(seo): add metadata sitemap and robots
feat(a11y): improve keyboard navigation and live feedback
test(converter): cover loading error and stale responses
docs(readme): document architecture and environment setup
```

### Commit checkpoints

When commits are authorized, create them at stable checkpoints rather than waiting for one final oversized commit.

Before each commit:

1. Inspect `git diff` and `git diff --staged`.
2. Stage only files related to the commit purpose.
3. Run the checks relevant to that change.
4. Ensure no `.env`, credentials, generated secrets, build artifacts, or unrelated files are staged.
5. Report the proposed commit message and staged files.
6. Commit only within the current working branch.

### Repository hygiene

- Keep generated build output out of Git.
- Keep secrets and local environment files out of Git.
- Do not commit temporary debugging code.
- Do not commit editor-specific files unless the repository intentionally standardizes them.
- Keep branches short-lived and synchronized with `dev`.
- Prefer `git rebase origin/dev` on a local working branch only when explicitly authorized and conflict risk is understood.
- Record significant architectural decisions in `MIGRATION_STATUS.md` or a dedicated ADR when appropriate.

---

## 4. Current project facts and known risks

The legacy project currently contains:

- React + Vite
- JavaScript and JSX
- React Router with only one useful page
- Axios for two GET requests
- React Context for supported currency codes
- React Hook Form
- Tailwind CSS
- Google Analytics loaded directly in `index.html`
- A Vercel SPA rewrite
- A `.env` file
- An external exchange-rate provider called directly from the browser

Known issues to verify and fix:

1. A `VITE_*` API base URL may embed a private API key in the browser bundle.
2. The API key must be considered compromised if it has ever been deployed or committed.
3. The conversion form parses currency codes with:
   `value.match(/\(([^)]+)\)/)[1]`
   This can throw when the user enters an invalid `datalist` value.
4. Decimal input may accept comma notation without normalizing it correctly.
5. Loading, error, retry, empty, and stale-response states are incomplete.
6. A slower old request may overwrite a newer result.
7. The result section renders before a successful conversion.
8. The wildcard route hides invalid URLs instead of returning a real 404.
9. The SPA sends almost no useful initial HTML for SEO.
10. Google Analytics is loaded without an explicit privacy/consent strategy.
11. Several UI abstractions add complexity without providing meaningful reuse.
12. `src/services/exchageAPI.js` contains a filename typo and should not be preserved.

Do not assume this list is exhaustive. Verify the code.

---

## 5. Security requirements

### Secrets

- The exchange-rate provider credential must only exist in a server-side environment variable:
  `EXCHANGE_RATE_API_KEY`
- Never prefix the provider credential with `NEXT_PUBLIC_`.
- Public site configuration may use:
  `NEXT_PUBLIC_SITE_URL`
- Add secret files to `.gitignore`:
  - `.env`
  - `.env.local`
  - `.env.*.local`
- Keep `.env.example` committed with variable names and safe placeholder values only.
- Do not remove a leaked secret from Git history unless the user explicitly authorizes a history rewrite.
- Document that the old provider key must be revoked and replaced.

### Server boundary

Create a server-only exchange-rate integration. The browser must never call the third-party provider with private credentials.

Recommended flow:

```text
Browser
  -> Next.js Route Handler or Server Action
  -> validation
  -> cache/revalidation
  -> exchange-rate provider
  -> normalized safe response
```

Prefer a Route Handler when it creates a clear API boundary.

### Input validation

Validate all client-controlled data on the server:

- currency codes must match `^[A-Z]{3}$`
- currency codes must exist in the supported-code allowlist
- source and target currencies must be different
- amount must be finite
- amount must be greater than zero
- amount must respect a documented maximum
- reject unsupported query parameters
- return consistent, non-sensitive error responses

Use Zod schemas shared where appropriate, but never trust client validation alone.

### HTTP and error handling

- Use appropriate HTTP status codes.
- Do not return stack traces, provider URLs containing credentials, raw provider errors, or internal configuration.
- Use request timeouts.
- Cancel obsolete browser requests with `AbortController`.
- Avoid logging full third-party errors when they may contain credentials or request URLs.
- Normalize provider responses before returning them to the client.
- Add conservative security headers through Next.js configuration where appropriate.
- Do not invent a fake in-memory rate limiter and describe it as reliable in a serverless environment.
- Add a durable rate limiter only when an appropriate persistent store is already configured or explicitly approved.

---

## 6. Target architecture

Use a simple feature-oriented structure. Avoid microservices, Redux, excessive generic components, and unnecessary dependency layers.

Suggested structure:

```text
src/
├── app/
│   ├── api/
│   │   └── exchange/
│   │       └── route.ts
│   ├── layout.tsx
│   ├── page.tsx
│   ├── not-found.tsx
│   ├── robots.ts
│   ├── sitemap.ts
│   ├── manifest.ts
│   ├── error.tsx
│   └── loading.tsx
├── components/
│   ├── currency-converter/
│   │   ├── currency-converter.tsx
│   │   ├── currency-form.tsx
│   │   ├── currency-select.tsx
│   │   ├── conversion-result.tsx
│   │   ├── conversion-feedback.tsx
│   │   └── conversion-disclaimer.tsx
│   └── ui/
│       └── only components with demonstrated reuse
├── lib/
│   ├── exchange-rate/
│   │   ├── provider.server.ts
│   │   ├── schemas.ts
│   │   ├── types.ts
│   │   └── normalize.ts
│   ├── currency/
│   │   ├── format.ts
│   │   ├── parse.ts
│   │   └── constants.ts
│   └── env.server.ts
└── test/
```

Adjust the structure when a simpler implementation is more coherent. Explain meaningful deviations in `MIGRATION_STATUS.md`.

### Component boundaries

- `page.tsx` should remain a Server Component where possible.
- Keep the interactive converter inside the smallest practical `"use client"` boundary.
- Do not place `"use client"` in the root layout.
- Do not fetch provider secrets from Client Components.
- Prefer semantic HTML over generic typography wrappers.
- Do not create an abstraction unless it is reused or isolates meaningful behavior.

---

## 7. Migration strategy

Perform the migration in phases.

### Phase 0 — Safety and baseline

- Inspect Git state.
- Record the current build/lint status.
- Identify whether `.env` is tracked.
- Add safe environment patterns to `.gitignore`.
- Create `.env.example`.
- Record legacy behavior and screenshots when possible.
- Do not reveal the current secret value.
- Recommend revoking the legacy provider credential.

### Phase 1 — Next.js foundation

Migrate the repository root to Next.js without replacing `.git`.

- Configure App Router.
- Configure TypeScript strict mode.
- Configure path alias `@/*`.
- Configure Tailwind.
- Preserve relevant files from `public/`.
- Remove Vite-only files after the Next.js replacement is working:
  - `vite.config.*`
  - Vite entry files
  - SPA-only Vercel rewrite
- Remove React Router when no longer needed.
- Remove Axios after all requests use `fetch`.
- Keep the same repository and product identity.

Do not retain both applications permanently unless the user explicitly requests a monorepo or legacy folder.

### Phase 2 — Secure provider integration

- Create a server-only provider client.
- Validate environment variables at startup or first use.
- Add provider request timeout.
- Normalize provider responses.
- Cache supported currency codes.
- Cache rates according to provider update semantics.
- Avoid calling the provider again when only the amount changes and a valid rate is already available.
- Return a small stable internal response contract.

Example internal response shape:

```ts
type ExchangeRateResponse = {
  baseCode: string;
  targetCode: string;
  rate: number;
  convertedAmount: number;
  sourceAmount: number;
  updatedAt: string;
};
```

Do not expose irrelevant provider response fields.

### Phase 3 — Form and state model

Use explicit UI states:

```ts
type ConversionState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; data: ConversionResult }
  | { status: "error"; message: string };
```

Requirements:

- store currency codes as structured values, never parse display strings with regex
- normalize Brazilian decimal input safely
- prevent invalid or identical currency pairs
- disable duplicate submissions while loading
- cancel obsolete requests
- prevent stale responses
- preserve form values after recoverable errors
- provide retry behavior
- support swapping currencies
- use `Intl.NumberFormat`
- use `Intl.DateTimeFormat`
- display the rate, converted amount, source amount, and update time clearly

### Phase 4 — UX/UI modernization

Modernize the interface while retaining the Converx identity.

Visual direction:

- clean, contemporary, trustworthy financial-tool appearance
- preserve or refine the current dark navy brand palette
- neutral light page background
- compact navigation/header
- concise hero section
- central converter card
- clear primary button with visible text
- accessible searchable currency fields
- prominent conversion result
- subtle borders, spacing, shadows, and radii
- responsive mobile-first layout
- no gratuitous animation
- respect `prefers-reduced-motion`
- support dark mode only if implemented completely and consistently

Recommended content hierarchy:

1. Product header
2. H1: `Conversor de moedas online`
3. Concise value proposition
4. Converter form
5. Result or useful idle state
6. How it works
7. FAQ
8. Short disclaimer with expandable details
9. Minimal footer

Do not fabricate live-market precision. Clearly state that rates may differ from banks, cards, brokers, taxes, spreads, and transaction fees.

### Phase 5 — Accessibility

Target WCAG 2.2 AA.

Requirements:

- one descriptive H1
- semantic landmarks
- labels programmatically associated with controls
- visible `focus-visible` indicators
- keyboard-accessible currency selection
- `aria-invalid` and `aria-describedby` for errors
- `role="alert"` for submission errors
- `aria-live="polite"` or semantic `<output>` for result updates
- icon-only controls must have accessible names
- minimum practical touch target size
- sufficient contrast
- skip link
- no focus traps
- no color-only status indication

A custom combobox is acceptable only when its keyboard and screen-reader behavior is complete. Otherwise prefer a robust native control or a proven accessible primitive.

### Phase 6 — SEO and discoverability

Implement:

- descriptive metadata
- canonical URL
- Open Graph metadata
- Twitter metadata
- `robots.ts`
- `sitemap.ts`
- web manifest
- real 404 page
- meaningful server-rendered content
- `lang="pt-BR"`
- structured data only when it accurately represents visible content

Suggested title:

`Conversor de Moedas Online | Converx`

Suggested description:

`Converta reais, dólares, euros e outras moedas com uma interface rápida, acessível e taxas de câmbio atualizadas.`

Use `NEXT_PUBLIC_SITE_URL` for absolute public URLs and validate it.

Do not generate hundreds of thin currency-pair pages.

### Phase 7 — Privacy and analytics

The legacy Google Analytics script must not be copied blindly.

Default decision:

- remove analytics during migration

Only restore analytics when:

- its purpose is documented
- privacy information exists
- consent behavior is implemented where legally required
- the implementation does not harm performance unnecessarily

Do not claim legal compliance. Document technical privacy measures and remaining legal review needs.

### Phase 8 — Tests and quality gates

Add high-value tests, not superficial coverage.

Unit tests:

- Brazilian decimal parsing
- invalid number rejection
- currency-code validation
- amount limits
- money formatting
- date formatting
- provider-response normalization

Component/integration tests:

- required fields
- unsupported currency
- equal currencies
- swap behavior
- loading
- success
- provider failure
- retry
- stale request protection
- keyboard interaction

E2E tests when practical:

- successful BRL to USD flow
- mobile viewport
- API failure state
- 404 route
- no provider secret in browser-visible output

Required scripts:

```text
npm run lint
npm run typecheck
npm run test
npm run build
```

Add `test:e2e` when E2E is configured.

Run all applicable checks after meaningful phases and before completion.

---

## 8. Performance requirements

- Prefer Server Components for static content.
- Keep the Client Component boundary small.
- Avoid unnecessary runtime providers and contexts.
- Avoid fetching the supported-code list on every client mount.
- Avoid repeated provider calls for the same rate.
- Avoid layout shifts.
- Use system fonts or optimized local/web fonts through Next.js.
- Do not load large icon libraries for one or two icons; prefer small local SVG components.
- Do not add animation libraries unless justified.
- Keep third-party scripts out of the critical rendering path.
- Measure rather than guess when reporting performance.

Target quality goals, subject to real validation:

- Lighthouse Performance: 95+
- Accessibility: 100
- Best Practices: 100
- SEO: 100
- negligible CLS

Never report these targets as achieved without running the audits.

---

## 9. Code standards

- TypeScript strict mode must remain enabled.
- Avoid `any`. Use `unknown` and narrow safely.
- Use named types for API contracts and domain models.
- Prefer pure functions for parsing, formatting, and normalization.
- Prefer early returns.
- Keep functions focused.
- Remove dead code.
- Do not leave commented-out legacy implementations.
- Avoid comments that merely restate the code.
- Use English for code identifiers and commit suggestions.
- Use Portuguese (`pt-BR`) for user-facing UI copy.
- Keep documentation in clear Portuguese unless an existing file is intentionally English.
- Use consistent import aliases.
- Keep server-only modules clearly named, such as `*.server.ts`.
- Never import a server-only module into a Client Component.
- Do not suppress TypeScript or ESLint errors without documenting a concrete reason.

---

## 10. Dependency policy

Before adding a dependency, verify that it solves a real problem.

Preferred:

- Next.js
- React
- TypeScript
- Tailwind CSS
- React Hook Form
- Zod
- testing tools appropriate to the chosen setup

Remove when no longer needed:

- Axios
- React Router
- generic icon library when only a few local SVGs are needed
- legacy Vite packages
- obsolete ESLint configuration
- redundant UI abstractions

Do not perform broad dependency upgrades unrelated to the migration without explaining risk and compatibility.

---

## 11. Environment contract

Create `.env.example` similar to:

```env
# Server-only credential. Never expose with NEXT_PUBLIC_.
EXCHANGE_RATE_API_KEY=replace_with_your_key

# Public canonical production URL.
NEXT_PUBLIC_SITE_URL=https://converxx.vercel.app
```

Optionally add a provider base URL only when there is a legitimate need to change it:

```env
EXCHANGE_RATE_API_BASE_URL=https://example-provider.invalid
```

The application must fail safely with a useful server-side configuration error when required environment variables are missing.

---

## 12. Documentation requirements

Update `README.md` to include:

- project purpose
- current architecture
- feature list
- technology stack
- security model
- environment setup
- local execution
- validation commands
- deployment notes
- privacy/analytics status
- known limitations
- author information

Do not include real secrets, personal tokens, or copied `.env` values.

Include a concise architecture diagram using Mermaid when useful.

---

## 13. Completion report

At the end of the task, provide:

1. Summary of implemented changes.
2. Files created, changed, and removed.
3. Security fixes.
4. Architecture decisions and trade-offs.
5. UX/UI and accessibility improvements.
6. SEO and performance improvements.
7. Commands executed and their exact outcomes.
8. Remaining risks or incomplete items.
9. Required user actions, especially:
   - revoke the legacy API key
   - configure new Vercel environment variables
   - review preview deployment
10. Current branch, target branch, proposed pull request path, and Conventional Commit history.
11. Suggested next Git operation, but do not push, merge, tag, or release unless requested.

---

## 14. Definition of done

The migration is complete only when:

- the app uses Next.js App Router
- TypeScript strict mode passes
- the private provider key is server-only
- the browser bundle does not contain the provider credential
- inputs are validated on client and server
- conversion loading, success, error, retry, and idle states work
- stale requests cannot overwrite newer results
- the interface is responsive and accessible
- metadata, canonical, sitemap, robots, manifest, and 404 exist
- analytics is removed or has an explicit privacy strategy
- documentation is updated
- lint passes
- typecheck passes
- tests pass
- production build passes
- all authorized commits follow Conventional Commits
- no implementation commit was made directly on `dev` or `main`
- the completed working branch is ready for review into `dev`
- promotion from `dev` to `main` remains a separate validated release step

If any item cannot be completed, state it explicitly and explain why.
