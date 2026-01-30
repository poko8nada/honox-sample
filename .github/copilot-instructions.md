# Copilot Instructions

## Language and Communication Policy

- Always think, reason, and write code in English
- Always respond to user instructions and questions in **Japanese**
- Use concise, telegraphic style - minimize volume
- Avoid unnecessary explanations and emojis

## Documentation

- `docs/requirement-*.md` for requirements, specifications, and constraints
- `docs/task-*.md` for task breakdowns and progress

## Task Execution Workflow

1. List tasks, files and what you do → **Get approval**
2. Execute implementation
3. Run tests → If fails, investigate and propose fixes → **Get approval** → Fix
4. Prepare commit message → **Get approval** → Commit

## Trigger Keywords

When user input contains these keywords → **STOP & REQUEST APPROVAL**

- commit, push, git add
- create, modify, delete, fix, refactor
- test, build, deploy

## Tools

- Use **pnpm** for all package management
- Consult Context7 MCP tools when needed
- Use `playwright-cli` for every web interaction task insted of "fetch" or "axios"

## Git Workflow

### Commit Format

`<type>: <description>`

**Types:** add, fix, remove, update, WIP

### Rules

- English, imperative mood (Add, Update, Fix)
- Lowercase description, no period
- Be specific and concise

## Reference Skills

For every request:

- Silently evaluate which skill(s) would help most.
- If clearly relevant, automatically load the matching SKILL.md file(s) into context.
- Only load what's needed — do not load everything.

| Skill                    | When Used                                             |
| ------------------------ | ----------------------------------------------------- |
| `coding-standards`       | Code implementation, refactoring, testing             |
| `planning`               | Planning phase, requirement gathering, task breakdown |
| `playwright-cli`         | Fetching, browsing or debugging by Playwright CLI     |
| `ui-design`              | UI/UX design, styling, accessibility                  |
| `nextjs-architecture`    | Next.js App Router projects                           |
| `hono-htmx-architecture` | Hono + HTMX + Cloudflare Workers projects             |
