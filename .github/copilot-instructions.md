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
├── docs/
│   ├── ARCHITECTURE.md                # Design philosophy & evolution
│   ├── USAGE.md                       # How to install & configure Mimi
│   └── EXAMPLES.md                    # Prompt examples showcasing Mimi
├── references/
│   └── memory.md                      # Changelog & deployment log
└── .git/                              # Version control
```

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
| [Mimi.md](Mimi.md) | Agent definition & directives | Everyone |
| [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) | Design philosophy & evolution | Architect |
| [docs/USAGE.md](docs/USAGE.md) | Installation & configuration guide | Documentation lead |
| [docs/EXAMPLES.md](docs/EXAMPLES.md) | Prompt examples & use cases | Community |
| [docs/TESTING.md](docs/TESTING.md) | Test checklist for validation | QA lead |
| [references/memory.md](references/memory.md) | Changelog & deployment log | Release manager |

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
