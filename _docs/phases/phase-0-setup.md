# Phase 0: Project Setup & Configuration

## Overview
This phase establishes the foundation for the Mold Detox Mastery platform. We'll set up the development environment, configure tools, create the initial project structure, and prepare for frontend development.

**Duration:** 1-2 days for experienced developers, 3-4 days for beginners
**Prerequisites:** Node.js 20+, Git, VS Code or Cursor AI

## Success Criteria
- [ ] Next.js app running locally on http://localhost:3000
- [ ] TypeScript compilation without errors
- [ ] Tailwind CSS configured with custom theme
- [ ] ESLint and Prettier working
- [ ] Git repository initialized with proper .gitignore
- [ ] Basic folder structure created
- [ ] Environment variables configured
- [ ] Database (SQLite) initialized

## Detailed Checklist

### Environment Setup

| Task | Command/Action | Time | Status |
|------|---------------|------|--------|
| Install Node.js 20+ LTS | Download from nodejs.org | 5 min | ⬜ |
| Verify Node installation | `node --version` | 1 min | ⬜ |
| Install pnpm (optional) | `npm install -g pnpm` | 2 min | ⬜ |
| Install VS Code extensions | Tailwind CSS IntelliSense, ESLint, Prettier, Prisma | 5 min | ⬜ |
| Configure Cursor AI | Upload project docs to Knowledge | 5 min | ⬜ |

### Project Initialization

| Task | Command/Action | Time | Status |
|------|---------------|------|--------|
| Create Next.js app | `npx create-next-app@latest mold-detox --typescript --tailwind --app --src-dir=false --import-alias="@/*"` | 5 min | ⬜ |
| Navigate to project | `cd mold-detox` | 1 min | ⬜ |
| Open in editor | `code .` or `cursor .` | 1 min | ⬜ |
| Install additional dependencies | See package.json dependencies section | 10 min | ⬜ |
| Create initial commit | `git add . && git commit -m "Initial commit"` | 2 min | ⬜ |

### Core Dependencies Installation

```bash
# UI Components & Styling
npm install @radix-ui/react-accordion @radix-ui/react-alert-dialog @radix-ui/react-avatar @radix-ui/react-checkbox @radix-ui/react-dialog @radix-ui/react-dropdown-menu @radix-ui/react-label @radix-ui/react-popover @radix-ui/react-progress @radix-ui/react-select @radix-ui/react-separator @radix-ui/react-slider @radix-ui/react-switch @radix-ui/react-tabs @radix-ui/react-toast @radix-ui/react-tooltip

# Utilities
npm install clsx tailwind-merge class-variance-authority
npm install date-fns recharts
npm install lucide-react
npm install sonner cmdk vaul

# Forms & Validation
npm install react-hook-form @hookform/resolvers zod

# State Management
npm install zustand @tanstack/react-query

# Authentication (Development)
npm install next-auth @auth/prisma-adapter

# Database
npm install prisma @prisma/client

# Dev Dependencies
npm install -D @types/node @types/react @types/react-dom typescript
npm install -D eslint eslint-config-next prettier prettier-plugin-tailwindcss
npm install -D tailwindcss-animate
npm install -D husky lint-staged
npm install -D vitest @vitejs/plugin-react @testing-library/react @testing-library/jest-dom
npm install -D @playwright/test
```

### Folder Structure Creation

| Task | Command/Action | Time | Status |
|------|---------------|------|--------|
| Create components folders | `mkdir -p components/{ui,modules,tools,charts,layout}` | 2 min | ⬜ |
| Create lib folders | `mkdir -p lib/{auth,db,calculations,validations,hooks,utils}` | 2 min | ⬜ |
| Create content folders | `mkdir -p content/{modules,emails,legal}` | 2 min | ⬜ |
| Create types folder | `mkdir types` | 1 min | ⬜ |
| Create styles folder | `mkdir styles` | 1 min | ⬜ |
| Create tests folders | `mkdir -p tests/{unit,integration,e2e}` | 2 min | ⬜ |
| Move docs to _docs | Already created | 1 min | ⬜ |

### Configuration Files

#### 1. Environment Variables (.env.local)
```env
# Development Database
DATABASE_URL="file:./prisma/dev.db"

# NextAuth (Development)
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="development-secret-change-in-production"

# Public Environment Variables
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NEXT_PUBLIC_APP_NAME="Mold Detox Mastery"
```

#### 2. TypeScript Configuration (tsconfig.json)
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

#### 3. Tailwind Configuration (tailwind.config.ts)
```typescript
import type { Config } from 'tailwindcss'
import { fontFamily } from 'tailwindcss/defaultTheme'

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["Inter", ...fontFamily.sans],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
```

#### 4. ESLint Configuration (.eslintrc.json)
```json
{
  "extends": [
    "next/core-web-vitals",
    "prettier"
  ],
  "rules": {
    "max-lines": ["error", { "max": 500 }],
    "complexity": ["error", { "max": 10 }],
    "no-console": "warn",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/no-unused-vars": ["error", { "argsIgnorePattern": "^_" }]
  }
}
```

#### 5. Prettier Configuration (.prettierrc)
```json
{
  "semi": false,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 100,
  "plugins": ["prettier-plugin-tailwindcss"]
}
```

### Database Setup (Prisma with SQLite)

#### 1. Initialize Prisma
```bash
npx prisma init --datasource-provider sqlite
```

#### 2. Create Initial Schema (prisma/schema.prisma)
```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}

model User {
  id            String   @id @default(cuid())
  email         String   @unique
  name          String?
  password      String
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
  
  profile       Profile?
  moduleProgress ModuleProgress[]
  symptomLogs   SymptomLog[]
  toolStates    ToolState[]
  
  @@map("users")
}

model Profile {
  id              String   @id @default(cuid())
  userId          String   @unique
  user            User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  exposureHistory String?
  symptoms        String?
  priorTests      String?
  budget          String?
  equipment       String?
  dietConstraints String?
  
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
  
  @@map("profiles")
}

model Module {
  id          String   @id @default(cuid())
  title       String
  slug        String   @unique
  description String
  order       Int
  duration    Int      // in minutes
  
  progress    ModuleProgress[]
  
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  @@map("modules")
}

model ModuleProgress {
  id          String   @id @default(cuid())
  userId      String
  moduleId    String
  user        User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  module      Module   @relation(fields: [moduleId], references: [id], onDelete: Cascade)
  
  status      String   @default("locked") // locked, available, in_progress, completed
  progress    Float    @default(0)
  startedAt   DateTime?
  completedAt DateTime?
  
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  @@unique([userId, moduleId])
  @@map("module_progress")
}

model SymptomLog {
  id        String   @id @default(cuid())
  userId    String
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  date      DateTime
  fatigue   Int      // 0-10 scale
  brainFog  Int
  sleep     Int
  pain      Int
  sinus     Int
  mood      Int
  energy    Int
  notes     String?
  
  createdAt DateTime @default(now())
  
  @@map("symptom_logs")
}

model ToolState {
  id        String   @id @default(cuid())
  userId    String
  toolId    String
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  data      String   // JSON string
  version   Int      @default(1)
  lastSync  DateTime @default(now())
  
  @@unique([userId, toolId])
  @@map("tool_states")
}
```

#### 3. Run Initial Migration
```bash
npx prisma migrate dev --name init
npx prisma generate
```

### Git Configuration

#### 1. Update .gitignore
```gitignore
# Dependencies
node_modules
.pnp
.pnp.js

# Testing
coverage
.nyc_output

# Next.js
.next/
out/
build

# Production
dist

# Misc
.DS_Store
*.pem

# Debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Local env files
.env
.env.local
.env.production.local
.env.development.local
.env.test.local

# Vercel
.vercel

# TypeScript
*.tsbuildinfo
next-env.d.ts

# Database
prisma/dev.db
prisma/dev.db-journal
*.db
*.db-journal

# IDE
.idea
.vscode/*
!.vscode/extensions.json
.cursor
```

#### 2. Setup Husky & Lint-staged
```bash
npx husky-init && npm install
npx husky add .husky/pre-commit "npx lint-staged"
```

#### 3. Configure lint-staged (package.json)
```json
{
  "lint-staged": {
    "*.{js,jsx,ts,tsx}": [
      "eslint --fix",
      "prettier --write"
    ],
    "*.{json,md,css}": [
      "prettier --write"
    ]
  }
}
```

### Basic Components Setup

#### 1. Create Root Layout (app/layout.tsx)
```typescript
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Mold Detox Mastery',
  description: 'Your complete guide to mold illness recovery',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
```

#### 2. Create Homepage (app/page.tsx)
```typescript
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold text-center">
        Mold Detox Mastery
      </h1>
      <p className="mt-4 text-xl text-gray-600">
        Your journey to recovery starts here
      </p>
    </main>
  )
}
```

### Verification Steps

| Task | Command/Action | Expected Result | Status |
|------|---------------|-----------------|--------|
| Start dev server | `npm run dev` | App runs on http://localhost:3000 | ⬜ |
| Check TypeScript | `npm run type-check` | No errors | ⬜ |
| Run linter | `npm run lint` | No errors | ⬜ |
| Format code | `npm run format` | All files formatted | ⬜ |
| Check Prisma Studio | `npm run db:studio` | Opens database GUI | ⬜ |
| Test git hooks | Make change and commit | Pre-commit hooks run | ⬜ |

## Common Issues & Solutions

### Issue: Port 3000 already in use
**Solution:** Kill the process using port 3000 or use a different port:
```bash
npx kill-port 3000
# OR
PORT=3001 npm run dev
```

### Issue: Prisma client not generated
**Solution:** Run Prisma generate:
```bash
npx prisma generate
```

### Issue: TypeScript errors in IDE
**Solution:** Restart TypeScript server in VS Code:
- Cmd+Shift+P → "TypeScript: Restart TS Server"

### Issue: Tailwind classes not working
**Solution:** Check tailwind.config.ts content paths include all component locations

## Next Steps
Once Phase 0 is complete:
1. Commit all changes: `git add . && git commit -m "Complete Phase 0: Project setup"`
2. Proceed to Phase 1: Frontend Foundation
3. Begin creating UI components and layout structure