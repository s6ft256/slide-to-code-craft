# Project Analysis: TBMS 2.0 - HSE Management System

## Executive Summary

**Project Name:** TBMS 2.0 (Trojan Business Management System 2.0)  
**Type:** Health, Safety & Environment (HSE) Management Dashboard  
**Purpose:** Comprehensive web-based HSE management system for construction projects  
**Status:** Active Development  
**Total Code Size:** ~20,920 lines of TypeScript/React code across 168 files

## Technology Stack

### Frontend Framework
- **React 18.3.1** - Core UI library
- **TypeScript 5.8.3** - Type-safe development
- **Vite 5.4.19** - Build tool and dev server
- **React Router DOM 6.30.1** - Client-side routing with HashRouter

### UI Component Library
- **shadcn/ui** - Radix UI-based component system with Tailwind CSS
  - Complete set of accessible, customizable components
  - 60+ UI components (buttons, forms, dialogs, dropdowns, etc.)
  - Dark mode support via next-themes

### Styling
- **Tailwind CSS 3.4.17** - Utility-first CSS framework
- **tailwindcss-animate** - Animation utilities
- **PostCSS** - CSS processing
- **Custom theme system** - Light/Dark mode with CSS variables

### State Management
- **React Context API** - Global state management
  - ProjectContext - Project selection and management
  - ThemeContext - Theme switching (light/dark)
- **Local Storage** - Primary data persistence layer
- **@tanstack/react-query 5.83.0** - Server state management (ready for API integration)

### Data Visualization
- **Recharts 2.15.4** - Chart and graph library
- **Lucide React 0.462.0** - Icon library (600+ icons)

### Form Management
- **React Hook Form 7.61.1** - Form state and validation
- **Zod 3.25.76** - Schema validation
- **@hookform/resolvers** - Form validation integration

### Date Handling
- **date-fns 3.6.0** - Date manipulation and formatting
- **react-day-picker 8.10.1** - Date picker component

### Development Tools
- **ESLint 9.32.0** - Code linting
- **TypeScript ESLint** - TypeScript-specific linting rules
- **Vite SWC Plugin** - Fast React refresh
- **gh-pages** - GitHub Pages deployment

## Project Architecture

### Application Structure

```
src/
├── App.tsx                 # Root application component with routing
├── main.tsx               # Application entry point
├── components/            # Reusable UI components
│   ├── ui/               # shadcn/ui components (60+ components)
│   ├── forms/            # Data entry forms (13 forms)
│   ├── charts/           # Data visualization components
│   ├── records/          # Data display/table components
│   ├── layout/           # Layout-related components
│   ├── auth/             # Authentication components
│   └── info/             # Information display components
├── pages/                # Page-level components (12 pages)
├── contexts/             # React Context providers
│   ├── ProjectContext.tsx    # Project selection state
│   └── ThemeContext.tsx      # Theme management
├── hooks/                # Custom React hooks (7 hooks)
├── lib/                  # Utility functions and types
└── integrations/         # External service integrations
```

### Data Architecture

**Primary Storage:** Browser LocalStorage  
**Data Model:** JSON-based with project-scoped keys

#### Key Data Collections:
1. **incident_report** - Incident tracking and management
2. **master_register** - Main HSE compliance register
3. **injury_details** - Injury incident records
4. **training_competency_register** - Training records
5. **ncr_register** - Non-Conformance Reports
6. **observation_tracker** - Safety observations
7. **hse_violations** - HSE violation records
8. **project_info_{code}** - Project-specific information
9. **selectedProject** - Currently active project

### Component Architecture

#### Layout System
- **Layout Component** - Base layout wrapper
  - HSEHeader - Top navigation and branding
  - HSESidebar - Side navigation menu
  - Main content area

#### Key Component Categories

1. **Forms (Data Entry)**
   - InductionForm - Employee induction records
   - MasterRegisterForm - HSE master register entries
   - InjuryDetailsForm - Injury incident reporting
   - ObservationTrackerForm - Safety observations
   - NCRForm - Non-conformance reports
   - IncidentReportForm - Comprehensive incident reporting
   - HSEViolationForm - HSE violation tracking
   - TrainingCompetencyForm - Training records
   - AddProjectInfoForm - Project configuration

2. **Records (Data Display)**
   - EventRecords - Event listings
   - TrainingRecords - Training history
   - InjuryDetailsRecords - Injury history
   - MasterRegisterRecords - Register view
   - NCRRecords - NCR history
   - ObservationTrackerRecords - Observation history
   - HSEViolationRecords - Violation history
   - TrainingCompetencyRecords - Competency tracking

3. **Charts & Metrics**
   - HSEMetricsGrid - Dashboard metrics overview
   - LTIChart - Lost Time Injury tracking
   - TrainingChart - Training statistics
   - MetricCard - Reusable metric display
   - ChartCard - Chart container component

4. **Project Management**
   - ProjectSelector - Project selection dropdown
   - ProjectInfo - Project details display
   - ProjectStatus - Project status dashboard

## Application Features

### 1. Dashboard (Index Page)
- **Purpose:** Central HSE metrics and KPI monitoring
- **Key Features:**
  - Weekly/Monthly view toggle
  - Real-time metrics from localStorage
  - Project information tab
  - HSE compliance metrics
  - Lost Time Injury (LTI) tracking
  - Training completion statistics
  - Incident trend analysis

### 2. Daily Management
- **Purpose:** Day-to-day HSE operations tracking
- **Key Features:**
  - Daily project status
  - Quick metric overview
  - Action items tracking
  - Real-time status updates

### 3. Data Entry
- **Purpose:** Manual data entry for all HSE records
- **Key Features:**
  - 8 different form types
  - Tab-based navigation
  - Form validation
  - LocalStorage persistence
  - Auto-increment serial numbers
  - Date/time tracking

### 4. Statistic Reports
- **Purpose:** HSE analytics and reporting
- **Key Features:**
  - Training statistics
  - Project status overview
  - Trend analysis
  - Exportable data views

### 5. Incident Management
- **Purpose:** Track and manage workplace incidents
- **Key Features:**
  - Incident reporting
  - Investigation tracking
  - Corrective action management
  - Incident metrics and KPIs

### 6. HSE Audit
- **Purpose:** HSE audit management and tracking
- **Key Features:**
  - Audit scheduling
  - Audit findings
  - Action tracking
  - Compliance monitoring

### 7. HSE Inspection
- **Purpose:** Safety inspection management
- **Key Features:**
  - Inspection records
  - Finding categorization
  - Follow-up tracking
  - Inspection metrics

### 8. Emergency Management
- **Purpose:** Emergency response planning and tracking
- **Key Features:**
  - Emergency drill records
  - Response planning
  - Equipment tracking
  - Contact management

### 9. HSE Violations
- **Purpose:** Track and manage HSE violations
- **Key Features:**
  - Violation recording
  - Severity classification
  - Corrective actions
  - Violation analytics

### 10. Library
- **Purpose:** Document and resource management
- **Key Features:**
  - Document upload (planned)
  - ISO procedures
  - HSE policies
  - Training materials

## Custom Hooks

### 1. use-dashboard-metrics.ts
- **Purpose:** Aggregate and calculate HSE metrics from localStorage
- **Key Metrics:**
  - Safe man-hours
  - Total employees
  - LTI/LTIFR/LTISR calculations
  - Training completion rates
  - Incident rates
  - Observation statistics
- **Time Periods:** Weekly, Monthly

### 2. use-incident-metrics.ts
- **Purpose:** Incident-specific metrics and calculations
- **Features:** Incident categorization, trend analysis

### 3. use-critical-incidents.ts
- **Purpose:** Track high-severity incidents
- **Features:** Critical incident filtering and alerts

### 4. use-serial-number.ts
- **Purpose:** Auto-increment serial numbers for forms
- **Features:** Unique ID generation per form type

### 5. use-file-upload.ts
- **Purpose:** File upload handling
- **Features:** File validation, upload management

### 6. use-mobile.tsx
- **Purpose:** Responsive design utilities
- **Features:** Mobile detection, breakpoint management

### 7. use-toast.ts
- **Purpose:** Toast notification management
- **Features:** Success/error notifications

## Project Context System

### ProjectProvider
- Manages currently selected project
- Persists selection to localStorage
- Default project: "TG000 - Zayed National Museum"
- Additional project: "TG-2134 - Baniyas West"
- Project properties:
  - code: Project identifier
  - name: Project name
  - type: Project type (Project, Maintenance, Infrastructure, etc.)

### ThemeProvider
- Light/Dark mode toggle
- Persists theme preference
- CSS variable-based theming
- Automatic system theme detection

## Data Flow

### Write Flow (Data Entry)
1. User fills form in Data Entry page
2. Form validation via React Hook Form + Zod
3. Data saved to localStorage with timestamp
4. Custom event dispatched: 'localStorageUpdate'
5. Dashboard components listen for updates
6. Metrics automatically recalculated

### Read Flow (Dashboard)
1. Dashboard loads via Index page
2. useDashboardMetrics hook initializes
3. Data fetched from localStorage
4. Metrics calculated based on time period
5. Components render with calculated metrics
6. Real-time updates via event listeners

### Project Switching
1. User selects project from ProjectSelector
2. ProjectContext updates selectedProject
3. Selection saved to localStorage
4. Components re-render with project-filtered data
5. Project-specific info loaded from `project_info_{code}`

## Key Metrics & KPIs

### Safety Metrics
- **LTI (Lost Time Injury)** - Work-related injuries causing absence
- **LTIFR (LTI Frequency Rate)** - LTI per million hours worked
- **LTISR (LTI Severity Rate)** - Days lost per LTI
- **TRIR (Total Recordable Incident Rate)** - All recordable incidents
- **Safe Man-hours** - Hours worked without LTI
- **Days Without LTI** - Consecutive safe days

### Compliance Metrics
- **HSE Audits** - Audit completion and findings
- **Inspections** - Inspection count and findings
- **NCRs (Non-Conformance Reports)** - Quality issues
- **Observations** - Safety observations logged
- **Violations** - HSE violation tracking
- **Training Completion** - Employee training rates

### Project Metrics
- **Project Progress** - Overall completion percentage
- **Project Duration** - Total project days
- **Elapsed Time** - Days since project start
- **Time to Completion** - Remaining project days
- **Project Status** - Active, Completed, On-hold

## Build & Development

### Available Scripts
```bash
npm run dev          # Start development server (port 8080)
npm run build        # Production build
npm run build:dev    # Development build
npm run lint         # Run ESLint
npm run preview      # Preview production build
npm run deploy       # Build and deploy to GitHub Pages
```

### Build Configuration
- **Base Path:** `/slide-to-code-craft/` (GitHub Pages)
- **Bundle Size:** ~1.1 MB (minified)
- **CSS Size:** ~74 KB (minified)
- **Target:** Modern browsers (ES2020+)
- **Build Time:** ~7 seconds

### Linting Status
- **Current Status:** 11 errors, 6 warnings
- **Main Issues:**
  - TypeScript `any` types (10 errors)
  - React Hook dependency warnings (6 warnings)
  - Missing dependency arrays in useEffect hooks

## Deployment

### GitHub Pages Configuration
- **Repository:** s6ft256/slide-to-code-craft
- **Deployment:** Automated via gh-pages
- **Build Process:**
  1. Run `npm run build`
  2. Generate static files to `dist/`
  3. Deploy `dist/` to gh-pages branch
- **Base URL:** /slide-to-code-craft/

### Environment Files
- `.env` - Development environment variables
- `.env.production` - Production environment variables
- `.env.example` - Environment template

## Future Enhancements (Based on Code Structure)

### 1. Database Migration
- Files present: `hse_database_schema.sql`, `SUPABASE_MIGRATION.md`
- Indicates planned migration from localStorage to Supabase
- SQL schema already defined
- Auth system prepared (`setup-auth.sql`, `test-auth.mjs`)

### 2. Authentication System
- Auth components exist (`src/pages/Auth.tsx`)
- User preferences RLS (Row Level Security) prepared
- Test files for auth integration present

### 3. Real-time Collaboration
- Custom event system for localStorage updates
- Foundation for WebSocket/real-time updates

### 4. File Upload System
- FileUploader component exists
- File upload hook implemented
- Ready for document management

### 5. Mobile Optimization
- Responsive design hooks present
- Mobile-specific utilities available

## Design System

### Color Scheme
- **Base Colors:** Slate palette
- **Theme:** CSS custom properties
- **Dark Mode:** Full support with automatic toggle
- **Accent Colors:**
  - Primary: Blue
  - Success: Green
  - Warning: Orange
  - Destructive: Red

### Typography
- **Font Family:** System fonts
- **Headings:** Bold, hierarchical sizing
- **Body:** Regular weight, optimal line height

### Components
- **Style:** Default (shadcn/ui)
- **Variants:** Button, Badge, Toggle with multiple variants
- **Spacing:** Tailwind spacing scale
- **Borders:** Rounded corners, subtle shadows

## Project Dependencies Summary

### Production Dependencies (52)
- **UI Framework:** React, React DOM
- **UI Components:** 25 Radix UI packages
- **Routing:** react-router-dom
- **State Management:** @tanstack/react-query
- **Forms:** react-hook-form, zod
- **Dates:** date-fns, react-day-picker
- **Charts:** recharts
- **Icons:** lucide-react
- **Styling:** tailwindcss, clsx, tailwind-merge
- **Theming:** next-themes
- **Utilities:** class-variance-authority, cmdk

### Development Dependencies (16)
- **Build:** Vite, @vitejs/plugin-react-swc
- **TypeScript:** TypeScript, type definitions
- **Linting:** ESLint with plugins
- **Styling:** PostCSS, Autoprefixer, Tailwind plugins
- **Deployment:** gh-pages
- **Tagging:** lovable-tagger

## Code Quality Metrics

### Structure
- **Total Files:** 168 TypeScript/React files
- **Total Lines:** ~20,920 lines
- **Components:** ~50 reusable components
- **Pages:** 12 page components
- **Hooks:** 7 custom hooks
- **Contexts:** 2 context providers

### Code Organization
- **Modularity:** High - clear separation of concerns
- **Reusability:** Good - extensive use of shared components
- **Type Safety:** Strong - TypeScript throughout
- **Documentation:** Minimal - inline comments only

## Security Considerations

### Current Security Measures
- **Client-side storage:** LocalStorage (not secure for sensitive data)
- **No authentication:** Open access to all features
- **No authorization:** No role-based access control
- **No encryption:** Data stored in plain text

### Recommended Security Enhancements
1. Implement authentication (Supabase Auth ready)
2. Add role-based access control (RBAC)
3. Encrypt sensitive data before storage
4. Implement Row Level Security (RLS) when migrating to Supabase
5. Add audit logging for data changes
6. Implement HTTPS-only cookies for sessions
7. Add CSRF protection for forms
8. Implement rate limiting for API calls

## Performance Considerations

### Current Performance
- **Initial Load:** ~1.1 MB JavaScript bundle (large)
- **First Paint:** Fast (Vite + SWC)
- **Data Access:** Instant (localStorage)
- **Re-renders:** Optimized with React.memo and useMemo

### Performance Recommendations
1. **Code Splitting:** Use React.lazy for routes and large components
2. **Tree Shaking:** Remove unused Radix UI components
3. **Image Optimization:** Optimize background images (bkg2.png is 3.4 MB)
4. **Bundle Analysis:** Use rollup-plugin-visualizer
5. **Lazy Loading:** Defer non-critical components
6. **Service Worker:** Add for offline capability
7. **Caching Strategy:** Implement cache-first for static assets

## Accessibility

### Current Accessibility Features
- **Radix UI Components:** Built-in ARIA attributes
- **Keyboard Navigation:** Full keyboard support
- **Focus Management:** Proper focus trapping in dialogs
- **Screen Reader Support:** Semantic HTML and ARIA labels

### Accessibility Recommendations
1. Add skip navigation links
2. Implement ARIA live regions for dynamic updates
3. Add high-contrast mode support
4. Ensure color contrast ratios meet WCAG 2.1 AA standards
5. Add focus indicators for all interactive elements
6. Test with screen readers (NVDA, JAWS, VoiceOver)

## Testing Strategy (Recommended)

### Unit Testing
- **Tool:** Vitest (Vite-native)
- **Coverage Target:** 80%+
- **Priority:** Hooks, utility functions, form validation

### Integration Testing
- **Tool:** React Testing Library
- **Coverage:** Form submissions, data flow, context providers

### End-to-End Testing
- **Tool:** Playwright or Cypress
- **Coverage:** Critical user flows, data entry, dashboard updates

### Visual Regression Testing
- **Tool:** Percy or Chromatic
- **Coverage:** UI components, theme switching

## Conclusion

**TBMS 2.0** is a comprehensive, well-structured HSE management system built with modern React and TypeScript. The application demonstrates:

### Strengths
✅ Clean architecture with clear separation of concerns  
✅ Modern tech stack with industry-standard tools  
✅ Extensive UI component library (shadcn/ui)  
✅ Type-safe development with TypeScript  
✅ Responsive design with dark mode support  
✅ Comprehensive HSE feature set  
✅ Real-time data updates via custom events  
✅ Prepared for database migration (Supabase)  

### Areas for Improvement
⚠️ Large bundle size (needs code splitting)  
⚠️ LocalStorage-only (no server-side persistence)  
⚠️ No authentication/authorization  
⚠️ Limited test coverage  
⚠️ Some TypeScript `any` types need refinement  
⚠️ Large image assets need optimization  
⚠️ Documentation could be more comprehensive  

### Next Steps
1. Implement database migration to Supabase
2. Add authentication and authorization
3. Optimize bundle size with code splitting
4. Add comprehensive test coverage
5. Improve type safety (remove `any` types)
6. Add API integration layer
7. Implement real-time collaboration features
8. Enhance documentation with API docs and user guides

The project is production-ready for internal use with localStorage but requires database integration and security enhancements for multi-user production deployment.

---

**Analysis Date:** 2025  
**Analyzed Version:** Current HEAD (a8be215)  
**Lines of Code:** ~20,920  
**Components:** 168 files
