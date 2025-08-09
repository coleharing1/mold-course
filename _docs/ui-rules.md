# UI Rules - Mold Detox Mastery Platform

## Design Principles

### 1. Clarity & Trust
**Visual Hierarchy for Health Content:**
- Critical safety information: High contrast alerts with icons
- Module content: Clear typography with generous spacing
- Interactive tools: Distinct visual treatment
- Progress indicators: Always visible and motivating
- Medical disclaimers: Prominent but not obtrusive

**Trust Signals:**
- Evidence badges (Solid/Emerging/Controversial)
- Safety flags with warning icons
- Professional, clean aesthetic
- Consistent visual language
- Clear data visualization

### 2. Accessibility First
**Health-Conscious Design:**
- Large, readable fonts (base 16px minimum)
- High contrast ratios (WCAG AAA where possible)
- Clear focus states for keyboard users
- Screen reader optimized
- Reduced motion options for sensitive users
- Touch targets 48x48px minimum (mobile)

### 3. Progressive Disclosure
**Avoid Overwhelming Users:**
- Start simple, reveal complexity gradually
- Collapsed sections for detailed information
- "Learn More" expandables
- Tooltips for medical terms
- Step-by-step wizards for complex tools

### 4. Emotional Support
**Encouraging Visual Language:**
- Calming color palette (greens, blues)
- Soft edges and rounded corners
- Celebration animations for milestones
- Positive reinforcement through UI
- Non-judgmental error messages

## Component Specifications

### Typography Scale
```css
/* Optimized for readability */
--text-xs: 0.75rem;    /* 12px - Legal text only */
--text-sm: 0.875rem;   /* 14px - Captions */
--text-base: 1rem;     /* 16px - Body text */
--text-lg: 1.125rem;   /* 18px - Enhanced body */
--text-xl: 1.25rem;    /* 20px - Section intros */
--text-2xl: 1.5rem;    /* 24px - H3 headings */
--text-3xl: 1.875rem;  /* 30px - H2 headings */
--text-4xl: 2.25rem;   /* 36px - H1 headings */
--text-5xl: 3rem;      /* 48px - Page titles */
```

### Color System
```css
/* Health-focused palette */
--color-primary: #10b981;     /* Emerald - growth, health */
--color-secondary: #3b82f6;   /* Blue - trust, calm */
--color-success: #22c55e;     /* Green - progress */
--color-warning: #f59e0b;     /* Amber - caution */
--color-danger: #ef4444;      /* Red - alerts */
--color-info: #06b6d4;        /* Cyan - information */

/* Neutral grays */
--color-gray-50: #f9fafb;
--color-gray-100: #f3f4f6;
--color-gray-200: #e5e7eb;
--color-gray-300: #d1d5db;
--color-gray-400: #9ca3af;
--color-gray-500: #6b7280;
--color-gray-600: #4b5563;
--color-gray-700: #374151;
--color-gray-800: #1f2937;
--color-gray-900: #111827;
```

### Spacing System
```css
/* Consistent 4px base unit */
--space-0: 0;
--space-1: 0.25rem;   /* 4px */
--space-2: 0.5rem;    /* 8px */
--space-3: 0.75rem;   /* 12px */
--space-4: 1rem;      /* 16px */
--space-5: 1.25rem;   /* 20px */
--space-6: 1.5rem;    /* 24px */
--space-8: 2rem;      /* 32px */
--space-10: 2.5rem;   /* 40px */
--space-12: 3rem;     /* 48px */
--space-16: 4rem;     /* 64px */
--space-20: 5rem;     /* 80px */
```

## Component Patterns

### Module Cards
```typescript
// Module card with progress indicator
<Card className="module-card">
  <CardHeader>
    <Badge variant={module.status} />
    <CardTitle>{module.title}</CardTitle>
    <ProgressBar value={module.progress} />
  </CardHeader>
  <CardContent>
    <p className="text-gray-600">{module.description}</p>
    <div className="module-meta">
      <Clock /> {module.duration}
      <Lock /> {module.prerequisites}
    </div>
  </CardContent>
  <CardFooter>
    <Button variant={module.available ? "primary" : "disabled"}>
      {module.buttonText}
    </Button>
  </CardFooter>
</Card>
```

### Interactive Tools
```typescript
// Tool interface pattern
<ToolContainer>
  <ToolHeader>
    <h2>{tool.name}</h2>
    <InfoTooltip content={tool.description} />
  </ToolHeader>
  <ToolBody>
    <Form onSubmit={handleSubmit}>
      {/* Tool-specific inputs */}
    </Form>
  </ToolBody>
  <ToolResults show={hasResults}>
    <ResultCard data={results} />
    <ExportButtons />
  </ToolResults>
</ToolContainer>
```

### Progress Indicators
```typescript
// Multi-level progress display
<ProgressSection>
  <OverallProgress value={overall} label="Course Completion" />
  <ModuleProgress modules={modules} />
  <StreakCounter days={streak} />
  <NextMilestone milestone={next} />
</ProgressSection>
```

### Safety Alerts
```typescript
// Medical disclaimer pattern
<Alert variant="warning" className="medical-disclaimer">
  <AlertCircle className="h-4 w-4" />
  <AlertTitle>Medical Disclaimer</AlertTitle>
  <AlertDescription>
    {disclaimer.text}
    <Link href="/disclaimers">Read full disclaimer</Link>
  </AlertDescription>
</Alert>
```

## Responsive Design

### Breakpoints
```css
/* Mobile-first approach */
sm: 640px   /* Large phones */
md: 768px   /* Tablets */
lg: 1024px  /* Laptops */
xl: 1280px  /* Desktops */
2xl: 1536px /* Large screens */
```

### Layout Strategies

**Mobile (< 640px):**
- Single column layouts
- Full-width cards
- Bottom navigation bar
- Collapsible sections
- Swipeable carousels

**Tablet (640px - 1024px):**
- 2-column grids where appropriate
- Side-by-side comparisons
- Floating action buttons
- Modal dialogs for tools

**Desktop (> 1024px):**
- 3-column dashboard
- Sidebar navigation
- Multi-panel tools
- Hover interactions
- Keyboard shortcuts

## Interaction Patterns

### Loading States
```typescript
// Skeleton screens for content
<div className="animate-pulse">
  <div className="h-4 bg-gray-200 rounded w-3/4 mb-4" />
  <div className="h-4 bg-gray-200 rounded w-1/2 mb-4" />
  <div className="h-32 bg-gray-200 rounded" />
</div>

// Button loading states
<Button disabled>
  <Loader2 className="animate-spin mr-2" />
  Processing...
</Button>
```

### Form Validation
```typescript
// Real-time validation feedback
<FormField>
  <Label>Email</Label>
  <Input 
    className={errors.email ? "border-red-500" : ""}
    aria-invalid={!!errors.email}
  />
  {errors.email && (
    <ErrorMessage>{errors.email.message}</ErrorMessage>
  )}
</FormField>
```

### Success Feedback
```typescript
// Toast notifications
toast.success("Progress saved!", {
  description: "Your symptom data has been recorded.",
  action: {
    label: "View progress",
    onClick: () => router.push("/progress")
  }
});
```

## Accessibility Guidelines

### Focus Management
- Visible focus indicators (2px outline minimum)
- Logical tab order
- Focus trap in modals
- Skip links for navigation
- Return focus after modal close

### Screen Reader Support
- Semantic HTML structure
- ARIA labels for icons
- Live regions for updates
- Form field descriptions
- Alternative text for images

### Keyboard Navigation
- All interactive elements keyboard accessible
- Escape to close modals/dropdowns
- Arrow keys for menus
- Space/Enter to activate buttons
- Custom shortcuts with ? menu

### Motion Preferences
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

## Dark Mode Implementation

### Color Adjustments
```css
[data-theme="dark"] {
  --bg-primary: #0f172a;
  --bg-secondary: #1e293b;
  --text-primary: #f1f5f9;
  --text-secondary: #cbd5e1;
  
  /* Soften bright colors */
  --color-primary: #34d399;
  --color-secondary: #60a5fa;
}
```

### Component Variations
- Inverted card backgrounds
- Adjusted shadows (lighter)
- Modified chart colors
- Dimmed images slightly
- Preserved safety color meanings

## Performance Optimization

### Image Handling
```typescript
// Optimized image loading
<Image
  src={module.image}
  alt={module.title}
  width={400}
  height={300}
  loading="lazy"
  placeholder="blur"
  blurDataURL={module.placeholder}
/>
```

### Lazy Loading
```typescript
// Lazy load heavy components
const SymptomChart = dynamic(
  () => import('@/components/charts/SymptomChart'),
  { 
    loading: () => <ChartSkeleton />,
    ssr: false 
  }
);
```

### List Virtualization
```typescript
// Virtualize long module lists
<VirtualList
  height={600}
  itemCount={modules.length}
  itemSize={120}
  renderItem={({ index, style }) => (
    <ModuleCard 
      module={modules[index]} 
      style={style} 
    />
  )}
/>
```

## Error Handling UI

### Form Errors
- Inline validation messages
- Field-level error icons
- Summary at form top
- Clear recovery actions
- Preserve user input

### System Errors
```typescript
// User-friendly error boundary
<ErrorBoundary
  fallback={
    <ErrorCard>
      <h2>Something went wrong</h2>
      <p>We're having trouble loading this content.</p>
      <Button onClick={retry}>Try Again</Button>
      <Link href="/support">Contact Support</Link>
    </ErrorCard>
  }
>
  {children}
</ErrorBoundary>
```

### Empty States
```typescript
// Encouraging empty states
<EmptyState
  icon={<BookOpen />}
  title="No modules started yet"
  description="Begin your recovery journey with our Quick Start guide"
  action={
    <Button onClick={() => router.push('/modules/quick-start')}>
      Start Learning
    </Button>
  }
/>
```

## Animation Guidelines

### Micro-interactions
```css
/* Subtle, meaningful animations */
.button-hover {
  transition: all 0.2s ease-out;
}

.card-enter {
  animation: slideUp 0.3s ease-out;
}

.progress-fill {
  transition: width 0.5s ease-in-out;
}

.milestone-celebrate {
  animation: bounce 0.6s ease-in-out;
}
```

### Page Transitions
- Fade between sections (200ms)
- Slide for mobile navigation (300ms)
- Smooth scroll for anchors
- Stagger list item animations

## Mobile-Specific Patterns

### Touch Gestures
- Swipe to navigate modules
- Pull to refresh progress
- Long press for tooltips
- Pinch to zoom charts

### Bottom Sheet Pattern
```typescript
// Mobile-optimized tool interface
<Drawer>
  <DrawerTrigger asChild>
    <Button>Open Tool</Button>
  </DrawerTrigger>
  <DrawerContent className="h-[80vh]">
    <ToolInterface />
  </DrawerContent>
</Drawer>
```

### Offline Support
- Cache critical assets
- Show offline indicator
- Queue data for sync
- Provide offline content access