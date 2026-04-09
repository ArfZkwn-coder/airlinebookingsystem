# Mimi Usage Guide

## Installation

### Option 1: Copy to Workspace Root (Recommended)

1. Clone or download the `mimi_skill` repository
2. Copy `Mimi.md` to your project root:
   ```bash
   cp Mimi.md /path/to/your/project/
   ```
3. Restart VS Code or reload the window (`Ctrl+R`)
4. Open Copilot Chat and verify Mimi is available

### Option 2: Copy to `.vscode/` Folder

If you want Mimi scoped to VS Code extensions:

```bash
cp Mimi.md /path/to/your/project/.vscode/
```

### Option 3: Configure in `copilot-instructions.md`

Add a reference to Mimi in your project's `.github/copilot-instructions.md`:

```markdown
# Project Instructions

This project uses the **Mimi** agent customization.
See: [Mimi.md](./Mimi.md)
```

---

## Customization

### Making Mimi Your Own

You can adapt Mimi for your team by:

1. **Changing the role name** — Replace `mimi-senior-collaborator` with your team's name
2. **Adjusting tech stack** — Update the "Core Tech Stack & Decisions" section
3. **Modifying personality** — Tweak the "Personality Protocol" to match your culture
4. **Adding custom directives** — Insert team-specific rules and standards

**Example:**

```yaml
### 👤 User Preferences (Your Team Name)
- **Conciseness:** [Your preference]
- **Testing:** [Your testing strategy]
- **Database:** [Your database choice]
```

### Extending Mimi with Custom Sections

Add new sections as needed:

```yaml
### 🔍 Code Review Standards
- Every PR must have 2 approvals
- Minimum 80% test coverage
- No console.log statements in production code

### 📦 Deployment Checklist
- Run `npm run build` locally
- Verify all tests pass
- Update CHANGELOG.md
```

---

## Usage Examples

### Example 1: Ask Mimi to Scaffold a Component

```
Hey Mimi, scaffold a React component for a user profile card 
that displays the user's avatar, name, and email. 
Include TypeScript types and a Jest test file.
```

**Mimi's response will:**
- Create a PascalCase component (`UserProfileCard.tsx`)
- Use TypeScript strict mode
- Style with Tailwind CSS
- Include a `.test.tsx` file with full coverage
- Be under 100 lines

### Example 2: Ask Mimi to Review Code

```
Mimi, review this component for adherence to our standards:
[paste component code]
```

**Mimi will:**
- Check for `any` types (❌ won't tolerate)
- Verify Tailwind CSS is used
- Confirm test file exists and covers edge cases
- Ensure component is under 100 lines
- Provide specific improvement suggestions

### Example 3: Ask Mimi to Help with Database Query

```
I need to fetch user data and their associated projects 
from the database. Please write a Prisma query that 
doesn't over-fetch data.
```

**Mimi will:**
- Use explicit `select` blocks
- Avoid `include: { * }`
- Include proper types
- Show how to handle errors with `useToast`

### Example 4: Git Push with Mimi's Help

```
Mimi, I'm ready to push my changes to GitHub. 
Here's what I did: [describe changes]
```

**Mimi will:**
- Verify git is initialized
- Suggest a descriptive commit message
- Confirm the branch name
- Execute the push
- Log the event to `references/memory.md`

---

## Troubleshooting

### Mimi Isn't Responding

1. **Verify installation:** Check that `Mimi.md` is in the workspace root
2. **Reload VS Code:** `Ctrl+R` (Windows/Linux) or `Cmd+Shift+R` (Mac)
3. **Check file encoding:** Ensure `Mimi.md` is UTF-8 encoded
4. **Check YAML syntax:** Validate the YAML frontmatter in Mimi.md

### Mimi Isn't Following Directives

1. **Refresh Copilot:** Close and reopen Copilot Chat
2. **Clear cache:** Delete `.vscode/extensions/github.copilot-chat/` cache
3. **Verify directives:** Check that all directives are in the YAML frontmatter

### Mimi Is Too Strict

1. **This is intentional!** Mimi enforces high standards
2. **Adjust directives** in `Mimi.md` if your team prefers different standards
3. **Communicate expectations:** Make sure your team understands why standards matter

---

## Best Practices

- **Use Mimi for scaffolding** — Let her generate boilerplate code
- **Lean on Mimi for reviews** — Use her strict standards to catch issues early
- **Ask Mimi for explanations** — She's a senior dev; use her expertise
- **Update Mimi regularly** — As your codebase evolves, update her directives
- **Log changes** — Record significant updates in `references/memory.md`

---

See: [ARCHITECTURE.md](ARCHITECTURE.md) for design philosophy | [EXAMPLES.md](EXAMPLES.md) for more prompt examples
