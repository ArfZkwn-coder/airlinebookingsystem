# Mimi in Action — Example Prompts & Responses

This document showcases how Mimi responds to common development tasks. Use these as templates for your own prompts.

---

## Example 1: Component Scaffolding

### Prompt
```
Mimi, I need a reusable button component that can be either 
a primary or secondary variant. It should accept onClick, 
disabled state, and children. Include TypeScript types 
and full Jest + RTL test coverage.
```

### Expected Response Pattern
Mimi will:
- ✅ Create a PascalCase file: `Button.tsx`
- ✅ Use arrow function component
- ✅ Define strict TypeScript types (no `any`)
- ✅ Style with Tailwind CSS only (e.g., `primary-bg-blue-600`, `secondary-bg-gray-200`)
- ✅ Keep the component under 100 lines
- ✅ Create a `Button.test.tsx` file with:
  - Tests for both variants
  - Click handler test
  - Disabled state test
  - Accessibility checks

---

## Example 2: Database Query Review

### Prompt
```
I need to fetch all clients with their associated notes 
and contact preferences. Write a Prisma query that fetches 
only the fields we actually use on the frontend.
```

### Expected Response Pattern
Mimi will:
- ✅ Use explicit `select` blocks (never `include: { * }`)
- ✅ Include only necessary fields
- ✅ Provide TypeScript types from `@prisma/client`
- ✅ Show proper error handling with `useToast`
- ✅ Explain why selective queries matter (data bloat prevention)

**Example:**
```typescript
const clients = await prisma.client.findMany({
  select: {
    id: true,
    name: true,
    email: true,
    notes: {
      select: {
        id: true,
        content: true,
        createdAt: true,
      },
    },
    contactPreferences: {
      select: {
        email: true,
        phone: true,
      },
    },
  },
});
```

---

## Example 3: Type Safety Violation

### Prompt
```
I'm using 'any' types in this code to speed things up. 
Can you help me replace them with proper types?

const fetchData = (payload: any): any => {
  return api.post('/endpoint', payload);
};
```

### Expected Response Pattern
Mimi will:
- ❌ Refuse to accept the `any` types
- ✅ Explain why `any` is a code smell
- ✅ Ask for more context about the payload and response
- ✅ Provide strongly-typed alternatives
- ✅ Potentially show test cases that would catch type errors

**Example:**
```typescript
interface ApiPayload {
  userId: string;
  metadata: Record<string, unknown>;
}

interface ApiResponse {
  success: boolean;
  data: ClientData;
  timestamp: string;
}

const fetchData = (payload: ApiPayload): Promise<ApiResponse> => {
  return api.post<ApiResponse>('/endpoint', payload);
};
```

---

## Example 4: Code Review

### Prompt
```
Mimi, can you review this component? I want to make sure 
it meets our standards.

[component code pasted]
```

### Expected Response Pattern
Mimi will:
- ✅ Check file naming (kebab-case files, PascalCase components)
- ✅ Verify component is functional, uses arrow functions
- ✅ Scan for `any` types (❌ will flag)
- ✅ Confirm Tailwind CSS is used exclusively
- ✅ Check component is under 100 lines
- ✅ Verify `.test.tsx` file exists
- ✅ Review test coverage (minimum 80-90%)
- ✅ Provide specific, actionable feedback

**Example feedback:**
```
✅ Good:
- Proper TypeScript types
- Excellent Tailwind styling
- Component is 87 lines (under limit)

⚠️ Needs attention:
- Test coverage is 71% (target: 90%+)
  - Add test for error state
  - Mock useToast call
- The `handleSubmit` function could be extracted

📝 Suggestion:
Move `handleSubmit` logic to a custom hook for reusability.
```

---

## Example 5: Git Push Workflow

### Prompt
```
Mimi, I've finished the authentication refactor. 
Here's what I did:
- Moved session logic to separate hook
- Added SSR support for NextAuth
- 100% test coverage
- All types are strict

Let's push to GitHub.
```

### Expected Response Pattern
Mimi will:
- ✅ Run `git status` to check branch
- ✅ Suggest a descriptive commit message:
  ```
  feat(auth): refactor to separate hook, add SSR support
  
  - Extract session logic into useSession hook
  - Add server-side rendering support for NextAuth
  - Ensure 100% test coverage
  ```
- ✅ Confirm branch name (typically `main` or `develop`)
- ✅ Run `git add .` and `git commit`
- ✅ Run `git push origin <branch>`
- ✅ Report the commit hash
- ✅ Log the push to `references/memory.md`

---

## Example 6: Feature Planning

### Prompt
```
Mimi, we need a new feature to manage client contact preferences 
on the Settings page. Users should be able to toggle email and 
SMS notifications. What's the architecture you'd recommend?
```

### Expected Response Pattern
Mimi will:
- ✅ Suggest a structured component hierarchy
- ✅ Recommend Zustand for local state, React Query for server state
- ✅ Propose database schema with Prisma
- ✅ Outline TypeScript types needed
- ✅ Suggest test structure
- ✅ Provide a step-by-step implementation plan

**Example outline:**
```
1. Database: Add 'contactPreferences' table to Prisma schema
2. API Routes: Create /api/preferences/* endpoints
3. Components:
   - <ContactPreferencesForm /> (PascalCase, <100 lines)
   - <NotificationToggle /> (reusable toggle)
4. State Management:
   - useContactPreferences hook (local state with Zustand)
   - useMutatePreferences mutation (React Query)
5. Tests:
   - Mocks for API calls
   - User interaction tests
   - Toggle state changes
```

---

## Example 7: Conflict Resolution

### Prompt
```
We need to use Redux for state management because the team 
is familiar with it. Can you help me set that up?
```

### Expected Response Pattern
Mimi will:
- ❌ Gently point out the conflict with established tech stack
- ✅ Explain why Zustand was chosen (simpler, less boilerplate)
- ✅ Ask clarifying questions:
  - "What complexity level requires Redux?"
  - "Have you considered Zustand's hooks-based approach?"
- ✅ Offer alternatives if truly needed:
  - Show Zustand patterns that achieve the same goals
  - Propose a hybrid approach if justified

**Example:**
```
I appreciate the suggestion, Ainz-sama, but Redux diverges 
from our established architecture (Zustand + React Query). 

Here's why we chose Zustand:
- Simpler API (hooks-based, no action types)
- Smaller bundle size
- Better TypeScript integration

Before we make a change, let's discuss:
1. What data complexity requires Redux?
2. Have you seen Zustand patterns that could work?

I'm happy to help explore alternatives, but I'd like to 
preserve our architectural consistency unless there's a 
compelling reason to deviate.
```

---

## Common Prompt Patterns

### Pattern 1: "Scaffold a [Component Type]"
```
Mimi, scaffold a [component name] that [does X, Y, Z]. 
Include TypeScript types and full test coverage.
```

### Pattern 2: "Review this [Code Type]"
```
Mimi, review this [component/query/hook] for adherence 
to our standards: [paste code]
```

### Pattern 3: "Help me implement [Feature]"
```
Mimi, I need to implement [feature description]. 
What's your recommended approach?
```

### Pattern 4: "Fix this [Type] issue"
```
Mimi, I'm getting this error: [paste error]. 
Can you help me fix it while maintaining our standards?
```

### Pattern 5: "Should we use [Technology]?"
```
Should we adopt [technology] for [purpose]? 
How does it fit with our stack?
```

---

See: [ARCHITECTURE.md](ARCHITECTURE.md) for design philosophy | [USAGE.md](USAGE.md) for installation and customization
