# 🪝 Custom Hooks Skill

**Version:** Lv.1  
**Trigger:** Hook/logic requests (e.g., "Create custom hook for...", "Need hook for...")  
**Owner:** Mimi (auto-triggered)  
**Last Updated:** 2026-01-01  

---

## 📋 SKILL DESCRIPTION

When Ainz-sama needs custom hooks, Mimi activates this skill to:
1. Extract component logic into reusable hooks
2. Use React Query for server state, Zustand for local state
3. Include proper TypeScript types and JSDoc comments
4. Provide loading/error/success state management
5. Create testable, composition-friendly hooks

**Auto-Triggers When:**
- User says: "Create custom hook for...", "Need hook for...", "Extract hook..."
- Context indicates reusable hook pattern needed
- Multiple components share similar logic

---

## 🛠️ SKILL PROTOCOL

### Step 1: Identify Hook Purpose
```
From user request:
  - Hook name (useAuth, useForm, etc.)
  - State management needs (local/server)
  - Side effects to handle
  - Return value shape
  - Error scenarios
```

### Step 2: Choose State Strategy
```
- useQuery (React Query): Fetch server data
- useMutation (React Query): Update server data
- useState: Simple local state
- useReducer: Complex local state
- Zustand store: Shared state across components
```

### Step 3: Generate Hook with JSDoc
```typescript
// File: src/hooks/use[FeatureName].ts

/**
 * Fetches user profile data
 * @param userId - The user ID to fetch
 * @returns User profile state and functions
 * @example
 * const { data, isLoading, error } = useUserProfile('123');
 */
export const useUserProfile = (userId: string) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['user', userId],
    queryFn: async () => {
      const response = await fetch(`/api/users/${userId}`);
      return response.json();
    },
  });

  return {
    data,
    isLoading,
    error,
  };
};
```

### Step 4: Define Return Type Interface
```typescript
interface UseUserProfileResult {
  data: User | undefined;
  isLoading: boolean;
  error: Error | null;
}

export const useUserProfile = (userId: string): UseUserProfileResult => {
  // Implementation
};
```

### Step 5: Create Test File
```typescript
// File: src/hooks/__tests__/useUserProfile.test.ts

import { renderHook, waitFor } from '@testing-library/react';
import { useUserProfile } from '../useUserProfile';

describe('useUserProfile', () => {
  it('fetches user data', async () => {
    const { result } = renderHook(() => useUserProfile('123'));
    
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });
    
    expect(result.current.data).toEqual({
      id: '123',
      name: 'Test User',
    });
  });
});
```

---

## 🎯 HOOK PATTERNS

### Server State with React Query
```typescript
export const usePosts = () => {
  return useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      const res = await fetch('/api/posts');
      if (!res.ok) throw new Error('Failed to fetch posts');
      return res.json();
    },
  });
};
```

### Server Mutation with React Query
```typescript
export const useCreatePost = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (title: string) => {
      const res = await fetch('/api/posts', {
        method: 'POST',
        body: JSON.stringify({ title }),
      });
      if (!res.ok) throw new Error('Failed to create post');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
};
```

### Local State Management
```typescript
interface UseFormState {
  values: Record<string, string>;
  errors: Record<string, string>;
  setField: (name: string, value: string) => void;
  setError: (name: string, error: string) => void;
  reset: () => void;
}

export const useForm = (initial: Record<string, string>): UseFormState => {
  const [values, setValues] = useState(initial);
  const [errors, setErrors] = useState<Record<string, string>>({});

  return {
    values,
    errors,
    setField: (name, value) => setValues(prev => ({ ...prev, [name]: value })),
    setError: (name, error) => setErrors(prev => ({ ...prev, [name]: error })),
    reset: () => {
      setValues(initial);
      setErrors({});
    },
  };
};
```

### Zustand Store Hook
```typescript
import { create } from 'zustand';

interface AuthStore {
  user: User | null;
  setUser: (user: User) => void;
  logout: () => void;
}

export const useAuth = create<AuthStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  logout: () => set({ user: null }),
}));
```

### Complex State with useReducer
```typescript
type State = {
  loading: boolean;
  error: string | null;
  data: Data | null;
};

type Action =
  | { type: 'LOADING' }
  | { type: 'SUCCESS'; payload: Data }
  | { type: 'ERROR'; payload: string };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'LOADING':
      return { ...state, loading: true, error: null };
    case 'SUCCESS':
      return { loading: false, error: null, data: action.payload };
    case 'ERROR':
      return { ...state, loading: false, error: action.payload };
  }
};

export const useComplexFetch = (url: string) => {
  const [state, dispatch] = useReducer(reducer, {
    loading: false,
    error: null,
    data: null,
  });

  // Implementation
};
```

---

## ⚠️ CRITICAL RULES

1. **JSDoc Comments:** Always include hook description and examples
2. **Typed Return:** Define interface for hook return value
3. **No Anonymous:** Never create inline hooks; extract to files
4. **Dependencies:** Include all dependencies in useEffect/useQuery deps array
5. **Memoization:** Memoize callbacks if passed to child components
6. **Testing:** Create test file with `@testing-library/react-hooks`
7. **Cleanup:** Handle cleanup in useEffect return if needed

---

## 🔄 INVOCATION EXAMPLES

**User:** "Create a custom hook to manage form state"  
**Mimi Activates:** hooks-design Skill  
**Output:**
```
Generating custom hook...

✅ Hook Name: useFormState
✅ Pattern: Local state management with validation
✅ Return Type: Typed interface with all methods
✅ Documentation: JSDoc with usage example
✅ Test File: Provided with renderHook test
✅ Location: src/hooks/useFormState.ts

Here's the hook...
```

---

## 📊 SKILL LEVELS

### Level 1 (Current)
- Simple hooks (useState, useReducer)
- React Query patterns (useQuery, useMutation)
- Zustand stores
- Basic testing

### Level 2 (Planned)
- Custom middleware patterns
- Performance optimization (useMemo, useCallback)
- Advanced React Query patterns
- Context provider hooks

### Level 3 (Future)
- Concurrent features
- Suspense integration
- Animated hooks
- WebSocket/real-time hooks

---

## ✅ QUALITY CHECKLIST

Before delivering hook:

- [ ] Hook name starts with `use`
- [ ] Return value has TypeScript interface
- [ ] JSDoc comment with description and example
- [ ] All external dependencies typed
- [ ] useEffect/useQuery deps array complete
- [ ] Error handling included
- [ ] No infinite loops or circular deps
- [ ] Test file created
- [ ] Memoization used where beneficial
- [ ] Location: `src/hooks/use[Name].ts`

---

**Mimi Custom Hooks Skill v1.0**  
*Empowered by: Phase 2 Skill Plugin System*  
*Maintenance:** Auto-triggers on hook requests; levels up through pattern recognition
