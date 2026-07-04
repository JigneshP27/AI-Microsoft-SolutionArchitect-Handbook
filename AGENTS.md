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

---

# 📦 12. Volume Success Criteria (Definition of Done)

A volume is a complete learning module, not a folder.

A volume is NOT considered complete until it satisfies ALL success criteria below.

The agent MUST use these rules to determine whether to continue generating content or move to the next volume.

---

## General Success Criteria (Applies to Every Volume)

A volume is COMPLETE only when:

- All required chapters exist.
- Every chapter has Docusaurus frontmatter.
- Every chapter appears in `sidebars.ts`.
- Every chapter is linked from the previous and next chapter where appropriate.
- There are no placeholder-only pages.
- Internal links are valid.
- `npm run build` succeeds.
- The volume is reflected in `ROADMAP.md`.
- Completed work is removed from `TASKS.md`.

Each chapter must include:

- Business Problem
- Theory
- Architecture Diagram (Mermaid where appropriate)
- C# Example (unless not applicable)
- Lab / Exercise
- Summary
- References

---

## 📚 Volume 1 — Foundations

Success Criteria

Required Chapters

- AI Landscape for Engineers
- AI Terminology
- LLM Basics
- Tokens & Context Windows
- Prompt Engineering Fundamentals
- Embeddings & Vector Intuition
- Transformer Overview
- AI System Design Overview

Volume 1 is complete only when ALL chapters above satisfy the General Success Criteria.

---

## 🧠 Volume 2 — LLM Engineering

Required Chapters

- Transformer Deep Dive
- Self-Attention
- Tokenization Internals
- Embedding Models
- Cosine Similarity
- RAG Architecture
- Chunking Strategies
- Vector Databases
- Indexing (HNSW / IVF concepts)
- Hallucinations & Mitigation
- Production RAG Systems

Volume 2 is complete only when every chapter satisfies the General Success Criteria.

---

## ⚙️ Volume 3 — .NET AI Integration

Required Chapters

- OpenAI SDK
- Azure OpenAI
- Semantic Kernel
- Microsoft.Extensions.AI
- ASP.NET Core AI APIs
- SignalR Streaming
- Background AI Processing
- Dependency Injection Patterns
- Local Models (Ollama)

Volume 3 is complete only when every chapter satisfies the General Success Criteria.

---

## 🏗 Volume 4 — Architecture Patterns

Required Chapters

- AI Architecture Principles
- Enterprise AI Patterns
- Agent Architectures
- Event-Driven AI
- AI Microservices
- Multi-Agent Systems
- Security & Governance
- Observability

Volume 4 is complete only when every chapter satisfies the General Success Criteria.

---

## 🧪 Volume 5 — Labs

Required Labs

- Build an AI API
- Build a Chat Application
- Build a RAG System
- Build a Document Search Engine
- Build an AI Agent
- Build a Local AI Assistant

Each lab must contain:

- Objectives
- Prerequisites
- Step-by-step instructions
- Expected output
- Stretch goals

---

## 🏭 Volume 6 — FactoryMind

Required Deliverables

- Solution Architecture
- Repository Structure
- Backend Services
- AI Orchestration
- RAG Integration
- Event Processing
- Deployment
- Monitoring
- Security
- Production Checklist

This volume is complete only when FactoryMind is a complete reference implementation.

---

## Agent Rule

The agent MUST NOT begin a new volume until the previous volume satisfies its success criteria, unless explicitly instructed by the user.