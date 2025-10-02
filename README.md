# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

**PauProg Resources** is a React-based web application for managing personal learning resources. Built with React 19, Vite, TailwindCSS, and Supabase, it provides authenticated users the ability to create, edit, and organize their educational resources with links.

The application is fully in Spanish ("Recursos | PauProg") and uses Supabase for authentication and data persistence.

## Common Development Commands

### Development Server
```bash
npm run dev
# Starts Vite development server with HMR on http://localhost:5173
```

### Build & Preview
```bash
npm run build
# Builds for production using Vite

npm run preview
# Preview the production build locally
```

### Code Quality
```bash
npm run lint
# Runs ESLint on all JavaScript/JSX files
# Uses @eslint/js, react-hooks, and react-refresh plugins
# Configured for ES2020 with JSX support
```

### Single File Testing/Linting
```bash
npx eslint src/path/to/file.jsx
# Lint a specific file

npx vite build --mode development
# Development build for debugging
```

## Architecture Overview

### Application Structure
```
src/
├── components/           # Reusable UI components
│   ├── AddRecourse.jsx   # Modal for adding new resources
│   ├── EditRecourse.jsx  # Modal for editing existing resources
│   └── UserProfile.jsx   # User profile management
├── pages/                # Route-level components
│   ├── Home.jsx          # Main dashboard with resources list
│   ├── Login.jsx         # User authentication
│   ├── Signup.jsx        # User registration
│   └── NotFound.jsx      # 404 page
├── context/              # Authentication protection
│   ├── AuthProtector.jsx # Redirects authenticated users away from auth pages
│   └── HomeProtector.jsx # Protects private routes, requires authentication
├── lib/                  # External service configuration
│   └── supabase.js       # Supabase client initialization
├── App.jsx               # Route configuration with protection wrappers
└── main.jsx              # React app entry point
```

### Key Architectural Patterns

**Authentication Flow**: The app uses two protection components:
- `AuthProtector`: Prevents authenticated users from accessing login/signup pages
- `HomeProtector`: Ensures only authenticated users can access the main application

**Data Management**: Uses Supabase for:
- User authentication (getUser, auth state)
- Resource CRUD operations on `recourses` table
- Real-time data fetching with user-scoped queries

**Modal Pattern**: Components like `AddRecourse` and `EditRecourse` are rendered conditionally as overlays with backdrop blur effects.

**State Management**: Uses React's built-in hooks (useState, useEffect) for local state management. No external state management library is used.

### Database Schema
The app expects a Supabase table called `recourses` with:
- `id` (primary key)
- `user_id` (foreign key to auth.users)
- `title` (text)
- `content` (text, stores URLs)
- `created_at` (timestamp)

### Styling & UI
- **TailwindCSS v4** via `@tailwindcss/vite` plugin
- **Boxicons** for iconography (loaded from CDN)
- **Responsive design** with mobile-first approach
- **Modal overlays** with backdrop blur effects

## Configuration Details

### Path Aliases
- `@/*` maps to `src/*` (configured in both `vite.config.js` and `jsconfig.json`)

### Environment Variables Required
```bash
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### ESLint Configuration
- Uses flat config format with ES2020 + JSX
- Ignores `dist/` directory
- Custom rule: `no-unused-vars` with exception for uppercase constants
- React Hooks and React Refresh plugins enabled

## Development Patterns

### Component Structure
Components follow a consistent pattern:
- Import statements (React hooks, Supabase, other components)
- State declarations using useState hooks
- useEffect for data fetching/side effects
- Event handlers (often async for Supabase operations)
- JSX return with TailwindCSS classes

### Data Fetching Pattern
```javascript
const fetchRecourses = async () => {
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) return;
    
    const { data, error } = await supabase
        .from('recourses')
        .select('*')
        .order('created_at', { ascending: false })
        .eq('user_id', user.id);
};
```

### Authentication Checks
Always verify user authentication before database operations and use user.id for data scoping.

## File Naming Conventions
- React components use PascalCase with `.jsx` extension
- Utility files use camelCase with `.js` extension
- Context providers use PascalCase ending with "Protector"
- Pages are named with PascalCase and exported as named exports