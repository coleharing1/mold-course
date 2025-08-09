# Mold Detox Mastery Platform

An interactive online course platform designed to guide individuals through comprehensive mold detoxification with evidence-based protocols, safety-first design, and personalized tracking tools.

## 🎯 Project Overview

The Mold Detox Mastery platform provides a structured, gated approach to mold illness recovery through 10 comprehensive modules and 9 interactive tools. Built with a focus on safety and evidence-based practices, the platform adapts to individual needs while ensuring proper protocol sequencing.

### Key Features
- **Gated Module System**: Safe progression from Exposure → Drainage → Binders → Antifungals → Prevention
- **Evidence Badges**: All content marked as Solid, Emerging, or Controversial based on research
- **Interactive Tools**: 9 specialized calculators and planners for personalized protocols
- **Progress Tracking**: Symptom journals, readiness scores, and visual progress indicators
- **Safety First**: Medical disclaimers, prerequisite enforcement, and "consult your clinician" prompts
- **Three Pricing Tiers**: Core ($197), Plus ($497 with labs), VIP ($997 with coaching)

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm 9+
- Git
- SQLite (for development)
- A text editor (VSCode, Cursor, etc.)

### Installation

1. **Clone the repository**
   ```bash
   git clone [repository-url]
   cd Mold_detox_2
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.local.example .env.local
   # Edit .env.local with your development values
   ```

4. **Initialize the database**
   ```bash
   npx prisma migrate dev
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

6. **Open in browser**
   ```
   http://localhost:3000
   ```

## 📁 Project Structure

```
Mold_detox_2/
├── app/                    # Next.js App Router pages
│   ├── (marketing)/       # Public landing pages
│   ├── (app)/            # Protected app pages
│   └── (auth)/           # Authentication pages
├── components/            # React components
│   ├── ui/               # Base UI components
│   ├── modules/          # Module-specific components
│   └── tools/            # Interactive tool components
├── content/              # MDX content files
│   ├── modules/          # Module content
│   └── emails/           # Email templates
├── lib/                  # Business logic
│   ├── calculations/     # Tool calculators
│   ├── validations/      # Input validation
│   └── auth/             # Authentication utilities
├── prisma/               # Database schema and migrations
├── public/               # Static assets
│   ├── audio/           # Module narrations
│   ├── images/          # Images and diagrams
│   └── downloads/       # Downloadable resources
└── _docs/               # Project documentation
```

## 💻 Tech Stack

### Development (Phase 0-4)
- **Frontend**: Next.js 14+ (App Router), React 18, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui, Framer Motion
- **Content**: MDX with Contentlayer
- **Database**: SQLite with Prisma ORM
- **Authentication**: NextAuth.js
- **Development Tools**: ESLint, Prettier, Husky

### Production (Phase 5)
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Payments**: Stripe
- **Analytics**: PostHog
- **Email**: Resend/Postal
- **Media**: Bunny CDN / Mux
- **Deployment**: Vercel

## 🔧 Development Phases

### Phase 0: Setup & Configuration ✅
- Project initialization
- Environment configuration
- Database setup with Prisma

### Phase 1: Frontend Foundation (Current)
- Base layout components
- Design system implementation
- Module structure

### Phase 2: Frontend Features
- Interactive tools
- Module content
- User flows

### Phase 3: Backend Integration
- API routes
- Database operations
- Authentication

### Phase 4: Testing & Polish
- Unit tests
- E2E testing
- Performance optimization

### Phase 5: Production
- Supabase migration
- Payment integration
- Deployment

## 📝 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run format       # Format with Prettier
npm run test         # Run tests
npm run db:push      # Push database schema
npm run db:migrate   # Run migrations
npm run db:studio    # Open Prisma Studio
```

## 🧪 Testing

```bash
# Unit tests
npm run test:unit

# Integration tests
npm run test:integration

# E2E tests
npm run test:e2e

# All tests
npm test
```

## 🚀 Deployment

### Development
The application uses SQLite for local development, requiring no external database setup.

### Production
See `_docs/phase-5-production-supabase.md` for production deployment instructions including:
- Supabase database migration
- Environment variable configuration
- Vercel deployment
- Domain setup
- Monitoring configuration

## 📚 Documentation

Comprehensive documentation is available in the `_docs/` directory:
- `project-overview.md` - Complete project specification
- `tech-stack.md` - Technology decisions and rationale
- `user-flow.md` - User journey maps
- `ui-rules.md` - Design principles
- `theme-rules.md` - Design system specification
- `project-rules.md` - Code conventions
- `phases/` - Detailed development checklists

## 🔐 Security & Compliance

- Medical disclaimers on all health-related content
- Evidence-based content with transparency ratings
- HIPAA-adjacent data handling practices
- Secure authentication and payment processing
- Regular security audits and updates

## 🤝 Contributing

This is currently a private project. For team members:
1. Create a feature branch from `main`
2. Follow conventions in `_docs/project-rules.md`
3. Update tests for new features
4. Submit PR with clear description
5. Ensure all CI checks pass

## 📄 License

Proprietary - All rights reserved. This is not open source software.

## 🆘 Support

For issues or questions:
- Check `_docs/` for documentation
- Review `project_brainstorm/` for project context
- Contact project lead for assistance

---

Built with safety-first design principles for mold illness recovery 🌿