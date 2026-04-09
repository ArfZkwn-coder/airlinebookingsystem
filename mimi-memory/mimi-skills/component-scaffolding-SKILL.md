# 🧩 Component Scaffolding Skill

**Version:** Lv.1  
**Trigger:** Component creation requests (e.g., "Build [Feature] component")  
**Owner:** Mimi (auto-triggered)  
**Last Updated:** 2026-01-01  

---

## 📋 SKILL DESCRIPTION

When Ainz-sama requests a new component, Mimi activates this skill to:
1. Generate PascalCase component with TypeScript interfaces
2. Keep under 100 lines (break larger features into smaller parts)
3. Use Tailwind CSS exclusively for styling
4. Create `.test.tsx` file with Jest + RTL mocks
5. Provide complete, runnable code ready for use

**Auto-Triggers When:**
- User says: "Create component for...", "Build [Feature] component", "New component..."
- Context indicates UI component creation need
- File path includes `/components/`

---

## 🛠️ SKILL PROTOCOL

### Step 1: Analyze Requirements
```
From user request:
  - Feature name
  - Component purpose
  - Props/dependencies
  - Styling complexity
  - Test requirements
```

### Step 2: Generate Component
```typescript
// File: src/components/[feature]/[ComponentName].tsx

import React from 'react';

interface Props {
  // Typed props (NO any types)
}

export const [ComponentName]: React.FC<Props> = ({ prop1, prop2 }) => {
  // Component logic here
  
  return (
    <div className="...">
      {/* JSX using Tailwind className only */}
    </div>
  );
};
```

### Step 3: Generate Test File
```typescript
// File: src/components/[feature]/[ComponentName].test.tsx

import { render, screen } from '@testing-library/react';
import { [ComponentName] } from './[ComponentName]';

// Mock all external dependencies
jest.mock('...', () => ({...}));

describe('[ComponentName]', () => {
  it('renders correctly', () => {
    // Test implementation
  });
});
```

### Step 4: Validate Quality
- ✅ No `any` types
- ✅ Under 100 lines (if not, break into separate components)
- ✅ Tailwind styling only (no CSS files)
- ✅ Props interface present
- ✅ Test file created with mocks
- ✅ Export statement correct

### Step 5: Deliver
- Provide complete, copy-paste-ready code
- Explain component structure briefly
- Highlight any Tailwind classes used
- Reference similar components if applicable

---

## 📝 COMPONENT STRUCTURE STANDARDS

### Naming Convention
```
Feature Name: Dashboard Navigation
  → Component: DashboardNavigation.tsx
  → Folder: src/components/dashboard-navigation/
  → Test: DashboardNavigation.test.tsx
```

### Props Interface Pattern
```typescript
interface DashboardNavigationProps {
  currentPage: 'home' | 'search' | 'bookings';
  onNavigate: (page: string) => void;
  isAuthenticated: boolean;
}

export const DashboardNavigation: React.FC<DashboardNavigationProps> = ({
  currentPage,
  onNavigate,
  isAuthenticated,
}) => {
  // Component implementation
};
```

### Tailwind Styling Pattern
```typescript
<nav className="flex items-center justify-between px-4 py-2 bg-blue-600 text-white">
  <h1 className="text-xl font-bold">Dashboard</h1>
  <ul className="flex gap-4">
    {/* Navigation items */}
  </ul>
</nav>
```

### Test Mock Pattern
```typescript
// Mock Prisma calls
jest.mock('@/lib/prisma', () => ({
  defaultClient: {
    user: { findUnique: jest.fn() },
  },
}));

// Mock API calls
jest.mock('@/services/api', () => ({
  fetchUserData: jest.fn().mockResolvedValue({
    id: '123',
    name: 'Test User',
  }),
}));
```

---

## 🎯 TRIGGER PHRASES

Automatically activate on:
- "Create a [ComponentName] component"
- "Build new component for [feature]"
- "Generate component that..."
- "Need a component to..."
- "Component for [UI element]"
- "New [feature] component"

---

## 📊 SKILL LEVELS

### Level 1 (Current)
- Basic component scaffolding
- Single component per request
- Simple props interfaces
- Tailwind styled
- Jest test shell

### Level 2 (Planned)
- Component composition patterns
- Custom hooks extraction
- Context provider creation
- Form component scaffolding
- Accessibility compliance checks

### Level 3 (Future)
- Full page component generation
- Storybook integration
- Visual regression testing
- Performance optimization suggestions
- Design system documentation

---

## ✅ QUALITY CHECKLIST

Before delivering component:

- [ ] Component name is PascalCase
- [ ] Props interface defined (no implicit `any`)
- [ ] Fewer than 100 lines (or split appropriately)
- [ ] Uses only Tailwind className (no CSS files)
- [ ] Exports component as named export
- [ ] Test file created with 2+ test cases
- [ ] All external deps mocked in tests
- [ ] Comment explains complex logic
- [ ] No console.log or debug code
- [ ] TypeScript compiles without errors

---

## 🔄 INVOCATION EXAMPLES

**User:** "Create a LoginForm component"  
**Mimi Activates:** component-scaffolding Skill  
**Output:**
```
Generating LoginForm component...

✅ Component Location: src/components/auth/LoginForm.tsx
✅ Features: Email/password inputs, form validation, error display
✅ Test File: LoginForm.test.tsx (with mock API calls)
✅ Lines: 78/100
✅ Quality: All checks passed

Here's the component:
[Complete, runnable code]

```

---

## 📚 RELATED COMPONENTS

When creating components, reference:
- `src/components/README.md` for naming conventions
- `docs/EXAMPLES.md#component-scaffolding` for examples
- Existing components in `/components` for style consistency
- `mimi-workspace-learning.md#pattern-1` for detailed standards

---

**Mimi Component Scaffolding Skill v1.0**  
*Empowered by: Phase 2 Skill Plugin System*  
*Maintenance:** Auto-triggers on component requests; levels up through pattern recognition
