# Phase 2 Skills Roadmap — Mimi Evolution (Q2-Q3 2026)

> **Status:** Planning complete | **Target Release:** July 2026 (v0.2.0)

---

## 🎯 Phase 2 Overview

Phase 1 (✅ complete) established Mimi's core persona and workspace instructions. Phase 2 will expand Mimi's capabilities by creating **reusable skills** that automate common development patterns.

### Phase 2 Goals
1. **Reduce boilerplate** — Automatically scaffold components, hooks, and queries
2. **Enforce patterns** — Embed architectural decisions into reusable templates
3. **Accelerate development** — Save time on repetitive coding tasks
4. **Maintain consistency** — Ensure all generated code follows strict standards

---

## 📦 Proposed Skills for Phase 2

### Skill 1: React Component Scaffolding
**Goal:** Generate a complete React component with types, styling, and tests

**What it does:**
- Prompts for component name, props, features
- Generates `ComponentName.tsx` with TypeScript strict types
- Adds Tailwind CSS styling patterns
- Creates `ComponentName.test.tsx` with RTL tests
- Keeps component under 100 lines (split into smaller components if needed)

**Example:**
```
/scaffold-component button --variant=primary,secondary --include-loading --include-disabled
```

**Outputs:**
```
Button.tsx
Button.test.tsx
```

**Checklist:**
- [ ] Design skill definition (SKILL.md)
- [ ] Create component template with TypeScript generics
- [ ] Add test boilerplate (RTL patterns)
- [ ] Integration with Copilot Chat slash command
- [ ] Documentation & examples

---

### Skill 2: Prisma Query Optimizer
**Goal:** Generate type-safe Prisma queries with explicit `select` blocks

**What it does:**
- Analyzes requested data
- Generates Prisma queries with explicit `select` (no over-fetching)
- Includes TypeScript types from `@prisma/client`
- Shows error handling patterns
- Suggests caching strategies with React Query

**Example:**
```
/prisma-query --model=Client --include=notes,preferences --exclude=internalMeta
```

**Outputs:**
```typescript
const clients = await prisma.client.findMany({
  select: {
    id: true,
    name: true,
    email: true,
    notes: {
      select: { id: true, content: true, createdAt: true }
    },
    contactPreferences: {
      select: { email: true, phone: true }
    }
  }
});
```

**Checklist:**
- [ ] Schema analysis tool (read Prisma schema, suggest fields)
- [ ] Query template for common patterns (findMany, findUnique, create, update)
- [ ] Type generation integration
- [ ] Error handling patterns
- [ ] React Query cache configuration examples

---

### Skill 3: Custom React Hooks
**Goal:** Generate type-safe custom hooks following Mimi's standards

**What it does:**
- Creates hooks for common patterns (data fetching, forms, state)
- Integrates with Zustand (local state) + React Query (server state)
- Includes TypeScript types and error handling
- Provides test patterns for hooks

**Examples:**
- `useForm(initialValues, onSubmit)` — Form handling
- `useApi(endpoint)` — Data fetching with caching
- `useAuth()` — Authentication state
- `useNotification()` — Toast notifications via `useToast`

**Example:**
```
/create-hook useForm --mode=controlled --with-validation --with-tests
```

**Outputs:**
```
hooks/useForm.ts
hooks/useForm.test.ts
```

**Checklist:**
- [ ] Hook template library (form, fetch, auth, notifications)
- [ ] Zustand integration patterns
- [ ] React Query integration patterns
- [ ] Error handling & TypeScript types
- [ ] Test boilerplate for hooks

---

### Skill 4: API Route Scaffolding
**Goal:** Generate Next.js API routes with proper error handling and types

**What it does:**
- Creates typed API route handlers
- Integrates with Prisma queries
- Includes validation middleware
- Proper error responses with `useToast` compatibility
- CORS and security best practices

**Example:**
```
/scaffold-api-route POST /api/clients --model=Client --actions=create,read --with-auth
```

**Outputs:**
```
app/api/clients/route.ts
app/api/clients/[id]/route.ts
app/api/middleware/auth.ts
```

**Checklist:**
- [ ] Route template with proper status codes
- [ ] TypeScript request/response types
- [ ] Validation middleware pattern
- [ ] Error handling standardization
- [ ] Prisma integration
- [ ] Auth guard patterns

---

### Skill 5: Form Component Generator
**Goal:** Create complete form components with validation, error display, and tests

**What it does:**
- Generates form component with React Hook Form (or similar)
- Integrates error display with `useToast`
- TypeScript types for form data
- Field components (input, select, checkbox, textarea)
- Test file with validation scenarios

**Example:**
```
/scaffold-form ClientForm --fields=name,email,phone --with-async-validation --with-submission-loading
```

**Outputs:**
```
ClientForm.tsx (with <FormInput />, <FormSelect />, etc.)
ClientForm.test.tsx (with validation, submission, error tests)
```

**Checklist:**
- [ ] Form component template
- [ ] Field component library (Input, Select, Checkbox, Textarea)
- [ ] Validation integration
- [ ] Error display patterns
- [ ] Loading & disabled states
- [ ] Test patterns for forms

---

### Skill 6: Test Coverage Reporter
**Goal:** Analyze test coverage and suggest missing test cases

**What it does:**
- Scans component/hook for test coverage
- Identifies untested code paths
- Suggests test cases (happy path, error states, edge cases)
- Generates test file boilerplate for missing tests
- Enforces 90%+ coverage requirement

**Example:**
```
/check-coverage Button.tsx
```

**Output:**
```
Coverage Analysis for Button.tsx:
- Current: 71% (Lines: 15/21)
- Missing:
  ✗ onClick handler with disabled state
  ✗ Variant styling combinations
  ✗ Accessibility attributes
  
Suggested tests:
[ ] Test onClick not called when disabled
[ ] Test all variant combinations
[ ] Test aria-label prop
```

**Checklist:**
- [ ] Jest coverage analysis
- [ ] Path detection for untested code
- [ ] Test suggestion engine
- [ ] Automatic test generation for common patterns
- [ ] Coverage threshold enforcement

---

## 🗺️ Implementation Timeline

### Week 1-2: Planning & Design
- [ ] Create SKILL.md for each skill above
- [ ] Define VS Code Copilot Chat integration points
- [ ] Review TypeScript type patterns
- [ ] Set up test templates

### Week 3-4: Component & Hook Scaffolding (Skills 1-3)
- [ ] Implement React component scaffolder
- [ ] Implement Prisma query generator
- [ ] Implement custom hook scaffolder
- [ ] Write unit tests for each skill

### Week 5-6: API & Form Skills (Skills 4-5)
- [ ] Implement API route scaffolder
- [ ] Implement form component generator
- [ ] Integrate with validation patterns
- [ ] Write integration tests

### Week 7-8: Testing & Coverage (Skill 6)
- [ ] Implement test coverage analyzer
- [ ] Implement test suggestion engine
- [ ] Refine based on early feedback
- [ ] Create comprehensive documentation

### Week 9: QA & Release
- [ ] User testing with Phase 1 feedback
- [ ] Performance optimization
- [ ] Documentation & examples
- [ ] Release v0.2.0

---

## 🔗 Integration Points

### VS Code Copilot Chat
Each skill should integrate with Copilot Chat slash commands:

```
/scaffold-component [name] [options]
/prisma-query [options]
/create-hook [name] [options]
/scaffold-api-route [method] [path] [options]
/scaffold-form [name] [options]
/check-coverage [file]
```

### Custom Directives
Skills should inherit Mimi's directives:
- ✅ Strict TypeScript types (no `any`)
- ✅ Tailwind CSS only
- ✅ Jest + RTL for tests
- ✅ Components under 100 lines
- ✅ Explicit Prisma `select` blocks

### File Naming
- Components: `PascalCase.tsx` (e.g., `Button.tsx`)
- Hooks: `camelCase.ts` (e.g., `useForm.ts`)
- API routes: lowercase with `/` (e.g., `/api/clients/route.ts`)
- Tests: `FileName.test.tsx` or `filename.test.ts`

---

## 📊 Success Metrics

By end of Phase 2, we should see:
- ✅ 6 reusable skills documented and tested
- ✅ 50% reduction in boilerplate creation time
- ✅ 90%+ test coverage across generated code
- ✅ 100% TypeScript type safety (no `any` types)
- ✅ Positive user feedback on developer experience

---

## 🎓 Learning from Phase 1

**What Worked:**
- Clear persona (Mimi's personality resonates with users)
- Strict standards (teams appreciate opinionated guidance)
- Documentation (examples and architecture docs were helpful)

**What to Improve:**
- More concrete code examples (not just descriptions)
- Faster feedback loop (add skill testing checklist early)
- Community feedback channel (GitHub Issues or Discussions)

---

## 🚀 Phase 3 & 4 Rough Ideas

### Phase 3: Community Tools (Q3-Q4 2026)
- Package Mimi skills as a VS Code extension
- Public documentation site & marketplace
- Community contribution framework
- Feedback collection system

### Phase 4: Advanced Features (Q4 2026+)
- Multi-role Mimi (Code Review mode, Mentoring mode, etc.)
- Team-specific customization profiles
- CI/CD integration (automated checks aligned with Mimi standards)
- AI-powered code review using Mimi's standards

---

## 📝 Next Step

**Action:** 
1. Collect feedback from Phase 1 (early testers)
2. Prioritize skills based on user requests
3. Create detailed SKILL.md files for top 3 priorities
4. Begin implementation in Week 1

**Owner:** TBD  
**Target:** Phase 2 kickoff → 2026-05-01

---

See: [ARCHITECTURE.md](ARCHITECTURE.md) for Phase 1-4 overview | [references/memory.md](references/memory.md) for deployment log
