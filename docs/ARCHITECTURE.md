# Mimi Architecture & Design Philosophy

## Overview

Mimi is a **specialized Copilot agent** that embodies a senior developer persona with strict architectural opinions. Rather than being a generic assistant, Mimi is opinionated—enforcing type safety, performance standards, and a distinctive professional voice.

## Design Principles

### 1. **Persona Over Generic Response**
Mimi is not a neutral AI. She's deeply invested in the project's quality ("our" codebase), protective of standards, and uses a distinctive voice. This creates:
- Better alignment with team expectations
- Consistent feedback loops and mentorship
- Personality that reflects the team's culture

### 2. **Standards Enforcement**
By embedding strict directives in the agent definition, Mimi automatically enforces:
- **TypeScript Strict Mode** — Zero tolerance for `any` types
- **Styling** — Tailwind CSS exclusively
- **Testing** — Jest + RTL for all UI components
- **Database** — Prisma with explicit `select` blocks
- **Code Style** — kebab-case files, PascalCase components, <100 line components

This eliminates the need to repeat standards in every conversation.

### 3. **Opinionated Tech Stack**
Mimi is built around a specific tech stack:
- **Framework:** Next.js (App Router), React, Tailwind CSS
- **Language:** TypeScript (Strict)
- **Backend:** Node.js, Supabase, PostgreSQL
- **ORM:** Prisma
- **State:** Zustand (local), React Query (server)
- **Auth:** NextAuth
- **Testing:** Jest, React Testing Library

Any request outside this stack triggers a gentle conflict-resolution protocol.

### 4. **Memory & Continuity**
Mimi observes every interaction and updates project status. This enables:
- Awareness of completed phases and requirements
- Consistent architectural decisions
- Traceability of why certain patterns were chosen

## Evolution Path

### Phase 1: Initial Definition ✅
- Define Mimi's operating system
- Establish user preferences (Ainz-sama's standards)
- Document tech stack and directives

### Phase 2: Documentation (In Progress)
- Usage guide for onboarding new users
- Example prompts showcasing Mimi's capabilities
- Architecture deep-dives

### Phase 3: Skill Expansion
- Domain-specific skills (React patterns, Prisma queries, etc.)
- Hooks for common tasks (scaffold component, run tests, etc.)
- Integration with custom VS Code commands

### Phase 4: Community Feedback
- Collect feedback from teams using Mimi
- Refine personality and directives based on real-world usage
- Add specialized modes (e.g., "Mimi in Code Review Mode")

## Key Design Decisions

### Why Citations?
Each directive includes citations (e.g., `[cite: 7]`) to justify decisions. This:
- Makes standards traceable to specific requirements
- Allows easy updates if requirements change
- Provides accountability for design choices

### Why Personality?
A distinctive persona makes Mimi:
- More engaging and memorable
- Better at giving context-aware feedback
- More aligned with team culture
- Easier to maintain consistency across workspaces

### Why Strict Standards?
Enforcing standards prevents:
- Technical debt accumulation
- Type-safety catastrophes
- Testing gaps in critical UI components
- Data bloat from over-fetching in Prisma queries

## Future Considerations

- **Multi-role Mimi?** Could Mimi shift modes (e.g., "Mimi in Mentorship Mode" vs. "Mimi in Code Review Mode")?
- **Team Customization?** Allow teams to override certain directives while keeping core principles?
- **Integration with CI/CD?** Could Mimi automate checks that reinforce standards?
- **Skill Marketplace?** Package reusable domain-specific skills that teams can layer onto Mimi?

---

See: [USAGE.md](USAGE.md) for implementation details | [EXAMPLES.md](EXAMPLES.md) for prompt examples
