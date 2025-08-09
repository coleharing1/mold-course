 ### Mold Detox Course — Consolidated Product and Technical Spec
  @fileoverview: Unified product, UX, tooling, tech stack, pricing,
   and delivery plan for a text-first, interactive mold detox
  course with personalization, progress tracking, and
  safety/compliance baked in.

  ### Product vision
  - Build an everyday-person, step-by-step program with gated
  sequencing: Exposure → Drainage → Binders → Antifungals →
  Prevention.
  - Value beyond PDF: interactive tools, personalization, progress
  dashboards, and evidence labels with safety flags.
  - No face-on video required: short audio over slides, diagrams,
  interactive checklists, and planners.

  ### Tech stack
  - Frontend: Next.js 14+ (App Router), Tailwind CSS, shadcn/ui,
  Framer Motion.
  - Content: MDX for lessons; Contentlayer for typed content
  models.
  - Backend: Supabase (auth, Postgres, storage, RLS policies).
  Optional Drizzle/Prisma if preferred.
  - Forms/validation: React Hook Form + Zod.
  - Payments: Stripe (one-time + subscriptions + payment links for
  affiliates).
  - Media: Bunny/Mux for slide videos; MP3 for audio; Cloudinary
  for images.
  - Analytics/email: PostHog + Resend/Postal + Segment for event
  tracking.
  - Hosting: Vercel (with ISR for content updates).
  - Testing: Playwright for E2E; Jest/Vitest for units.
  - Monitoring: Sentry for errors; Vercel Analytics for
  performance.

  ### Information architecture / sitemap
  - Public
    - `/(marketing)/page.tsx` – Sales page
    - `/(marketing)/pricing/page.tsx` – Pricing comparison
    - `/(marketing)/preview/page.tsx` – Free module preview
  - App
    - `/(app)/dashboard/page.tsx` – Progress hub
    - `/(app)/plan/page.tsx` – "Your Plan" (timeline)
    - `/(app)/modules/[slug]/page.tsx` – Lesson shell
    - `/(app)/tools/*` – Each interactive tool
    - `/library` – Resources vault (guides, databases, downloads)
    - `/community` – Forum/Q&A (optional)
    - `/account` – Profile, subscription, certificates
  - Content
    - `/content/modules/00-quick-start.mdx`
    - `/content/modules/01-exposure.mdx`
    - `/content/modules/02-testing.mdx`
    - `/content/modules/03-drainage.mdx`
    - `/content/modules/04-binders.mdx`
    - `/content/modules/05-antifungals.mdx`
    - `/content/modules/06-herx.mdx`
    - `/content/modules/07-modalities.mdx`
    - `/content/modules/08-diet.mdx`
    - `/content/modules/09-prevention.mdx`
    - `/content/snippets/faq/*.mdx`
    - `/content/emails/*.mdx`

  ### Data models (enhanced)
  - User: id; onboardingProfile {livingSituation, exposureHistory,
  symptoms, priorTests, budget, equipment, dietConstraints};
  lastActive; timezone; preferredPace
  - Progress: userId; moduleId; status; lastActionAt; timeSpent;
  attemptCount
  - SymptomLog: userId; date; fatigue; brainFog; sleep; pain;
  sinus; mood; energy; notes; triggers
  - Readiness: userId; drainageScore (rolling 7-day);
  binderUnlocked (boolean); lastCalculated; scoreHistory[]
  - ToolState: userId; toolId; json (planner times, shopping lists,
   quiz scores); version; lastSync
  - Purchase/Subscription: userId; sku; status; startedAt;
  renewedAt; stripeCustomerId; cancelReason
  - Analytics: userId; event; properties; timestamp; sessionId;
  deviceType

  ### Core pages
  - Landing/sales: Promise + transformation; evidence labels;
  medical disclaimer gate; curriculum snapshot; tools preview;
  FAQs; refund policy; pricing table; trust signals; social proof.
  - Onboarding wizard (5–7 min): Collect profile → output
  personalized Starter Plan (pace + modules + tool shortcuts);
  severity assessment.
  - Dashboard: Progress, next action, readiness status, retesting
  countdown, streaks, badges; daily tip; community highlight.
  - Modules (MDX-driven): Consistent layout; actions and tool
  links; "Mark complete" gates; time estimates; prerequisite
  checks.
  - Tools library: All interactive utilities in one place; usage
  stats; favorites.
  - Resources vault: Databases, templates, downloads (searchable
  and categorized); version tracking.
  - Community (optional): Light forum/Q&A; success stories;
  regional threads; expert AMAs.
  - Account: Profile, subscription management, certificates; data
  export; 2FA setup.

  ### Curriculum (modules and gating)
  1) Quick Start (5 steps)
  2) Identify Exposure (home/work/car; low-cost actions)
  3) Testing & Diagnosis (environmental vs medical; pros/cons;
  costs)
  4) Open Drainage Pathways (bowel, liver/gallbladder, kidneys,
  lymph, sweat)
  5) Detox I: Binders (timing, interactions, side effects)
  6) Detox II: Antifungals (when/if, monitoring, safety flags)
  7) Managing Herx (slowdown protocol; red flags)
  8) Supportive Modalities (sauna, strength, nasal care, sleep)
  9) Diet & Pantry (low-mold/low-amylose; grocery list builder)
  10) Retesting & Prevention (VCS cadence; relapse plan)
  - Gating: Must reach Drainage Readiness threshold before binders;
   binder tolerance before antifungals; 80% completion before
  certificate.

  ### Lesson template
  - TL;DR summary (50 words max)
  - 3–7 min audio clip over slides (128kbps MP3; -16 LUFS)
  - One diagram/visual (WebP with fallback; <100KB)
  - "Do this now" action box (single clear action)
  - Tool links (contextual with preview)
  - Notes/journal area (auto-save every 30s)
  - Evidence badge: Solid / Emerging / Controversial
  - Safety flags and "talk to your clinician" prompts
  - Reading time estimate; completion percentage

  ### Interactive tools (MVP → Enhanced)
  - Exposure & Dampness Checklist (room-by-room score; photo
  upload; "fix-first" list; inspector brief PDF; cost estimates)
  - Testing Decision Helper (env vs medical flows; costs; insurance
   checker; caveats; print clinician sheet; lab finder map)
  - Drainage Readiness Score (daily inputs; trend graphs; AI
  suggestions → gate binders when green 7 days)
  - Binder Timing Planner (meals/meds spacing, vitamin timing; push
   notifications; calendar export; conflict alerts)
  - Herx Toolkit (intensity slider → adjustments, emergency
  protocol, symptom logger, safety flags)
  - Sauna Ramp-Up (heat/time progression; heart rate zones;
  hydration reminders; contraindications; post-sauna rinse)
  - Diet Builder (7-day low-mold plan; recipe swaps; grocery list
  printable; restaurant guide; high-mold warnings)
  - Retesting Scheduler (VCS ~q3mo; urine 3–6mo; cost tracker;
  reminders; comparison view; progress photos)
  - Re-exposure Triage ("I got exposed" quick flow; severity
  assessment; immediate steps; emergency contacts; home checks)
  - Enhanced (later): Mycotoxin Binder Matcher, Protocol Builder
  (drag/drop + conflict checker), Symptom Tracker (charts), VCS
  logger, Lab result comparer.

  ### Resource libraries & databases
  - Mold-safe foods database with filters (searchable; sortable by
  category)
  - Supplement/binder brand compendium (neutral; disclaimers; user
  reviews)
  - Practitioner directory (location, specialty, insurance,
  telehealth)
  - Lab options comparison (ERMI/HERTSMI/VCS/urine; pricing;
  turnaround)
  - Templates: landlord letters, doctor visit prep, inspection
  checklists, insurance appeals
  - Downloads: cheat sheets, shopping lists, printable trackers,
  quick reference cards

  ### Community & live elements (optional tiers)
  - Moderated forum; weekly Q&A (audio/screen-share); guest
  interviews
  - Progress journals; regional channels; troubleshooting threads
  - Peer mentorship program; success story highlights
  - Monthly challenges with prizes; accountability partners

  ### Gamification, UX, and accessibility
  - Auto-save position, bookmarks, notes, global search
  - Badges: Drainage Unlocked, First Retest, Herx Managed, 7-Day
  Streak, Community Helper
  - Streak counters; completion certificates; shareable
  achievements
  - Dark/light mode; font scaling; screen-reader friendly;
  mobile-first
  - Keyboard navigation; focus indicators; ARIA labels
  - Offline mode for core content; sync on reconnect

  ### Analytics, email, notifications
  - Funnel + tool usage (PostHog); heatmaps; session recordings
  - Email automations (Resend):
    - Welcome series (5 emails); module reminders; progress weekly;
   retest nudges; community highlights; new content drops
    - Abandoned session recovery; milestone celebrations;
  re-engagement campaigns
  - Push notifications (optional): daily check-ins; tool reminders;
   community activity
  - SMS alerts (premium): appointment reminders; urgent updates

  ### Safety, compliance, and evidence
  - Medical disclaimer gate required before sensitive lessons/tools
  - Evidence badges per section (Solid/Emerging/Controversial)
  - Balanced testing stance; EPA/CDC moisture-first guidance; avoid
   bleach-as-default
  - Antifungal monitoring notes; vitamin spacing with CSM;
  clinician prompts
  - Emergency protocols clearly marked; when to seek immediate care
  - Regular content review by medical advisory board (quarterly)

  ### Content standards
  - Reading level: 8th grade (Flesch-Kincaid)
  - Audio specs: 128kbps MP3; -16 LUFS; noise gate at -40dB
  - Image requirements: WebP with fallback; 2x resolution; <100KB
  - Evidence citations: DOI links preferred; archive.org backups;
  last-verified dates
  - Update cadence: quarterly content review; breaking news alerts;
   version tracking

  ### Security & privacy
  - HIPAA-adjacent compliance (best practices)
  - PII encryption at rest; TLS 1.3 in transit
  - GDPR/CCPA compliance: data export; right to deletion
  - Session management: 30-day refresh; 2FA optional
  - API security: rate limiting; CORS; input sanitization
  - Regular security audits; penetration testing

  ### Packaging and pricing (unified options)
  - Recommended
    - Core: $149–$199 one-time (full curriculum + tools + updates
  for 1 year)
    - Plus: $47–$59.99/month (community, advanced tools, live audio
   Q&A)
  - Alternative ladders (if needed)
    - Basic: $97–$197 (course + basics)
    - Pro: $297–$497 (personalized protocol builder, group
  coaching, advanced analytics)
    - VIP: $997+ (1:1 consults, custom protocol review, lab
  interpretation, white-glove onboarding)
  - Launch/beta option: $29–$49 early access for feedback (limited
  seats)
  - Refund policy: 30-day money back; no questions asked

  ### Conversion optimization
  - Exit intent popups with discount code
  - Abandoned cart recovery (3-email sequence)
  - Social proof widgets (recent purchases, active users)
  - Urgency triggers (limited seats, price increase timer)
  - Trust signals (SSL badge, testimonials, money-back guarantee)
  - A/B tests: pricing, headlines, button colors, video vs text

  ### Support infrastructure
  - In-app help widget (Intercom or Crisp)
  - Video walkthroughs for complex tools
  - Troubleshooting decision tree
  - Office hours calendar (community tier)
  - Knowledge base with search (Algolia)
  - Status page for downtime communication
  - Average response time: <24h (email); <1h (chat for VIP)

  ### Delivery plan
  - Phase 1 (MVP, ~4 weeks)
    - Auth, payments, dashboard, 3 modules (Quick Start, Exposure,
  Testing)
    - Tools: Exposure Checklist, Drainage Readiness, Binder Planner
    - Resources vault (initial), email basics, analytics
    - Basic error handling; mobile responsive
  - Phase 2 (Enhancement, ~4 weeks)
    - Full module set; Herx Toolkit; Diet Builder; Retesting
  Scheduler
    - Community (optional), advanced analytics, email automations
    - A/B testing framework; conversion optimization
  - Phase 3 (Scale, ~4 weeks)
    - Protocol Builder; Binder Matcher; lab/VCS logging; A/B
  testing; performance tuning
    - Integrations: Calendar; optional Apple Health/Google Fit
    - Affiliate program; white-label options

  ### KPIs (comprehensive)
  - Activation: % users completing onboarding + first action within
   24–48h; tool engagement rate
  - Progress: median modules completed by day 7, day 30; average
  session duration
  - Readiness: % reaching Drainage Ready within 14 days; false
  start rate (starting binders too early)
  - Retention: week-4 return rate; tool DAU/WAU; email engagement;
  churn prediction score
  - Outcomes proxy: % who schedule VCS/retest; self-reported
  "symptom clarity"; NPS score
  - Revenue: LTV:CAC ratio; upgrade rate to Plus; refund rate;
  affiliate conversion
  - Support: ticket volume by module; FAQ effectiveness; community
  self-help rate

  ### Marketing & attribution
  - UTM parameter tracking throughout funnel
  - Affiliate tracking with Post Affiliate Pro or Rewardful
  - Pixel tracking: Facebook, Google Ads, TikTok
  - Content marketing: blog subdomain with Ghost/WordPress
  - SEO: programmatic pages for "mold detox [city]"
  - Podcast tour tracking with dedicated landing pages

  ### Development environment
  - Environment variables: .env.local, .env.staging,
  .env.production
  - CI/CD: GitHub Actions → Vercel preview → production
  - Code quality: ESLint, Prettier, Husky pre-commit
  - Database migrations: Supabase migrations folder
  - Feature flags: LaunchDarkly or Vercel Edge Config
  - Logging: structured logs to Datadog/LogRocket

  ### Error handling & edge cases
  - Failed payments: grace period (3 days); content lock sequence;
  recovery emails
  - Offline mode: cache core modules; sync on reconnect; conflict
  resolution
  - Data loss prevention: auto-save every 30s; draft recovery;
  version history
  - Rate limiting: API throttling; queue system for heavy tools
  - Accessibility failures: fallback content; screen reader alerts;
   keyboard navigation

  ### Optional "wow" ideas (later)
  - AR Mold Detection Guide (home inspection overlay)
  - Voice-activated symptom logging with transcription
  - Certificates and shareable milestones
  - Offline access for core content
  - AI coach for personalized recommendations
  - Wearable integration for symptom tracking

  ### Build notes (implementation-ready)
  - Content layering: MDX + Contentlayer for strongly-typed lesson
  metadata (evidenceLevel, hasSafetyFlag, toolRefs)
  - Gating: server-side checks on `Readiness` before unlocking
  modules/tools
  - State: keep tool-specific state in `ToolState` JSON; derive
  "binderUnlocked" from rolling 7-day readiness
  - Performance: code-split tools, stream MDX, image optimization,
  defer analytics
  - Testing: unit tests for business logic; E2E for critical paths;
   visual regression for UI
  - Deployment: blue-green deployments; automatic rollback on error
   spike

  - Merged the four docs into one unified spec covering product
  vision, stack, IA, modules, tools, gating, pricing, compliance,
  analytics, and phased delivery.