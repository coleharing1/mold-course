# Lesson Breakdown Pattern for All Modules
**Established: January 2025**

## 📋 Standard Structure

All modules should be broken down into individual lesson files for:
- ✅ Better progress tracking per lesson
- ✅ More granular navigation
- ✅ Users can focus on one concept at a time
- ✅ Matches course structure timeline
- ✅ Easier content management

## 🗂️ File Structure Pattern

```
content/lessons/[module-slug]/
├── 01-[lesson-name].mdx
├── 02-[lesson-name].mdx
├── 03-[lesson-name].mdx
├── 04-[lesson-name].mdx
├── 05-[lesson-name].mdx
└── 06-[lesson-name].mdx
```

**Example (Module 03):**
```
content/lessons/03-drainage-pathways/
├── 01-why-drainage-matters.mdx
├── 02-bowel-optimization.mdx
├── 03-liver-gallbladder-support.mdx
├── 04-kidney-urinary-support.mdx
├── 05-lymphatic-activation.mdx
└── 06-sweat-skin-detox.mdx
```

## 📝 Lesson Frontmatter Template

```yaml
---
title: "Lesson Title"
description: "Brief description of what this lesson covers"
moduleNumber: 3
lessonNumber: 1
duration: "X minutes"
difficulty: "beginner|intermediate|advanced"
objectives:
  - "Specific learning objective 1"
  - "Specific learning objective 2"
  - "Specific learning objective 3"
prerequisites: ["previous-lesson-id"]
tags: ["relevant", "tags", "for", "search"]
status: "published"
publishedAt: "2024-01-01"
updatedAt: "2024-01-01"
---
```

## 📚 Content Structure Guidelines

### Lesson Opening
- **Clear objective statement**
- **Time/difficulty expectations**
- **Connection to previous lesson**

### Main Content
- **Logical progression** from simple to complex
- **Practical, actionable information**
- **Real-world examples and applications**
- **Safety warnings where appropriate**

### Lesson Closing
- **Summary of key takeaways**
- **Action items or homework**
- **Preview of next lesson**
- **Prerequisites for moving forward**

## ⏰ Timing Guidelines by Module

### Module 00: Quick Start (5 lessons, 30 min total)
- 5-10 minutes per lesson
- Emergency/urgent content
- Minimal prerequisites

### Module 01: Identify Exposure (6 lessons, 60 min total)
- 8-12 minutes per lesson
- Systematic assessment focus
- Building foundation knowledge

### Module 03: Drainage Pathways (6 lessons, 90 min total)
- 10-20 minutes per lesson
- Practical implementation heavy
- Critical safety content

### Module 04: Binders (6 lessons, 90 min total)
- 10-20 minutes per lesson
- Advanced protocols
- High safety requirements

### Module 05: Antifungals (5 lessons, 75 min total)
- 12-18 minutes per lesson
- Medical intervention focus
- Monitoring requirements

## 🎯 Lesson Objective Examples

### Good Objectives (Specific, Actionable)
- "Calculate your personal magnesium citrate dose"
- "Perform proper dry brushing technique"
- "Identify signs of liver congestion"
- "Create your daily hydration schedule"

### Poor Objectives (Vague, Non-actionable)
- "Understand drainage"
- "Learn about binders"
- "Know about safety"
- "Be prepared for detox"

## 🔗 Prerequisites and Flow

### Sequential Learning
- Each lesson builds on previous ones
- Prerequisites clearly stated
- Cannot access lesson without completing prerequisites
- Safety gates enforce proper sequence

### Example Prerequisite Chain
```
Module 02 Complete → 
  Lesson 1 (Why Drainage) → 
    Lesson 2 (Bowel) → 
      Lesson 3 (Liver) → 
        Lesson 4 (Kidney) → 
          Lesson 5 (Lymph) → 
            Lesson 6 (Skin) → 
              Module 04 Access (if 80% drainage)
```

## 📊 Progress Tracking

### Lesson Completion Criteria
- **Read through entire lesson** (time tracking)
- **Complete any embedded exercises**
- **Pass comprehension check** (if applicable)
- **Mark lesson as complete**

### Module Completion
- **All lessons completed** sequentially
- **Module-specific requirements** met (e.g., drainage score)
- **Assessment passed** (if required)
- **Safety gates satisfied**

## 🛠️ Technical Implementation

### URL Structure
```
/modules/[module-slug]/lessons/[lesson-number]
/modules/03-drainage-pathways/lessons/01
/modules/03-drainage-pathways/lessons/02
```

### Navigation Components
- **Lesson navigation bar** (prev/next)
- **Module overview** with lesson list
- **Progress indicators** per lesson
- **Completion checkmarks**

### Content Components
- **Lesson header** with metadata
- **Progress bar** for lesson completion
- **Related resources** and downloads
- **Action items** and checklists

## 📱 User Experience

### Benefits for Users
- **Bite-sized learning** chunks
- **Clear progress tracking**
- **Ability to pause and resume**
- **Review specific concepts** easily
- **Sequential skill building**

### Mobile Optimization
- **Lessons load quickly** on mobile
- **Easy navigation** between lessons
- **Readable text** on small screens
- **Touch-friendly** progress indicators

## 🔄 Migration Strategy

### Existing Modules (Need Breakdown)
1. **Module 00:** Quick Start - 5 lessons
2. **Module 01:** Identify Exposure - 6 lessons ✅ (already done)
3. **Module 02:** Testing & Diagnosis - 6 lessons
4. **Module 03:** Drainage Pathways - 6 lessons ✅ (just completed)
5. **Module 04:** Binders - 6 lessons
6. **Module 05:** Antifungals - 5 lessons
7. **Module 06:** Herx Management - 5 lessons
8. **Module 07:** Supportive Modalities - 6 lessons
9. **Module 08:** Diet & Nutrition - 6 lessons
10. **Module 09:** Retesting & Prevention - 6 lessons
11. **Module 10:** Advanced Protocols - 6 lessons

### Priority Order
1. **Module 04 (Binders)** - Next most critical
2. **Module 00 (Quick Start)** - Entry point
3. **Module 02 (Testing)** - Foundation
4. **Remaining modules** - By user journey importance

## 📋 Quality Checklist

### Before Publishing Lessons
- [ ] **Frontmatter complete** and accurate
- [ ] **Duration tested** by reading aloud
- [ ] **Objectives achievable** within lesson
- [ ] **Prerequisites correct** and enforced
- [ ] **Safety warnings** included where needed
- [ ] **Action items clear** and specific
- [ ] **Links work** and resources available
- [ ] **Mobile-friendly** formatting
- [ ] **Spell-check** and grammar review
- [ ] **Technical accuracy** verified

### Module-Level Checks
- [ ] **Lesson flow logical** and progressive
- [ ] **Total duration** matches module goals
- [ ] **Learning objectives** achieved by end
- [ ] **Assessment/gating** properly implemented
- [ ] **Resources linked** correctly
- [ ] **Navigation working** between lessons

This pattern ensures consistency, quality, and optimal learning experience across all modules while maintaining the safety-first approach of the course.
