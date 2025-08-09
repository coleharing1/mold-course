# Technology Stack - Mold Detox Mastery Platform

## Development Stack (Phase 1-2: MVP)
Based on Opus4-Project-overview.md specifications for rapid MVP development.

### Core Technologies
- **Language**: TypeScript 5.4+ (strict mode for type safety)
- **Runtime**: Node.js 20+ LTS
- **Package Manager**: npm (already configured in package.json)

### Frontend Framework (Per Opus4 Spec)
- **Framework**: Next.js 14+ with App Router
- **UI Library**: React 18.3
- **Styling**: Tailwind CSS + shadcn/ui components
- **Animations**: Framer Motion for micro-interactions
- **State Management**: Zustand for global state
- **Form Handling**: React Hook Form + Zod validation
- **Data Fetching**: TanStack React Query 5.0

### Content Management (Per Opus4 Spec)
- **Content Format**: MDX for lessons
- **Content Layer**: Contentlayer for typed content models
- **Audio**: MP3 files (128kbps, -16 LUFS) for narration
- **Images**: Cloudinary for optimization and transformation
- **Media Delivery**: 
  - Bunny.net or Mux for slide videos
  - Direct MP3 serving for audio clips

### Development Database (SQLite-First Approach)
- **Database**: SQLite 3 (for Phase 1-4 development)
- **ORM**: Prisma (with migration path to Supabase)
- **Migrations**: Prisma Migrate
- **Studio**: Prisma Studio for GUI management
- **Seeding**: Custom seed scripts for test data

### Development Authentication
- **Solution**: NextAuth.js with credentials provider
- **Sessions**: Database sessions for development
- **Password Hashing**: bcrypt
- **Testing Users**: Seeded test accounts

### Interactive Tools Stack
- **Progress Tracking**: Local storage + SQLite
- **Calculations**: Pure TypeScript functions
- **Charts**: Recharts with custom themes
- **Export**: jsPDF for PDF generation
- **Scheduling**: Native Date + date-fns
- **Notifications**: Browser Notification API

### Development Tools
- **TypeScript**: Strict mode with comprehensive types
- **Linting**: ESLint 8.57 with Next.js config
- **Formatting**: Prettier 3.3 with Tailwind plugin
- **Git Hooks**: Husky 9.0 + lint-staged
- **Testing**: 
  - Vitest 1.6 for unit tests
  - React Testing Library 15.0
  - Playwright 1.44 for E2E
  - MSW 2.3 for API mocking

## Production Stack (Phase 3: Scale)

### Production Database
- **Database**: PostgreSQL 15 via Supabase
- **Real-time**: Supabase Realtime for live updates
- **File Storage**: Supabase Storage for user uploads
- **Vector Search**: pgvector for content search

### Production Authentication
- **Solution**: Supabase Auth
- **Methods**: 
  - Email/password with verification
  - Magic links for passwordless
  - OAuth: Google, Apple (future)
- **RLS**: Row Level Security for data protection
- **MFA**: Optional TOTP for premium users

### Payment Processing (Per Opus4 Spec)
- **Provider**: Stripe
- **Products**: 
  - Core: $149-199 one-time (full curriculum + tools + 1 year updates)
  - Plus: $47-59.99/month (community, advanced tools, live Q&A)
  - Pro: $297-497 (personalized protocol builder, group coaching)
  - VIP: $997+ (1:1 consults, custom protocol review)
- **Webhooks**: Stripe webhooks for subscription events
- **Affiliate Links**: Payment links for affiliate tracking
- **Customer Portal**: Stripe-hosted billing management

### Analytics & Email (Per Opus4 Spec)
- **Analytics**: PostHog for funnel tracking, heatmaps, session recordings
- **Email**: Resend or Postal for transactional emails
- **Event Tracking**: Segment for unified event pipeline
- **Marketing Automation**: Email sequences for engagement
- **SMS**: Premium tier notifications (optional)

### Deployment & Infrastructure (Per Opus4 Spec)
- **Platform**: Vercel with ISR (Incremental Static Regeneration)
- **CDN**: Vercel Edge Network
- **Performance**: Vercel Analytics for Web Vitals
- **Monitoring**: 
  - Sentry for error tracking
  - Vercel Analytics for performance metrics
  - Structured logs to Datadog/LogRocket
- **Testing Infrastructure**:
  - Playwright for E2E tests
  - Jest/Vitest for unit tests
  - Visual regression testing

### Content Delivery
- **Video/Audio**: Cloudflare Stream or Bunny.net
- **Images**: Cloudinary with transformations
- **Documents**: Vercel Edge caching

## Migration Strategy

### SQLite to PostgreSQL Migration (Phase 4 → 5)

#### 1. Schema Migration
```bash
# Export SQLite schema
npx prisma migrate dev --name init
# Modify schema.prisma for PostgreSQL
# Update connection string
# Apply to Supabase
npx prisma migrate deploy
```

#### 2. Data Migration
```typescript
// scripts/migrate-to-supabase.ts
- Export all SQLite data to JSON
- Transform data for PostgreSQL
- Batch insert to Supabase
- Verify data integrity
```

#### 3. Auth Migration
- Export user accounts from NextAuth
- Create Supabase auth users
- Map sessions and maintain user IDs
- Update authentication hooks

#### 4. Environment Variables
```env
# Development (Phase 0-4)
DATABASE_URL="file:./prisma/dev.db"
NEXTAUTH_SECRET="dev-secret-change-in-prod"
NEXTAUTH_URL="http://localhost:3000"

# Production (Phase 5)
DATABASE_URL="postgresql://..."
NEXT_PUBLIC_SUPABASE_URL="https://xxx.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="xxx"
SUPABASE_SERVICE_ROLE_KEY="xxx"
STRIPE_SECRET_KEY="sk_live_xxx"
STRIPE_WEBHOOK_SECRET="whsec_xxx"
```

## Technology Decisions & Rationale

### Frontend Choices
- **Next.js App Router**: Latest patterns, better performance, streaming SSR
- **Tailwind CSS**: Rapid prototyping, consistent design system
- **shadcn/ui**: Accessible components, fully customizable
- **Zustand**: Simple state management without boilerplate
- **React Query**: Powerful caching, optimistic updates

### Database Strategy
- **SQLite First**: Zero friction development, no Docker needed
- **Prisma ORM**: Type-safe queries, excellent DX
- **Supabase Later**: Managed PostgreSQL with extras when ready

### Content Architecture
- **MDX**: Rich content with React components
- **Static Generation**: Fast page loads for course content
- **Dynamic Features**: API routes for user data

### Performance Optimizations
- **Code Splitting**: Automatic with Next.js
- **Image Optimization**: Next/Image with lazy loading
- **Font Optimization**: Next/Font with variable fonts
- **Bundle Analysis**: Regular monitoring of bundle size
- **Caching Strategy**: 
  - Static content: CDN cache
  - User data: React Query cache
  - API responses: Stale-while-revalidate

## Security Considerations

### Development Security
- Environment variables in .env.local
- Git-ignored sensitive files
- Mock data for testing
- Local HTTPS with mkcert

### Production Security
- HTTPS everywhere via Vercel
- Content Security Policy headers
- CORS configuration for API
- Rate limiting on API routes
- Input sanitization with Zod
- SQL injection prevention via Prisma
- XSS protection built into React
- Secure session management
- Regular dependency updates

## Scalability Path

### Phase 1: MVP (0-100 users)
- SQLite local development
- Vercel hobby deployment
- Basic monitoring

### Phase 2: Growth (100-1,000 users)
- Migrate to Supabase
- Vercel Pro plan
- CDN for media
- Email automation

### Phase 3: Scale (1,000-10,000 users)
- Database optimization
- Redis caching layer
- Video CDN (Cloudflare)
- Advanced analytics

### Phase 4: Enterprise (10,000+ users)
- Multi-region deployment
- Database read replicas
- Advanced monitoring
- Custom infrastructure

## Delivery Phases (Per Opus4 Spec)

### Phase 1: MVP (~4 weeks)
- **Scope**: 
  - Auth, payments, dashboard
  - 3 modules: Quick Start, Exposure, Testing
  - Tools: Exposure Checklist, Drainage Readiness, Binder Planner
  - Resources vault (initial)
  - Email basics, analytics setup
  - Mobile responsive design
- **Stack**: Next.js, SQLite, NextAuth, Stripe

### Phase 2: Enhancement (~4 weeks)
- **Scope**:
  - Full module set (10 modules)
  - Advanced tools: Herx Toolkit, Diet Builder, Retesting Scheduler
  - Community features (optional)
  - Advanced analytics
  - Email automations
  - A/B testing framework
  - Conversion optimization
- **Stack**: Add PostHog, Resend, enhanced tooling

### Phase 3: Scale (~4 weeks)
- **Scope**:
  - Protocol Builder, Binder Matcher
  - Lab/VCS logging
  - Performance tuning
  - Calendar integrations
  - Apple Health/Google Fit (optional)
  - Affiliate program
  - White-label options
- **Stack**: Migrate to Supabase, add integrations

## Development Workflow

### Local Development
```bash
npm run dev          # Start Next.js dev server
npm run db:studio    # Open Prisma Studio
npm run test:watch   # Run tests in watch mode
```

### Database Commands
```bash
npm run db:generate  # Generate Prisma Client
npm run db:migrate   # Run migrations
npm run db:seed      # Seed database
npm run db:reset     # Reset database
```

### Build & Deploy
```bash
npm run build        # Production build
npm run start        # Start production server
npm run deploy       # Deploy to Vercel
```

## Cost Analysis

### Development Phase (Monthly)
- **Total**: $0
- All tools are free for development

### Production Phase (Monthly)
- **Vercel Pro**: $20
- **Supabase Pro**: $25
- **Stripe**: 2.9% + $0.30 per transaction
- **Email Service**: $29 (ConvertKit starter)
- **CDN**: $20 (Bunny.net)
- **Total**: ~$94 + transaction fees

### At Scale (1,000+ users)
- **Infrastructure**: ~$200-500/month
- **Projected Revenue**: $10,000+/month
- **Profit Margin**: 90-95%

## Future Considerations

### Potential Additions
- Mobile app with React Native
- AI chatbot for Q&A (OpenAI/Anthropic)
- Video conferencing for group sessions
- Wearable device integration
- Blockchain certificates
- Multi-language support

### Technical Debt Prevention
- Regular dependency updates
- Code review standards
- Documentation maintenance
- Performance monitoring
- Security audits
- Accessibility testing