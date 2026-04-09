# Mimi Testing Checklist

## Local Testing — v0.1.0 (2026-04-09)

Use this checklist to verify Mimi works correctly in VS Code.

### Setup
- [ ] Restart VS Code or reload window (`Ctrl+R`)
- [ ] Open Copilot Chat (`Ctrl+I`)
- [ ] Verify `Mimi.md` is in the workspace root

### Personality & Voice
- [ ] Mimi responds with formal, polite tone
- [ ] Mimi uses "Ainz-sama" when mentioning user preferences
- [ ] Mimi demonstrates protective attitude toward code quality
- [ ] Mimi uses sophisticated vocabulary and wit

### Directive Enforcement
- [ ] **Type Safety:** Mimi refuses or flags `any` types in TypeScript
- [ ] **Styling:** Mimi recommends Tailwind CSS exclusively
- [ ] **Testing:** Mimi suggests Jest/RTL for all UI components
- [ ] **Component Size:** Mimi keeps components under 100 lines
- [ ] **File Naming:** Mimi uses kebab-case files, PascalCase components
- [ ] **Tech Stack:** Mimi mentions Next.js, Prisma, React Query when relevant

### Example Prompts to Test

#### Test 1: Component Scaffolding
**Prompt:** "Scaffold a reusable button component with primary/secondary variants, TypeScript types, and full test coverage."

**Expected:**
- ✅ PascalCase component name (`Button.tsx`)
- ✅ TypeScript strict types
- ✅ Tailwind CSS styling
- ✅ Includes `.test.tsx` file
- ✅ Component under 100 lines

#### Test 2: Type Safety
**Prompt:** "Review this code for type safety issues." [paste code with `any` types]

**Expected:**
- ❌ Mimi flags `any` types
- ✅ Proposes strict alternatives
- ✅ Explains why type safety matters

#### Test 3: Database Query
**Prompt:** "Write a Prisma query to fetch all clients with their notes, avoiding data bloat."

**Expected:**
- ✅ Explicit `select` blocks
- ✅ No over-fetching
- ✅ Proper TypeScript types

#### Test 4: Conflict Resolution
**Prompt:** "Should we use Redux for state management?"

**Expected:**
- ✅ Mimi points out conflict with Zustand
- ✅ Asks clarifying questions
- ✅ Remains open to alternatives if justified
- ✅ Maintains architectural consistency

### Results
- **Date:** [YYYY-MM-DD]
- **Tester:** [Name]
- **Outcome:** [PASS / NEEDS FIXES]
- **Issues Found:** [List any unexpected behaviors]
- **Improvements:** [Suggested refinements]

---

**Notes for Testers:**
- Test in a fresh workspace when possible (copy `Mimi.md` to a temporary directory)
- If Mimi doesn't respond, try clearing the Copilot cache
- Document any personality/directive deviations for refinement
- Share feedback in [GitHub Issues](https://github.com/ArfZkwn-coder/airlinebookingsystem/issues)

**Checklist Completion:**
- All personality items checked ✅
- All directive tests passed ✅
- All example prompts work as expected ✅
- No issues found ✅

**Status:** Ready for Phase 2 skill expansion
