# 📋 Form Handling Skill

**Version:** Lv.1  
**Trigger:** Form requests (e.g., "Create form for...", "Build login form...")  
**Owner:** Mimi (auto-triggered)  
**Last Updated:** 2026-01-01  

---

## 📋 SKILL DESCRIPTION

When Ainz-sama needs forms, Mimi activates this skill to:
1. Generate form components with validation
2. Use Tailwind CSS for styling (no CSS files)
3. Include proper TypeScript types and error handling
4. Provide accessibility features (labels, aria attributes)
5. Integrate with API endpoints for submission

**Auto-Triggers When:**
- User says: "Create form for...", "Build [type] form", "Form component..."
- Context indicates form creation need
- Mentions specific form types (login, register, contact, etc.)

---

## 🛠️ SKILL PROTOCOL

### Step 1: Understand Form Requirements
```
From user request:
  - Form type (login, signup, contact, etc.)
  - Required fields with types
  - Validation rules
  - Submission endpoint
  - Success/error handling
```

### Step 2: Generate Form Component
```typescript
// File: src/components/forms/[FormName].tsx

import React, { useState } from 'react';

interface FormData {
  email: string;
  password: string;
}

interface Props {
  onSubmit?: (data: FormData) => void;
  isLoading?: boolean;
}

export const LoginForm: React.FC<Props> = ({ onSubmit, isLoading = false }) => {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};
    
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit?.(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Form fields */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {isLoading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
};
```

### Step 3: Add Individual Form Fields
```typescript
<div className="space-y-2">
  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
    Email Address
  </label>
  <input
    id="email"
    type="email"
    value={formData.email}
    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    placeholder="user@example.com"
  />
  {errors.email && <span className="text-sm text-red-600">{errors.email}</span>}
</div>
```

### Step 4: Integrate with API
```typescript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!validateForm()) return;

  setIsLoading(true);
  try {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (!response.ok) throw new Error('Login failed');
    
    const result = await response.json();
    onSuccess?.(result);
  } catch (error) {
    setErrors({ email: (error as Error).message });
  } finally {
    setIsLoading(false);
  }
};
```

### Step 5: Test Form Component
```typescript
// File: src/components/forms/LoginForm.test.tsx

import { render, screen, userEvent } from '@testing-library/react';
import { LoginForm } from './LoginForm';

describe('LoginForm', () => {
  it('renders form fields', () => {
    render(<LoginForm />);
    expect(screen.getByLabelText('Email Address')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
  });

  it('handles form submission', async () => {
    const onSubmit = jest.fn();
    render(<LoginForm onSubmit={onSubmit} />);

    await userEvent.type(screen.getByLabelText('Email Address'), 'test@test.com');
    await userEvent.type(screen.getByLabelText('Password'), 'password123');
    
    await userEvent.click(screen.getByText('Login'));
    
    expect(onSubmit).toHaveBeenCalledWith({
      email: 'test@test.com',
      password: 'password123',
    });
  });
});
```

---

## 🎯 FORM FIELD PATTERNS

### Text Input
```typescript
<input
  type="text"
  value={value}
  onChange={(e) => setValue(e.target.value)}
  className="w-full px-3 py-2 border border-gray-300 rounded-md"
  placeholder="Enter text"
/>
```

### Email Input
```typescript
<input
  type="email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  className="w-full px-3 py-2 border border-gray-300 rounded-md"
  placeholder="user@example.com"
/>
```

### Password Input
```typescript
<input
  type="password"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  className="w-full px-3 py-2 border border-gray-300 rounded-md"
  placeholder="Enter password"
/>
```

### Select Dropdown
```typescript
<select
  value={selected}
  onChange={(e) => setSelected(e.target.value)}
  className="w-full px-3 py-2 border border-gray-300 rounded-md"
>
  <option value="">Choose option...</option>
  <option value="option1">Option 1</option>
  <option value="option2">Option 2</option>
</select>
```

### Textarea
```typescript
<textarea
  value={message}
  onChange={(e) => setMessage(e.target.value)}
  className="w-full px-3 py-2 border border-gray-300 rounded-md"
  placeholder="Enter message"
  rows={4}
/>
```

### Checkbox
```typescript
<div className="flex items-center">
  <input
    id="agreed"
    type="checkbox"
    checked={agreed}
    onChange={(e) => setAgreed(e.target.checked)}
    className="h-4 w-4 text-blue-600"
  />
  <label htmlFor="agreed" className="ml-2 text-sm text-gray-700">
    I agree to terms
  </label>
</div>
```

---

## ⚠️ CRITICAL RULES

1. **Accessibility:** Every input has associated label with htmlFor
2. **Validation:** Show clear error messages under fields
3. **Loading State:** Disable submit button during submission
4. **Tailwind Styling:** Use className only, no CSS files
5. **Types:** Define FormData interface for all fields
6. **API Integration:** Use proper error handling for submissions
7. **Feedback:** Show success/error messages to user

---

## 🔄 INVOCATION EXAMPLES

**User:** "Create a registration form with email, password, and confirm password"  
**Mimi Activates:** form-handling Skill  
**Output:**
```
Generating form component...

✅ Form Type: Registration
✅ Fields: email, password, confirmPassword
✅ Validation: Email format, password strength
✅ Submit Handler: Ready for API integration
✅ Error Display: Field-level error messages
✅ Accessibility: Labels and aria attributes
✅ Testing: Jest + RTL test file included

Here's the form...
```

---

## 📊 SKILL LEVELS

### Level 1 (Current)
- Basic form fields
- Client-side validation
- API submission
- Error display
- Loading states

### Level 2 (Planned)
- Multi-step forms
- Conditional field visibility
- Dynamic field arrays
- File uploads
- Auto-save functionality

### Level 3 (Future)
- Complex validation rules
- Form state persistence
- Collaborative editing
- Real-time validation feedback
- Advanced accessibility

---

## ✅ QUALITY CHECKLIST

Before delivering form:

- [ ] All inputs have associated labels
- [ ] FormData interface defined
- [ ] Validation logic present
- [ ] Error messages display correctly
- [ ] Submit button disables during loading
- [ ] Tailwind styling used exclusively
- [ ] API endpoint integrated
- [ ] Success/error handling implemented
- [ ] Test file created
- [ ] Accessibility attributes present (aria-*, htmlFor)

---

**Mimi Form Handling Skill v1.0**  
*Empowered by: Phase 2 Skill Plugin System*  
*Maintenance:** Auto-triggers on form requests; levels up through pattern recognition
