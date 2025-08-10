# Phase 3: Scale - Advanced Features & Production Migration (4 Weeks)

## Overview
Based on Opus4-Project-overview.md Phase 3 specifications. This phase adds Protocol Builder, Binder Matcher, lab/VCS logging, performance tuning, calendar integrations, optional health device integrations, affiliate program, and migration to Supabase for production.

**Duration:** 4 weeks
**Prerequisites:** Phase 2 completed with user feedback incorporated

## Success Criteria (Per Opus4 Spec)
- [ ] Protocol Builder with drag/drop and conflict checker
- [ ] Mycotoxin Binder Matcher tool operational
- [ ] Lab/VCS logging system with comparison views
- [ ] Performance optimized (90+ Lighthouse score)
- [ ] Calendar integrations (Google, Apple, Outlook)
- [ ] Optional: Apple Health/Google Fit integration
- [ ] Affiliate program with tracking
- [ ] White-label options configured
- [ ] Successfully migrated to Supabase
- [ ] Production deployment on Vercel

## Week 1: Advanced Tools & Features

### Day 1-3: Protocol Builder (Enhanced Tool)

| Task | File/Component | Time | Status |
|------|---------------|------|--------|
| Create builder page | `app/(app)/tools/protocol-builder/page.tsx` | 3h | ⬜ |
| Drag & drop interface | `components/tools/protocol/drag-drop.tsx` | 6h | ⬜ |
| Protocol elements library | `lib/protocol/elements.ts` | 3h | ⬜ |
| Time scheduler component | `components/tools/protocol/scheduler.tsx` | 4h | ⬜ |
| Conflict detection engine | `lib/protocol/conflict-checker.ts` | 4h | ⬜ |
| Interaction warnings | `components/tools/protocol/warnings.tsx` | 3h | ⬜ |
| Save/load protocols | `app/api/tools/protocol/route.ts` | 3h | ⬜ |
| Share protocol feature | `lib/protocol/share.ts` | 2h | ⬜ |
| Export to PDF/Calendar | `lib/protocol/export.ts` | 3h | ⬜ |
| Protocol templates | Pre-built starter protocols | 3h | ⬜ |

### Day 4-5: Mycotoxin Binder Matcher

| Task | File/Component | Time | Status |
|------|---------------|------|--------|
| Create matcher page | `app/(app)/tools/binder-matcher/page.tsx` | 3h | ⬜ |
| Test result input form | `components/tools/matcher/test-input.tsx` | 3h | ⬜ |
| Mycotoxin database | `lib/data/mycotoxins.ts` | 3h | ⬜ |
| Binder database | `lib/data/binders.ts` | 3h | ⬜ |
| Matching algorithm | `lib/matcher/algorithm.ts` | 4h | ⬜ |
| Affinity scoring | `lib/matcher/affinity-score.ts` | 3h | ⬜ |
| Recommendation display | `components/tools/matcher/recommendations.tsx` | 3h | ⬜ |
| Dosing calculator | `lib/matcher/dosing.ts` | 2h | ⬜ |
| Scientific references | `components/tools/matcher/references.tsx` | 2h | ⬜ |
| Save matches | `app/api/tools/matcher/route.ts` | 2h | ⬜ |

### Day 6-7: Lab Result Management System

| Task | File/Component | Time | Status |
|------|---------------|------|--------|
| Lab results page | `app/(app)/labs/page.tsx` | 3h | ⬜ |
| Upload interface | `components/labs/upload.tsx` | 3h | ⬜ |
| OCR integration | `lib/labs/ocr-parser.ts` | 4h | ⬜ |
| Manual entry form | `components/labs/manual-entry.tsx` | 3h | ⬜ |
| Result parser | `lib/labs/result-parser.ts` | 4h | ⬜ |
| Historical tracking | `components/labs/history.tsx` | 3h | ⬜ |
| Comparison view | `components/labs/comparison.tsx` | 4h | ⬜ |
| Trend analysis | `lib/labs/trend-analysis.ts` | 3h | ⬜ |
| Export reports | `lib/labs/report-generator.ts` | 3h | ⬜ |

### Day 8: VCS Logger

| Task | File/Component | Time | Status |
|------|---------------|------|--------|
| VCS logger page | `app/(app)/tools/vcs-logger/page.tsx` | 3h | ⬜ |
| Test input interface | `components/tools/vcs/test-input.tsx` | 3h | ⬜ |
| Score calculator | `lib/vcs/score-calculator.ts` | 2h | ⬜ |
| Progress tracking | `components/tools/vcs/progress.tsx` | 3h | ⬜ |
| Comparison charts | `components/tools/vcs/charts.tsx` | 3h | ⬜ |
| Interpretation guide | `components/tools/vcs/interpretation.tsx` | 2h | ⬜ |
| Save VCS history | `app/api/tools/vcs/route.ts` | 2h | ⬜ |

## Week 2: Integrations & Performance

### Day 9-10: Calendar Integrations

| Task | File/Component | Time | Status |
|------|---------------|------|--------|
| Google Calendar API | `lib/integrations/google-calendar.ts` | 4h | ⬜ |
| Apple Calendar (CalDAV) | `lib/integrations/apple-calendar.ts` | 4h | ⬜ |
| Outlook integration | `lib/integrations/outlook.ts` | 4h | ⬜ |
| OAuth flow setup | `app/api/auth/calendar/[provider]/route.ts` | 3h | ⬜ |
| Event creation | `lib/calendar/create-events.ts` | 3h | ⬜ |
| Sync protocols | `lib/calendar/sync-protocol.ts` | 3h | ⬜ |
| Reminder settings | `components/settings/reminders.tsx` | 2h | ⬜ |
| Calendar preferences | `components/settings/calendar.tsx` | 2h | ⬜ |

### Day 11: Health Device Integration (Optional)

| Task | File/Component | Time | Status |
|------|---------------|------|--------|
| Apple Health setup | `lib/integrations/apple-health.ts` | 4h | ⬜ |
| Google Fit setup | `lib/integrations/google-fit.ts` | 4h | ⬜ |
| Data sync service | `lib/health/sync-service.ts` | 3h | ⬜ |
| Symptom correlation | `lib/health/correlation.ts` | 3h | ⬜ |
| Activity tracking | `components/health/activity.tsx` | 2h | ⬜ |
| Sleep data import | `lib/health/sleep-import.ts` | 2h | ⬜ |
| Health dashboard | `components/health/dashboard.tsx` | 3h | ⬜ |

### Day 12-14: Performance Optimization

| Task | File/Component | Time | Status |
|------|---------------|------|--------|
| Lighthouse audit | Run comprehensive audit | 2h | ⬜ |
| Image optimization | Convert to WebP, add lazy loading | 4h | ⬜ |
| Bundle analysis | Analyze and reduce bundle size | 3h | ⬜ |
| Code splitting | Implement dynamic imports | 4h | ⬜ |
| Critical CSS | Extract and inline critical CSS | 3h | ⬜ |
| Font optimization | Subset and preload fonts | 2h | ⬜ |
| Service worker | Implement for offline access | 4h | ⬜ |
| CDN configuration | Optimize Vercel Edge caching | 2h | ⬜ |
| Database queries | Optimize slow queries | 4h | ⬜ |
| API response caching | Implement Redis caching | 3h | ⬜ |
| React optimization | Memo, useCallback, useMemo | 4h | ⬜ |
| Lazy hydration | Implement for below-fold content | 3h | ⬜ |

## Week 3: Affiliate Program & White-Label

### Day 15-16: Affiliate Program

| Task | File/Component | Time | Status |
|------|---------------|------|--------|
| Affiliate dashboard | `app/(app)/affiliates/page.tsx` | 4h | ⬜ |
| Registration system | `components/affiliates/registration.tsx` | 3h | ⬜ |
| Unique link generation | `lib/affiliates/link-generator.ts` | 2h | ⬜ |
| Tracking system | `lib/affiliates/tracking.ts` | 4h | ⬜ |
| Cookie attribution | `lib/affiliates/attribution.ts` | 3h | ⬜ |
| Commission calculator | `lib/affiliates/commission.ts` | 2h | ⬜ |
| Payout management | `components/affiliates/payouts.tsx` | 3h | ⬜ |
| Analytics dashboard | `components/affiliates/analytics.tsx` | 3h | ⬜ |
| Promotional materials | `app/(app)/affiliates/materials/page.tsx` | 2h | ⬜ |
| API for tracking | `app/api/affiliates/track/route.ts` | 2h | ⬜ |

### Day 17: White-Label Options

| Task | File/Component | Time | Status |
|------|---------------|------|--------|
| Multi-tenant setup | `lib/tenancy/manager.ts` | 4h | ⬜ |
| Custom domains | `lib/tenancy/domains.ts` | 3h | ⬜ |
| Theme customization | `lib/tenancy/themes.ts` | 3h | ⬜ |
| Logo upload system | `components/white-label/branding.tsx` | 2h | ⬜ |
| Content overrides | `lib/tenancy/content.ts` | 3h | ⬜ |
| Pricing tiers config | `lib/tenancy/pricing.ts` | 2h | ⬜ |
| Admin panel | `app/(admin)/white-label/page.tsx` | 3h | ⬜ |

### Day 18: Marketing & Attribution

| Task | File/Component | Time | Status |
|------|---------------|------|--------|
| UTM tracking | `lib/marketing/utm-tracker.ts` | 2h | ⬜ |
| Post Affiliate Pro | Integration setup | 3h | ⬜ |
| Facebook Pixel | `lib/marketing/facebook-pixel.ts` | 2h | ⬜ |
| Google Ads tracking | `lib/marketing/google-ads.ts` | 2h | ⬜ |
| TikTok Pixel | `lib/marketing/tiktok-pixel.ts` | 2h | ⬜ |
| Attribution reports | `components/admin/attribution.tsx` | 3h | ⬜ |
| ROI calculator | `lib/marketing/roi-calculator.ts` | 2h | ⬜ |
| Landing page builder | `app/(marketing)/lp/[slug]/page.tsx` | 4h | ⬜ |

## Week 4: Supabase Migration & Production

### Day 19-20: Database Migration to Supabase

| Task | File/Component | Time | Status |
|------|---------------|------|--------|
| Create Supabase project | Set up production project | 1h | ⬜ |
| Export SQLite schema | Generate SQL from Prisma | 2h | ⬜ |
| Update Prisma schema | PostgreSQL compatibility | 3h | ⬜ |
| Create migration script | `scripts/migrate-to-supabase.ts` | 4h | ⬜ |
| Test data migration | Run on staging data | 3h | ⬜ |
| Update connection strings | Environment variables | 1h | ⬜ |
| Test all queries | Verify PostgreSQL compatibility | 4h | ⬜ |
| Set up RLS policies | Row Level Security | 4h | ⬜ |
| Configure backups | Automated backup schedule | 2h | ⬜ |

### Day 21-22: Supabase Features Integration

| Task | File/Component | Time | Status |
|------|---------------|------|--------|
| Migrate to Supabase Auth | `lib/auth/supabase-auth.ts` | 6h | ⬜ |
| User migration script | `scripts/migrate-users.ts` | 4h | ⬜ |
| Update auth hooks | `lib/hooks/use-supabase-auth.ts` | 3h | ⬜ |
| Storage setup | Configure Supabase Storage | 2h | ⬜ |
| File upload migration | Update upload endpoints | 3h | ⬜ |
| Realtime subscriptions | `lib/supabase/realtime.ts` | 3h | ⬜ |
| Edge Functions setup | Configure if needed | 3h | ⬜ |

### Day 23: Production Environment Setup

| Task | File/Component | Time | Status |
|------|---------------|------|--------|
| Environment variables | Production .env setup | 2h | ⬜ |
| Vercel configuration | Production settings | 2h | ⬜ |
| Domain configuration | DNS and SSL setup | 2h | ⬜ |
| CDN configuration | Optimize caching rules | 2h | ⬜ |
| Monitoring setup | Sentry configuration | 2h | ⬜ |
| Analytics verification | Ensure tracking works | 2h | ⬜ |
| Backup verification | Test restore process | 3h | ⬜ |
| Security audit | OWASP checklist | 3h | ⬜ |

### Day 24-25: CI/CD & DevOps

| Task | File/Component | Time | Status |
|------|---------------|------|--------|
| GitHub Actions setup | `.github/workflows/ci.yml` | 3h | ⬜ |
| Automated testing | Configure test pipeline | 3h | ⬜ |
| Build optimization | Production build config | 2h | ⬜ |
| Deployment pipeline | Vercel integration | 2h | ⬜ |
| Preview deployments | PR preview setup | 2h | ⬜ |
| Rollback strategy | Document and test | 2h | ⬜ |
| Feature flags | LaunchDarkly or Vercel | 3h | ⬜ |
| Database migrations | Automated migration pipeline | 3h | ⬜ |
| Logging setup | Datadog/LogRocket | 3h | ⬜ |

### Day 26-28: Testing & Launch Preparation

| Task | File/Component | Time | Status |
|------|---------------|------|--------|
| Load testing | Test with k6 or Artillery | 4h | ⬜ |
| Security testing | OWASP ZAP scan | 3h | ⬜ |
| Penetration testing | Basic pen test | 4h | ⬜ |
| User acceptance testing | Test with beta users | 6h | ⬜ |
| Performance testing | Verify 90+ Lighthouse | 3h | ⬜ |
| Cross-browser testing | BrowserStack testing | 3h | ⬜ |
| Mobile app testing | iOS and Android | 3h | ⬜ |
| Documentation update | Update all docs | 4h | ⬜ |
| Launch checklist | Final preparation | 2h | ⬜ |
| Go-live | Production deployment | 2h | ⬜ |

## Supabase Configuration

### Database Schema Updates
```sql
-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE module_progress ENABLE ROW LEVEL SECURITY;

-- Example RLS policies
CREATE POLICY "Users can view own profile" 
  ON profiles FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own profile" 
  ON profiles FOR UPDATE 
  USING (auth.uid() = user_id);

-- Add indexes for performance
CREATE INDEX idx_module_progress_user_id ON module_progress(user_id);
CREATE INDEX idx_symptom_logs_user_date ON symptom_logs(user_id, date);
CREATE INDEX idx_tool_states_user_tool ON tool_states(user_id, tool_id);
```

### Supabase Auth Configuration
```typescript
// lib/auth/supabase-auth.ts
import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

// Auth methods
export const signUp = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${window.location.origin}/auth/callback`
    }
  })
  return { data, error }
}

export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  })
  return { data, error }
}
```

### Storage Configuration
```typescript
// lib/supabase/storage.ts
export const uploadFile = async (
  bucket: string,
  path: string,
  file: File
) => {
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(path, file, {
      cacheControl: '3600',
      upsert: false
    })
  
  return { data, error }
}

export const getPublicUrl = (bucket: string, path: string) => {
  const { data } = supabase.storage
    .from(bucket)
    .getPublicUrl(path)
  
  return data.publicUrl
}
```

## Performance Targets

### Core Web Vitals
- **LCP (Largest Contentful Paint)**: < 2.5s
- **FID (First Input Delay)**: < 100ms
- **CLS (Cumulative Layout Shift)**: < 0.1
- **TTFB (Time to First Byte)**: < 600ms

### Lighthouse Scores
- **Performance**: 90+
- **Accessibility**: 95+
- **Best Practices**: 95+
- **SEO**: 100

### Load Testing Targets
- **Concurrent Users**: 1000+
- **Response Time**: < 200ms (p95)
- **Error Rate**: < 0.1%
- **Throughput**: 100 req/sec

## Security Checklist

### Application Security
- [ ] Input validation on all forms
- [ ] SQL injection prevention (Prisma/Supabase)
- [ ] XSS protection (React default)
- [ ] CSRF tokens implemented
- [ ] Rate limiting on APIs
- [ ] Secure session management
- [ ] Password complexity requirements
- [ ] 2FA for admin accounts

### Infrastructure Security
- [ ] HTTPS everywhere
- [ ] Security headers configured
- [ ] CORS properly configured
- [ ] Environment variables secured
- [ ] Database encryption at rest
- [ ] Regular security updates
- [ ] DDoS protection (Vercel)
- [ ] WAF rules configured

### Compliance
- [ ] GDPR compliance (EU users)
- [ ] CCPA compliance (CA users)
- [ ] HIPAA-adjacent practices
- [ ] Data retention policies
- [ ] Privacy policy updated
- [ ] Terms of service updated
- [ ] Cookie consent banner
- [ ] Data export functionality

## Launch Checklist

### Pre-Launch
- [ ] **RE-ENABLE AUTHENTICATION** - Remove mock-session.ts, restore middleware.ts
- [ ] **Remove all dev bypasses** - Search for "TODO: RE-ENABLE" comments
- [ ] All features tested
- [ ] Performance optimized
- [ ] Security audit passed
- [ ] Documentation complete
- [ ] Support system ready
- [ ] Marketing materials prepared
- [ ] Affiliate program tested
- [ ] Email sequences configured

### Launch Day
- [ ] DNS propagated
- [ ] SSL certificates active
- [ ] Monitoring active
- [ ] Support team briefed
- [ ] Social media announcements
- [ ] Email blast sent
- [ ] Affiliates notified

### Post-Launch
- [ ] Monitor error rates
- [ ] Track performance metrics
- [ ] Gather user feedback
- [ ] Address urgent issues
- [ ] Plan next iterations
- [ ] Celebrate success! 🎉

## Deliverables Summary

### Required (Phase 3 Spec)
- ✅ Protocol Builder with drag/drop
- ✅ Binder Matcher tool
- ✅ Lab/VCS logging system
- ✅ Performance tuning completed
- ✅ Calendar integrations
- ✅ Affiliate program
- ✅ White-label options
- ✅ Supabase migration
- ✅ Production deployment

### Optional Completed
- ✅ Apple Health/Google Fit integration
- ✅ Advanced marketing attribution
- ✅ Landing page builder
- ✅ Multi-tenant architecture

## Next Steps (Post-Launch)
1. Monitor user behavior and feedback
2. Iterate based on analytics data
3. Plan mobile app development
4. Explore AI coach integration
5. Consider international expansion
6. Develop additional course content
7. Build partnership program
8. Implement advanced personalization