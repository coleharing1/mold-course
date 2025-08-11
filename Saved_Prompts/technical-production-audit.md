# Technical & Production Readiness Audit (Phase 4-5)
**Purpose**: Pre-production technical audit for code quality, performance, security, and deployment readiness
**Best Used**: Before deployment and during optimization phases (typically project phases 4-5)
**Prerequisite**: Run `content-documentation-audit.md` first to ensure documentation is complete

## 🎯 Quick Configuration
```yaml
# Customize these for your project:
FRAMEWORK: [auto-detect|next|remix|vite|react|vue|svelte]
PACKAGE_MANAGER: [auto-detect|npm|yarn|pnpm|bun]
DEPLOYMENT_TARGET: [vercel|netlify|aws|railway|custom]
ENVIRONMENT_STAGES: [dev|staging|production]
SCAN_MODE: [quick|deep|security-focus|performance-focus]
MONOREPO: [true|false]
```

## 📋 Prerequisites (Load into Cursor First)
```markdown
Essential Context:
@package.json @tsconfig.json @next.config.* @vite.config.* 
@.env.example @.env.local @.gitignore @.eslintrc* @.prettierrc*
@src @app @pages @components @lib @api @server
@.github/workflows @Dockerfile @docker-compose.*

Tools Integration:
@Linter Errors - Current linting issues
@Recent Changes - Last 10-20 commits
@Git - Compare branch vs main
@Terminal - For running verification commands
```

## 🔍 Phase 1: Codebase Architecture Analysis

### Repository Structure Mapping
```yaml
Analyze and Score (1-10):
- Separation of Concerns: [score]
- Module Boundaries: [score]
- Dependency Direction: [score]
- Code Organization: [score]
```

### Critical Anti-Patterns Detection
| Pattern | Severity | Detection Method | Auto-Fix Available |
|---------|----------|------------------|-------------------|
| Mixed pages/ and app/ (Next.js) | 🔴 High | Route analysis | Yes |
| Multiple state management libs | 🔴 High | Package.json scan | Partial |
| Duplicate API clients | 🟡 Medium | Import analysis | Yes |
| Multiple date libraries | 🟡 Medium | Dependency scan | Yes |
| Console.logs in production | 🟡 Medium | AST parsing | Yes |
| Commented code blocks | 🟢 Low | Pattern matching | Yes |

## 🔍 Phase 2: Configuration & Build Pipeline

### TypeScript Strictness Audit
```typescript
// Required Compiler Options (Score each 0-10)
{
  "strict": true,                           // [score]
  "noUncheckedIndexedAccess": true,        // [score]
  "exactOptionalPropertyTypes": true,       // [score]
  "noImplicitOverride": true,              // [score]
  "noPropertyAccessFromIndexSignature": true, // [score]
  "noUnusedLocals": true,                  // [score]
  "noUnusedParameters": true,              // [score]
  "noFallthroughCasesInSwitch": true,      // [score]
}
```

### Build Performance Analysis
```markdown
Metrics to Capture:
- Cold Build Time: [Xs]
- Hot Reload Time: [Xms]
- Bundle Size: [XMB]
- Tree-shaking Effectiveness: [X%]
- Code Splitting Points: [count]
- Lazy Load Opportunities: [count]
```

### Environment Configuration Parity
```yaml
Check Across [dev|staging|production]:
- Environment Variables:
  ✅/❌ All vars in .env.example
  ✅/❌ No secrets in code
  ✅/❌ Proper validation
  ✅/❌ Type safety (zod/t3-env)
  
- Database Configuration:
  ✅/❌ Migration sync status
  ✅/❌ Connection pooling
  ✅/❌ Prepared statements
  
- API Endpoints:
  ✅/❌ Consistent baseURLs
  ✅/❌ Proper error boundaries
  ✅/❌ Rate limiting configured
```

## 🔍 Phase 3: Dependency & Security Analysis

### Dependency Health Matrix
```markdown
| Category | Issue | Package | Severity | Action Required |
|----------|-------|---------|----------|-----------------|
| Phantom | Imported but not installed | [pkg] | 🔴 High | npm install [pkg] |
| Unused | In package.json but never imported | [pkg] | 🟡 Medium | npm uninstall [pkg] |
| Duplicate | Multiple versions in lock | [pkg] | 🟡 Medium | npm dedupe |
| Vulnerable | Security advisory | [pkg] | 🔴 High | npm audit fix |
| Outdated | Major version behind | [pkg] | 🟢 Low | Review changelog |
```

### Security Vulnerability Scan
```markdown
Priority Level Security Checks:

P0 - CRITICAL (Block Deployment):
- [ ] Hardcoded secrets/API keys
- [ ] SQL injection vulnerabilities
- [ ] XSS attack vectors
- [ ] Exposed .env files
- [ ] Missing authentication

P1 - HIGH (Fix Before Production):
- [ ] CORS misconfiguration (wildcards)
- [ ] Missing input validation
- [ ] Unencrypted sensitive data
- [ ] Missing rate limiting
- [ ] CSRF vulnerabilities

P2 - MEDIUM (Fix Within Sprint):
- [ ] Missing security headers
- [ ] Verbose error messages
- [ ] Directory traversal risks
- [ ] Weak password requirements
- [ ] Missing audit logs
```

### Bundle Size Analysis
```markdown
| Package | Size | Gzipped | % of Bundle | Tree-shakeable | Alternative |
|---------|------|---------|-------------|----------------|-------------|
| [large-pkg] | XMB | XKB | X% | Yes/No | [lighter-alternative] |
```

## 🔍 Phase 4: Framework-Specific Deep Dive

### Next.js App Router Specific
```typescript
// Server/Client Boundary Violations
type Violation = {
  file: string;
  line: number;
  issue: 'client-import-in-server' | 'server-only-in-client' | 'missing-use-directive';
  severity: 'error' | 'warning';
  fix: string;
}

// Data Fetching Patterns
type FetchIssue = {
  pattern: 'waterfall' | 'n+1' | 'missing-cache' | 'over-fetching';
  location: string;
  impact: 'performance' | 'cost' | 'ux';
  suggestion: string;
}
```

### React Performance Patterns
```markdown
Component Analysis:
- [ ] Unnecessary re-renders (missing memo)
- [ ] Large component trees (need splitting)
- [ ] Expensive computations (need useMemo)
- [ ] Effect cleanup issues
- [ ] Missing error boundaries
- [ ] Suspense boundaries placement
```

## 🔍 Phase 5: Testing & Quality Coverage

### Test Coverage Analysis
```markdown
| Type | Current | Target | Gap | Priority |
|------|---------|--------|-----|----------|
| Unit Tests | X% | 80% | X% | High |
| Integration | X% | 60% | X% | Medium |
| E2E Critical Paths | X% | 100% | X% | Critical |
| Accessibility | X% | 100% | X% | High |
| Performance | X% | 50% | X% | Medium |
```

### Quality Gates Checklist
```yaml
Pre-commit Hooks:
  ✅/❌ Linting (ESLint)
  ✅/❌ Formatting (Prettier)
  ✅/❌ Type checking
  ✅/❌ Import sorting
  ✅/❌ Commit message format

CI/CD Pipeline:
  ✅/❌ Automated tests
  ✅/❌ Build verification
  ✅/❌ Lighthouse scores
  ✅/❌ Bundle size checks
  ✅/❌ Security scanning
  ✅/❌ Dependency audit
```

## 🔍 Phase 6: Performance & Optimization

### Core Web Vitals Assessment
```markdown
| Metric | Current | Target | Status | Impact |
|--------|---------|--------|--------|--------|
| LCP (Largest Contentful Paint) | Xs | <2.5s | ✅/❌ | SEO |
| FID (First Input Delay) | Xms | <100ms | ✅/❌ | UX |
| CLS (Cumulative Layout Shift) | X | <0.1 | ✅/❌ | UX |
| TTFB (Time to First Byte) | Xms | <200ms | ✅/❌ | Performance |
| FCP (First Contentful Paint) | Xs | <1.8s | ✅/❌ | Perception |
```

### Resource Optimization Opportunities
```markdown
Images:
- [ ] Next-gen formats (WebP/AVIF)
- [ ] Responsive images
- [ ] Lazy loading
- [ ] CDN delivery

JavaScript:
- [ ] Code splitting
- [ ] Dynamic imports
- [ ] Tree shaking
- [ ] Minification

CSS:
- [ ] Critical CSS inline
- [ ] Unused CSS removal
- [ ] CSS modules/splitting
```

## 🔍 Phase 7: Production Readiness Checklist

### Deployment Configuration
```yaml
Required for Production:
  Infrastructure:
    ✅/❌ SSL certificates
    ✅/❌ CDN configured
    ✅/❌ Load balancing
    ✅/❌ Auto-scaling rules
    ✅/❌ Backup strategy
  
  Monitoring:
    ✅/❌ Error tracking (Sentry/etc)
    ✅/❌ APM (Application Performance)
    ✅/❌ Uptime monitoring
    ✅/❌ Log aggregation
    ✅/❌ Custom metrics/alerts
  
  Database:
    ✅/❌ Connection pooling
    ✅/❌ Query optimization
    ✅/❌ Backup automation
    ✅/❌ Migration strategy
    ✅/❌ Rollback plan
```

## 📊 Output Report Format

### Executive Summary
```markdown
# Technical & Production Audit Report
**Date**: [timestamp]
**Branch**: [branch-name]
**Deployment Target**: [platform]
**Framework**: [detected-framework]

## Production Readiness Score: [XX]%
🟢 Ready to Deploy (90-100%)
🟡 Minor Issues (70-89%)
🔴 Blocking Issues (<70%)

### Deployment Blockers (Must Fix)
1. 🚫 **[Critical Issue]** - Impact: [description] - Fix Time: [estimate]
2. 🚫 **[Critical Issue]** - Impact: [description] - Fix Time: [estimate]

### Risk Assessment
- **Security Risk**: [Low|Medium|High|Critical]
- **Performance Risk**: [Low|Medium|High|Critical]
- **Stability Risk**: [Low|Medium|High|Critical]
- **Scalability Risk**: [Low|Medium|High|Critical]
```

### Detailed Technical Findings

```markdown
## Category: [Name]
### Issue: [Title]
- **Severity**: [1-10] 🔴/🟡/🟢
- **Location**: `file:line`
- **Current State**:
  ```typescript
  // Problem code
  ```
- **Recommended Fix**:
  ```typescript
  // Fixed code
  ```
- **Impact if Unfixed**: [description]
- **Effort**: [XS|S|M|L|XL]
- **Automation**: [Available|Partial|Manual]
```

### Fix Priority Matrix
```markdown
|         | Urgent | Important | Nice to Have |
|---------|--------|-----------|--------------|
| Easy    | [Issues] | [Issues] | [Issues] |
| Medium  | [Issues] | [Issues] | [Issues] |
| Hard    | [Issues] | [Issues] | [Issues] |
```

### Automated Fix Commands
```bash
# Run these commands to auto-fix detected issues:

# Step 1: Type checking
npx tsc --noEmit

# Step 2: Lint and format
npm run lint:fix
npm run format

# Step 3: Dependency cleanup
npx depcheck
npm audit fix
npm dedupe

# Step 4: Build verification
npm run build

# Step 5: Test suite
npm test
npm run test:e2e

# Step 6: Performance check
npx lighthouse [URL] --output=json --output-path=./lighthouse-report.json
```

### Performance Optimization Plan
```markdown
## Quick Wins (Implement Today)
1. Enable gzip compression - 40% bundle reduction
2. Add image lazy loading - 2s faster LCP
3. Remove unused dependencies - 500KB saved

## Week 1 Optimizations
1. Implement code splitting
2. Add Redis caching layer
3. Optimize database queries

## Future Considerations
1. CDN implementation
2. Service worker for offline
3. WebAssembly for heavy computation
```

### Migration & Rollback Strategy
```markdown
## Deployment Steps
1. [ ] Run migrations on staging
2. [ ] Verify all environment variables
3. [ ] Run smoke tests
4. [ ] Deploy with feature flags
5. [ ] Monitor error rates

## Rollback Plan
- Trigger: [Error rate >X% | Response time >Xs]
- Method: [Blue-green | Canary | Instant]
- Recovery Time: [X minutes]
```

### Monitoring Setup Requirements
```yaml
Required Metrics:
  - Error rate per endpoint
  - P50/P95/P99 latencies
  - Database query times
  - Memory usage trends
  - Active user sessions

Alert Thresholds:
  - Error rate > 1%
  - P95 latency > 2s
  - Memory > 80%
  - Disk > 90%
```

## 📈 Trend Analysis
```markdown
## Compared to Last Audit
| Metric | Previous | Current | Trend |
|--------|----------|---------|-------|
| Type Errors | 45 | 12 | ↓ 73% ✅ |
| Bundle Size | 2.3MB | 1.8MB | ↓ 22% ✅ |
| Test Coverage | 35% | 67% | ↑ 91% ✅ |
| Vulnerabilities | 8 | 2 | ↓ 75% ✅ |
```

## 🎯 Recommended Action Plan

### Before Next Commit
- [ ] Fix all 🔴 security vulnerabilities
- [ ] Remove hardcoded secrets
- [ ] Add missing environment variables

### Before Deployment (Required)
- [ ] Achieve 80% test coverage on critical paths
- [ ] Fix all TypeScript errors
- [ ] Configure monitoring and alerts
- [ ] Document rollback procedure

### Post-Deployment (Week 1)
- [ ] Optimize largest bundle chunks
- [ ] Implement caching strategy
- [ ] Add performance monitoring
- [ ] Create runbooks for common issues

## 🔄 Next Steps
1. Fix all deployment blockers
2. Run `npm run build` to verify
3. Deploy to staging environment
4. Run smoke tests
5. Monitor for 24 hours
6. Deploy to production with canary

## 📝 Audit Metadata
- **Total Issues Found**: [count]
- **Auto-fixable**: [count] ([percentage]%)
- **Manual Fixes Required**: [count]
- **Estimated Fix Time**: [hours]
- **Confidence Level**: [percentage]%
- **Files Scanned**: [count]
- **Time Taken**: [duration]

---
*Generated by Technical & Production Audit v2.0*
*Ensure `content-documentation-audit.md` passed before deployment*