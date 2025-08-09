# Phase 2: Enhancement - Full Module Set & Advanced Tools (4 Weeks)

## Overview
Based on Opus4-Project-overview.md Phase 2 specifications. This phase completes the full module set (remaining 7 modules), adds advanced tools (Herx Toolkit, Diet Builder, Retesting Scheduler), implements community features, advanced analytics, email automations, and conversion optimization.

**Duration:** 4 weeks
**Prerequisites:** Phase 1 completed and deployed

## Success Criteria (Per Opus4 Spec)
- [ ] All 10 modules complete with MDX content and audio
- [ ] 6 additional tools functional (9 total)
- [ ] Community forum operational (optional tier)
- [ ] Advanced analytics with PostHog configured
- [ ] Email automation sequences active (Resend)
- [ ] A/B testing framework implemented
- [ ] Conversion optimization in place
- [ ] Gamification features active (badges, streaks)
- [ ] All content has evidence badges and safety flags
- [ ] Module gating fully implemented

## Week 1: Complete Remaining Modules

### Day 1-2: Module 03 - Open Drainage Pathways

| Task | File/Component | Time | Status |
|------|---------------|------|--------|
| Write Drainage content | `content/modules/03-drainage.mdx` | 4h | ⬜ |
| Bowel section | Include detailed protocol | 2h | ⬜ |
| Liver/gallbladder section | Include castor oil packs | 2h | ⬜ |
| Kidneys section | Hydration protocols | 1h | ⬜ |
| Lymph section | Dry brushing, rebounding | 1h | ⬜ |
| Sweat section | Sauna protocols | 1h | ⬜ |
| Record audio (5-7 min) | `public/audio/03-drainage.mp3` | 1h | ⬜ |
| Create pathway diagram | Visual of all 5 pathways | 3h | ⬜ |
| Add tool links | Link to Drainage Readiness | 1h | ⬜ |
| Evidence badges | Mark Solid/Emerging/Controversial | 1h | ⬜ |
| Safety flags | Add clinician prompts | 1h | ⬜ |

### Day 3: Module 04 - Detox I: Binders

| Task | File/Component | Time | Status |
|------|---------------|------|--------|
| Write Binders content | `content/modules/04-binders.mdx` | 4h | ⬜ |
| Timing protocols | Detailed spacing from food/meds | 2h | ⬜ |
| Interactions section | Drug/supplement interactions | 2h | ⬜ |
| Side effects guide | Common issues and solutions | 2h | ⬜ |
| Binder comparison table | CSM vs alternatives | 2h | ⬜ |
| Record audio | `public/audio/04-binders.mp3` | 1h | ⬜ |
| Create timing diagram | Visual schedule | 2h | ⬜ |
| Link Binder Planner | Tool integration | 1h | ⬜ |
| Add safety warnings | Critical timing info | 1h | ⬜ |

### Day 4: Module 05 - Detox II: Antifungals

| Task | File/Component | Time | Status |
|------|---------------|------|--------|
| Write Antifungals content | `content/modules/05-antifungals.mdx` | 4h | ⬜ |
| When/if decision tree | Clear criteria for use | 2h | ⬜ |
| Monitoring section | Lab markers to track | 2h | ⬜ |
| Natural vs prescription | Comparison and protocols | 2h | ⬜ |
| Safety monitoring | Liver function, die-off | 2h | ⬜ |
| Record audio | `public/audio/05-antifungals.mp3` | 1h | ⬜ |
| Create decision flowchart | When to use antifungals | 2h | ⬜ |
| Multiple safety flags | High-risk content flags | 2h | ⬜ |

### Day 5: Module 06 - Managing Herx

| Task | File/Component | Time | Status |
|------|---------------|------|--------|
| Write Herx content | `content/modules/06-herx.mdx` | 4h | ⬜ |
| Slowdown protocol | Step-by-step guide | 2h | ⬜ |
| Red flags section | When to stop/seek help | 2h | ⬜ |
| Support strategies | Binders, hydration, rest | 2h | ⬜ |
| Record audio | `public/audio/06-herx.mp3` | 1h | ⬜ |
| Severity scale diagram | Visual guide | 2h | ⬜ |
| Link Herx Toolkit | Tool integration | 1h | ⬜ |
| Emergency protocol box | Highlighted safety info | 2h | ⬜ |

### Day 6: Module 07 - Supportive Modalities

| Task | File/Component | Time | Status |
|------|---------------|------|--------|
| Write Modalities content | `content/modules/07-modalities.mdx` | 4h | ⬜ |
| Sauna protocols | IR vs traditional, ramp-up | 2h | ⬜ |
| Strength training | Exercise protocols | 1h | ⬜ |
| Nasal care | Rinses, sprays | 1h | ⬜ |
| Sleep optimization | Protocols for better sleep | 2h | ⬜ |
| Record audio | `public/audio/07-modalities.mp3` | 1h | ⬜ |
| Create modality grid | Visual comparison | 2h | ⬜ |
| Link Sauna Ramp-Up tool | Tool integration | 1h | ⬜ |

### Day 7: Module 08 - Diet & Pantry

| Task | File/Component | Time | Status |
|------|---------------|------|--------|
| Write Diet content | `content/modules/08-diet.mdx` | 4h | ⬜ |
| Low-mold foods list | Comprehensive guide | 2h | ⬜ |
| Low-amylose section | Starch considerations | 2h | ⬜ |
| Meal planning guide | Weekly planning tips | 2h | ⬜ |
| Record audio | `public/audio/08-diet.mp3` | 1h | ⬜ |
| Food comparison chart | Good vs avoid | 2h | ⬜ |
| Link Diet Builder | Tool integration | 1h | ⬜ |
| Grocery list builder | Interactive checklist | 2h | ⬜ |

### Day 8: Module 09 - Retesting & Prevention

| Task | File/Component | Time | Status |
|------|---------------|------|--------|
| Write Prevention content | `content/modules/09-prevention.mdx` | 4h | ⬜ |
| VCS testing cadence | Every 3 months protocol | 2h | ⬜ |
| Relapse plan | What to do if re-exposed | 2h | ⬜ |
| Long-term maintenance | Ongoing protocols | 2h | ⬜ |
| Record audio | `public/audio/09-prevention.mp3` | 1h | ⬜ |
| Prevention checklist | Monthly review items | 2h | ⬜ |
| Link Retesting Scheduler | Tool integration | 1h | ⬜ |

## Week 2: Advanced Interactive Tools

### Day 9-10: Testing Decision Helper

| Task | File/Component | Time | Status |
|------|---------------|------|--------|
| Create tool page | `app/(app)/tools/testing-helper/page.tsx` | 3h | ⬜ |
| Env vs medical flow | `components/tools/testing/decision-flow.tsx` | 4h | ⬜ |
| Cost calculator | `lib/calculations/testing-costs.ts` | 3h | ⬜ |
| Insurance checker | `components/tools/testing/insurance.tsx` | 2h | ⬜ |
| Caveats display | `components/tools/testing/caveats.tsx` | 2h | ⬜ |
| Print clinician sheet | `lib/tools/clinician-sheet.ts` | 3h | ⬜ |
| Lab finder map | `components/tools/testing/lab-map.tsx` | 3h | ⬜ |
| Save preferences | `app/api/tools/testing/route.ts` | 2h | ⬜ |

### Day 11-12: Herx Toolkit

| Task | File/Component | Time | Status |
|------|---------------|------|--------|
| Create tool page | `app/(app)/tools/herx-toolkit/page.tsx` | 3h | ⬜ |
| Intensity slider | `components/tools/herx/intensity-slider.tsx` | 3h | ⬜ |
| Adjustment calculator | `lib/calculations/herx-adjustments.ts` | 3h | ⬜ |
| Emergency protocol | `components/tools/herx/emergency.tsx` | 3h | ⬜ |
| Symptom logger | `components/tools/herx/symptom-log.tsx` | 3h | ⬜ |
| Safety flag system | `components/tools/herx/safety-flags.tsx` | 2h | ⬜ |
| Historical tracking | `components/tools/herx/history.tsx` | 2h | ⬜ |
| Save entries | `app/api/tools/herx/route.ts` | 2h | ⬜ |

### Day 13-14: Sauna Ramp-Up Tool

| Task | File/Component | Time | Status |
|------|---------------|------|--------|
| Create tool page | `app/(app)/tools/sauna-rampup/page.tsx` | 3h | ⬜ |
| Heat/time progression | `components/tools/sauna/progression.tsx` | 4h | ⬜ |
| Heart rate zones | `lib/calculations/heart-zones.ts` | 2h | ⬜ |
| Hydration reminders | `components/tools/sauna/hydration.tsx` | 2h | ⬜ |
| Contraindications | `components/tools/sauna/contraindications.tsx` | 2h | ⬜ |
| Post-sauna protocol | `components/tools/sauna/post-protocol.tsx` | 2h | ⬜ |
| Progress tracking | `components/tools/sauna/progress.tsx` | 3h | ⬜ |
| Save sessions | `app/api/tools/sauna/route.ts` | 2h | ⬜ |

### Day 15-16: Diet Builder

| Task | File/Component | Time | Status |
|------|---------------|------|--------|
| Create tool page | `app/(app)/tools/diet-builder/page.tsx` | 3h | ⬜ |
| 7-day meal planner | `components/tools/diet/meal-planner.tsx` | 5h | ⬜ |
| Recipe swap system | `components/tools/diet/recipe-swaps.tsx` | 3h | ⬜ |
| Grocery list generator | `lib/tools/grocery-list.ts` | 3h | ⬜ |
| Restaurant guide | `components/tools/diet/restaurant-guide.tsx` | 2h | ⬜ |
| High-mold warnings | `components/tools/diet/mold-warnings.tsx` | 2h | ⬜ |
| Print meal plan | `lib/tools/meal-plan-pdf.ts` | 2h | ⬜ |
| Save meal plans | `app/api/tools/diet/route.ts` | 2h | ⬜ |

### Day 17: Retesting Scheduler

| Task | File/Component | Time | Status |
|------|---------------|------|--------|
| Create tool page | `app/(app)/tools/retest-scheduler/page.tsx` | 3h | ⬜ |
| VCS timing (~3mo) | `components/tools/retest/vcs-schedule.tsx` | 2h | ⬜ |
| Urine timing (3-6mo) | `components/tools/retest/urine-schedule.tsx` | 2h | ⬜ |
| Cost tracker | `components/tools/retest/cost-tracker.tsx` | 2h | ⬜ |
| Email reminders | `lib/tools/retest-reminders.ts` | 3h | ⬜ |
| Comparison view | `components/tools/retest/comparison.tsx` | 3h | ⬜ |
| Progress photos | `components/tools/retest/photos.tsx` | 2h | ⬜ |
| Save schedule | `app/api/tools/retest/route.ts` | 2h | ⬜ |

### Day 18: Re-exposure Triage

| Task | File/Component | Time | Status |
|------|---------------|------|--------|
| Create tool page | `app/(app)/tools/reexposure/page.tsx` | 3h | ⬜ |
| Quick flow wizard | `components/tools/reexposure/wizard.tsx` | 4h | ⬜ |
| Severity assessment | `lib/calculations/exposure-severity.ts` | 3h | ⬜ |
| Immediate steps | `components/tools/reexposure/immediate.tsx` | 2h | ⬜ |
| Emergency contacts | `components/tools/reexposure/contacts.tsx` | 2h | ⬜ |
| Home check protocol | `components/tools/reexposure/home-check.tsx` | 2h | ⬜ |
| Save incident | `app/api/tools/reexposure/route.ts` | 2h | ⬜ |

## Week 3: Community & Gamification

### Day 19-20: Community Forum (Optional Tier)

| Task | File/Component | Time | Status |
|------|---------------|------|--------|
| Forum layout | `app/(app)/community/page.tsx` | 3h | ⬜ |
| Thread listing | `components/community/thread-list.tsx` | 3h | ⬜ |
| Create post form | `components/community/create-post.tsx` | 3h | ⬜ |
| Reply system | `components/community/replies.tsx` | 3h | ⬜ |
| Moderation tools | `components/community/moderation.tsx` | 3h | ⬜ |
| Success stories section | `app/(app)/community/success/page.tsx` | 2h | ⬜ |
| Regional groups | `components/community/regional.tsx` | 2h | ⬜ |
| Expert AMA schedule | `components/community/ama-schedule.tsx` | 2h | ⬜ |

### Day 21: Gamification Features

| Task | File/Component | Time | Status |
|------|---------------|------|--------|
| Badge system | `lib/gamification/badges.ts` | 3h | ⬜ |
| Drainage Unlocked badge | Design and implement | 1h | ⬜ |
| First Retest badge | Design and implement | 1h | ⬜ |
| Herx Managed badge | Design and implement | 1h | ⬜ |
| 7-Day Streak badge | Design and implement | 1h | ⬜ |
| Community Helper badge | Design and implement | 1h | ⬜ |
| Badge display component | `components/gamification/badge-display.tsx` | 2h | ⬜ |
| Streak counter logic | `lib/gamification/streaks.ts` | 3h | ⬜ |
| Completion certificates | `lib/gamification/certificates.ts` | 3h | ⬜ |
| Shareable achievements | `components/gamification/share.tsx` | 2h | ⬜ |

### Day 22: User Plan & Timeline

| Task | File/Component | Time | Status |
|------|---------------|------|--------|
| Plan page | `app/(app)/plan/page.tsx` | 3h | ⬜ |
| Visual timeline | `components/plan/timeline.tsx` | 4h | ⬜ |
| Personalized milestones | `lib/plan/milestones.ts` | 3h | ⬜ |
| Pace adjustment | `components/plan/pace-adjuster.tsx` | 2h | ⬜ |
| Module recommendations | `lib/plan/recommendations.ts` | 3h | ⬜ |
| Tool shortcuts | `components/plan/tool-shortcuts.tsx` | 2h | ⬜ |
| Export to calendar | `lib/plan/calendar-export.ts` | 2h | ⬜ |

## Week 4: Analytics, Email & Optimization

### Day 23-24: Advanced Analytics

| Task | File/Component | Time | Status |
|------|---------------|------|--------|
| Enhanced PostHog setup | `lib/analytics/posthog-advanced.ts` | 3h | ⬜ |
| Funnel tracking | Configure conversion funnels | 3h | ⬜ |
| Heatmap setup | Enable heatmaps | 2h | ⬜ |
| Session recordings | Configure recording rules | 2h | ⬜ |
| Custom events | Track tool usage, module progress | 4h | ⬜ |
| User properties | Set user segments | 2h | ⬜ |
| Dashboard creation | Build PostHog dashboards | 3h | ⬜ |
| Segment integration | `lib/analytics/segment.ts` | 3h | ⬜ |

### Day 25-26: Email Automation Sequences

| Task | File/Component | Time | Status |
|------|---------------|------|--------|
| Configure Resend | Advanced setup | 2h | ⬜ |
| Welcome series (5 emails) | `content/emails/welcome-series/*.mdx` | 5h | ⬜ |
| Module reminders | `content/emails/module-reminder.mdx` | 2h | ⬜ |
| Progress weekly | `content/emails/weekly-progress.mdx` | 2h | ⬜ |
| Retest nudges | `content/emails/retest-reminder.mdx` | 2h | ⬜ |
| Community highlights | `content/emails/community-digest.mdx` | 2h | ⬜ |
| New content drops | `content/emails/new-content.mdx` | 1h | ⬜ |
| Abandoned session | `content/emails/abandoned.mdx` | 2h | ⬜ |
| Milestone celebrations | `content/emails/milestone.mdx` | 2h | ⬜ |
| Re-engagement campaigns | `content/emails/re-engagement.mdx` | 2h | ⬜ |

### Day 27: A/B Testing Framework

| Task | File/Component | Time | Status |
|------|---------------|------|--------|
| Set up framework | `lib/ab-testing/framework.ts` | 3h | ⬜ |
| Pricing test | Test different price points | 2h | ⬜ |
| Headlines test | Landing page headlines | 2h | ⬜ |
| Button colors test | CTA button variations | 1h | ⬜ |
| Video vs text test | Content presentation | 2h | ⬜ |
| Feature flags setup | `lib/features/flags.ts` | 3h | ⬜ |
| Analytics integration | Track test results | 2h | ⬜ |

### Day 28: Conversion Optimization

| Task | File/Component | Time | Status |
|------|---------------|------|--------|
| Exit intent popup | `components/marketing/exit-intent.tsx` | 3h | ⬜ |
| Discount code system | `lib/discounts/codes.ts` | 3h | ⬜ |
| Cart abandonment | Recovery email sequence | 3h | ⬜ |
| Social proof widgets | `components/marketing/social-proof-widget.tsx` | 2h | ⬜ |
| Recent purchases display | Live activity feed | 2h | ⬜ |
| Active users counter | Show current users | 1h | ⬜ |
| Urgency triggers | Limited seats, timers | 2h | ⬜ |
| Trust signals | SSL badge, guarantees | 1h | ⬜ |
| Testimonials carousel | `components/marketing/testimonials.tsx` | 2h | ⬜ |

## Database Schema Additions

```prisma
model Thread {
  id          String   @id @default(cuid())
  userId      String
  user        User     @relation(fields: [userId], references: [id])
  
  title       String
  content     String
  category    String
  isPinned    Boolean  @default(false)
  isLocked    Boolean  @default(false)
  
  replies     Reply[]
  
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  @@map("threads")
}

model Reply {
  id        String   @id @default(cuid())
  threadId  String
  thread    Thread   @relation(fields: [threadId], references: [id])
  userId    String
  user      User     @relation(fields: [userId], references: [id])
  
  content   String
  
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  @@map("replies")
}

model Badge {
  id          String   @id @default(cuid())
  userId      String
  user        User     @relation(fields: [userId], references: [id])
  
  type        String   // drainage-unlocked, first-retest, etc
  earnedAt    DateTime @default(now())
  
  @@unique([userId, type])
  @@map("badges")
}

model Streak {
  id          String   @id @default(cuid())
  userId      String   @unique
  user        User     @relation(fields: [userId], references: [id])
  
  currentDays Int      @default(0)
  longestDays Int      @default(0)
  lastCheckIn DateTime @default(now())
  
  @@map("streaks")
}

model ABTest {
  id        String   @id @default(cuid())
  userId    String
  testName  String
  variant   String
  
  createdAt DateTime @default(now())
  
  @@unique([userId, testName])
  @@map("ab_tests")
}
```

## Performance Optimizations

### Code Splitting
```typescript
// Lazy load heavy components
const CommunityForum = dynamic(() => import('@/components/community/forum'));
const DietBuilder = dynamic(() => import('@/components/tools/diet-builder'));
const Analytics = dynamic(() => import('@/components/analytics/dashboard'));
```

### Image Optimization
- Convert all images to WebP format
- Use Cloudinary for automatic optimization
- Implement lazy loading for below-fold images
- Add blur placeholders for better UX

### Caching Strategy
- Cache MDX content with ISR (Incremental Static Regeneration)
- Use React Query for API response caching
- Implement service worker for offline access to core modules
- Cache static assets on CDN edge

## Testing Checklist

### Module Testing
- [ ] All 10 modules load correctly
- [ ] Audio plays without issues
- [ ] Module gating works as specified
- [ ] Evidence badges display properly
- [ ] Safety flags are visible
- [ ] Progress tracking updates correctly

### Tool Testing
- [ ] All 9 tools function correctly
- [ ] Data saves and persists
- [ ] Calculations are accurate
- [ ] Export features work
- [ ] Mobile responsiveness

### Community Testing
- [ ] Users can create posts
- [ ] Reply system works
- [ ] Moderation tools function
- [ ] Search works correctly

### Email Testing
- [ ] All templates render correctly
- [ ] Automation sequences trigger properly
- [ ] Unsubscribe works
- [ ] Analytics tracking confirmed

## Deliverables

### Required (Phase 2 Spec)
- ✅ Full module set (10 modules)
- ✅ Advanced tools (Herx Toolkit, Diet Builder, Retesting Scheduler)
- ✅ Community features (optional tier)
- ✅ Advanced analytics setup
- ✅ Email automations
- ✅ A/B testing framework
- ✅ Conversion optimization

### Optional Enhancements
- [ ] Additional email sequences
- [ ] More gamification features
- [ ] Advanced community features
- [ ] Additional A/B tests
- [ ] Performance monitoring dashboard

## Next Steps (Phase 3)
1. Protocol Builder tool
2. Binder Matcher tool
3. Lab/VCS logging system
4. Performance tuning
5. Calendar integrations
6. Affiliate program setup
7. Migration to Supabase