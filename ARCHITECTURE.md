# TBMS 2.0 - System Architecture

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         TBMS 2.0 - HSE Management System                 │
│                         (React 18 + TypeScript + Vite)                   │
└─────────────────────────────────────────────────────────────────────────┘
                                      │
                    ┌─────────────────┴─────────────────┐
                    │                                     │
            ┌───────▼────────┐                  ┌────────▼────────┐
            │  React Router   │                  │  Context API    │
            │   (HashRouter)  │                  │   Providers     │
            └───────┬────────┘                  └────────┬────────┘
                    │                                     │
        ┌───────────┼─────────────┬──────────────────────┤
        │           │             │                      │
    ┌───▼───┐  ┌───▼───┐    ┌───▼────┐          ┌─────▼─────┐
    │ Pages │  │Layout │    │Components│          │  Contexts  │
    │  (12) │  │System │    │  (~50)   │          │ProjectCtx │
    └───┬───┘  └───┬───┘    └───┬────┘          │ ThemeCtx  │
        │          │            │                └─────┬─────┘
        │          │            │                      │
        └──────────┴────────────┴──────────────────────┤
                                                       │
                          ┌────────────────────────────▼────────┐
                          │      Custom Hooks (7)               │
                          │  - useDashboardMetrics              │
                          │  - useIncidentMetrics               │
                          │  - useCriticalIncidents             │
                          │  - useSerialNumber                  │
                          │  - useFileUpload                    │
                          │  - useMobile                        │
                          │  - useToast                         │
                          └────────────────┬────────────────────┘
                                          │
                          ┌───────────────▼───────────────┐
                          │    Browser LocalStorage       │
                          │  - incident_report            │
                          │  - master_register            │
                          │  - injury_details             │
                          │  - training_competency_register│
                          │  - ncr_register               │
                          │  - observation_tracker        │
                          │  - hse_violations             │
                          │  - project_info_{code}        │
                          │  - selectedProject            │
                          └───────────────────────────────┘
```

## Component Hierarchy

```
App (Root)
│
├── QueryClientProvider
│   └── ThemeProvider
│       └── ProjectProvider
│           └── TooltipProvider
│               └── HashRouter
│                   └── Routes
│                       ├── Index (Dashboard)
│                       ├── DailyManagement
│                       ├── DataEntry
│                       ├── StatisticReports
│                       ├── IncidentManagement
│                       ├── HSEAudit
│                       ├── HSEInspection
│                       ├── EmergencyManagement
│                       ├── HSEViolations
│                       ├── Library
│                       └── NotFound
│
└── Toaster Components
    ├── Toaster (shadcn)
    └── Sonner
```

## Page Structure

Each page follows a consistent structure:

```
Layout (Wrapper)
│
├── HSEHeader (Top Navigation)
│   ├── Logo
│   ├── ProjectSelector
│   ├── ThemeToggle
│   ├── Generate Report Button
│   ├── Data Entry Link
│   ├── NotificationDropdown
│   └── UserProfileDropdown
│
├── HSESidebar (Left Navigation)
│   ├── Dashboard Link
│   ├── Daily Management Link
│   ├── Statistic Reports Link
│   ├── Incident Management Link
│   ├── HSE Audit Link
│   ├── HSE Inspection Link
│   ├── Emergency Management Link
│   ├── HSE Violations Link
│   └── Library Link
│
└── Main Content Area
    └── Page-specific Content
```

## Data Flow Architecture

### Write Flow (User Input → Storage)

```
┌─────────────────┐
│  User Action    │ (Fill form in Data Entry page)
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Form Component  │ (React Hook Form + Zod Validation)
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Form Handler    │ (onSubmit function)
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  LocalStorage   │ (JSON.stringify + localStorage.setItem)
│     Write       │ (Key: 'incident_report', 'master_register', etc.)
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Custom Event    │ (window.dispatchEvent('localStorageUpdate'))
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│Event Listeners  │ (Dashboard components listening)
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  UI Update      │ (Metrics recalculated and re-rendered)
└─────────────────┘
```

### Read Flow (Storage → Display)

```
┌─────────────────┐
│  Page Mount     │ (Dashboard loads)
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Custom Hook     │ (useDashboardMetrics initializes)
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  LocalStorage   │ (localStorage.getItem for all data sources)
│     Read        │ (JSON.parse)
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│Data Processing  │ (Filter by time period, calculate metrics)
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  State Update   │ (setMetrics with calculated values)
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Component      │ (Re-render with new data)
│   Re-render     │
└─────────────────┘
```

## State Management Architecture

### Global State (Context API)

```
┌──────────────────────────────────────────────────┐
│              ProjectContext                       │
│  - selectedProject: Project                      │
│  - setSelectedProject: (project) => void         │
│                                                  │
│  Stored in: localStorage['selectedProject']      │
│  Default: { code: "TG000",                       │
│             name: "Zayed National Museum",       │
│             type: "Project" }                    │
└──────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────┐
│               ThemeContext                        │
│  - theme: 'light' | 'dark'                       │
│  - toggleTheme: () => void                       │
│                                                  │
│  Stored in: localStorage['theme']                │
│  Applied to: document.documentElement.classList  │
└──────────────────────────────────────────────────┘
```

### Local State (Component State)

- Form data (React Hook Form)
- Loading states (useState)
- Error states (useState)
- Tab selections (useState)
- Dialog/Modal visibility (useState)

### Server State (React Query - Ready for API)

```
QueryClient configuration present but not yet used
Ready for:
- API data fetching
- Cache management
- Background refetching
- Optimistic updates
```

## Form Architecture

### Form Components

```
Form Component (e.g., IncidentReportForm)
│
├── React Hook Form
│   ├── useForm hook
│   ├── Field registrations
│   └── Form validation (Zod schema)
│
├── Form Fields (shadcn/ui)
│   ├── Input
│   ├── Select
│   ├── Checkbox
│   ├── Radio Group
│   ├── Date Picker
│   └── Textarea
│
├── Validation Layer
│   ├── Zod schema definition
│   ├── Field-level validation
│   └── Form-level validation
│
└── Submit Handler
    ├── Data transformation
    ├── LocalStorage write
    ├── Event dispatch
    └── Success/Error feedback
```

### Form Data Model

```typescript
interface FormData {
  // Auto-generated
  id: string;                    // Unique identifier
  serialNumber: string;          // Auto-increment per form type
  createdAt: string;            // ISO timestamp
  
  // User input
  [fieldName: string]: any;     // Form-specific fields
  
  // Metadata
  projectCode?: string;         // Associated project
  status?: string;              // Record status
}
```

## Metrics Calculation Flow

```
┌─────────────────────────────────────────────────────────────┐
│         useDashboardMetrics Hook                             │
└──────────────────────┬──────────────────────────────────────┘
                       │
        ┌──────────────┴──────────────┐
        │                             │
        ▼                             ▼
┌──────────────┐            ┌──────────────┐
│ Load All Data│            │ Time Filter  │
│ from Storage │            │ (week/month) │
└──────┬───────┘            └──────┬───────┘
       │                           │
       └─────────┬─────────────────┘
                 │
                 ▼
    ┌────────────────────────┐
    │  Calculate Metrics     │
    ├────────────────────────┤
    │ - Safe Man Hours       │
    │ - Total Employees      │
    │ - LTI Count            │
    │ - LTIFR                │
    │ - LTISR                │
    │ - Training Completion  │
    │ - Incident Rates       │
    │ - NCR Statistics       │
    │ - Observation Counts   │
    │ - Violation Counts     │
    └────────────┬───────────┘
                 │
                 ▼
    ┌────────────────────────┐
    │   Return Metrics       │
    │   Object to Component  │
    └────────────────────────┘
```

## UI Component Library Architecture

### shadcn/ui Component Structure

```
src/components/ui/
│
├── Form Components
│   ├── button.tsx
│   ├── input.tsx
│   ├── textarea.tsx
│   ├── select.tsx
│   ├── checkbox.tsx
│   ├── radio-group.tsx
│   ├── switch.tsx
│   └── slider.tsx
│
├── Overlay Components
│   ├── dialog.tsx
│   ├── alert-dialog.tsx
│   ├── sheet.tsx
│   ├── popover.tsx
│   ├── dropdown-menu.tsx
│   ├── context-menu.tsx
│   ├── hover-card.tsx
│   └── tooltip.tsx
│
├── Layout Components
│   ├── card.tsx
│   ├── separator.tsx
│   ├── tabs.tsx
│   ├── accordion.tsx
│   ├── collapsible.tsx
│   └── resizable.tsx
│
├── Navigation Components
│   ├── navigation-menu.tsx
│   ├── menubar.tsx
│   ├── breadcrumb.tsx
│   └── pagination.tsx
│
├── Feedback Components
│   ├── toast.tsx
│   ├── alert.tsx
│   ├── badge.tsx
│   ├── progress.tsx
│   └── skeleton.tsx
│
└── Data Display
    ├── table.tsx
    ├── chart.tsx
    ├── avatar.tsx
    └── calendar.tsx
```

## Routing Architecture

```
HashRouter (GitHub Pages Compatible)
│
├── Base Path: /slide-to-code-craft/
│
└── Routes
    ├── / → Index (Dashboard)
    ├── /daily-management → DailyManagement
    ├── /data-entry → DataEntry
    ├── /statistic-reports → StatisticReports
    ├── /incident-management → IncidentManagement
    ├── /incident-management/new → IncidentManagement
    ├── /hse-audit → HSEAudit
    ├── /hse-inspection → HSEInspection
    ├── /emergency-management → EmergencyManagement
    ├── /hse-violations → HSEViolations
    ├── /library → Library
    └── /* → NotFound
```

## Security Architecture (Current State)

```
┌─────────────────────────────────────────────────┐
│         Current Security Model                   │
│                                                 │
│  ❌ No Authentication                           │
│  ❌ No Authorization                            │
│  ❌ No Encryption                               │
│  ❌ Client-side Storage Only (LocalStorage)     │
│  ❌ No Session Management                       │
│  ❌ No CSRF Protection                          │
│  ❌ No Rate Limiting                            │
│                                                 │
│  ⚠️  All data accessible to anyone with         │
│      browser access                             │
└─────────────────────────────────────────────────┘
```

### Planned Security Architecture (Supabase)

```
┌─────────────────────────────────────────────────┐
│        Future Security Model                     │
│                                                 │
│  ✅ Supabase Authentication                     │
│  ✅ Row Level Security (RLS)                    │
│  ✅ Role-Based Access Control (RBAC)            │
│  ✅ Encrypted Connections (HTTPS)               │
│  ✅ Server-side Session Management              │
│  ✅ API Rate Limiting                           │
│  ✅ Audit Logging                               │
│                                                 │
│  Files Ready:                                   │
│  - hse_database_schema.sql                      │
│  - setup-auth.sql                               │
│  - user_preferences_rls.sql                     │
│  - SUPABASE_MIGRATION.md                        │
└─────────────────────────────────────────────────┘
```

## Performance Architecture

### Current Performance Characteristics

```
Build Output:
├── index.html: 1.48 KB
├── CSS Bundle: 74.02 KB (gzipped: 12.52 KB)
└── JS Bundle: 1,097.05 KB (gzipped: 297.72 KB)

Performance Metrics:
├── Initial Load: ~300 KB (gzipped)
├── First Paint: < 1 second (Vite + SWC)
├── Data Access: Instant (localStorage)
└── Re-renders: Optimized (React.memo, useMemo)

Optimization Opportunities:
├── ⚠️ Large JS bundle (needs code splitting)
├── ⚠️ Large image assets (bkg2.png: 3.4 MB)
├── ✅ Tree shaking enabled
└── ✅ CSS purging via Tailwind
```

### Recommended Performance Optimizations

```
1. Code Splitting
   ├── React.lazy() for routes
   ├── Dynamic imports for heavy components
   └── Route-based splitting

2. Asset Optimization
   ├── Compress images (WebP format)
   ├── Lazy load images
   └── CDN for static assets

3. Bundle Optimization
   ├── Manual chunks for vendor code
   ├── Remove unused Radix UI components
   └── Tree shake lodash/date-fns

4. Caching Strategy
   ├── Service Worker for offline support
   ├── Cache-first for static assets
   └── Network-first for dynamic data

5. Runtime Optimization
   ├── Virtualize long lists
   ├── Debounce search inputs
   └── Memoize expensive calculations
```

## Deployment Architecture

```
┌─────────────────────────────────────────────────┐
│            GitHub Pages Deployment               │
└──────────────────┬──────────────────────────────┘
                   │
        ┌──────────┴──────────┐
        │                     │
        ▼                     ▼
┌──────────────┐    ┌──────────────┐
│   gh-pages   │    │  Build Step  │
│    Branch    │    │              │
│              │    │ npm run build│
│   /dist      │◄───│              │
│   contents   │    │ vite build   │
└──────────────┘    └──────────────┘
        │
        ▼
┌──────────────────────────────┐
│    GitHub Pages CDN          │
│                              │
│  https://s6ft256.github.io/  │
│  slide-to-code-craft/        │
└──────────────────────────────┘
```

## Future Database Architecture (Planned)

```
┌─────────────────────────────────────────────────┐
│              Supabase Backend                    │
├─────────────────────────────────────────────────┤
│                                                 │
│  PostgreSQL Database                            │
│  ├── users (Auth)                               │
│  ├── projects                                   │
│  ├── incidents                                  │
│  ├── injuries                                   │
│  ├── trainings                                  │
│  ├── ncrs                                       │
│  ├── observations                               │
│  ├── violations                                 │
│  └── audit_logs                                 │
│                                                 │
│  Supabase Features                              │
│  ├── Real-time subscriptions                    │
│  ├── Row Level Security                         │
│  ├── Auto-generated REST API                    │
│  ├── Auto-generated GraphQL API                 │
│  └── Storage for file uploads                   │
│                                                 │
└─────────────────────────────────────────────────┘
        │
        ▼ (API Calls)
┌─────────────────────────────────────────────────┐
│         React Application (Frontend)             │
│                                                 │
│  React Query for:                               │
│  ├── Data fetching                              │
│  ├── Cache management                           │
│  ├── Optimistic updates                         │
│  └── Background sync                            │
└─────────────────────────────────────────────────┘
```

## Development Workflow Architecture

```
Developer Workflow
│
├── Local Development
│   ├── npm run dev (Port 8080)
│   ├── Hot Module Replacement (HMR)
│   ├── TypeScript type checking
│   └── ESLint on save
│
├── Code Quality
│   ├── npm run lint (ESLint)
│   ├── TypeScript compiler (tsc)
│   └── Pre-commit hooks (optional)
│
├── Build Process
│   ├── npm run build (Production)
│   ├── npm run build:dev (Development)
│   └── npm run preview (Test build)
│
└── Deployment
    ├── npm run deploy
    ├── Build to dist/
    ├── Push to gh-pages branch
    └── GitHub Pages serves site
```

## Technology Decision Matrix

| Technology | Choice | Rationale | Alternatives Considered |
|------------|--------|-----------|------------------------|
| **Frontend Framework** | React 18 | Industry standard, large ecosystem, hooks API | Vue.js, Angular, Svelte |
| **Type System** | TypeScript | Type safety, better DX, scales well | Flow, JSDoc |
| **Build Tool** | Vite | Fast HMR, modern, excellent DX | Webpack, Rollup, Parcel |
| **UI Library** | shadcn/ui + Radix UI | Accessible, customizable, copy-paste | Chakra UI, MUI, Ant Design |
| **Styling** | Tailwind CSS | Utility-first, fast development, small bundle | CSS Modules, Styled Components, Emotion |
| **Routing** | React Router v6 | Standard for React, flexible | TanStack Router, Wouter |
| **Forms** | React Hook Form | Performance, DX, validation integration | Formik, Final Form |
| **Validation** | Zod | Type-safe, composable, great TS integration | Yup, Joi, Vest |
| **State Management** | Context API | Built-in, sufficient for current needs | Redux, Zustand, Jotai |
| **Data Fetching** | React Query | Ready for API, cache management | SWR, Apollo Client |
| **Date Handling** | date-fns | Lightweight, tree-shakeable | Moment.js, Day.js, Luxon |
| **Charts** | Recharts | React-friendly, composable | Chart.js, Victory, D3 |
| **Icons** | Lucide React | Modern, consistent, tree-shakeable | React Icons, Heroicons |

## Scalability Considerations

### Current Scale

```
Current Capacity:
├── Users: Single user (no auth)
├── Projects: 2 (hard-coded)
├── Data Storage: Browser localStorage (~5-10 MB)
├── Concurrent Users: N/A (client-side only)
└── Records: Limited by localStorage quota
```

### Future Scale (With Supabase)

```
Target Capacity:
├── Users: 100+ concurrent users
├── Projects: Unlimited
├── Data Storage: PostgreSQL (TB scale)
├── Concurrent Requests: Handled by Supabase
├── Records: Millions
└── File Storage: Supabase Storage (GB scale)

Scalability Features:
├── Database connection pooling
├── Read replicas for reporting
├── CDN for static assets
├── API rate limiting
├── Horizontal scaling via Supabase
└── Background jobs for heavy processing
```

## Monitoring & Observability (Future)

```
Recommended Monitoring Stack:

Application Monitoring
├── Sentry (Error tracking)
├── LogRocket (Session replay)
└── Google Analytics (User analytics)

Performance Monitoring
├── Web Vitals (Core metrics)
├── Lighthouse CI (Performance budgets)
└── Bundle Analyzer (Bundle size tracking)

Backend Monitoring (Supabase)
├── Supabase Dashboard (DB metrics)
├── Query performance monitoring
└── API latency tracking
```

## Testing Architecture (Recommended)

```
Testing Pyramid
│
├── E2E Tests (10%)
│   └── Playwright/Cypress
│       ├── Critical user flows
│       ├── Form submissions
│       └── Data entry → Dashboard update
│
├── Integration Tests (30%)
│   └── React Testing Library
│       ├── Component interactions
│       ├── Context providers
│       └── Custom hooks
│
└── Unit Tests (60%)
    └── Vitest
        ├── Utility functions
        ├── Metric calculations
        └── Form validations
```

---

**Document Version:** 1.0  
**Last Updated:** 2025  
**Maintained By:** Development Team
