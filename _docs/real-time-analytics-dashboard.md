# Real-Time Analytics Dashboard Documentation

## Overview
The Real-Time Analytics Dashboard is a sophisticated project monitoring system built into `/sitemap-dev` that provides live metrics, automatic updates, and comprehensive project tracking for the Mold Detox Mastery platform.

## Architecture

### Frontend Component (`/app/sitemap-dev/page.tsx`)
- **Framework**: Next.js 14 with React hooks
- **Update Mechanism**: 
  - Timer updates every 1 second (for elapsed time display)
  - Stats API fetch every 5 minutes (300,000ms)
- **State Management**: React useState for real-time data
- **Styling**: Inline styles with Tailwind utilities for responsive design

### Backend API (`/app/api/project-stats/route.ts`)
- **Purpose**: Analyzes codebase in real-time
- **Technology**: Next.js API Route with Node.js filesystem APIs
- **Functionality**: Recursively scans project files, counts lines of code, categorizes by type

## Key Metrics and Calculations

### 1. Time Tracking
```javascript
// Project Start Time (Fixed)
const projectStartDate = new Date('2025-08-09T14:57:00') // Aug 9, 2025 at 2:57 PM

// Elapsed Time Calculation
const msElapsed = currentTime - projectStartDate
const hoursElapsed = Math.floor(msElapsed / (1000 * 60 * 60))
const minutesElapsed = Math.floor((msElapsed % (1000 * 60 * 60)) / (1000 * 60))
const secondsElapsed = Math.floor((msElapsed % (1000 * 60)) / 1000)
```

### 2. Productivity Metrics
```javascript
// Fixed Productive Hours
const actualHoursWorked = 11.15 // 11 hours and 9 minutes of actual coding

// Lines Per Hour
const avgLinesPerHour = Math.round(linesWritten / actualHoursWorked)
// Example: 40,456 lines / 11.15 hours = ~3,630 lines/hour

// Average Hours Per Day
const avgHoursPerDay = Math.round((actualHoursWorked / (hoursElapsed / 24)) * 10) / 10
// Example: 11.15 hours / 1.25 days = 8.9 hours/day
```

### 3. Progress Calculations

#### Overall Progress (56%)
```javascript
const phaseProgress = {
  phase0: 100,  // Setup complete
  phase1: 80,   // MVP - modules done, payment/auth pending
  phase2: 35,   // Enhancement - design system started
  phase3: 5     // Scale & Production - planning stage
}

// Weighted calculation
const overallProgress = Math.round(
  (phaseProgress.phase0 * 0.15 +  // 15% weight for setup
   phaseProgress.phase1 * 0.35 +  // 35% weight for MVP
   phaseProgress.phase2 * 0.35 +  // 35% weight for enhancements
   phaseProgress.phase3 * 0.15)   // 15% weight for production
  / 100 * 100
)
// Result: (100*0.15 + 80*0.35 + 35*0.35 + 5*0.15) = 56%
```

#### Module Progress (73%)
```javascript
const completedModules = 8  // Modules 00-07 fully complete
const totalModules = 11      // Total planned modules
const moduleProgress = Math.round((8 / 11) * 100) // = 73%
```

#### Tool Progress (22%)
```javascript
const completedTools = 2  // Exposure Checklist, Drainage Readiness
const totalTools = 9       // Total planned interactive tools
const toolProgress = Math.round((2 / 9) * 100) // = 22%
```

### 4. Code Metrics
```javascript
// Lines of Code Analysis
const linesWritten = realTimeStats?.linesOfCode || 40456
const estimatedTotalLines = 75000  // Realistic full project estimate
const linesRemaining = estimatedTotalLines - linesWritten
const codeProgress = Math.round((linesWritten / estimatedTotalLines) * 100)

// Estimation Calculations
const hoursRemaining = Math.round(linesRemaining / avgLinesPerHour)
const estimatedDaysRemaining = Math.round(hoursRemaining / avgHoursPerDay)
const estimatedCompletionDate = new Date(today + (estimatedDaysRemaining * 24 * 60 * 60 * 1000))
```

## Real-Time Data Collection

### File Analysis Algorithm
The API endpoint recursively scans the project directory:

1. **Included File Types**:
   - TypeScript: `.ts`, `.tsx`
   - JavaScript: `.js`, `.jsx`
   - Styles: `.css`
   - Content: `.mdx`

2. **Excluded Directories**:
   - `.git`, `.next`, `node_modules`
   - `dist`, `build`
   - Any directory starting with `.`

3. **Metrics Collected**:
   - Total lines of code
   - File count by type
   - Component count
   - Page count
   - Content file count
   - Last git commit timestamp

## Visual Design System

### Color Palette (Tan Earthy Theme)
```css
/* Primary Colors */
--tan-primary: rgb(139, 90, 43)      /* Dark brown */
--tan-secondary: rgb(193, 122, 86)   /* Terracotta */
--tan-surface: rgb(254, 249, 239)    /* Cream */
--tan-background: rgb(251, 247, 241) /* Light beige */

/* Text Colors */
--text-primary: rgb(92, 51, 23)      /* Dark brown text */
--text-secondary: rgb(139, 90, 43)   /* Medium brown text */
--text-muted: rgb(107, 107, 107)     /* Grey text */
```

### Responsive Breakpoints
- **Mobile**: `< 640px` (sm breakpoint)
- **Tablet**: `640px - 768px` (md breakpoint)
- **Desktop**: `> 768px`

### Component Structure
```
Dashboard Container
├── Header Section
│   ├── Icon + Title
│   └── Last Update Time
├── Progress Indicator (56%)
├── Time Tracking Section
│   ├── Live Timer (updates every 1s)
│   └── 4 Metric Cards
├── Development Metrics
│   └── 6 Progress Cards with bars
└── Phase Progress Bars
    └── 4 Phase indicators
```

## Implementation Details

### Auto-Refresh Mechanism
```javascript
useEffect(() => {
  const fetchStats = async () => {
    const response = await fetch('/api/project-stats')
    const data = await response.json()
    setRealTimeStats(data)
  }
  
  fetchStats() // Initial load
  const interval = setInterval(fetchStats, 300000) // Every 5 minutes
  return () => clearInterval(interval) // Cleanup
}, [])
```

### Performance Optimizations
1. **Memoization**: Project stats calculated with `React.useMemo`
2. **Conditional Rendering**: Loading states prevent flicker
3. **Efficient File Scanning**: Excludes unnecessary directories
4. **Caching**: Browser caches API responses between intervals

## Key Features for AI/LLM Understanding

### 1. Fixed vs Dynamic Values
- **Fixed**: Productive hours (11h 9m), project start date
- **Dynamic**: Elapsed time, file counts (when API available)
- **Calculated**: Progress percentages, estimates

### 2. Fallback Values
All real-time stats have fallbacks if API fails:
```javascript
const linesWritten = realTimeStats?.linesOfCode || 40456
const totalPages = realTimeStats?.pagesCount || 31
```

### 3. Safety Considerations
- No sensitive data exposed in API
- Read-only filesystem operations
- Error boundaries prevent crashes

### 4. Business Logic
- **56% Progress**: Reflects actual development state
- **11h 9m Productive**: Based on focused coding time
- **Phase Weights**: MVP gets highest weight (35%) as it's core functionality

## Maintenance Notes

### Updating Progress
To adjust overall progress percentage:
1. Modify phase percentages in `phaseProgress` object
2. Or adjust phase weights in the calculation
3. Current formula ensures it always totals 100%

### Adding New Metrics
1. Add data collection in `/api/project-stats/route.ts`
2. Add state variable in component
3. Create new metric card in grid
4. Apply consistent styling from existing cards

### Changing Update Frequency
```javascript
// Change this value (in milliseconds)
const interval = setInterval(fetchStats, 300000) // 300000 = 5 minutes
// Common values:
// 30000 = 30 seconds
// 60000 = 1 minute
// 180000 = 3 minutes
// 600000 = 10 minutes
```

## Testing Considerations

### Manual Testing
1. Check elapsed time updates every second
2. Verify API refreshes at 5-minute intervals
3. Test responsive layout at different screen sizes
4. Confirm fallback values work when API fails

### Edge Cases
- Project running over multiple days
- API endpoint timeout/failure
- Very large codebases (>100k files)
- Timezone differences

## Future Enhancements

### Potential Improvements
1. **Historical Tracking**: Store daily snapshots
2. **Velocity Graphs**: Show productivity trends
3. **Commit Integration**: Show recent commit messages
4. **Team Metrics**: Multiple developer tracking
5. **Build Status**: Integration with CI/CD
6. **Test Coverage**: Display test statistics
7. **Performance Metrics**: Lighthouse scores
8. **Deployment Status**: Production sync status

### API Enhancements
```javascript
// Potential additional metrics
{
  testCoverage: 78,           // Percentage
  buildTime: 45,              // Seconds
  bundleSize: 2.4,            // MB
  lighthouseScore: 92,       // Performance score
  lastDeployment: '2025-08-10T21:00:00Z',
  activeIssues: 3,
  completedTickets: 45
}
```

## Conclusion
This real-time analytics dashboard provides comprehensive project monitoring with minimal performance impact. The combination of live updates, calculated metrics, and visual progress indicators creates an effective management tool for tracking development progress.

The system is designed to be maintainable, extensible, and resilient, with clear separation between data collection (API) and presentation (React component). The earth-tone design maintains consistency with the overall platform aesthetic while ensuring readability and professional appearance.