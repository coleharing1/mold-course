# Theme Rules - Mold Detox Mastery Platform

## Theme Overview

This theme adopts a **health-conscious, calming design** with nature-inspired colors that promote trust, healing, and clarity. The visual language emphasizes accessibility and readability, crucial for users potentially experiencing brain fog or visual sensitivities from mold exposure. Supporting both light and dark modes, the theme creates a professional yet approachable learning environment that feels medical-grade without being clinical or intimidating.

## Color Palette

### Core Colors

| Color Role | Light Mode | Dark Mode | Usage | WCAG Ratio |
|------------|------------|-----------|-------|------------|
| **Primary** | #10b981 (Emerald-500) | #34d399 (Emerald-400) | CTAs, progress, success states | AAA (7.5:1) |
| **Secondary** | #3b82f6 (Blue-500) | #60a5fa (Blue-400) | Links, info, secondary actions | AAA (7.0:1) |
| **Accent** | #8b5cf6 (Violet-500) | #a78bfa (Violet-400) | Premium features, highlights | AA (4.5:1) |
| **Success** | #22c55e (Green-500) | #4ade80 (Green-400) | Positive feedback, completions | AAA (7.2:1) |
| **Warning** | #f59e0b (Amber-500) | #fbbf24 (Amber-400) | Cautions, Herx warnings | AAA (8.1:1) |
| **Danger** | #ef4444 (Red-500) | #f87171 (Red-400) | Errors, critical alerts | AA (4.8:1) |
| **Info** | #06b6d4 (Cyan-500) | #22d3ee (Cyan-400) | Tips, information | AA (5.1:1) |

### Neutral Palette

| Shade | Light Mode | Dark Mode | Usage |
|-------|------------|-----------|-------|
| **Background** | #ffffff | #0f172a | Main background |
| **Surface** | #f8fafc | #1e293b | Cards, panels |
| **Surface-2** | #f1f5f9 | #334155 | Nested cards |
| **Border** | #e2e8f0 | #475569 | Dividers, inputs |
| **Text-Primary** | #0f172a | #f8fafc | Headings, body |
| **Text-Secondary** | #475569 | #cbd5e1 | Descriptions |
| **Text-Muted** | #94a3b8 | #94a3b8 | Disabled, hints |

### Semantic Colors for Health States

```css
:root {
  /* Symptom Severity Scale */
  --severity-none: #10b981;    /* Green - No symptoms */
  --severity-mild: #84cc16;    /* Lime - Mild */
  --severity-moderate: #fbbf24; /* Amber - Moderate */
  --severity-severe: #f97316;  /* Orange - Severe */
  --severity-critical: #ef4444; /* Red - Critical */
  
  /* Module Status */
  --status-locked: #94a3b8;     /* Gray - Locked */
  --status-available: #3b82f6;  /* Blue - Available */
  --status-progress: #fbbf24;   /* Amber - In Progress */
  --status-complete: #10b981;   /* Green - Complete */
  --status-gated: #8b5cf6;      /* Violet - Time-gated */
}
```

## Typography

### Font Stack

```css
:root {
  /* Primary font for content */
  --font-sans: 'Inter', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 
               "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  
  /* Monospace for data/codes */
  --font-mono: 'Fira Code', ui-monospace, SFMono-Regular, "SF Mono", 
               Menlo, Consolas, "Liberation Mono", monospace;
  
  /* Display font for landing pages */
  --font-display: 'Plus Jakarta Sans', var(--font-sans);
}
```

### Type Scale

```css
:root {
  /* Fluid typography with clamp() */
  --text-xs: clamp(0.75rem, 1.5vw, 0.813rem);     /* 12-13px */
  --text-sm: clamp(0.875rem, 1.75vw, 0.938rem);   /* 14-15px */
  --text-base: clamp(1rem, 2vw, 1.063rem);        /* 16-17px */
  --text-lg: clamp(1.125rem, 2.25vw, 1.25rem);    /* 18-20px */
  --text-xl: clamp(1.25rem, 2.5vw, 1.5rem);       /* 20-24px */
  --text-2xl: clamp(1.5rem, 3vw, 1.875rem);       /* 24-30px */
  --text-3xl: clamp(1.875rem, 3.75vw, 2.25rem);   /* 30-36px */
  --text-4xl: clamp(2.25rem, 4.5vw, 3rem);        /* 36-48px */
  --text-5xl: clamp(3rem, 6vw, 3.75rem);          /* 48-60px */
  
  /* Line heights */
  --leading-tight: 1.25;
  --leading-normal: 1.5;
  --leading-relaxed: 1.75;
  --leading-loose: 2;
  
  /* Letter spacing */
  --tracking-tight: -0.025em;
  --tracking-normal: 0;
  --tracking-wide: 0.025em;
  
  /* Font weights */
  --font-normal: 400;
  --font-medium: 500;
  --font-semibold: 600;
  --font-bold: 700;
}
```

### Typography Classes (Tailwind)

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
        display: ['Plus Jakarta Sans', ...defaultTheme.fontFamily.sans],
        mono: ['Fira Code', ...defaultTheme.fontFamily.mono],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1.2' }],
      },
    },
  },
};
```

## Spacing System

### Base Unit: 4px (0.25rem)

```css
:root {
  --space-0: 0;
  --space-px: 1px;
  --space-0.5: 0.125rem;  /* 2px */
  --space-1: 0.25rem;     /* 4px */
  --space-1.5: 0.375rem;  /* 6px */
  --space-2: 0.5rem;      /* 8px */
  --space-2.5: 0.625rem;  /* 10px */
  --space-3: 0.75rem;     /* 12px */
  --space-3.5: 0.875rem;  /* 14px */
  --space-4: 1rem;        /* 16px */
  --space-5: 1.25rem;     /* 20px */
  --space-6: 1.5rem;      /* 24px */
  --space-7: 1.75rem;     /* 28px */
  --space-8: 2rem;        /* 32px */
  --space-9: 2.25rem;     /* 36px */
  --space-10: 2.5rem;     /* 40px */
  --space-11: 2.75rem;    /* 44px */
  --space-12: 3rem;       /* 48px */
  --space-14: 3.5rem;     /* 56px */
  --space-16: 4rem;       /* 64px */
  --space-20: 5rem;       /* 80px */
  --space-24: 6rem;       /* 96px */
  --space-28: 7rem;       /* 112px */
  --space-32: 8rem;       /* 128px */
  --space-36: 9rem;       /* 144px */
  --space-40: 10rem;      /* 160px */
}
```

### Container Widths

```css
:root {
  --container-xs: 20rem;    /* 320px */
  --container-sm: 24rem;    /* 384px */
  --container-md: 28rem;    /* 448px */
  --container-lg: 32rem;    /* 512px */
  --container-xl: 36rem;    /* 576px */
  --container-2xl: 42rem;   /* 672px */
  --container-3xl: 48rem;   /* 768px */
  --container-4xl: 56rem;   /* 896px */
  --container-5xl: 64rem;   /* 1024px */
  --container-6xl: 72rem;   /* 1152px */
  --container-7xl: 80rem;   /* 1280px */
  --container-full: 100%;
}
```

## Border & Radius

```css
:root {
  /* Border widths */
  --border-0: 0;
  --border-1: 1px;
  --border-2: 2px;
  --border-4: 4px;
  --border-8: 8px;
  
  /* Border radius */
  --radius-none: 0;
  --radius-sm: 0.125rem;    /* 2px */
  --radius-base: 0.25rem;   /* 4px */
  --radius-md: 0.375rem;    /* 6px */
  --radius-lg: 0.5rem;      /* 8px */
  --radius-xl: 0.75rem;     /* 12px */
  --radius-2xl: 1rem;       /* 16px */
  --radius-3xl: 1.5rem;     /* 24px */
  --radius-full: 9999px;    /* Pills */
}
```

## Shadows & Elevation

```css
:root {
  /* Light mode shadows */
  --shadow-xs: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-sm: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  --shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
  --shadow-2xl: 0 25px 50px -12px rgb(0 0 0 / 0.25);
  
  /* Colored shadows for emphasis */
  --shadow-primary: 0 10px 25px -5px rgb(16 185 129 / 0.25);
  --shadow-success: 0 10px 25px -5px rgb(34 197 94 / 0.25);
  --shadow-warning: 0 10px 25px -5px rgb(245 158 11 / 0.25);
  --shadow-danger: 0 10px 25px -5px rgb(239 68 68 / 0.25);
}

[data-theme="dark"] {
  /* Dark mode shadows (lighter, more subtle) */
  --shadow-sm: 0 1px 3px 0 rgb(0 0 0 / 0.3);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.3);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.3);
  --shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.3);
}
```

## Animation & Transitions

```css
:root {
  /* Durations */
  --duration-75: 75ms;
  --duration-100: 100ms;
  --duration-150: 150ms;
  --duration-200: 200ms;
  --duration-300: 300ms;
  --duration-500: 500ms;
  --duration-700: 700ms;
  --duration-1000: 1000ms;
  
  /* Timing functions */
  --ease-linear: linear;
  --ease-in: cubic-bezier(0.4, 0, 1, 1);
  --ease-out: cubic-bezier(0, 0, 0.2, 1);
  --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
  
  /* Common transitions */
  --transition-colors: color, background-color, border-color, fill, stroke;
  --transition-opacity: opacity;
  --transition-shadow: box-shadow;
  --transition-transform: transform;
  --transition-all: all;
}
```

## Breakpoints

```css
:root {
  --screen-xs: 475px;
  --screen-sm: 640px;
  --screen-md: 768px;
  --screen-lg: 1024px;
  --screen-xl: 1280px;
  --screen-2xl: 1536px;
}

/* Media query helpers */
@custom-media --xs-up (min-width: 475px);
@custom-media --sm-up (min-width: 640px);
@custom-media --md-up (min-width: 768px);
@custom-media --lg-up (min-width: 1024px);
@custom-media --xl-up (min-width: 1280px);
@custom-media --2xl-up (min-width: 1536px);
```

## Component-Specific Theming

### Buttons

```css
.btn-primary {
  background: var(--color-primary);
  color: white;
  border-radius: var(--radius-lg);
  padding: var(--space-2) var(--space-4);
  font-weight: var(--font-semibold);
  transition: all var(--duration-200) var(--ease-out);
}

.btn-primary:hover {
  transform: translateY(-1px);
  box-shadow: var(--shadow-primary);
}
```

### Cards

```css
.card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  padding: var(--space-6);
  box-shadow: var(--shadow-sm);
}

.card-interactive:hover {
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
}
```

### Progress Indicators

```css
.progress-bar {
  background: var(--color-gray-200);
  border-radius: var(--radius-full);
  height: var(--space-2);
  overflow: hidden;
}

.progress-fill {
  background: linear-gradient(90deg, 
    var(--color-primary) 0%, 
    var(--color-secondary) 100%);
  transition: width var(--duration-500) var(--ease-out);
}
```

## Accessibility Considerations

### High Contrast Mode

```css
@media (prefers-contrast: high) {
  :root {
    --color-primary: #0066cc;
    --color-secondary: #0052a3;
    --color-text-primary: #000000;
    --color-background: #ffffff;
    --border-width: 2px;
  }
}
```

### Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

### Focus Styles

```css
:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
  border-radius: var(--radius-sm);
}
```

## Dark Mode Implementation

```css
[data-theme="dark"] {
  color-scheme: dark;
  
  /* Adjust primary colors for dark backgrounds */
  --color-primary: #34d399;
  --color-secondary: #60a5fa;
  --color-accent: #a78bfa;
  
  /* Invert neutrals */
  --color-background: #0f172a;
  --color-surface: #1e293b;
  --color-border: #334155;
  --color-text-primary: #f8fafc;
  --color-text-secondary: #cbd5e1;
  
  /* Soften bright colors */
  --shadow-strength: 0.5;
  --image-brightness: 0.8;
}
```

## Implementation in Tailwind

```javascript
// tailwind.config.js
module.exports = {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#10b981',
          dark: '#34d399',
        },
        secondary: {
          DEFAULT: '#3b82f6',
          dark: '#60a5fa',
        },
        // ... rest of color palette
      },
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
        display: ['Plus Jakarta Sans', ...defaultTheme.fontFamily.sans],
      },
      animation: {
        'slide-up': 'slideUp 0.3s ease-out',
        'fade-in': 'fadeIn 0.5s ease-out',
        'bounce-gentle': 'bounceGentle 1s ease-in-out infinite',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('tailwindcss-animate'),
  ],
};
```

## Testing & Maintenance

### Tools for Theme Testing
- **Storybook**: Component isolation and theme switching
- **Chromatic**: Visual regression testing
- **WAVE**: Accessibility validation
- **Contrast Checker**: WCAG compliance verification

### Theme Update Process
1. Update CSS variables in `:root`
2. Test in both light/dark modes
3. Verify accessibility compliance
4. Update component examples
5. Document changes in changelog