# Mold Detox Mastery - Restructure Implementation Checklist

## Phase 1: Content Restructure (Week 1)
*Align modules with Kajsa's proven timeline and protocol*

### Module Content Updates

#### ✅ Module 00: Quick Start (Enhance Existing)
- [x] Add Kajsa's exact 5-step quick start from Page 3
- [x] Include "Check all frequent environments" emphasis
- [x] Add immediate action items with checkboxes
- [x] Create "Do This Now" action boxes
- [x] Add links to testing resources (Mosaic, RealTime Labs)
- [x] Include safety warning about continuing exposure

#### ✅ Module 01: Rename & Rewrite "Identify Your Exposure"
- [x] Rename from "Understanding Mold" to "Identify Your Exposure"
- [x] Update `content/modules/01-understanding-mold.mdx` filename to `01-identify-exposure.mdx`
- [x] Focus on WHERE exposed (home/work/car) like Page 9
- [x] Add comprehensive source checklist from Page 8
- [x] Include moldy foods list from Page 8
- [x] Add "How to Suspect Exposure" criteria
- [x] Create room-by-room inspection guide
- [x] Link to Exposure Checklist tool

#### ✅ Module 02: Testing & Diagnosis (Enhance)
- [x] Add specific test types table from Pages 10-12
- [x] Include cost ranges ($200-400 urine, $10-15 VCS)
- [x] Add "Where to Get Testing Done" section
- [x] Include direct ordering links (Mosaic, RealTime)
- [x] Add DIY test kit recommendations
- [x] Create comparison: Environmental vs Medical testing
- [x] Add interpretation guide for results

#### ✅ Module 03: Open Drainage Pathways (New - Critical)
- [x] Create new file: `content/modules/03-drainage-pathways.mdx`
- [x] Add 5 pathways from Pages 15-16:
  - [x] Bowel movements (1-3 daily requirement)
  - [x] Liver/Gallbladder support
  - [x] Lymphatic system activation
  - [x] Kidney/hydration support
  - [x] Sweating/skin detox
- [x] Include 2-4 week preparation timeline
- [x] Add specific supplements for each pathway
- [x] Create daily checklist format
- [x] Add warning: "Do NOT start binders until drainage open"

#### ✅ Module 04: Mycotoxin Analysis & Binder Selection (New)
- [x] Create new file: `content/modules/04-mycotoxin-binders.mdx`
- [x] Add mycotoxin types explanation from Page 13
- [x] Include comprehensive binder chart from Page 14
- [x] Create matching guide: toxin → binder
- [x] Add binder timing instructions
- [x] Include "How Binders Work" section
- [x] Add supplement interaction warnings

#### ✅ Module 05: Binder Protocols - CSM Focus (New)
- [x] Create new file: `content/modules/05-binder-protocols.mdx`
- [x] Add CSM protocol from Pages 17-18:
  - [x] Dosing: 4g packets, 4x daily
  - [x] Duration: 30 days initial, 2 weeks maintenance
  - [x] Timing: 30 min before meals
  - [x] Interactions: 2hr from supplements
- [x] Include Welchol alternative protocol
- [x] Add tolerance improvement strategies
- [x] Include compounded options
- [x] Add vitamin depletion warnings (A,D,E,K)

#### ✅ Module 06: Antifungal Protocols (New)
- [x] Create new file: `content/modules/06-antifungal-protocols.mdx`
- [x] Add Itraconazole protocol from Pages 19-20:
  - [x] Dosing: 100mg 2x daily
  - [x] Duration: 4 weeks + break + 2 weeks
  - [x] Liver monitoring requirements
- [x] Include natural alternatives (Neem, Biopure O3)
- [x] Add safety monitoring requirements
- [x] Create decision tree: when to add antifungals

#### ✅ Module 07: Managing Herx Reactions (New)
- [x] Create new file: `content/modules/07-herx-management.mdx`
- [x] Add symptoms list from Page 21
- [x] Include severity scale (1-10)
- [x] Add protocol adjustment guidelines
- [x] Create "red flag" warning signs
- [x] Include emergency protocols

#### ✅ Module 08: Supporting Modalities (New)
- [x] Create new file: `content/modules/08-supporting-modalities.mdx`
- [x] Add sauna protocol from Page 22:
  - [x] Start: 5-10 min at 110-130°F
  - [x] Goal: 30-45 min, 3-5x/week
  - [x] Hydration requirements
- [x] Include strength training benefits
- [x] Add melatonin for brain detox
- [x] Include nasal spray protocol (Xlear)

#### ✅ Module 09: Diet & Nutrition (Update)
- [x] Create new file: `content/modules/09-diet-nutrition.mdx`
- [x] Add comprehensive moldy foods list
- [x] Include low-mold diet guidelines
- [x] Add Kajsa's supplement stack
- [x] Create shopping lists
- [x] Add meal planning templates

#### ✅ Module 10: Retesting & Long-term Prevention (New)
- [x] Create new file: `content/modules/10-retesting-prevention.mdx`
- [x] Add retesting timeline from Page 24:
  - [x] VCS: 3 months
  - [x] Urine mycotoxin: 6-7 months
- [x] Include success metrics
- [x] Add prevention strategies
- [x] Create relapse prevention plan

### Special Content Sections

#### 🆕 "Kajsa's Exact Protocol" Section
- [ ] Create `content/special/kajsas-protocol.mdx`
- [ ] Add week-by-week breakdown from Pages 25-26
- [ ] Include exact supplement brands and links
- [ ] Add her personal timeline and results
- [ ] Include cost breakdown

#### 🆕 Medical Advocacy Center
- [ ] Create `content/resources/medical-advocacy.mdx`
- [ ] Add doctor discussion scripts
- [ ] Include Shoemaker Protocol links
- [ ] Add telehealth recommendations (Push Health)
- [ ] Create insurance templates
- [ ] Add off-label use documentation

## Phase 2: Database & Model Updates (Week 1-2)

### Prisma Schema Updates
- [ ] Add `phase` field to Module model (1-5)
- [ ] Add `prescriptionPath` and `naturalPath` fields
- [ ] Create `MycotoxinResult` model for test tracking
- [ ] Create `BinderProtocol` model for tracking
- [ ] Add `DrainageTracking` model with 5 pathways
- [ ] Create `HerxLog` model for reaction tracking
- [ ] Add `ProtocolPhase` to User model

### New Database Models Needed
```prisma
model MycotoxinResult {
  id          String   @id
  userId      String
  testDate    DateTime
  testType    String   // urine, vcs
  results     String   // JSON of specific toxins
  labName     String
}

model DrainageTracking {
  id               String   @id
  userId           String
  date             DateTime
  bowelMovements   Int
  liverSupport     Boolean
  lymphMovement    Boolean
  hydrationOz      Float
  sweating         Boolean
  score            Float    // calculated
}

model BinderProtocol {
  id          String   @id
  userId      String
  binderType  String   // CSM, Welchol, Charcoal
  startDate   DateTime
  dosage      String
  frequency   String
  tolerance   String   // good, moderate, poor
}
```

## Phase 3: Interactive Tools Development (Week 2-3)

### Priority 1: Core Protocol Tools

#### 🆕 Mycotoxin-Binder Matcher Tool
- [ ] Create `app/(app)/tools/mycotoxin-matcher/page.tsx`
- [ ] Build input form for test results
- [ ] Implement matching logic from Page 14 chart
- [ ] Create visual output with recommendations
- [ ] Add dosing calculator
- [ ] Include timing scheduler
- [ ] Add to tools navigation

#### 🔄 Enhanced Drainage Readiness Tracker
- [ ] Create `app/(app)/tools/drainage-tracker/page.tsx`
- [ ] Build daily input form with 5 pathways:
  - [ ] Bowel movements (dropdown: 0, 1, 2, 3+)
  - [ ] Liver support (checkbox)
  - [ ] Lymph movement (checkbox)
  - [ ] Hydration (number input)
  - [ ] Sweating (checkbox)
- [ ] Create scoring algorithm in `lib/calculations/drainage-score.ts`
- [ ] Add 7-day rolling average calculation
- [ ] Create visual progress chart
- [ ] Implement gate for binder access (80% for 7 days)
- [ ] Add daily reminders/notifications

#### 🆕 CSM Timing Calculator
- [ ] Create `app/(app)/tools/csm-calculator/page.tsx`
- [ ] Build medication input form
- [ ] Create supplement input form
- [ ] Implement conflict detection algorithm
- [ ] Generate daily schedule visualization
- [ ] Add export to calendar feature
- [ ] Include Welchol combination option

### Priority 2: Support Tools

#### 🆕 Herx Severity Monitor
- [ ] Create `app/(app)/tools/herx-monitor/page.tsx`
- [ ] Build symptom intensity scale (1-10)
- [ ] Create trend visualization
- [ ] Add protocol adjustment recommendations
- [ ] Include emergency protocol display
- [ ] Add export for doctor visits

#### 🆕 Retesting Scheduler
- [ ] Create `app/(app)/tools/retest-scheduler/page.tsx`
- [ ] Add test type selection (VCS, urine, etc.)
- [ ] Create timeline visualization
- [ ] Add cost tracking
- [ ] Include reminder system
- [ ] Add result comparison feature

#### 🆕 Supplement Stack Builder
- [ ] Create `app/(app)/tools/supplement-builder/page.tsx`
- [ ] Add Kajsa's recommended supplements
- [ ] Include timing optimization
- [ ] Add interaction checker
- [ ] Create shopping list export
- [ ] Include cost calculator

## Phase 4: UI/UX Updates (Week 2)

### Dashboard Redesign
- [ ] Update `app/(app)/dashboard/page.tsx`
- [ ] Add phase-based progress indicator
- [ ] Create timeline view showing current week
- [ ] Add drainage score prominent display
- [ ] Include next milestone card
- [ ] Add quick access to daily tasks

### Navigation Updates
- [ ] Update `components/layout/nav-menu.tsx`
- [ ] Group modules by phase (1-5)
- [ ] Add phase completion indicators
- [ ] Include tool shortcuts
- [ ] Add resource quick links

### Module Layout Enhancement
- [ ] Update `app/(app)/modules/[slug]/page.tsx`
- [ ] Add dual path selector (Prescription/Natural)
- [ ] Include evidence badges (🟢🟡🔴)
- [ ] Add safety warnings where needed
- [ ] Include "Do This Now" action boxes
- [ ] Add progress gates with requirements

## Phase 5: Resource Library Population (Week 3)

### Testing Resources
- [ ] Add Mosaic Diagnostics information
- [ ] Add RealTime Labs details
- [ ] Include VCS test link and guide
- [ ] Add DIY test kit recommendations
- [ ] Create test interpretation guides

### Supplement Resources
- [ ] Add CellCore products with practitioner code
- [ ] Include Kajsa's exact supplement list from Page 29
- [ ] Add quality brand recommendations
- [ ] Include "avoid" list
- [ ] Create dosing charts

### Medical Resources
- [ ] Add Shoemaker Protocol documentation
- [ ] Include practitioner directory links
- [ ] Add telehealth platform reviews
- [ ] Create insurance navigation guides
- [ ] Add prescription obtaining strategies

### Downloadable Resources
- [ ] Create symptom tracking sheets
- [ ] Build drainage pathway checklists
- [ ] Design binder timing templates
- [ ] Create shopping lists
- [ ] Build meal planning templates

## Phase 6: Safety & Compliance (Week 3-4)

### Medical Disclaimers
- [ ] Update `components/marketing/disclaimer-modal.tsx`
- [ ] Add module-specific disclaimers
- [ ] Create tool usage warnings
- [ ] Add prescription protocol gates
- [ ] Include "consult doctor" prompts

### Progress Gates Implementation
- [ ] Create `lib/modules/gating-logic.ts`
- [ ] Implement drainage score requirements
- [ ] Add binder tolerance checks
- [ ] Create override system with warnings
- [ ] Add completion certificates logic

### Evidence Labeling
- [ ] Create `components/modules/evidence-badge.tsx`
- [ ] Add badges to all content sections
- [ ] Include research citations
- [ ] Add controversial content warnings
- [ ] Create safety flag component

## Phase 7: Analytics & Tracking (Week 4)

### User Progress Tracking
- [ ] Implement phase completion tracking
- [ ] Add symptom improvement metrics
- [ ] Create protocol adherence scoring
- [ ] Track tool usage patterns
- [ ] Monitor gate override frequency

### Success Metrics
- [ ] Create recovery milestone tracking
- [ ] Add test result improvements
- [ ] Track symptom reduction percentages
- [ ] Monitor time to recovery
- [ ] Create success story collection

## Phase 8: Testing & Launch Prep (Week 4)

### Content Review
- [ ] Medical accuracy review
- [ ] Legal/disclaimer review
- [ ] User flow testing
- [ ] Mobile responsiveness check
- [ ] Performance optimization

### User Testing
- [ ] Alpha test with 5 users
- [ ] Collect feedback on protocol clarity
- [ ] Test all interactive tools
- [ ] Verify gate functionality
- [ ] Check payment flows

### Launch Preparation
- [ ] Final content review
- [ ] SEO optimization
- [ ] Social media assets
- [ ] Email sequences setup
- [ ] Support documentation

## Success Criteria Checklist

### Must Have (Launch Blockers)
- [ ] ✅ Kajsa's exact protocol accessible
- [ ] ✅ Safety gates preventing unsafe progression
- [ ] ✅ Mycotoxin-binder matching functional
- [ ] ✅ Drainage tracker with 5 pathways
- [ ] ✅ CSM/Itraconazole protocols detailed
- [ ] ✅ Medical disclaimers in place
- [ ] ✅ Prescription vs Natural paths clear

### Should Have (High Priority)
- [ ] ✅ Herx management guidance
- [ ] ✅ Retesting timeline clear
- [ ] ✅ Supporting modalities documented
- [ ] ✅ Resource library populated
- [ ] ✅ Progress tracking functional

### Nice to Have (Post-Launch)
- [ ] ✅ Community features
- [ ] ✅ Video content
- [ ] ✅ Mobile app
- [ ] ✅ Advanced analytics
- [ ] ✅ AI-powered recommendations

## Risk Mitigation Checklist

### Medical/Legal
- [ ] All medical disclaimers reviewed by legal
- [ ] "Educational only" clearly stated
- [ ] No diagnosis/treatment claims made
- [ ] User consent captured appropriately
- [ ] Data privacy compliance verified

### User Safety
- [ ] Drainage requirements enforced
- [ ] Herx warnings prominent
- [ ] Red flags documented
- [ ] Emergency protocols included
- [ ] Medical consultation prompts added

### Technical
- [ ] Database migrations tested
- [ ] Payment processing verified
- [ ] Error handling comprehensive
- [ ] Performance benchmarks met
- [ ] Security audit completed

## Timeline Summary

### Week 1: Foundation
- Complete module content restructure
- Update database models
- Begin tool development

### Week 2: Core Development
- Finish Priority 1 tools
- Implement safety gates
- Complete UI updates

### Week 3: Enhancement
- Build Priority 2 tools
- Populate resource library
- Add compliance features

### Week 4: Polish & Launch
- User testing
- Bug fixes
- Performance optimization
- Launch preparation

## Notes

- **Priority Order**: Follow the checklist sequentially within each phase
- **Dependencies**: Complete Phase 1 before starting tool development
- **Testing**: Test each module and tool as completed
- **Documentation**: Update docs as changes are made
- **Feedback**: Collect user feedback throughout development

---

*Last Updated: [Current Date]*
*Version: 1.0*
*Status: Ready for Implementation*