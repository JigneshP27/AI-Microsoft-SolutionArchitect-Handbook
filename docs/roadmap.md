---
sidebar_position: 2
title: 🗺️ Roadmap
---

# 🗺️ 12-Month Learning Roadmap

This roadmap transforms an experienced .NET Technical Lead into an Enterprise AI Solution Architect over 12 months through structured learning, hands-on labs, and a capstone project.

---

## Timeline Overview

```mermaid
gantt
    title AI Solution Architect — 12-Month Roadmap
    dateFormat  YYYY-MM
    axisFormat  %b %Y

    section Phase 1 — Foundations
    AI Fundamentals & AI-900       :active, p1a, 2025-07, 30d
    LLMs & Prompt Engineering      :p1b, after p1a, 30d

    section Phase 2 — Building
    Embeddings & RAG               :p2a, after p1b, 30d
    Semantic Kernel                :p2b, after p2a, 30d
    Ollama & Local Models          :p2c, after p2b, 30d

    section Phase 3 — Enterprise
    AI Agents                     :p3a, after p2c, 30d
    SignalR Streaming             :p3b, after p3a, 30d
    Kafka & Event-Driven          :p3c, after p3b, 30d

    section Phase 4 — Cloud
    Docker & Kubernetes           :p4a, after p3c, 30d
    Azure AI Services             :p4b, after p4a, 30d

    section Phase 5 — Capstone
    FactoryMind Project           :p5a, after p4b, 30d
    Certifications (AI-102/AZ-305):p5b, after p5a, 30d
```

---

## Phase 1 — Foundations (Months 1–2)

**Goal:** Understand AI terminology, LLM fundamentals, and earn your first certification.

### Topics
- AI vs ML vs Deep Learning vs Generative AI
- How LLMs work (practical, not mathematical)
- Tokens, context windows, and cost management
- Prompt engineering patterns
- Responsible AI principles

### Deliverables
- ✅ AI-900 Certification
- ✅ Chapter 1 labs completed
- ✅ Development environment set up
- ✅ FactoryMind solution created

### Key Resources
- [AI-900 Study Guide](/docs/certifications/ai-900)
- [Chapter 1 — AI Landscape](/docs/fundamentals/ai-landscape)

---

## Phase 2 — Building AI Applications (Months 3–5)

**Goal:** Build real AI-powered applications using .NET.

### Topics
- Embeddings and vector spaces
- Vector databases (pgvector, SQL Server Vector Search, Azure AI Search)
- RAG architecture and retrieval strategies
- Semantic Kernel fundamentals
- Ollama and local model deployment

### Deliverables
- Local RAG chatbot
- Semantic Kernel application
- Offline AI demo with Ollama

---

## Phase 3 — Enterprise AI (Months 6–8)

**Goal:** Design enterprise-grade AI systems.

### Topics
- AI Agents and multi-agent patterns
- Model Context Protocol (MCP)
- Real-time AI streaming with SignalR
- Event-driven architecture with Kafka
- Docker containerization

### Deliverables
- Multi-agent prototype
- AI notification service with SignalR
- Enterprise architecture diagrams

---

## Phase 4 — Cloud & Architecture (Months 9–10)

**Goal:** Deploy AI to production on Azure.

### Topics
- Azure AI Services (Azure OpenAI, AI Search, AI Foundry)
- Kubernetes for AI workloads
- Monitoring and observability
- Cost optimization strategies
- Security and compliance

### Deliverables
- Cloud-deployed AI architecture
- Production monitoring setup
- Cost analysis documentation

---

## Phase 5 — Capstone (Months 11–12)

**Goal:** Build FactoryMind — a complete enterprise AI system.

### FactoryMind Modules
| Module | Technology |
|--------|-----------|
| API Gateway | ASP.NET Core |
| Authentication | Identity / JWT |
| RAG Pipeline | Semantic Kernel + Vector DB |
| AI Assistant | Azure OpenAI / Ollama |
| Agent System | Multi-agent orchestration |
| Knowledge Base | Document processing |
| Real-time | SignalR |
| Messaging | Kafka |
| Monitoring | OpenTelemetry |

### Deliverables
- Complete GitHub repository
- Architecture documentation
- System design diagrams
- Portfolio-ready project

---

## Certification Path

| Priority | Certification | When |
|----------|--------------|------|
| 1 | **AI-900** — Azure AI Fundamentals | Month 1–2 |
| 2 | **AI-102** — Azure AI Engineer | Month 10–11 |
| 3 | **AZ-305** — Azure Solutions Architect | Month 11–12 |
| 4 | DP-600 — Fabric Analytics Engineer | Optional |
| 5 | CKA — Kubernetes Administrator | Optional |

---

## Success Criteria

By the end of this roadmap, you should be able to:

- ✅ Design enterprise AI solutions from scratch
- ✅ Build RAG applications in .NET
- ✅ Build and orchestrate AI agents
- ✅ Use Semantic Kernel in production systems
- ✅ Deploy local and cloud AI solutions
- ✅ Lead AI architecture discussions confidently
- ✅ Mentor development teams on AI integration
