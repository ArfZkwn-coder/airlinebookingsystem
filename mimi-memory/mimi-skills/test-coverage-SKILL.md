# 🧪 Test Coverage Skill

**Version:** Lv.1  
**Trigger:** Testing requests (e.g., "Write tests for...", "Add coverage for...")  
**Owner:** Mimi (auto-triggered)  
**Last Updated:** 2026-01-01  

---

## 📋 SKILL DESCRIPTION

When Ainz-sama needs tests, Mimi activates this skill to:
1. Generate Jest tests for components
2. Use React Testing Library for user interaction testing
3. Mock API calls and Prisma database operations
4. Ensure 90%+ code coverage
5. Test behavior, not implementation

**Auto-Triggers When:**
- User says: "Write tests for...", "Add coverage for...", "Test this..."
- Context indicates testing need
- New component/function added without tests

---

## 🛠️ SKILL PROTOCOL

### Step 1: Analyze Component/Code
```
From user request:
  - Component/function to test
  - External dependencies (API, Prisma)
  - User interactions to test
  - Error scenarios
  - Edge cases
```

### Step 2: Setup Test File Structure
```typescript
// File: src/components/[Feature]/[Component].test.tsx

import { render, screen, userEvent, waitFor } from '@testing-library/react';
import { [Component] } from './[Component]';

// Mock all external dependencies
jest.mock('@/api', () => ({
  fetchData: jest.fn(),
}));

jest.mock('@/lib/prisma', () => ({
  prisma: {
    user: { findUnique: jest.fn() },
  },
}));

describe('[Component]', () => {
  // Test cases here
});
```

### Step 3: Write Rendering Tests
```typescript
describe('[Component]', () => {
  it('renders component correctly', () => {
    render(<Component />);
    expect(screen.getByText('Expected text')).toBeInTheDocument();
  });

  it('displays all required elements', () => {
    render(<Component />);
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
  });
});
```

### Step 4: Write Interaction Tests
```typescript
it('handles user input', async () => {
  render(<LoginForm onSubmit={jest.fn()} />);
  
  const emailInput = screen.getByLabelText(/email/i);
  const passwordInput = screen.getByLabelText(/password/i);
  
  await userEvent.type(emailInput, 'test@test.com');
  await userEvent.type(passwordInput, 'password123');
  
  expect(emailInput).toHaveValue('test@test.com');
  expect(passwordInput).toHaveValue('password123');
});
```

### Step 5: Write Async Tests (API/Database)
```typescript
it('fetches data on mount', async () => {
  const mockFetch = jest.fn().mockResolvedValue({
    id: '1',
    name: 'Test',
  });
  
  jest.mock('@/api', () => ({ fetchData: mockFetch }));
  
  render(<Component />);
  
  await waitFor(() => {
    expect(mockFetch).toHaveBeenCalled();
    expect(screen.getByText('Test')).toBeInTheDocument();
  });
});
```

### Step 6: Write Error Tests
```typescript
it('handles API errors', async () => {
  jest.mock('@/api', () => ({
    fetchData: jest.fn().mockRejectedValue(new Error('API Error')),
  }));
  
  render(<Component />);
  
  await waitFor(() => {
    expect(screen.getByText(/error/i)).toBeInTheDocument();
  });
});
```

---

## 🎯 TEST PATTERNS

### Component Render Test
```typescript
it('renders with correct props', () => {
  const props = { title: 'Test Title', onClose: jest.fn() };
  render(<Modal {...props} />);
  
  expect(screen.getByText('Test Title')).toBeInTheDocument();
});
```

### User Interaction Test
```typescript
it('calls onClick handler when button clicked', async () => {
  const handleClick = jest.fn();
  render(<Button onClick={handleClick}>Click me</Button>);
  
  await userEvent.click(screen.getByText('Click me'));
  
  expect(handleClick).toHaveBeenCalledTimes(1);
});
```

### Form Submission Test
```typescript
it('submits form with correct data', async () => {
  const handleSubmit = jest.fn();
  render(<LoginForm onSubmit={handleSubmit} />);
  
  await userEvent.type(screen.getByLabelText(/email/i), 'test@test.com');
  await userEvent.type(screen.getByLabelText(/password/i), 'pass123');
  await userEvent.click(screen.getByRole('button', { name: /login/i }));
  
  expect(handleSubmit).toHaveBeenCalledWith({
    email: 'test@test.com',
    password: 'pass123',
  });
});
```

### API Call Test
```typescript
it('fetches and displays data', async () => {
  (fetchUserData as jest.Mock).mockResolvedValue({
    id: '1',
    name: 'John Doe',
  });
  
  render(<UserProfile userId="1" />);
  
  await waitFor(() => {
    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });
});
```

### Error Handling Test
```typescript
it('displays error message on failure', async () => {
  (fetchUserData as jest.Mock).mockRejectedValue(
    new Error('Failed to fetch')
  );
  
  render(<UserProfile userId="1" />);
  
  await waitFor(() => {
    expect(screen.getByText(/error|failed/i)).toBeInTheDocument();
  });
});
```

### Conditional Rendering Test
```typescript
it('shows loading state while fetching', () => {
  (fetchUserData as jest.Mock).mockImplementation(
    () => new Promise(() => {}) // Never resolves
  );
  
  render(<UserProfile userId="1" />);
  
  expect(screen.getByText(/loading/i)).toBeInTheDocument();
});
```

---

## 📊 MOCK PATTERNS

### Mock API Calls
```typescript
jest.mock('@/services/api', () => ({
  fetchUserData: jest.fn().mockResolvedValue({
    id: '123',
    email: 'user@test.com',
    name: 'Test User',
  }),
  createPost: jest.fn().mockResolvedValue({ id: '1', title: 'New Post' }),
}));
```

### Mock Prisma
```typescript
jest.mock('@/lib/prisma', () => ({
  prisma: {
    user: {
      findUnique: jest.fn().mockResolvedValue({
        id: '1',
        email: 'test@test.com',
      }),
      create: jest.fn().mockResolvedValue({ id: '2', email: 'new@test.com' }),
    },
  },
}));
```

### Mock NextAuth
```typescript
jest.mock('next-auth', () => ({
  getServerSession: jest.fn().mockResolvedValue({
    user: { id: '1', email: 'test@test.com', name: 'Test' },
  }),
}));
```

### Mock Router
```typescript
const mockPush = jest.fn();
jest.mock('next/router', () => ({
  useRouter: () => ({
    push: mockPush,
    pathname: '/test',
    query: {},
  }),
}));
```

---

## ⚠️ CRITICAL RULES

1. **Test Behavior:** Test what users see/do, not implementation details
2. **Use screen:** Access elements via `screen` queries (getByRole, getByText)
3. **Mock External:** Always mock API calls, Prisma, and external libs
4. **90% Coverage:** Aim for function, line, and branch coverage at 90%+
5. **Descriptive Names:** Test names should explain what they test
6. **One Assert:** Prefer one main assertion per test (or logically related)
7. **Cleanup:** RTL handles cleanup automatically after each test

---

## 🔄 INVOCATION EXAMPLES

**User:** "Write tests for LoginForm component"  
**Mimi Activates:** test-coverage Skill  
**Output:**
```
Generating test file...

✅ Test File: LoginForm.test.tsx
✅ Coverage Areas:
   - Rendering with props
   - User input handling
   - Form submission
   - Error display
   - Loading state
✅ Mocks: API call mocked with jest.fn()
✅ Assertions: 5+ test cases covering 90%+ code
✅ Pattern: User behavior testing (not implementation)

Here's the test file...
```

---

## 📊 SKILL LEVELS

### Level 1 (Current)
- Component render tests
- User interaction tests
- API mocking
- Basic error scenarios
- 90% coverage target

### Level 2 (Planned)
- Snapshot testing
- Performance testing
- Accessibility testing (axe)
- Integration tests
- E2E test patterns

### Level 3 (Future)
- Visual regression testing
- Mutation testing
- Coverage reports generation
- CI/CD test integration
- Load testing patterns

---

## ✅ QUALITY CHECKLIST

Before delivering tests:

- [ ] Test file location correct (`*.test.tsx` or `*.test.ts`)
- [ ] All external dependencies mocked
- [ ] Tests are descriptive and specific
- [ ] Uses `screen` queries (not `container`)
- [ ] Tests user behavior, not implementation
- [ ] 90%+ code coverage achieved
- [ ] Use `waitFor` for async operations
- [ ] Mock imports at top of file
- [ ] No hardcoded delays (use waitFor instead)
- [ ] Each test is independent and isolated

---

## COVERAGE REPORT COMMANDS

```bash
# Run tests with coverage
npm test -- --coverage

# Run specific test file
npm test -- LoginForm.test.tsx

# Run in watch mode
npm test -- --watch

# Update snapshots (if using snapshots)
npm test -- -u
```

---

**Mimi Test Coverage Skill v1.0**  
*Empowered by: Phase 2 Skill Plugin System*  
*Maintenance:** Auto-triggers on test requests; levels up through pattern recognition
