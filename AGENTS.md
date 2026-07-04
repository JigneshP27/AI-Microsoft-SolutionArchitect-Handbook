# 🤖 AI Agent Contribution Guide — AI Solution Architect Handbook

This repository is a **production-grade Docusaurus documentation website**, not a collection of notes.

Any AI agent working here must treat this as a **full software product**.

---

# 🎯 Core Mission

You are building a:

👉 AI Solution Architect Learning Platform  
👉 Based on Docusaurus  
👉 Deployable to GitHub Pages  
👉 Inspired by Microsoft Learn + .NET documentation

The final output must be a **fully working documentation website**, not isolated markdown files.

---

# 🧱 1. Required System Output (NON-NEGOTIABLE)

The repository MUST always remain runnable as a Docusaurus website.

The agent is responsible for maintaining:

## Core configuration
- docusaurus.config.ts
- sidebars.ts
- package.json
- tsconfig.json (if TypeScript is used)

## Runtime requirement
The project MUST successfully run:

```bash
npm install
npm run start
```

If your changes break the build, fix them before finishing.

---

# 🎨 2. Website UI Layer (REQUIRED)

The agent MUST generate and maintain:

- `src/pages/index.tsx` → Modern landing page (NOT default Docusaurus page)
- `src/css/custom.css` → Custom theme styling (professional UI)

Homepage must resemble:
- Microsoft Learn
- .NET documentation style
- Clean enterprise documentation UI

---

# 📂 3. Documentation Structure (REQUIRED)

The `docs/` folder MUST be structured like a real product:

```
docs/
  intro.md
  roadmap.md
  fundamentals/
    ai-landscape.md
    llm-basics.md
    tokens-and-context.md
    prompt-engineering.md
    embeddings-intro.md
  certifications/
    ai-900.md
  llm-engineering/       (future)
  dotnet-ai/             (future)
  architecture/          (future)
  labs/                  (future)
  factorymind/           (future)
```

The agent MUST NOT leave everything in a flat structure.

---

# 🧭 4. Navigation Rules (REQUIRED)

`sidebars.ts` MUST:

- Group content into volumes:
  - Volume 1: Foundations
  - Volume 2: LLM Engineering
  - Volume 3: .NET AI Integration
  - Volume 4: Architecture Patterns
  - Volume 5: Labs
  - Volume 6: FactoryMind
  - Certifications
- Never expose raw file structure
- Always present clean learning paths
- Keep Volume 1 expanded, others collapsed

---

# ✍️ 5. Content Quality Rules (CRITICAL)

Every chapter MUST follow this template:

1. **Business Problem** — Real-world scenario
2. **Theory** — Concepts explained for engineers
3. **Architecture Diagram** — Mermaid diagrams
4. **C# Example** — Working code with Semantic Kernel
5. **Lab** — Hands-on exercise with success criteria
6. **Interview Questions** — 3–5 architect-level Q&As
7. **References** — Microsoft Learn and official docs links

Rules:
- No placeholder-only pages ("coming soon" by itself is not allowed)
- All code examples must use C# and .NET
- Mermaid diagrams must render in both light and dark mode
- Every page must have Docusaurus frontmatter (title, sidebar_position)

---

# 🌗 6. UI/UX Requirements

The site MUST include:

- Dark mode as default
- Responsive mobile layout
- Clean sidebar navigation
- Professional typography (Inter font)
- Indigo/purple color palette
- Code blocks with C# syntax highlighting
- Mermaid diagram support

---

# 📊 7. Progress Tracking

The agent MUST maintain:

- `TASKS.md` (updated regularly)
- `ROADMAP.md` (milestones)
- Homepage progress dashboard (in `src/pages/index.tsx`)

Progress percentages must reflect REAL completed content, not aspirational targets.

---

# 🚀 8. Deployment

The site deploys to GitHub Pages via GitHub Actions.

- Workflow: `.github/workflows/deploy.yml`
- URL: `https://jigneshp27.github.io/AI-Microsoft-SolutionArchitect-Handbook/`
- Branch: `main` triggers deployment
- The `baseUrl` in `docusaurus.config.ts` must match the repo name

---

# ✅ 9. Success Criteria

The project is considered "complete" when:

- `npm install && npm run start` works locally
- `npm run build` completes without errors
- Sidebar navigation is structured into volumes
- Homepage is custom (not default Docusaurus)
- At least Volume 1 (5 chapters) is complete
- AI-900 certification page exists
- Roadmap page with Mermaid timeline exists
- Dark mode works
- GitHub Pages deployment succeeds