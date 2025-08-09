# Phase 1: Frontend Foundation & MVP (4 Weeks)

## Overview
Based on Opus4-Project-overview.md Phase 1 specifications. This phase builds the MVP with auth, payments, dashboard, and the first 3 modules (Quick Start, Exposure, Testing) along with 3 core tools.

**Duration:** 4 weeks
**Prerequisites:** Phase 0 completed (project setup)

## Success Criteria (Per Opus4 Spec)
- [ ] Auth system working (sign up, sign in, password reset)
- [ ] Stripe payments integrated (one-time purchase)
- [ ] Dashboard showing progress and next actions
- [ ] 3 modules deliverable: Quick Start, Exposure, Testing
- [ ] 3 tools functional: Exposure Checklist, Drainage Readiness, Binder Planner
- [ ] Resources vault with initial content
- [ ] Basic email setup (welcome, password reset)
- [ ] PostHog analytics tracking key events
- [ ] Mobile responsive design
- [ ] Basic error handling throughout

## Week 1: Authentication & Core Layout

### Day 1-2: Layout Structure

| Task | File/Component | Time | Status |
|------|---------------|------|--------|
| Create marketing layout | `app/(marketing)/layout.tsx` | 2h | ⬜ |
| Create app layout | `app/(app)/layout.tsx` | 2h | ⬜ |
| Build header component | `components/layout/header.tsx` | 3h | ⬜ |
| Build footer component | `components/layout/footer.tsx` | 2h | ⬜ |
| Create navigation menu | `components/layout/nav-menu.tsx` | 3h | ⬜ |
| Add mobile menu drawer | `components/layout/mobile-menu.tsx` | 2h | ⬜ |
| Set up theme provider | `components/providers/theme-provider.tsx` | 1h | ⬜ |

### Day 3-4: NextAuth Setup

| Task | File/Component | Time | Status |
|------|---------------|------|--------|
| Configure NextAuth | `lib/auth/auth-options.ts` | 3h | ⬜ |
| Create auth API route | `app/api/auth/[...nextauth]/route.ts` | 1h | ⬜ |
| Build sign in page | `app/(auth)/signin/page.tsx` | 3h | ⬜ |
| Build sign up page | `app/(auth)/signup/page.tsx` | 3h | ⬜ |
| Create password reset flow | `app/(auth)/reset-password/page.tsx` | 3h | ⬜ |
| Add auth middleware | `middleware.ts` | 2h | ⬜ |
| Create user session hook | `lib/hooks/use-session.ts` | 1h | ⬜ |

### Day 5: Landing Page (Per Opus4 Core Pages)

| Task | File/Component | Time | Status |
|------|---------------|------|--------|
| Hero section with promise | `components/marketing/hero.tsx` | 3h | ⬜ |
| Transformation section | `components/marketing/transformation.tsx` | 2h | ⬜ |
| Evidence labels display | `components/marketing/evidence.tsx` | 2h | ⬜ |
| Medical disclaimer gate | `components/marketing/disclaimer-modal.tsx` | 2h | ⬜ |
| Curriculum snapshot | `components/marketing/curriculum.tsx` | 2h | ⬜ |
| Tools preview section | `components/marketing/tools-preview.tsx` | 2h | ⬜ |
| FAQ section | `components/marketing/faq.tsx` | 2h | ⬜ |
| Pricing table | `components/marketing/pricing.tsx` | 3h | ⬜ |
| Trust signals | `components/marketing/trust-signals.tsx` | 1h | ⬜ |
| Social proof section | `components/marketing/social-proof.tsx` | 2h | ⬜ |

## Week 2: Payments & Dashboard

### Day 6-7: Stripe Integration

| Task | File/Component | Time | Status |
|------|---------------|------|--------|
| Set up Stripe SDK | `lib/stripe/client.ts` | 2h | ⬜ |
| Create checkout API | `app/api/checkout/route.ts` | 3h | ⬜ |
| Build checkout page | `app/(app)/checkout/page.tsx` | 4h | ⬜ |
| Add webhook handler | `app/api/webhooks/stripe/route.ts` | 3h | ⬜ |
| Create success page | `app/(app)/checkout/success/page.tsx` | 2h | ⬜ |
| Handle failed payments | `app/(app)/checkout/failed/page.tsx` | 2h | ⬜ |
| Test payment flow | - | 2h | ⬜ |

### Day 8-9: Onboarding Wizard (5-7 min)

| Task | File/Component | Time | Status |
|------|---------------|------|--------|
| Create wizard container | `app/(app)/onboarding/page.tsx` | 3h | ⬜ |
| Profile collection step | `components/onboarding/profile-step.tsx` | 3h | ⬜ |
| Symptom assessment | `components/onboarding/symptoms-step.tsx` | 3h | ⬜ |
| Exposure history form | `components/onboarding/exposure-step.tsx` | 2h | ⬜ |
| Budget & constraints | `components/onboarding/constraints-step.tsx` | 2h | ⬜ |
| Generate starter plan | `lib/calculations/starter-plan.ts` | 3h | ⬜ |
| Save onboarding data | `app/api/onboarding/route.ts` | 2h | ⬜ |

### Day 10: Dashboard (Per Opus4 Spec)

| Task | File/Component | Time | Status |
|------|---------------|------|--------|
| Dashboard layout | `app/(app)/dashboard/page.tsx` | 3h | ⬜ |
| Progress overview widget | `components/dashboard/progress-widget.tsx` | 3h | ⬜ |
| Next action card | `components/dashboard/next-action.tsx` | 2h | ⬜ |
| Readiness status display | `components/dashboard/readiness-status.tsx` | 2h | ⬜ |
| Retesting countdown | `components/dashboard/retest-countdown.tsx` | 2h | ⬜ |
| Streak counter | `components/dashboard/streak-counter.tsx` | 2h | ⬜ |
| Badges display | `components/dashboard/badges.tsx` | 2h | ⬜ |
| Daily tip widget | `components/dashboard/daily-tip.tsx` | 1h | ⬜ |
| Community highlight | `components/dashboard/community-highlight.tsx` | 1h | ⬜ |

## Week 3: Modules & Content

### Day 11-12: Module Infrastructure

| Task | File/Component | Time | Status |
|------|---------------|------|--------|
| Set up MDX with Contentlayer | `contentlayer.config.ts` | 3h | ⬜ |
| Create module layout | `app/(app)/modules/[slug]/layout.tsx` | 2h | ⬜ |
| Module page shell | `app/(app)/modules/[slug]/page.tsx` | 3h | ⬜ |
| Lesson component | `components/modules/lesson-viewer.tsx` | 4h | ⬜ |
| Progress tracker | `components/modules/progress-tracker.tsx` | 2h | ⬜ |
| Mark complete button | `components/modules/mark-complete.tsx` | 2h | ⬜ |
| Prerequisite checker | `lib/modules/prerequisite-checker.ts` | 2h | ⬜ |
| Gating logic | `lib/modules/gating-logic.ts` | 3h | ⬜ |

### Day 13: Module 00 - Quick Start (5 steps)

| Task | File/Component | Time | Status |
|------|---------------|------|--------|
| Write Quick Start content | `content/modules/00-quick-start.mdx` | 3h | ⬜ |
| Create TL;DR summary | Include in MDX | 30m | ⬜ |
| Record audio narration | `public/audio/00-quick-start.mp3` | 1h | ⬜ |
| Design visual diagram | Create with Figma, export WebP | 2h | ⬜ |
| Add "Do this now" box | MDX component | 1h | ⬜ |
| Link relevant tools | Add tool preview cards | 1h | ⬜ |
| Add evidence badges | `components/modules/evidence-badge.tsx` | 1h | ⬜ |
| Add safety flags | `components/modules/safety-flag.tsx` | 1h | ⬜ |

### Day 14: Module 01 - Identify Exposure

| Task | File/Component | Time | Status |
|------|---------------|------|--------|
| Write Exposure content | `content/modules/01-exposure.mdx` | 4h | ⬜ |
| Home/work/car sections | Include in MDX | 2h | ⬜ |
| Low-cost actions list | MDX checklist component | 2h | ⬜ |
| Record audio (3-7 min) | `public/audio/01-exposure.mp3` | 1h | ⬜ |
| Create room diagram | Design and export WebP | 2h | ⬜ |
| Link to Exposure tool | Tool preview component | 1h | ⬜ |

### Day 15: Module 02 - Testing & Diagnosis

| Task | File/Component | Time | Status |
|------|---------------|------|--------|
| Write Testing content | `content/modules/02-testing.mdx` | 4h | ⬜ |
| Environmental vs medical | Comparison table in MDX | 2h | ⬜ |
| Pros/cons analysis | MDX table component | 2h | ⬜ |
| Cost breakdown | Pricing table component | 2h | ⬜ |
| Record audio narration | `public/audio/02-testing.mp3` | 1h | ⬜ |
| Testing flowchart | Create diagram | 2h | ⬜ |
| Link to Testing Helper | Tool preview | 1h | ⬜ |

## Week 4: Tools & Polish

### Day 16-17: Tool 1 - Exposure & Dampness Checklist

| Task | File/Component | Time | Status |
|------|---------------|------|--------|
| Create tool page | `app/(app)/tools/exposure-checklist/page.tsx` | 3h | ⬜ |
| Room-by-room form | `components/tools/exposure/room-checklist.tsx` | 4h | ⬜ |
| Scoring algorithm | `lib/calculations/exposure-score.ts` | 3h | ⬜ |
| Photo upload feature | `components/tools/exposure/photo-upload.tsx` | 3h | ⬜ |
| Fix-first list generator | `lib/tools/fix-first-generator.ts` | 2h | ⬜ |
| Inspector brief PDF | `lib/tools/inspector-brief.ts` | 3h | ⬜ |
| Cost estimates | `lib/tools/cost-estimator.ts` | 2h | ⬜ |
| Save tool state | `app/api/tools/exposure/route.ts` | 2h | ⬜ |

### Day 18-19: Tool 2 - Drainage Readiness Score

| Task | File/Component | Time | Status |
|------|---------------|------|--------|
| Create tool page | `app/(app)/tools/drainage-readiness/page.tsx` | 3h | ⬜ |
| Daily input form | `components/tools/drainage/daily-form.tsx` | 3h | ⬜ |
| Score calculation | `lib/calculations/drainage-score.ts` | 3h | ⬜ |
| Trend graphs | `components/tools/drainage/trend-chart.tsx` | 3h | ⬜ |
| 7-day rolling average | `lib/calculations/rolling-average.ts` | 2h | ⬜ |
| Gate binder unlock | `lib/tools/binder-gating.ts` | 2h | ⬜ |
| AI suggestions (mock) | `components/tools/drainage/suggestions.tsx` | 2h | ⬜ |
| Save daily entries | `app/api/tools/drainage/route.ts` | 2h | ⬜ |

### Day 20: Tool 3 - Binder Timing Planner

| Task | File/Component | Time | Status |
|------|---------------|------|--------|
| Create tool page | `app/(app)/tools/binder-planner/page.tsx` | 3h | ⬜ |
| Meal/meds scheduler | `components/tools/binder/scheduler.tsx` | 4h | ⬜ |
| Vitamin timing logic | `lib/calculations/vitamin-spacing.ts` | 3h | ⬜ |
| Calendar export | `lib/tools/calendar-export.ts` | 3h | ⬜ |
| Conflict alerts | `components/tools/binder/conflict-alert.tsx` | 2h | ⬜ |
| Push notifications setup | `lib/notifications/setup.ts` | 3h | ⬜ |
| Save planner state | `app/api/tools/binder/route.ts` | 2h | ⬜ |

### Day 21: Resources Vault (Initial)

| Task | File/Component | Time | Status |
|------|---------------|------|--------|
| Create library page | `app/(app)/library/page.tsx` | 2h | ⬜ |
| Categorized layout | `components/library/category-grid.tsx` | 2h | ⬜ |
| Search functionality | `components/library/search.tsx` | 2h | ⬜ |
| Initial cheat sheets | Upload 5 PDFs to `/public/downloads` | 2h | ⬜ |
| Shopping lists | Create 3 downloadable lists | 2h | ⬜ |
| Printable trackers | Design 3 tracker templates | 3h | ⬜ |
| Version tracking setup | `lib/library/version-tracker.ts` | 1h | ⬜ |

### Day 22-23: Email & Analytics Setup

| Task | File/Component | Time | Status |
|------|---------------|------|--------|
| Configure Resend/Postal | `lib/email/client.ts` | 2h | ⬜ |
| Welcome email template | `content/emails/welcome.mdx` | 2h | ⬜ |
| Password reset email | `content/emails/reset-password.mdx` | 1h | ⬜ |
| Module complete email | `content/emails/module-complete.mdx` | 2h | ⬜ |
| Set up PostHog | `lib/analytics/posthog.ts` | 3h | ⬜ |
| Track key events | Add throughout components | 4h | ⬜ |
| Funnel tracking | Configure in PostHog | 2h | ⬜ |
| Session recordings | Enable in PostHog | 1h | ⬜ |

### Day 24-25: Mobile Responsive & Error Handling

| Task | File/Component | Time | Status |
|------|---------------|------|--------|
| Test all pages mobile | Use Chrome DevTools | 4h | ⬜ |
| Fix responsive issues | Update Tailwind classes | 6h | ⬜ |
| Add error boundaries | `components/error-boundary.tsx` | 2h | ⬜ |
| Create 404 page | `app/not-found.tsx` | 2h | ⬜ |
| Create error page | `app/error.tsx` | 2h | ⬜ |
| Add loading states | Throughout components | 3h | ⬜ |
| Test error scenarios | Manual testing | 3h | ⬜ |

### Day 26-28: Testing & Bug Fixes

| Task | File/Component | Time | Status |
|------|---------------|------|--------|
| Full user flow test | End-to-end testing | 4h | ⬜ |
| Payment flow testing | Test with Stripe test mode | 3h | ⬜ |
| Module gating test | Verify prerequisites work | 2h | ⬜ |
| Tool functionality test | Test all 3 tools thoroughly | 4h | ⬜ |
| Cross-browser testing | Chrome, Safari, Firefox | 3h | ⬜ |
| Fix identified bugs | As discovered | 8h | ⬜ |
| Performance optimization | Lighthouse audit & fixes | 4h | ⬜ |
| Deploy to Vercel | Production deployment | 2h | ⬜ |

## Component Specifications

### Lesson Template Structure (Per Opus4)
```typescript
interface LessonTemplate {
  tldr: string; // 50 words max
  audioClip: string; // 3-7 min MP3 at 128kbps, -16 LUFS
  visualDiagram: string; // WebP with fallback, <100KB
  doThisNow: ActionBox; // Single clear action
  toolLinks: ToolPreview[]; // Contextual with preview
  notesArea: AutoSaveNotes; // Auto-save every 30s
  evidenceBadge: 'Solid' | 'Emerging' | 'Controversial';
  safetyFlags: SafetyFlag[];
  readingTime: number; // Estimate in minutes
  completionPercentage: number;
}
```

### Module Gating Rules (Per Opus4)
```typescript
const gatingRules = {
  'quick-start': 'always-available',
  'exposure': 'on-enrollment',
  'testing': 'complete-exposure',
  'drainage': 'complete-testing',
  'binders': 'drainage-readiness >= 80% for 7 days',
  'antifungals': 'complete-binders + tolerance-check',
  'herx': 'available-with-binders',
  'modalities': 'available-with-binders',
  'diet': 'always-available',
  'prevention': '50%-total-completion'
};
```

## Database Schema Updates

Add these models to your Prisma schema:

```prisma
model OnboardingProfile {
  id              String   @id @default(cuid())
  userId          String   @unique
  user            User     @relation(fields: [userId], references: [id])
  
  livingSituation String?
  exposureHistory String?
  symptoms        String?  // JSON array
  priorTests      String?
  budget          String?
  equipment       String?
  dietConstraints String?
  timezone        String?
  preferredPace   String?
  
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
  
  @@map("onboarding_profiles")
}

model Purchase {
  id                String   @id @default(cuid())
  userId            String
  user              User     @relation(fields: [userId], references: [id])
  
  sku               String
  amount            Int
  status            String   // pending, completed, failed
  stripePaymentId   String?
  stripeCustomerId  String?
  
  startedAt         DateTime @default(now())
  completedAt       DateTime?
  
  @@map("purchases")
}

model EmailLog {
  id        String   @id @default(cuid())
  userId    String?
  email     String
  type      String   // welcome, reset, module-complete, etc
  status    String   // sent, failed, bounced
  sentAt    DateTime @default(now())
  
  @@map("email_logs")
}
```

## Common Issues & Solutions

### Issue: MDX not rendering properly
**Solution:** Ensure contentlayer.config.ts is properly configured and run `npx contentlayer build`

### Issue: Stripe webhooks not working locally
**Solution:** Use Stripe CLI for local webhook testing:
```bash
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

### Issue: Audio files too large
**Solution:** Compress MP3s to 128kbps mono:
```bash
ffmpeg -i input.mp3 -b:a 128k -ac 1 -ar 44100 output.mp3
```

### Issue: PostHog not tracking events
**Solution:** Check that PostHog is initialized in app/layout.tsx and API key is set

## Deliverables Checklist

### Must Have (MVP Requirements)
- [x] Authentication system (sign up, sign in, reset)
- [x] Stripe payment integration
- [x] User dashboard with progress tracking
- [x] 3 complete modules with audio and content
- [x] 3 functional interactive tools
- [x] Resources vault with initial content
- [x] Email system (welcome, password reset)
- [x] PostHog analytics tracking
- [x] Mobile responsive design
- [x] Basic error handling

### Nice to Have (If Time Permits)
- [ ] Additional module content
- [ ] Community forum skeleton
- [ ] Advanced analytics dashboard
- [ ] A/B testing framework setup
- [ ] Additional email automations

## Next Steps (Phase 2)
Once Phase 1 is complete and deployed:
1. Gather user feedback on MVP
2. Begin Phase 2: Full module set (remaining 7 modules)
3. Add advanced tools: Herx Toolkit, Diet Builder, Retesting Scheduler
4. Implement community features
5. Set up email automation sequences
6. Add A/B testing and conversion optimization