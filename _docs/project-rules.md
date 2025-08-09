# Project Rules - Mold Detox Mastery Platform

## Overview

This document defines the organizational and coding conventions for the Mold Detox Mastery codebase, optimized for AI-assisted development and long-term maintainability. We follow a **functional, modular, and descriptive** approach that maximizes compatibility with AI tools like Cursor and Claude Code while ensuring clean, production-grade code. All conventions align with our Next.js/TypeScript stack and prioritize developer experience.

## Directory Structure

```
mold-detox-platform/
├── app/                      # Next.js App Router pages & API routes
│   ├── (auth)/              # Auth group (signin, signup, verify)
│   ├── (marketing)/         # Public pages (landing, pricing, about)
│   ├── (app)/               # Protected app pages
│   │   ├── dashboard/       # User dashboard
│   │   ├── modules/         # Course modules
│   │   ├── tools/           # Interactive tools
│   │   ├── progress/        # Progress tracking
│   │   └── community/       # Community features
│   ├── api/                 # API routes
│   └── layout.tsx           # Root layout
├── components/              # Reusable UI components
│   ├── ui/                  # shadcn/ui base components
│   ├── modules/             # Module-specific components
│   ├── tools/               # Tool components
│   ├── charts/              # Data visualization
│   └── layout/              # Layout components (header, footer)
├── lib/                     # Utilities and business logic
│   ├── auth/                # Authentication helpers
│   ├── db/                  # Database queries
│   ├── calculations/        # Tool calculations
│   ├── validations/         # Zod schemas
│   ├── hooks/               # Custom React hooks
│   └── utils/               # General utilities
├── content/                 # MDX content for modules
│   ├── modules/             # Course module content
│   ├── emails/              # Email templates
│   └── legal/               # Terms, privacy, disclaimers
├── public/                  # Static assets
│   ├── images/              # Images (WebP format)
│   ├── audio/               # Audio narrations
│   └── downloads/           # Downloadable resources
├── prisma/                  # Database schema and migrations
│   ├── schema.prisma        # Schema definition
│   ├── migrations/          # Migration files
│   └── seed.ts              # Seed data
├── styles/                  # Global styles
├── types/                   # TypeScript type definitions
├── _docs/                   # Project documentation
│   ├── phases/              # Development phases
│   └── *.md                 # Overview, rules, etc.
└── tests/                   # Test files
    ├── unit/                # Unit tests
    ├── integration/         # Integration tests
    └── e2e/                 # End-to-end tests
```

## Naming Conventions

### Files
- **Components**: `kebab-case.tsx` (e.g., `module-card.tsx`)
- **Pages**: `page.tsx` in route folders
- **API Routes**: `route.ts` in route folders
- **Utilities**: `kebab-case.ts` (e.g., `calculate-readiness.ts`)
- **Types**: `kebab-case.types.ts` (e.g., `user.types.ts`)
- **Tests**: `[name].test.ts` or `[name].spec.ts`

### Code Elements
- **Components**: PascalCase (e.g., `ModuleCard`)
- **Functions**: camelCase with verb prefix (e.g., `calculateDrainageScore`)
- **Variables**: Descriptive with auxiliary verbs
  - Booleans: `isLoading`, `hasCompleted`, `canAccess`
  - Arrays: Plural nouns (e.g., `modules`, `symptoms`)
  - Constants: UPPER_SNAKE_CASE (e.g., `MAX_FILE_SIZE`)
- **Types/Interfaces**: PascalCase with suffix
  - Types: `UserProfile`, `ModuleStatus`
  - Props: `ModuleCardProps`
  - API: `ApiResponse<T>`

## Code Style Guidelines

### TypeScript First
```typescript
// ✅ Good: Explicit types
/**
 * @fileoverview Module card component for course navigation
 */
interface ModuleCardProps {
  module: Module;
  isLocked: boolean;
  progress: number;
  onStart: (moduleId: string) => void;
}

export function ModuleCard({ module, isLocked, progress, onStart }: ModuleCardProps) {
  // Implementation
}

// ❌ Bad: Implicit any
export function ModuleCard(props) {
  // No type safety
}
```

### Functional Programming
```typescript
// ✅ Good: Pure functions, immutable operations
function calculateReadinessScore(symptoms: Symptom[]): number {
  return symptoms
    .filter(symptom => symptom.category === 'drainage')
    .reduce((score, symptom) => score + symptom.severity, 0) / symptoms.length;
}

// ❌ Bad: Class-based, mutations
class ReadinessCalculator {
  private score = 0;
  calculate(symptoms) {
    symptoms.forEach(s => this.score += s.severity);
  }
}
```

### Descriptive Documentation
```typescript
/**
 * @fileoverview Drainage readiness calculation utilities
 * @module lib/calculations/drainage
 */

/**
 * Calculates user's readiness to begin binder protocol
 * @param symptoms - Array of current symptom entries
 * @param bowelFrequency - Daily bowel movement count
 * @param hydration - Daily water intake in ounces
 * @returns Readiness score from 0-100
 * @throws {ValidationError} If inputs are invalid
 * @example
 * const score = calculateDrainageReadiness(symptoms, 2, 64);
 * if (score >= 80) enableBinderProtocol();
 */
export function calculateDrainageReadiness(
  symptoms: Symptom[],
  bowelFrequency: number,
  hydration: number
): number {
  if (bowelFrequency < 0 || hydration < 0) {
    throw new ValidationError('Invalid input values');
  }
  
  // Business logic here
  return score;
}
```

### Error Handling
```typescript
// ✅ Good: Explicit error handling
async function fetchModuleContent(id: string): Promise<Module> {
  try {
    const response = await fetch(`/api/modules/${id}`);
    if (!response.ok) {
      throw new ApiError(`Failed to fetch module: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    logger.error('Module fetch failed', { id, error });
    throw error; // Re-throw for caller to handle
  }
}

// ❌ Bad: Silent failures
async function fetchModuleContent(id: string) {
  const response = await fetch(`/api/modules/${id}`);
  return response.json() || null; // Swallows errors
}
```

### Component Patterns
```typescript
// ✅ Good: Composition, clear props
export function ModuleLesson({ lesson, onComplete }: ModuleLessonProps) {
  return (
    <Card>
      <CardHeader>
        <ModuleProgress value={lesson.progress} />
        <LessonTitle>{lesson.title}</LessonTitle>
      </CardHeader>
      <CardContent>
        <LessonContent content={lesson.content} />
        <LessonTools tools={lesson.tools} />
      </CardContent>
      <CardFooter>
        <Button onClick={() => onComplete(lesson.id)}>
          Mark Complete
        </Button>
      </CardFooter>
    </Card>
  );
}

// ❌ Bad: Monolithic component
export function Lesson(props) {
  // 500+ lines of mixed concerns
}
```

## File Size Limits

### Maximum 500 Lines Per File
Files exceeding 500 lines must be split:

```typescript
// ❌ Bad: components/mega-dashboard.tsx (800 lines)

// ✅ Good: Split into logical units
// components/dashboard/dashboard-container.tsx (150 lines)
// components/dashboard/dashboard-header.tsx (100 lines)  
// components/dashboard/dashboard-metrics.tsx (200 lines)
// components/dashboard/dashboard-modules.tsx (150 lines)
```

### File Header Template
```typescript
/**
 * @fileoverview [Brief description of file purpose]
 * @module [module path, e.g., components/tools/symptom-tracker]
 * @requires [Key dependencies if relevant]
 */
```

## Import Organization
```typescript
// 1. React/Next.js
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// 2. Third-party libraries
import { format } from 'date-fns';
import { z } from 'zod';

// 3. Internal absolute imports
import { Button } from '@/components/ui/button';
import { calculateReadiness } from '@/lib/calculations';

// 4. Relative imports
import { ModuleCard } from './module-card';

// 5. Types
import type { Module, User } from '@/types';
```

## API Design Patterns

### RESTful Routes
```typescript
// ✅ Good: Consistent, predictable
GET    /api/modules              # List all modules
GET    /api/modules/[id]         # Get specific module
POST   /api/modules/[id]/complete # Mark module complete
GET    /api/users/[id]/progress  # Get user progress

// ❌ Bad: Inconsistent
GET    /api/getModules
POST   /api/completeModule
GET    /api/user_progress
```

### Response Format
```typescript
// Consistent API response structure
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: unknown;
  };
  meta?: {
    timestamp: string;
    version: string;
  };
}
```

## Testing Conventions

### Test Structure
```typescript
// ✅ Good: Descriptive, organized
describe('DrainageReadinessCalculator', () => {
  describe('calculateScore', () => {
    it('should return 0 when no drainage symptoms present', () => {
      // Arrange
      const symptoms = mockSymptomsWithoutDrainage();
      
      // Act
      const score = calculateDrainageScore(symptoms);
      
      // Assert
      expect(score).toBe(0);
    });
    
    it('should throw ValidationError for invalid inputs', () => {
      expect(() => calculateDrainageScore(null)).toThrow(ValidationError);
    });
  });
});
```

## Database Conventions

### Prisma Schema Patterns
```prisma
// Clear naming, explicit relations
model User {
  id            String   @id @default(cuid())
  email         String   @unique
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
  
  // Relations
  profile       Profile?
  moduleProgress ModuleProgress[]
  
  // Indexes for common queries
  @@index([email])
  @@map("users")
}
```

## Performance Guidelines

### Code Splitting
```typescript
// Dynamic imports for heavy components
const SymptomChart = dynamic(
  () => import('@/components/charts/symptom-chart'),
  { 
    loading: () => <ChartSkeleton />,
    ssr: false 
  }
);
```

### Memoization
```typescript
// Memoize expensive calculations
const drainageScore = useMemo(
  () => calculateDrainageScore(symptoms),
  [symptoms]
);
```

## Security Practices

### Input Validation
```typescript
// Always validate user input
const moduleSchema = z.object({
  title: z.string().min(1).max(100),
  content: z.string().min(10).max(10000),
  order: z.number().int().positive(),
});

export async function createModule(input: unknown) {
  const validated = moduleSchema.parse(input);
  // Proceed with validated data
}
```

### Sensitive Data
```typescript
// Never log sensitive information
logger.info('User login', { 
  userId: user.id,
  // ❌ Never: password, tokens, PII
});
```

## Git Conventions

### Branch Naming
- `feature/module-name` - New features
- `fix/issue-description` - Bug fixes
- `refactor/component-name` - Refactoring
- `docs/update-area` - Documentation

### Commit Messages
```bash
# Format: type(scope): description
feat(modules): add progress tracking to module cards
fix(auth): resolve session timeout issue
refactor(tools): optimize drainage calculator performance
docs(api): update endpoint documentation
```

## Tools & Enforcement

### ESLint Configuration
```javascript
// .eslintrc.js
module.exports = {
  extends: ['next/core-web-vitals', 'prettier'],
  rules: {
    'max-lines': ['error', { max: 500 }],
    'complexity': ['error', { max: 10 }],
    'no-console': 'error',
    '@typescript-eslint/explicit-function-return-type': 'error',
  },
};
```

### Pre-commit Hooks
```json
// package.json
{
  "lint-staged": {
    "*.{ts,tsx}": [
      "eslint --fix",
      "prettier --write",
      "tsc --noEmit"
    ]
  }
}
```

## Review Checklist

Before committing code, ensure:
- [ ] File is under 500 lines
- [ ] Has @fileoverview comment
- [ ] Functions have JSDoc comments
- [ ] TypeScript types are explicit
- [ ] No console.logs remain
- [ ] Tests are included/updated
- [ ] Follows naming conventions
- [ ] Handles errors appropriately
- [ ] Imports are organized
- [ ] Performance optimizations applied where needed