# TBMS 2.0 - HSE Management System

> Comprehensive Health, Safety & Environment management system for construction projects

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-18.3.1-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4.19-purple.svg)](https://vitejs.dev/)

## 📋 Overview

TBMS 2.0 (Trojan Business Management System 2.0) is a modern, web-based HSE (Health, Safety & Environment) management dashboard designed for construction project safety monitoring and compliance tracking. Built with React, TypeScript, and modern web technologies, it provides comprehensive tools for managing incidents, tracking compliance, and monitoring safety metrics.

## 🚀 Quick Start

\`\`\`bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Deploy to GitHub Pages
npm run deploy
\`\`\`

The application will be available at \`http://localhost:8080/slide-to-code-craft/\`

## 📸 Screenshots

### Dashboard View
![Dashboard](https://github.com/user-attachments/assets/4bb294cf-62ab-451b-9f64-90afa6244143)

### Data Entry Forms
![Data Entry](https://github.com/user-attachments/assets/c021b233-08d1-4b26-98c6-f034e8788d92)

### Dark Mode
![Dark Mode](https://github.com/user-attachments/assets/bdef1239-1e8b-449c-9dfc-b76011eecb8e)

## ✨ Key Features

- **📊 Real-time Dashboard** - Live HSE metrics and KPIs with weekly/monthly views
- **📝 Comprehensive Data Entry** - 8 different form types for all HSE data
- **📈 Advanced Analytics** - Safety statistics, trend analysis, and reporting
- **🔍 Incident Management** - Track, investigate, and manage workplace incidents
- **✅ HSE Compliance** - Audit tracking, inspections, and violation management
- **👥 Multi-Project Support** - Switch between different projects seamlessly
- **🌙 Dark Mode** - Full theme support with light/dark mode toggle
- **📱 Responsive Design** - Works on desktop, tablet, and mobile devices
- **💾 Offline-First** - Data stored locally in browser (no server required)

## 🏗️ Technology Stack

- **Frontend:** React 18.3.1 + TypeScript 5.8.3
- **Build Tool:** Vite 5.4.19
- **UI Components:** shadcn/ui (Radix UI + Tailwind CSS)
- **Routing:** React Router v6 (HashRouter)
- **State Management:** React Context API + React Query
- **Forms:** React Hook Form + Zod validation
- **Charts:** Recharts
- **Styling:** Tailwind CSS 3.4.17
- **Icons:** Lucide React
- **Date Handling:** date-fns

## 📚 Documentation

- **[📖 PROJECT_ANALYSIS.md](./PROJECT_ANALYSIS.md)** - Comprehensive project analysis and documentation
- **[🏛️ ARCHITECTURE.md](./ARCHITECTURE.md)** - System architecture and design decisions

## 📂 Project Structure

\`\`\`
src/
├── App.tsx                 # Root application component
├── main.tsx               # Application entry point
├── components/            # Reusable UI components
│   ├── ui/               # shadcn/ui components (60+)
│   ├── forms/            # Data entry forms (13 forms)
│   ├── charts/           # Data visualization
│   ├── records/          # Data display tables
│   └── layout/           # Layout components
├── pages/                # Page-level components (12 pages)
│   ├── Index.tsx         # Dashboard
│   ├── DataEntry.tsx     # Data entry forms
│   ├── DailyManagement.tsx
│   ├── StatisticReports.tsx
│   ├── IncidentManagement.tsx
│   ├── HSEAudit.tsx
│   ├── HSEInspection.tsx
│   ├── EmergencyManagement.tsx
│   ├── HSEViolations.tsx
│   └── Library.tsx
├── contexts/             # React Context providers
│   ├── ProjectContext.tsx
│   └── ThemeContext.tsx
├── hooks/                # Custom React hooks (7)
└── lib/                  # Utility functions
\`\`\`

## 🎯 Key Metrics & KPIs

The system tracks comprehensive HSE metrics:

### Safety Metrics
- **LTI (Lost Time Injury)** - Work-related injuries causing absence
- **LTIFR** - Lost Time Injury Frequency Rate
- **LTISR** - Lost Time Injury Severity Rate
- **TRIR** - Total Recordable Incident Rate
- **Safe Man-hours** - Hours worked without LTI
- **Days Without LTI** - Consecutive safe days

### Compliance Metrics
- HSE Audits & Findings
- Safety Inspections
- Non-Conformance Reports (NCRs)
- Safety Observations
- HSE Violations
- Training Completion Rates

## 🔧 Development

### Prerequisites
- Node.js 18+ 
- npm or bun

### Environment Setup

\`\`\`bash
# Clone the repository
git clone https://github.com/s6ft256/slide-to-code-craft.git
cd slide-to-code-craft

# Install dependencies
npm install

# Start development server
npm run dev
\`\`\`

### Code Quality

\`\`\`bash
# Run linter
npm run lint

# Build project
npm run build
\`\`\`

## 📦 Data Storage

Currently uses browser **localStorage** for data persistence:
- \`incident_report\` - Incident records
- \`master_register\` - Main HSE register
- \`injury_details\` - Injury records
- \`training_competency_register\` - Training records
- \`ncr_register\` - Non-conformance reports
- \`observation_tracker\` - Safety observations
- \`hse_violations\` - Violation records
- \`project_info_{code}\` - Project information
- \`selectedProject\` - Active project

## 🚀 Deployment

The project is configured for GitHub Pages deployment:

\`\`\`bash
npm run deploy
\`\`\`

This will:
1. Build the production bundle
2. Deploy to the \`gh-pages\` branch
3. Make the site available at: \`https://s6ft256.github.io/slide-to-code-craft/\`

## 🔮 Roadmap

### Planned Features
- [ ] **Database Migration** - Move from localStorage to Supabase
- [ ] **Authentication** - User login and role-based access control
- [ ] **File Uploads** - Document management and attachments
- [ ] **Real-time Collaboration** - Multi-user support with live updates
- [ ] **Mobile App** - Native mobile applications
- [ ] **Advanced Reporting** - PDF export and custom reports
- [ ] **API Integration** - REST API for external integrations
- [ ] **Notifications** - Email and push notifications

Files ready for migration:
- \`hse_database_schema.sql\` - PostgreSQL schema
- \`setup-auth.sql\` - Authentication setup
- \`SUPABASE_MIGRATION.md\` - Migration guide

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (\`git checkout -b feature/AmazingFeature\`)
3. Commit your changes (\`git commit -m 'Add some AmazingFeature'\`)
4. Push to the branch (\`git push origin feature/AmazingFeature\`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👥 Team

Developed by the TBMS HSE Team

## 📞 Support

For support, please open an issue in the GitHub repository.

---

**Built with ❤️ using React, TypeScript, and modern web technologies**
