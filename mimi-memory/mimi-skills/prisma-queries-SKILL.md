# 🗄️ Prisma Queries Skill

**Version:** Lv.1  
**Trigger:** Database/query requests (e.g., "Add query for...", "Create Prisma...")  
**Owner:** Mimi (auto-triggered)  
**Last Updated:** 2026-01-01  

---

## 📋 SKILL DESCRIPTION

When Ainz-sama needs database operations, Mimi activates this skill to:
1. Generate Prisma queries with `select` blocks (prevent data bloat)
2. Include proper error handling and type safety
3. Provide parameterized queries (no string interpolation)
4. Create mock implementations for component testing
5. Ensure PostgreSQL/Supabase compatibility

**Auto-Triggers When:**
- User says: "Query for...", "Create Prisma...", "Add [model] to database", "Database..."
- Context indicates database operation need
- Mentions specific data model names (User, Flight, Booking, etc.)

---

## 🛠️ SKILL PROTOCOL

### Step 1: Understand Data Needs
```
From user request:
  - Model name (User, Post, etc.)
  - Operation type (create, read, update, delete)
  - Fields needed (prevent over-fetching)
  - Relationships required
  - Error scenarios
```

### Step 2: Generate Query with SELECT Block
```typescript
// Always use select block to prevent data bloat
const user = await prisma.user.findUnique({
  where: { id: userId },
  select: {
    id: true,
    email: true,
    name: true,
    // Exclude passwords, secrets, unnecessary fields
  },
});
```

### Step 3: Handle Errors & Types
```typescript
interface GetUserResult {
  id: string;
  email: string;
  name: string | null;
}

async function getUser(userId: string): Promise<GetUserResult | null> {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
      },
    });
    return user;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Database query failed');
  }
}
```

### Step 4: Document Usage
```typescript
// Usage in API route or component
const user = await getUser('user-123');
if (!user) {
  return { error: 'User not found' };
}
// Use user data safely (all fields typed)
```

### Step 5: Create Test Mock
```typescript
jest.mock('@/lib/prisma', () => ({
  prisma: {
    user: {
      findUnique: jest.fn().mockResolvedValue({
        id: '123',
        email: 'test@example.com',
        name: 'Test User',
      }),
    },
  },
}));
```

---

## 🎯 QUERY PATTERNS

### CREATE Pattern
```typescript
const created = await prisma.user.create({
  data: {
    email: newUserData.email,
    name: newUserData.name,
    password: hashedPassword,
  },
  select: {
    id: true,
    email: true,
    name: true,
  },
});
```

### READ Pattern
```typescript
const items = await prisma.post.findMany({
  where: { authorId: userId },
  select: {
    id: true,
    title: true,
    content: true,
    createdAt: true,
  },
  orderBy: { createdAt: 'desc' },
  take: 10,
});
```

### UPDATE Pattern
```typescript
const updated = await prisma.post.update({
  where: { id: postId },
  data: { title: newTitle },
  select: {
    id: true,
    title: true,
    updatedAt: true,
  },
});
```

### DELETE Pattern
```typescript
const deleted = await prisma.post.delete({
  where: { id: postId },
  select: { id: true },
});
```

### RELATIONSHIP Pattern
```typescript
const userWithPosts = await prisma.user.findUnique({
  where: { id: userId },
  select: {
    id: true,
    email: true,
    posts: {
      select: {
        id: true,
        title: true,
        content: true,
      },
      orderBy: { createdAt: 'desc' },
      take: 5,
    },
  },
});
```

---

## ⚠️ CRITICAL RULES

1. **Always Use SELECT:** Never fetch entire record; specify exact fields
2. **Type Results:** Create interface for return value
3. **Error Handling:** Try-catch wrapping required
4. **No Raw SQL:** Use Prisma client methods only (parameterized)
5. **Meaningful Fields:** Don't expose passwords, tokens, secrets
6. **Pagination:** Use `take`/`skip` for large datasets
7. **Sorting:** Always specify `orderBy` for consistent results

---

## 🔄 INVOCATION EXAMPLES

**User:** "Create a query to fetch user by email"  
**Mimi Activates:** prisma-queries Skill  
**Output:**
```
Generating Prisma query for user fetch...

✅ Pattern: findUnique with email lookup
✅ SELECT block: id, email, name (no password)
✅ Error handling: Try-catch with typed result
✅ Test mock: Provided with Jest setup
✅ Type safety: Full interface included

Here's the query:

interface UserPublic {
  id: string;
  email: string;
  name: string | null;
}

async function getUserByEmail(email: string): Promise<UserPublic | null> {
  try {
    return await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        name: true,
      },
    });
  } catch (error) {
    console.error('User lookup failed:', error);
    throw new Error('Database operation failed');
  }
}
```

---

## 📊 SKILL LEVELS

### Level 1 (Current)
- Basic CRUD queries
- SELECT block usage
- Error handling
- Type interfaces

### Level 2 (Planned)
- Transaction patterns
- Aggregation queries
- Batch operations
- Performance optimization

### Level 3 (Future)
- Complex relationship queries
- Real-time subscriptions
- Cache strategy suggestions
- Query optimization analysis

---

## ✅ QUALITY CHECKLIST

Before delivering query:

- [ ] SELECT block present (no over-fetching)
- [ ] Return type interface defined
- [ ] Error handling with try-catch
- [ ] No raw SQL or string interpolation
- [ ] Passwords/secrets excluded from select
- [ ] Proper TypeScript types
- [ ] Test mock provided
- [ ] Comments explain complex logic
- [ ] Pagination handled if needed
- [ ] Ordering specified consistently

---

**Mimi Prisma Queries Skill v1.0**  
*Empowered by: Phase 2 Skill Plugin System*  
*Maintenance:** Auto-triggers on database requests; levels up through pattern recognition
