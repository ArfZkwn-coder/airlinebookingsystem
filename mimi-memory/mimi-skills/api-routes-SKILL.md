# 🔌 API Routes Skill

**Version:** Lv.1  
**Trigger:** Endpoint/API requests (e.g., "Create endpoint for...", "Build API...")  
**Owner:** Mimi (auto-triggered)  
**Last Updated:** 2026-01-01  

---

## 📋 SKILL DESCRIPTION

When Ainz-sama needs API endpoints, Mimi activates this skill to:
1. Generate Next.js App Router API routes (`/app/api/`)
2. Include input validation (Zod or TypeScript interfaces)
3. Enforce NextAuth authentication where needed
4. Provide proper error handling and typed responses
5. Include request/response examples

**Auto-Triggers When:**
- User says: "Create endpoint for...", "Build API...", "Add [method] route", "API request..."
- Context indicates REST endpoint need
- Mentions HTTP methods (GET, POST, PUT, DELETE)

---

## 🛠️ SKILL PROTOCOL

### Step 1: Determine Route Requirements
```
From user request:
  - Resource name (users, posts, bookings, etc.)
  - HTTP method (GET, POST, PUT, DELETE)
  - Required parameters
  - Authentication needs
  - Error scenarios
```

### Step 2: Generate Route Handler
```typescript
// File: src/app/api/[resource]/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';

interface RequestBody {
  // Validated input fields
}

export async function POST(request: NextRequest) {
  try {
    // Authentication check
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Request validation
    const body: RequestBody = await request.json();
    // Validate body...

    // Business logic
    // const result = await prisma...

    return NextResponse.json(
      { success: true, data: result },
      { status: 200 }
    );
  } catch (error) {
    console.error('Route error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
```

### Step 3: Include Validation
```typescript
// Input validation with TypeScript
const validateInput = (body: unknown): body is RequestBody => {
  if (typeof body !== 'object' || body === null) return false;
  
  const b = body as Record<string, unknown>;
  return (
    typeof b.name === 'string' &&
    typeof b.email === 'string' &&
    b.name.length > 0
  );
};
```

### Step 4: Handle All HTTP Methods
```typescript
export async function GET(request: NextRequest) {
  // Read-only operations
}

export async function POST(request: NextRequest) {
  // Create operations
}

export async function PUT(request: NextRequest) {
  // Update operations
}

export async function DELETE(request: NextRequest) {
  // Delete operations
}
```

### Step 5: Document Response Format
```typescript
// Success response
{ success: true, data: {...} }

// Error response
{ error: 'Descriptive error message' }

// HTTP status codes
// 200: Success
// 201: Created
// 400: Bad Request
// 401: Unauthorized
// 404: Not Found
// 500: Internal Server Error
```

---

## 🎯 API ROUTE PATTERNS

### GET (Fetch Data)
```typescript
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession();
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const item = await prisma.item.findUnique({
      where: { id: params.id },
      select: { id: true, title: true },
    });

    if (!item) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: item });
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
```

### POST (Create Data)
```typescript
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession();
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await request.json();
    
    // Validate input
    if (!body.title || !body.content) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    const created = await prisma.item.create({
      data: {
        title: body.title,
        content: body.content,
        userId: session.user.id,
      },
      select: { id: true, title: true, createdAt: true },
    });

    return NextResponse.json(
      { success: true, data: created },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
```

### PUT (Update Data)
```typescript
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession();
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await request.json();
    
    const updated = await prisma.item.update({
      where: { id: params.id },
      data: {
        title: body.title,
        content: body.content,
      },
      select: { id: true, title: true, updatedAt: true },
    });

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
```

### DELETE (Remove Data)
```typescript
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession();
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    await prisma.item.delete({ where: { id: params.id } });

    return NextResponse.json({ success: true, data: { id: params.id } });
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
```

---

## ⚠️ CRITICAL RULES

1. **Authentication:** Check session for non-public endpoints
2. **Validation:** Always validate input before processing
3. **Status Codes:** Use appropriate HTTP status codes
4. **Error Messages:** Don't expose internal details
5. **Typed Responses:** Define interface for response payload
6. **CORS:** Configure if needed for cross-origin requests
7. **Rate Limiting:** Consider for public endpoints

---

## 🔄 INVOCATION EXAMPLES

**User:** "Create a POST endpoint for creating new posts"  
**Mimi Activates:** api-routes Skill  
**Output:**
```
Generating Next.js API route...

✅ Route: POST /api/posts
✅ Authentication: Requires NextAuth session
✅ Validation: Input fields validated
✅ Response: Typed JSON with success flag
✅ Error handling: Comprehensive try-catch
✅ Status codes: 201 (Created), 400 (Bad), 401 (Unauthorized), 500 (Error)

Here's the route handler...
```

---

## 📊 SKILL LEVELS

### Level 1 (Current)
- Basic CRUD endpoints
- NextAuth authentication
- Input validation
- Error handling

### Level 2 (Planned)
- Rate limiting patterns
- Pagination for list endpoints
- CORS configuration
- Request logging

### Level 3 (Future)
- Caching strategies
- Webhook implementations
- Batch operations
- Real-time updates (WebSocket)

---

## ✅ QUALITY CHECKLIST

Before delivering endpoint:

- [ ] Proper file location (`/app/api/[resource]/route.ts`)
- [ ] All HTTP methods typed and exported
- [ ] Authentication check on protected routes
- [ ] Input validation present
- [ ] Prisma queries use SELECT blocks
- [ ] Error handling with try-catch
- [ ] Typed response interfaces
- [ ] Appropriate HTTP status codes
- [ ] No sensitive data in responses
- [ ] Comments explain complex logic

---

**Mimi API Routes Skill v1.0**  
*Empowered by: Phase 2 Skill Plugin System*  
*Maintenance:** Auto-triggers on API requests; levels up through pattern recognition
