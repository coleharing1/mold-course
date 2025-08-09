# Mold Detox Mastery Online Course Platform

## Executive Summary

This project builds an everyday-person, step-by-step program with gated sequencing (Exposure → Drainage → Binders → Antifungals → Prevention) that provides value beyond a PDF through interactive tools, personalization, progress dashboards, and evidence labels with safety flags. The platform delivers a text-first, interactive mold detox course with no face-on video required—using short audio clips over slides, diagrams, interactive checklists, and planners to guide users through their recovery journey safely and effectively.

## Purpose and Objectives

### Core Problems Being Solved
- Individuals exposed to mold lack clear, structured guidance for recovery
- Conflicting and overwhelming information from various medical sources creates confusion
- Static PDF guides cannot provide interactive tracking, personalization, or community support
- Many sufferers cannot afford expensive consultations but need professional-grade protocols

### SMART Objectives
1. **Launch MVP in 8 weeks** with 10 core modules, 5 interactive tools, and progress tracking
2. **Achieve 85% module completion rate** through gated sequencing and engagement features
3. **Generate $10,000 monthly recurring revenue** within 6 months of launch
4. **Build community of 500+ active users** providing peer support within first year
5. **Maintain 4.5+ user satisfaction rating** through comprehensive support and clear guidance

## Target Audience and User Personas

| Persona | Description | Needs | Pain Points |
|---------|-------------|-------|-------------|
| Budget-Conscious Sufferer | 25-45, experiencing mold symptoms, limited financial resources | Affordable recovery plan, clear testing guidance, DIY remediation tips | Can't afford $5-10k consultations, overwhelmed by conflicting advice |
| Health-Conscious Professional | 30-55, chronic fatigue/brain fog, seeking structured approach | Evidence-based protocols, time-efficient solutions, progress tracking | Skeptical of unproven methods, needs to maintain work performance |
| Desperate Parent | 35-50, family affected by mold, seeking safe solutions | Child-safe protocols, home remediation guidance, clear action steps | Fear of making symptoms worse, worried about long-term effects on children |
| Sensitive Individual | 20-50, multiple chemical sensitivities, reactive to treatments | Gentle protocols, graduated approach, Herxheimer management | Crashes easily with aggressive detox, needs careful pacing |

## Scope

### In-Scope (Per Opus4 Spec)
- 10 comprehensive MDX-driven modules with gated sequencing
- 9+ Interactive tools (MVP): Exposure Checklist, Testing Decision Helper, Drainage Readiness Score, Binder Timing Planner, Herx Toolkit, Sauna Ramp-Up, Diet Builder, Retesting Scheduler, Re-exposure Triage
- Audio narration (3-7 min MP3 clips at 128kbps, -16 LUFS)
- Progress tracking with badges, streaks, and certificates
- Resource libraries & databases (mold-safe foods, supplements, practitioners, labs)
- Evidence badges (Solid/Emerging/Controversial) and safety flags
- Community forum with Q&A (optional tier)
- Email automations via Resend/Postal
- Three pricing tiers: Core ($149-199), Plus ($47-59/mo), VIP ($997+)

### Out-of-Scope
- Face-on camera video content
- Mobile native applications (initial release)
- Direct medical consultations
- Supplement fulfillment
- Real-time chat support (except VIP tier)
- Wearable device integration (Phase 1)

### Assumptions and Dependencies
- Users have basic internet access and email
- Content based on existing validated PDF guide and research
- Compliance with medical disclaimer requirements
- Access to Stripe for payment processing
- Supabase available for production database

## Goals and Success Metrics

### Business Goals
- Establish authority in mold detox education space
- Create sustainable recurring revenue stream
- Build engaged community for long-term growth
- Develop reusable platform for future health courses

### Key Performance Indicators (Per Opus4 KPIs)
- **Activation**: % users completing onboarding + first action within 24-48h; tool engagement rate
- **Progress**: Median modules completed by day 7, day 30; average session duration
- **Readiness**: % reaching Drainage Ready within 14 days; false start rate (starting binders too early)
- **Retention**: Week-4 return rate; tool DAU/WAU; email engagement; churn prediction score
- **Outcomes Proxy**: % who schedule VCS/retest; self-reported "symptom clarity"; NPS score
- **Revenue**: LTV:CAC ratio; upgrade rate to Plus; refund rate; affiliate conversion
- **Support**: Ticket volume by module; FAQ effectiveness; community self-help rate

## Risks and Mitigations

| Risk | Impact | Mitigation Strategy |
|------|--------|-------------------|
| Medical liability concerns | High | Comprehensive disclaimers, educational positioning, no medical advice |
| Content accuracy challenges | High | Regular review by medical advisors, evidence labeling system, citation tracking |
| User overwhelm with complex protocols | Medium | Gated progression, bite-sized modules, clear action steps, support community |
| Technical complexity for non-technical users | Medium | Extensive user testing, clear onboarding, video walkthroughs, responsive support |
| Competition from free content | Medium | Superior UX, interactive tools, community value, personalization features |
| Seasonal demand fluctuations | Low | Evergreen content strategy, year-round marketing, multiple traffic sources |

## Next Steps

1. Generate `user-flow.md` to map detailed user journeys through the platform
2. Create `tech-stack.md` defining technology choices with SQLite-first development approach
3. Develop `ui-rules.md` and `theme-rules.md` for consistent, accessible design
4. Build `project-rules.md` for code organization and AI-first development practices
5. Create phase documents (0-5) with detailed implementation checklists
6. Set up development environment with Next.js, TypeScript, and Tailwind CSS
7. Begin Phase 0 implementation focusing on project setup and configuration