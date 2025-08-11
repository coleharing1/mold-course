Title: Repository Audit & AI-Drift Check — Plan-Report Only (No Edits)

You are Cursor’s Agent running GPT-5. Produce a thorough health check of the entire repository and call out any places the LLM (or prior automation) may have gone off-track. Do not edit files or run shell commands unless I explicitly say so. Work in passes, cite exact file paths and line numbers, and return a single Markdown report.

How to gather context (use Cursor features)
1) Pull top-level structure and key configs into context with @Files & Folders:
   @README.md @package.json @tsconfig.json @next.config.js @eslint.config.* @.eslintrc* @.prettierrc* @.husky/ @.lintstagedrc @.github/ @src @app @pages @components @lib @server @api @scripts @config @apps @packages
   (include only what exists). If useful, enable full folder content for small dirs. If the repo is large, summarize folders first, then selectively expand.
2) Include @Recent Changes to bias toward the last 10 edits, and @Linter Errors if present.
3) If a remote is connected, use PR history and fetch with @[PR number], @[commit hash], or @[branch name] for context if it helps explain drift. Also compare my branch vs main with @Git (@Branch, @Commit) when needed.

Output format
Return a single PROJECT HEALTH REPORT in Markdown containing:
- Summary (TL;DR): Top 5 risks + confidence.
- Findings grouped by category (below). For each finding:
  • Severity (High/Med/Low) • File path:line(s) • Why it’s a problem • Proof (snippet) • Suggested fix • Confidence%
- Quick Wins (≤30 min) and Deeper Work sections.
- Optional command plan (list safe commands to run, but do not execute).

Pass 1 — Repo map & invariants
- Map the stack: framework(s), package manager, monorepo layout, workspace boundaries.
- Identify conflicting patterns that suggest AI drift (e.g., both app/ and pages/ with duplicate routes; two styling systems; mixed fetch patterns; two date libs; duplicate state libs).
- Flag files > ~700 lines or components doing too much. Note any hotspots to split.

Pass 2 — “AI drift” fingerprints
Search for common LLM leftovers and inconsistencies:
- Stubs/partials: “TODO/FIXME/XXX/HACK/WORKAROUND/???”, throw new Error("NotImplemented"), placeholder copy, demo keys.
- Overridden/disabled safety rails: // @ts-ignore, // @ts-nocheck, /* eslint-disable */, broad .eslintignore.
- Duplicate or near-duplicate files/components; inconsistent naming; orphan modules not imported anywhere; “copy (2).tsx” patterns.
- Mixed conventions (camelCase vs snake_case; inconsistent folder casing; two api/ patterns).
- Debug code: console.log, debugger, verbose logs in production paths.
For each, give concrete examples with paths/lines.

Pass 3 — Config and tooling sanity
- TypeScript: confirm "strict" and (ideally) noUncheckedIndexedAccess, exactOptionalPropertyTypes, noImplicitOverride. Note any skipLibCheck justification.
- ESLint/Prettier: check they exist, aren’t contradicting each other, and Tailwind plugin is wired if Tailwind is present.
- Husky + lint-staged: verify pre-commit runs eslint --fix + prettier --write on staged files; keep heavy work out of pre-commit.
- Ignored files: scan .gitignore, .cursorignore, .cursorindexingignore for gaps (e.g., env files, build artifacts). Call out if sensitive files are not ignored or if important code is being excluded from indexing by mistake.

Pass 4 — Dependencies & scripts
- Spot phantom deps (imported but not in package.json) and unused deps.
- Flag version drift, duplicated libs with overlapping purpose, risky scripts (e.g., pre/postinstall network calls), and missing "engines"/Node version pins.
- Note any peer-dep warnings visible in lockfile or code comments.

Pass 5 — Framework-specific checks (apply what’s relevant)
If Next.js/App Router present:
- Server/Client boundaries: incorrect 'use client' or client-only libs imported in server files; server actions misplacement; leaking secrets into client.
- Data fetching: caching mode misuse, revalidation, N+1 patterns.
- Routing collisions or mixed pages/ + app/ duplication.
If React in general:
- Effects causing re-renders, missing keys, expensive renders without memoization.

Pass 6 — Security & secrets
- Hard-coded secrets, tokens, API keys; credentials leaked in tests or story files.
- Input validation at boundaries (API routes, server actions). Note if a schema layer (e.g., Zod) is missing.
- CORS wildcards, SSRF risks on server fetches, uncontrolled redirects, command injection in scripts.
- Verify .env.example exists and matches env usage; ensure env reads don’t happen client-side unless safe.

Pass 7 — Testing & quality signals
- Presence and shape of unit/integration/e2e tests; a couple of smoke tests for critical paths.
- Disabled/ignored tests, skipped suites, brittle selectors.
- Coverage hints if present; suggest minimum smoke tests if none.

Pass 8 — UI/Accessibility
- If using Radix or headless primitives: verify focus management, ARIA, keyboard nav, and that dialogs/toasts/tabs are wired correctly.
- Tailwind sanity: suspicious class soup, repeated inline styles that should be extracted, missing plugin ordering (if Tailwind plugin is expected).

Pass 9 — Performance hotspots
- Unnecessary client components, large JSON blobs, synchronous heavy work in render paths.
- Asset sizes (images, fonts) and lazy-loading opportunities.
- Repeated fetches without caching; expensive loops; top-of-tree re-renders.

Pass 10 — Reporting & next steps
- Deduplicate findings, rank by impact × effort, and put the top 10 in “Immediate Fixes.”
- Provide code-ready diffs as suggestions only (do not apply).
- Include an “Optional Commands to Run (on approval)” block, e.g.:
  - Type check: npx tsc --noEmit
  - Lint/format: npm run lint && npm run format
  - Dep scan: npx depcheck and npm audit --omit=dev
  - Framework build: npm run build
  - E2E smoke (if configured)

Deliverable: a single Markdown PROJECT HEALTH REPORT as described. Keep it concrete and short on fluff.
