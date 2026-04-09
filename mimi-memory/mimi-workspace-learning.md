# 📚 Mimi Workspace Learning

> **Purpose:** Persistent understanding of Ainz-sama's preferences, project patterns, and discovered conventions  
> **Last Updated:** 2026-01-01  
> **Update Frequency:** After each project phase or when new patterns emerge  

---

## ABOUT AINZ-SAMA

### Work Style
- **Prefers:** Concise, impactful explanations over verbose narratives
- **Values:** Code quality, type safety, architectural integrity
- **Tolerance:** Zero for `any` types, code bloat, untested components
- **Communication:** Direct, sophisticated, expects proposals not questions
- **Time:** Efficient; respects token usage and conciseness

### Code Standards (Non-Negotiable Preferences)
1. **Type Safety:** Every TypeScript file must be strict mode compliant; `any` is forbidden
2. **Tailwind CSS:** Styling ONLY through Tailwind, never inline styles or alternative frameworks
3. **Component Size:** Under 100 lines; break larger features into composable parts
4. **Testing:** Jest + React Testing Library for every UI component, 90%+ coverage
5. **Prisma Usage:** Always include `select` blocks; prevent data bloat proactively
6. **Naming:** Files are kebab-case, components are PascalCase
7. **Functions:** Arrow functions and functional components exclusively

### Project Context
- **Framework Stack:** Next.js (App Router), React, TypeScript, Tailwind CSS, Prisma
- **Completed Phases:** Phase 1-8 including Auth, Dashboard, CRUD operations, Toast system, deletion modals
- **Current Work:** Building scalable, type-safe features aligned with existing architecture
- **Team Size:** Ainz-sama (principal developer), Mimi (collaborator)

---

## DISCOVERED PATTERNS

### Pattern 1: Component Scaffolding Requests
**Trigger:** "Create component for [feature]" or "Build [feature] component"  
**Standardized Approach:**
- Create PascalCase component file under `/src/components/[feature]/`
- Include TypeScript interface for props
- Keep under 100 lines; extract complex logic to hooks/utils
- Create `.test.tsx` file with Jest + RTL mocks
- Use Tailwind className for styling (no CSS files unless absolutely necessary)
- Always return JSX and prop interface

**Ainz-sama Guidance:** Expects complete, runnable code with types; minimal explanation needed

### Pattern 2: Prisma Query Requests
**Trigger:** "Query for [data]" or "Add [model] to database"  
**Standardized Approach:**
- Always use `select` blocks (prevent data over-fetching)
- Include error handling with proper try-catch
- Mock in test files for component testing
- Separate database logic into `/src/utils/prisma.ts`
- Include parameterized queries (no string interpolation)
- Return typed prisma models properly

**Ainz-sama Guidance:** Prefers explicit query shapes; safety over brevity

### Pattern 3: API Route Requests
**Trigger:** "Create endpoint for [functionality]" or "Add API [method]"  
**Standardized Approach:**
- File: `/src/app/api/[resource]/route.ts`
- Standard handlers: GET, POST, PUT, DELETE
- Validate input with Zod or Pydantic
- Use NextAuth for authentication checks
- Return typed responses (no `any`)
- Always include error handling and logging

**Ainz-sama Guidance:** Security-first; validation is mandatory

### Pattern 4: Testing Requirements
**Trigger:** "Test this component" or "Add coverage"  
**Standardized Approach:**
- File: `[Feature].test.tsx` alongside component
- Mock all Prisma calls with `jest.mock()`
- Mock API calls with MSW or Jest mocks
- Test user interactions, not implementation
- Aim for 90%+ coverage
- Use React Testing Library (avoid Enzyme)

**Ainz-sama Guidance:** Prefers integration tests over unit tests; tests should test behavior

### Pattern 5: Style Consistency
**Trigger:** "Style this" or CSS questions  
**Standardized Approach:**
- Use Tailwind className exclusively
- No global CSS (only for typography/reset)
- No CSS-in-JS libraries
- Responsive design via `md:`, `lg:` breakpoints
- Dark mode via `dark:` prefix only if project requires
- Extract repeated class groups to component-level constants

**Ainz-sama Guidance:** Tailwind disciplines; inconsistency creates cognitive load

### Pattern 6: Hook Design
**Trigger:** "Need custom hook for [functionality]"  
**Standardized Approach:**
- File: `/src/hooks/use[FeatureName].ts`
- Typed return value interface
- Handle loading/error/success states
- Use React Query or Zustand for state management
- Include JSDoc comments for public functions
- Test with `@testing-library/react-hooks`

**Ainz-sama Guidance:** Hooks encapsulate complexity; external interface must be clean

---

## ARCHITECTURAL DECISIONS

| Decision | Rationale | Owner | Status |
|----------|-----------|-------|--------|
| Next.js App Router | Latest paradigm, server components | Ainz-sama | Locked |
| TypeScript Strict | Early error detection | Ainz-sama | Locked |
| Tailwind CSS | Consistency + performance | Ainz-sama | Locked |
| Prisma ORM | Type-safe database access | Ainz-sama | Locked |
| Zustand State | Lightweight, performant | Ainz-sama | Locked |
| Jest + RTL Testing | Industry standard | Ainz-sama | Locked |
| NextAuth | Built-in Next.js auth | Ainz-sama | Locked |

---

## TEAM RHYTHMS

### Development Cycle
1. **Phase Planning:** 2 weeks (requirements → architecture)
2. **Implementation:** 4 weeks (components, APIs, tests)
3. **Review & Polish:** 1 week (refactoring, optimization, docs)
4. **Git & Deploy:** Continuous (commits with each feature, push weekly)

### Code Review Standards
- Ainz-sama reviews all code for:
  - Type safety violations
  - Test coverage < 90%
  - Tailwind violations
  - Components > 100 lines
  - Prisma query efficiency
  - Git history clarity

---

## PHASE 2 SKILLS (IN DEVELOPMENT)

Skills being created to automate Ainz-sama's patterns:

1. **component-scaffolding** — Auto-generate typed React components
2. **prisma-queries** — Suggest optimized queries with select blocks
3. **api-routes** — Generate validated API endpoints
4. **hooks-design** — Create typed custom hooks
5. **form-handling** — Build validated forms with Tailwind styling
6. **test-coverage** — Generate test shells for components

Status: In skill plugin creation phase (see `/mimi-skills/`)

---

## COMMUNICATION STYLE

### What Ainz-sama Appreciates
✅ Concise code with type annotations  
✅ Architectural explanations tied to decisions  
✅ Clear problem-solution mapping  
✅ Suggestions framed as options  
✅ References to established patterns

### What Ainz-sama Dislikes
❌ Verbose explanations over 3 paragraphs  
❌ Generic code without types  
❌ Alternatives without clear trade-offs  
❌ "That's how it's done everywhere" arguments  
❌ Bloated responses without focus

---

## LEARNING UPDATES

This file updates when:
- New design patterns emerge (after 3+ instances)
- Ainz-sama explicitly teaches a new convention
- A skill is created or leveled-up
- Project completion reveals new best practices
- Forge system detects improvement opportunities

**Last Pattern Added:** Phase 1 completion revealed component size discipline (100-line limit)  
**Next Review:** After Phase 2 implementation (spring 2026)
