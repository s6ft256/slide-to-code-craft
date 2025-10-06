# HSE Management System

A modern Health, Safety, and Environment (HSE) management system dashboard built with React, TypeScript, and TailwindCSS.

## Features

- Health & safety metrics dashboard
- Incident management and reporting
- HSE audits and inspections
- HSE violation tracking
- Emergency management
- Daily management tools
- Statistical reports
- User authentication with Google, GitHub, email/password, or anonymous access

## Tech Stack

- React
- TypeScript
- TailwindCSS
- React Router DOM
- React Query
- Supabase Authentication
- Recharts for data visualization
- Lucide React for icons
- Shadcn/ui for UI components

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Supabase account (project already set up)

### Supabase Project Information

The application is already configured to use a Supabase project with the following details:
- Project Name: hse_wkflow
- Project ID: tjwntuutssejybhpdnbe
- URL: https://tjwntuutssejybhpdnbe.supabase.co

### Installation

1. Clone the repository
```bash
git clone https://github.com/your-username/slide-to-code-craft.git
cd slide-to-code-craft
```

2. Install dependencies
```bash
npm install
# or
yarn
```

3. Set up environment variables

Create a `.env` file in the root directory. The application is configured to use Supabase for authentication:
```bash
# Supabase configuration
VITE_SUPABASE_URL=https://tjwntuutssejybhpdnbe.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRqd250dXV0c3NlanliaHBkbmJlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc2NDU3NTksImV4cCI6MjA3MzIyMTc1OX0.iqqvanvFR8YBNxlnjGHoh-EpNEkbg9lpgAei-I0BZbM
```

These credentials connect to the HSE Workflow Supabase project. For local development without proper Supabase configuration, the app falls back to localStorage for authentication.

4. Set up OAuth providers (optional)

To enable Google and GitHub authentication, run the helper script:
```bash
./scripts/setup-oauth.sh
```
This will guide you through setting up OAuth providers in the Supabase dashboard.
Copy the `.env.example` file to `.env` and update the values:
```bash
cp .env.example .env
```

4. Configure Supabase Authentication

In the Supabase dashboard:
   - Go to Authentication > Settings > URL Configuration
   - Add http://localhost:8080/slide-to-code-craft/ to the Site URL list
   - Add http://localhost:8080/slide-to-code-craft/ to the Redirect URLs list
   - Enable the Google and GitHub auth providers in Authentication > Settings > External OAuth Providers
   - For anonymous authentication, go to Authentication > Providers and ensure "Anonymous" is enabled

### Authentication Options

The application supports multiple authentication methods:

1. **Email/Password**: Traditional sign-up and login with email and password
2. **Google OAuth**: Sign in with Google account
3. **GitHub OAuth**: Sign in with GitHub account
4. **Anonymous Authentication**: Quick access as a guest user by clicking "Continue as Guest"

Anonymous users have limited permissions but can still view most of the application. This is useful for demo purposes or for users who want to try the application before creating an account.

5. Start the development server
```bash
npm run dev
# or
yarn dev
```

## Build for Production

```bash
npm run build
# or
yarn build
```

## Deployment

The app can be deployed to any static hosting service like Netlify, Vercel, or GitHub Pages.

```bash
npm run deploy
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.