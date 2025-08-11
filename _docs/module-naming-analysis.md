# Module Naming Analysis & Standardization

## Current State - Multiple Naming Conventions Found

### 1. Actual MDX Files in `/content/modules/`
```
DUPLICATES FOUND:
- 03-drainage-pathways.mdx AND 03-drainage.mdx
- 04-mycotoxin-binders.mdx AND 04-binders.mdx
- 05-binder-protocols-csm.mdx AND 05-antifungals.mdx
- 06-antifungal-protocols.mdx AND 06-herx-management.mdx
- 07-herx-management.mdx AND 07-supportive-modalities.mdx
- 08-supporting-modalities.mdx (no pair)
- 09-diet-nutrition.mdx (no pair)
- 10-retesting-prevention.mdx (no pair)

CLEAN FILES:
- 00-quick-start.mdx ✓
- 01-identify-exposure.mdx ✓
- 02-testing-diagnosis.mdx ✓
```

### 2. Sitemap-dev Page (`/app/sitemap-dev/page.tsx`)
```javascript
Module 00: Quick Start
Module 01: Identify Exposure
Module 02: Testing & Diagnosis
Module 03: Drainage Pathways ✓
Module 04: Mycotoxin Binders ✓
Module 05: Antifungals ✓
Module 06: Herx Management ✓
Module 07: Supporting Modalities ✓
Module 08: Diet & Pantry
Module 09: Retesting & Prevention
Module 10: Advanced Protocols
```

### 3. Modules Page (`/app/(app)/modules/page.tsx`)
```javascript
00-quick-start: 'Quick Start Guide'
01-understanding-mold: 'Understanding Mold Illness' ❌ (different)
02-exposure-assessment: 'Exposure Assessment' ❌ (different)
03-drainage-pathways: 'Open Drainage Pathways'
04-binder-protocols: 'Binder Protocols' ❌ (different)
05-diet-nutrition: 'Diet & Nutrition' ❌ (wrong order)
06-antifungals: 'Antifungal Treatments'
07-herx-management: 'Managing Herx Reactions'
08-modalities: 'Supportive Modalities'
09-prevention: 'Prevention & Maintenance'
```

### 4. Dashboard Components
```javascript
// progress-widget.tsx & next-action.tsx
00-quick-start
01-understanding-mold ❌
02-exposure-assessment ❌
03-drainage-pathways
04-binder-protocols ❌
05-diet-nutrition ❌ (wrong order)
06-antifungals
07-herx-management
08-modalities
09-prevention
```

### 5. Marketing Curriculum Component
```javascript
00: Quick Start Guide
01: Identify Exposure ✓
02: Testing & Diagnosis ✓
03: Open Drainage Pathways
04: Mycotoxin Binders
05: Antifungals
06: Managing Herx
07: Supportive Modalities
08: Diet & Nutrition
09: Retesting & Prevention
10: Advanced Protocols
```

### 6. Phase 2 Checklist (`phase-2-frontend-features.md`)
```
Day 1-2: Module 03 - Open Drainage Pathways ✓
Day 3: Module 04 - Detox I: Binders ✓
Day 4: Module 05 - Detox II: Antifungals ✓
Day 5: Module 06 - Managing Herx ✓
Day 6: Module 07 - Supportive Modalities ✓
Day 7: Module 08 - Diet & Pantry ✓
Day 8: Module 09 - Retesting & Prevention ✓
Day 8.5: Module 10 - Advanced Protocols ✓
```

## Kajsa's Guide Order (Source of Truth)
Based on the PDF guide, the logical progression is:
1. Identify exposure
2. Test (environmental & medical)
3. Open drainage pathways (CRITICAL before detox)
4. Introduce binders (CSM/Welchol)
5. Add antifungals (if needed)
6. Manage Herx reactions (throughout)
7. Supportive modalities (sauna, HBOT, etc.)
8. Diet & nutrition (throughout)
9. Retesting & prevention
10. Advanced protocols (peptides, ozone, etc.)

## RECOMMENDED STANDARD (Final Decision)

Based on Kajsa's protocol and most common usage across files:

```
Module 00: Quick Start
Module 01: Identify Exposure
Module 02: Testing & Diagnosis
Module 03: Open Drainage Pathways
Module 04: Mycotoxin Binders
Module 05: Antifungals
Module 06: Herx Management
Module 07: Supportive Modalities
Module 08: Diet & Nutrition
Module 09: Retesting & Prevention
Module 10: Advanced Protocols
```

### File Naming Convention:
```
00-quick-start.mdx
01-identify-exposure.mdx
02-testing-diagnosis.mdx
03-drainage-pathways.mdx
04-mycotoxin-binders.mdx
05-antifungals.mdx
06-herx-management.mdx
07-supportive-modalities.mdx
08-diet-nutrition.mdx
09-retesting-prevention.mdx
10-advanced-protocols.mdx
```

## Files to Update/Delete

### DELETE (Duplicates):
1. `content/modules/03-drainage.mdx` (keep 03-drainage-pathways.mdx)
2. `content/modules/04-binders.mdx` (keep 04-mycotoxin-binders.mdx)
3. `content/modules/05-binder-protocols-csm.mdx` (wrong module - this is old)
4. `content/modules/06-antifungal-protocols.mdx` (wrong number - antifungals is 05)
5. `content/modules/07-herx-management.mdx` (wrong number - herx is 06)
6. `content/modules/08-supporting-modalities.mdx` (wrong number - modalities is 07)

### RENAME:
1. `09-diet-nutrition.mdx` → `08-diet-nutrition.mdx`
2. `10-retesting-prevention.mdx` → `09-retesting-prevention.mdx`

### CREATE:
1. `10-advanced-protocols.mdx` (new - doesn't exist yet)

### UPDATE CODE:
1. `/app/(app)/modules/page.tsx` - Fix module IDs and titles
2. `/components/dashboard/progress-widget.tsx` - Fix module IDs
3. `/components/dashboard/next-action.tsx` - Fix module IDs
4. `/app/sitemap-dev/page.tsx` - Update paths to match
5. `/components/marketing/curriculum.tsx` - Already correct!

## Module Gating Logic (Per Kajsa)
- Module 00: Always available
- Module 01: Available on enrollment
- Module 02: Complete Module 01
- Module 03: Complete Module 02
- Module 04: MUST have 80% drainage readiness for 7 days (from Module 03)
- Module 05: On stable binder protocol (2-4 weeks)
- Module 06: Available when starting binders or antifungals
- Module 07: Available after starting binders
- Module 08: Always available
- Module 09: 50% total completion
- Module 10: Complete Module 05 (advanced users only)