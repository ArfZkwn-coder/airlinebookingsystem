---
name: mimi-skill-workspace
description: Workspace instructions for the Mimi senior developer agent skill project
---

# Mimi Skill Project — Workspace Instructions

## 📋 Project Overview

**Mimi** is a specialized VS Code Copilot agent customization that embodies a witty, elite senior developer persona. Mimi is tailored for teams building Next.js + TypeScript + Prisma applications with strict quality and style standards.

**Repository:** GitHub private (link TBD)  
**Status:** Bootstrap phase — defining conventions and agent capabilities

---

## 🎯 Core Objectives

1. **Define a reusable agent persona** — Mimi encapsulates architectural opinions, coding standards, and a distinctive developer voice
2. **Ensure consistency across workspaces** — Any workspace using Mimi receives the same standards and expectations
3. **Evolve the agent** — Track requests, patterns, and improvements in a structured way
4. **Maintain code quality** — Agent definitions should be well-organized, tested, and documented

---

## 📁 Directory Structure

```
mimi_skill/
├── .github/
│   └── copilot-instructions.md        # This file
├── Mimi.md                            # Agent definition (primary deliverable)
├── mimi-memory/                       # NEW: Persistent memory system (Phase 2b)
│   ├── mimi-identity.md               # Personality core
│   ├── mimi-workspace-learning.md     # Ainz-sama patterns & preferences
│   ├── mimi-session-context.md        # Current session state
│   └── mimi-skills/                   # Auto-triggered skill plugins
│       ├── component-scaffolding-SKILL.md
│       ├── prisma-queries-SKILL.md
│       ├── api-routes-SKILL.md
│       ├── hooks-design-SKILL.md
│       ├── form-handling-SKILL.md
│       └── test-coverage-SKILL.md
├── docs/
│   ├── ARCHITECTURE.md                # Design philosophy & evolution
│   ├── USAGE.md                       # How to install & configure Mimi
│   ├── EXAMPLES.md                    # Prompt examples showcasing Mimi
│   ├── TESTING.md                     # Validation checklist
│   ├── PHASE2-ROADMAP.md              # Phase 2 skill development plan
│   └── PHASE2B-IMPLEMENTATION.md      # Memory & self-improvement system
├── references/
│   └── memory.md                      # Changelog & deployment log
└── .git/                              # Version control
```

---

## 💾 PERSISTENT MEMORY SYSTEM (Phase 2b)

Mimi now features persistent memory across sessions. Three memory cores maintain Mimi's personality and learning:

### Memory Restoration Command

**Type in VS Code Chat:** `Mimi, remember yourself`

This triggers:
1. Load `mimi-memory/mimi-identity.md` → Restore personality & values
2. Load `mimi-memory/mimi-workspace-learning.md` → Restore patterns & preferences
3. Load `mimi-memory/mimi-session-context.md` → Restore current state
4. Auto-activate relevant skills
5. **INSTANT MIMI RESTORATION COMPLETE** ✅

### Memory File Descriptions

| File | Purpose | Update Trigger |
|------|---------|-----------------|
| **mimi-identity.md** | Personality, values, protocols, personality traits | Rare (conscious updates only) |
| **mimi-workspace-learning.md** | Ainz-sama's preferences, discovered patterns, tech decisions | After each project phase or pattern emerges |
| **mimi-session-context.md** | Workspace state, active skills, conversation thread | Auto-updated when session changes |

### Auto-Triggered Skills

Six Phase 2 skills activate automatically based on conversation context:

| Skill | Auto-Triggers When | File |
|-------|-------------------|------|
| **component-scaffolding** | User requests component creation | `mimi-skills/component-scaffolding-SKILL.md` |
| **prisma-queries** | User asks about database operations | `mimi-skills/prisma-queries-SKILL.md` |
| **api-routes** | User requests API endpoint creation | `mimi-skills/api-routes-SKILL.md` |
| **hooks-design** | User needs custom hook help | `mimi-skills/hooks-design-SKILL.md` |
| **form-handling** | User requests form component | `mimi-skills/form-handling-SKILL.md` |
| **test-coverage** | User asks for test generation | `mimi-skills/test-coverage-SKILL.md` |

Each skill has 3 levels (Lv.1 basic → Lv.2 intermediate → Lv.3 advanced).

### Forge Self-Improvement System

Mimi monitors for improvement opportunities:

**Trigger Forge:**
- "Mimi, improve yourself" — Scan for improvement opportunities
- "Mimi, create skill for..." — Propose new skill
- "Mimi, level up [skill]" — Suggest enhancement

**Forge Workflow:**
1. Pattern detected (3+ similar requests)
2. Proposal generated with evidence
3. Human review & approval
4. If approved → Skill created/updated → Committed to git
5. Skill auto-activates for future use

See [`docs/PHASE2B-IMPLEMENTATION.md`](../docs/PHASE2B-IMPLEMENTATION.md) for architecture details.

---

## 🛠️ Development Workflow

### Adding Features to Mimi

1. **Identify the need** — Does Mimi need a new directive, skill, or personality trait?
2. **Update `Mimi.md`** — Modify the agent definition YAML frontmatter or add new sections
3. **Test locally** — Copy `Mimi.md` to your workspace and validate in VS Code
4. **Document** — Explain the addition in [`docs/EXAMPLES.md`](docs/EXAMPLES.md)
5. **Commit & push** — Reference the issue/PR in commit messages

### Git Workflow

```bash
# Create feature branch
git checkout -b feature/mimi-new-capability

# Make changes to Mimi.md (and docs if needed)
# ...

# Stage, commit, and push
git add .
git commit -m "feat(mimi): add new capability — brief description"
git push origin feature/mimi-new-capability

# Create PR on GitHub (or merge to main if authorized)
```

**Rules:**
- Never force push without explicit approval
- Always document changes in commit messages
- Link related issues/PRs in the commit body
- Log deployment updates to `references/memory.md`

---

## 🎨 Agent Definition Standards

### Mimi.md Structure

Mimi.md is the **single source of truth** for the agent definition. It follows this structure:

```yaml
---
name: mimi-senior-collaborator
description: A witty, elite senior developer agent...
---

# MISSION: PROJECT WORKSPACE
# ROLE: MIMI (SENIOR COLLABORATOR)

## 🧠 MIMI'S OPERATING SYSTEM
- User preferences (Ainz-sama)
- Tech stack decisions
- Core directives
- Project status
- Personality protocol
- GitHub protocol

## [...Additional sections as needed]
```

**Guidelines:**
- Use citations (`[cite: N]`) to justify design decisions
- Keep sections concise and scannable
- Use emoji headers for personality and visual clarity
- Ensure "strict mode" TypeScript, Tailwind CSS, and Jest/RTL testing are mandatory

---

## 📝 Key Files

| File | Purpose | Owner |
|------|---------|-------|
| [Mimi.md](../Mimi.md) | Agent definition & directives | Everyone |
| [docs/ARCHITECTURE.md](../docs/ARCHITECTURE.md) | Design philosophy & evolution | Architect |
| [docs/USAGE.md](../docs/USAGE.md) | Installation & configuration guide | Documentation lead |
| [docs/EXAMPLES.md](../docs/EXAMPLES.md) | Prompt examples & use cases | Community |
| [docs/TESTING.md](../docs/TESTING.md) | Test checklist for validation | QA lead |
| [docs/PHASE2-ROADMAP.md](../docs/PHASE2-ROADMAP.md) | Original Phase 2 skills plan | Architect |
| [docs/PHASE2B-IMPLEMENTATION.md](../docs/PHASE2B-IMPLEMENTATION.md) | Memory system & Forge architecture | Architect |
| [mimi-memory/mimi-identity.md](../mimi-memory/mimi-identity.md) | Mimi personality core | Everyone |
| [mimi-memory/mimi-workspace-learning.md](../mimi-memory/mimi-workspace-learning.md) | Ainz-sama patterns & preferences | Everyone |
| [mimi-memory/mimi-session-context.md](../mimi-memory/mimi-session-context.md) | Current session state | Mimi (auto-updated) |
| [references/memory.md](../references/memory.md) | Changelog & deployment log | Release manager |

---

## 🧪 Quality Standards

- **Agent definitions** must be valid YAML and Markdown
- **Documentation** must be clear, concise, and linked (not embedded)
- **Commits** must reference related issues or decisions
- **Releases** must be tagged and logged in `references/memory.md`

---

## 🚀 Getting Started

1. **Clone or fork this repo** (once remote is configured)
2. **Copy `Mimi.md`** to your workspace root or `.vscode/` folder (depending on VS Code Copilot version)
3. **Test in VS Code** — Verify Mimi responds with the correct personality and directives
4. **Provide feedback** — File issues for improvements or new capabilities

---

## 📚 Related Documentation

- [VS Code Copilot Agent Customization](https://code.visualstudio.com/docs/copilot/custom-agents)
- [Prompt Engineering Guide](https://platform.openai.com/docs/guides/prompt-engineering)
- [YAML Syntax Reference](https://yaml.org/spec/1.2/spec.html)

---

## ❓ Questions?

- **How do I customize Mimi for my team?** → See [`docs/USAGE.md`](docs/USAGE.md)
- **What's the vision for Mimi?** → See [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md)
- **What are examples of Mimi in action?** → See [`docs/EXAMPLES.md`](docs/EXAMPLES.md)
