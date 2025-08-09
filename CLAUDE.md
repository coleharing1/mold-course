# CLAUDE.md - Persistent Context for Mold Detox Mastery Platform

> **Note**: This file provides context for Claude Code. Cursor AI uses separate rules in `.cursor/rules/`. Both systems work together without conflicts.

## Project Overview
Building an interactive online course platform for mold detoxification based on Opus4-Project-overview.md specifications. The platform transforms a comprehensive PDF guide into a value-added digital learning experience with gated modules, interactive tools, and personalized progress tracking.

## Current Development Status
- **Phase**: 0 (Setup & Configuration) - Nearly Complete
- **Documentation**: Complete (_docs folder contains all specs)
- **Completed**: Environment setup, database initialized, base components, Cursor rules v2.1
- **Next Tasks**: Git init, ESLint/Prettier, start Phase 1

## Key Project Files
- **Specifications**: `project_brainstorm/Opus4-Project-overview.md`
- **Project Docs**: `_docs/` folder
- **Phase Plans**: `_docs/phases/` folder
- **History**: `_docs/project-history.md` (update every 5-10 files)

## Core Features (MVP - Phase 1)
1. **3 Modules**: Quick Start, Exposure, Testing
2. **3 Tools**: Exposure Checklist, Drainage Readiness, Binder Planner
3. **Auth System**: NextAuth → Supabase Auth
4. **Payments**: Stripe integration
5. **Dashboard**: Progress tracking, readiness status
6. **Analytics**: PostHog tracking

## Module Structure (10 Total)
0. Quick Start (always available)
1. Identify Exposure (on enrollment)
2. Testing & Diagnosis (complete Module 1)
3. Open Drainage Pathways (complete Module 2)
4. Detox I: Binders (drainage ready ≥80% for 7 days)
5. Detox II: Antifungals (complete binders + tolerance)
6. Managing Herx (available with binders)
7. Supportive Modalities (available with binders)
8. Diet & Pantry (always available)
9. Retesting & Prevention (50% total completion)

## Interactive Tools (9 Total)
1. Exposure & Dampness Checklist
2. Testing Decision Helper
3. Drainage Readiness Score (gates binder access)
4. Binder Timing Planner
5. Herx Toolkit
6. Sauna Ramp-Up
7. Diet Builder
8. Retesting Scheduler
9. Re-exposure Triage

## Technical Architecture
```
Tech Stack:
- Next.js 14+ with App Router
- TypeScript (strict mode)
- Tailwind CSS + shadcn/ui
- Framer Motion (animations)
- MDX + Contentlayer (content)
- SQLite → Supabase (database)
- Stripe (payments)
- PostHog (analytics)
- Resend/Postal (email)
```

## Folder Structure
```
app/
  (marketing)/    # Public pages
  (app)/         # Protected app
  (auth)/        # Auth flows
components/
  ui/            # Base components
  modules/       # Module components
  tools/         # Tool components
lib/
  calculations/  # Business logic
  auth/          # Auth helpers
  db/            # Database queries
content/
  modules/       # MDX content
  emails/        # Email templates
```

## Safety & Compliance
- **Evidence Badges**: Solid/Emerging/Controversial
- **Safety Flags**: Medical disclaimers throughout
- **Gating Logic**: Drainage readiness before binders
- **Clinical Prompts**: "Consult your clinician" warnings
- **HIPAA-Adjacent**: Best practices for health data

## Design System
- **Theme**: Health-conscious, calming
- **Colors**: Emerald primary (#10b981), Blue secondary (#3b82f6)
- **Typography**: Inter font family
- **Spacing**: 4px base unit
- **Accessibility**: WCAG 2.2 AA minimum

## Development Phases
- **Phase 0**: Setup (current)
- **Phase 1**: MVP - 4 weeks
- **Phase 2**: Enhancement - 4 weeks  
- **Phase 3**: Scale & Production - 4 weeks

## Pricing Tiers
- **Core**: $149-199 one-time
- **Plus**: $47-59/month
- **VIP**: $997+

## Key Performance Indicators
- Activation: % completing onboarding within 24-48h
- Progress: Median modules by day 7/30
- Readiness: % reaching drainage ready in 14 days
- Retention: Week-4 return rate
- Revenue: LTV:CAC ratio, upgrade rate

## Important Patterns
1. **Module Gating**: Server-side prerequisite checks
2. **Tool State**: JSON in database, auto-save every 30s
3. **Progress Tracking**: ModuleProgress model tracks status
4. **Evidence System**: Required for all health claims
5. **Safety First**: Disclaimers and warnings throughout

## Current Working Context
- Phase 0 nearly complete (database, components, Cursor rules v2.1 done)
- Need to: Initialize Git, set up ESLint/Prettier
- Ready to begin Phase 1: Frontend Foundation
- Base UI components created (Button, Card, Header, Footer, Sidebar)
- Prisma schema with 16 models implemented

## Critical Safety Rules (ALWAYS ENFORCE)
1. **NEVER** skip drainage before binders - this can cause serious harm
2. **ALWAYS** include medical disclaimers on health-related content
3. **ENFORCE** readiness gates - they exist for user safety
4. **REQUIRE** "consult your healthcare provider" on protocols
5. **FLAG** content for vulnerable populations (pregnancy, children)

## Remember
- Update project-history.md every 5-10 file changes
- Reference Opus4-Project-overview.md for requirements
- Maintain safety-first approach for all health content
- Use evidence badges (Solid/Emerging/Controversial) consistently
- Test module gating logic thoroughly
- Run lint and typecheck before committing