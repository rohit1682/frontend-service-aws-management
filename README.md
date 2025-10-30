# Frontend Service AWS Management

A comprehensive, enterprise-grade React application designed for AWS service management and monitoring. This application serves as a centralized platform for managing multiple AWS accounts, generating detailed reports, and providing real-time insights into cloud infrastructure usage and costs.

## Overview

**Workmates AWS Management Portal** is a sophisticated web application that streamlines AWS infrastructure management through an intuitive, modern interface. The platform enables organizations to efficiently manage multiple AWS accounts, monitor resource utilization, generate comprehensive reports, and onboard new users with guided workflows.

### Key Capabilities

- **Multi-Account Management**: Centralized management of multiple AWS accounts with region-specific configurations
- **Real-Time Dashboard**: Live statistics and metrics with animated visualizations
- **Advanced Reporting**: Generate detailed usage and cost reports with customizable date ranges
- **User Onboarding**: Guided setup process for new team members
- **Secure Authentication**: Enterprise-grade login system with route protection
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Modern UI/UX**: Clean, professional interface with smooth animations and transitions

## Tech Stack

- **Frontend Framework**: React 19.1.1 with TypeScript
- **Build Tool**: Vite (using Rolldown for enhanced performance)
- **State Management**: Redux Toolkit with React Redux
- **Routing**: React Router DOM v6
- **Styling**: Tailwind CSS with PostCSS
- **UI Components**: Custom components with Lucide React icons
- **Animations**: Framer Motion
- **Form Validation**: Zod
- **Notifications**: React Hot Toast
- **Development**: ESLint with TypeScript support

## Features

### 🏠 Dashboard
- **Welcome Card**: Personalized greeting with company branding and overview
- **Statistics Cards**: Real-time metrics including:
  - Total AWS accounts managed (12 active accounts)
  - Active users count (24 users)
  - Last account onboarded tracking
- **Quick Actions Panel**: One-click access to frequently used features
- **Recent Activity Feed**: Live updates of AWS account changes and activities
- **Animated Visualizations**: Smooth transitions and hover effects for enhanced UX

### 🏢 Account Management
- **Multi-Account Dashboard**: Visual cards displaying all AWS accounts with key information
- **Account Creation**: Streamlined form for adding new AWS accounts with validation
- **Account Editing**: In-place editing of account details and configurations
- **Region Management**: Multi-region selector with search and filtering capabilities
- **Account Search**: Real-time search across account names, IDs, and regions
- **Bulk Operations**: Support for managing multiple accounts simultaneously
- **Account Status Tracking**: Visual indicators for account health and status

### 📊 Advanced Reporting
- **Custom Date Ranges**: Flexible start and end date selection with month/year dropdowns
- **Account Filtering**: Generate reports for specific accounts or all accounts
- **Interactive Forms**: Searchable dropdowns with validation and error handling
- **Report Generation**: PDF export functionality with comprehensive data
- **Usage Analytics**: Detailed breakdowns by service, region, and cost categories
- **Cost Analysis**: Financial insights and spending patterns across time periods

### 🚀 User Onboarding
- **4-Step Guided Process**:
  1. **AWS Account Connection**: Secure linking of AWS credentials
  2. **Permission Configuration**: IAM roles and policy setup
  3. **Monitoring Setup**: CloudWatch alarms and notification configuration
  4. **Review & Completion**: Final verification and activation
- **Progress Tracking**: Visual indicators showing completion status
- **Help Documentation**: Integrated support and guidance throughout the process

### 🔐 Authentication & Security
- **Secure Login System**: Enterprise-grade authentication with form validation
- **Route Protection**: Automatic redirection for unauthorized access attempts
- **Session Management**: Persistent login state with secure token handling
- **Error Handling**: Comprehensive error messages and recovery options
- **Professional Login UI**: Split-screen design with company branding

### 🎨 User Experience
- **Responsive Design**: Optimized for all device sizes (mobile, tablet, desktop)
- **Modern Animations**: Framer Motion integration for smooth transitions
- **Loading States**: Custom loader components with full-screen and inline variants
- **Toast Notifications**: Real-time feedback for user actions
- **Scroll Management**: Automatic scroll-to-top on navigation
- **Accessibility**: WCAG compliant design with proper ARIA labels

### ⚡ Technical Features
- **State Management**: Redux Toolkit for centralized application state
- **Type Safety**: Full TypeScript implementation with strict type checking
- **Form Validation**: Zod schema validation with real-time error feedback
- **API Integration**: Structured hooks for data fetching and mutations
- **Performance Optimization**: Code splitting and lazy loading
- **Error Boundaries**: Graceful error handling and recovery
- **Development Tools**: Hot reload, ESLint, and comprehensive debugging

## Project Structure

```
frontend-service-aws-management/
├── public/                     # Static assets
├── src/
│   ├── assets/                 # Images, icons, and static files
│   ├── components/             # Reusable UI components
│   │   ├── auth/              # Authentication-related components
│   │   │   ├── AuthInitializer.tsx
│   │   │   ├── PrimaryButton.tsx
│   │   │   └── TextField.tsx
│   │   ├── dashboard/         # Dashboard-specific components
│   │   │   ├── ActionCard.tsx
│   │   │   ├── StatCard.tsx
│   │   │   └── WelcomeCard.tsx
│   │   ├── forms/             # Form components
│   │   │   └── AccountForm.tsx
│   │   ├── navigation/        # Navigation components
│   │   │   └── NavOptions.tsx
│   │   ├── ui/                # Generic UI components
│   │   │   └── MultiRegionSelector.tsx
│   │   └── ScrollToTop.tsx    # Scroll management component
│   ├── constants/             # Application constants
│   │   ├── accounts.ts        # Account-related constants
│   │   ├── dashboard.tsx      # Dashboard constants
│   │   └── regions.ts         # AWS regions configuration
│   ├── hooks/                 # Custom React hooks
│   │   ├── redux.ts           # Redux hooks
│   │   ├── useAccounts.ts     # Account management hook
│   │   ├── useAuth.ts         # Authentication hook
│   │   ├── useAuthWithNavigation.ts # Auth with navigation
│   │   ├── usePageLoader.ts   # Loading state hook
│   │   └── useScrollToTop.ts  # Scroll management hook
│   ├── interfaces/            # TypeScript interfaces
│   │   ├── common/            # Common interfaces
│   │   │   ├── validation.interfaces.ts
│   │   │   └── commonInterfaceExports.ts
│   │   ├── components/        # Component interfaces
│   │   │   ├── dropdown.interfaces.ts
│   │   │   └── componentInterfaceExports.ts
│   │   ├── forms/             # Form interfaces
│   │   │   ├── accountForm.interfaces.ts
│   │   │   ├── loginForm.interfaces.ts
│   │   │   ├── reportForm.interfaces.ts
│   │   │   └── formInterfaceExports.ts
│   │   └── interfaceExports.ts # Main interface exports
│   ├── layouts/               # Layout components
│   │   └── SidebarLayout.tsx  # Main application layout
│   ├── pages/                 # Page components
│   │   ├── Accounts.tsx       # Account management page
│   │   ├── Dashboard.tsx      # Main dashboard
│   │   ├── Login.tsx          # Authentication page
│   │   ├── MyAccount.tsx      # User profile page
│   │   ├── Reports.tsx        # Reports and analytics
│   │   └── UserOnboard.tsx    # User onboarding flow
│   ├── store/                 # Redux store configuration
│   │   ├── authSlice.ts       # Authentication state
│   │   ├── loadingSlice.ts    # Loading state management
│   │   └── index.ts           # Store configuration
│   ├── types/                 # TypeScript type definitions
│   │   ├── forms/             # Form-related types
│   │   │   ├── dropdown.types.ts
│   │   │   └── formTypeExports.ts
│   │   ├── hooks/             # Hook-related types
│   │   │   └── hookTypeExports.ts
│   │   ├── auth.ts            # Authentication types
│   │   ├── dashboard.ts       # Dashboard types
│   │   ├── navigation.ts      # Navigation types
│   │   └── typeExports.ts     # Main type exports
│   ├── utils/                 # Utility functions and components
│   │   ├── Loader/            # Loading component and related utilities
│   │   │   ├── Loader.tsx     # Loading component
│   │   │   └── loaderExports.ts # Loader exports
│   │   ├── validations/       # Validation utilities
│   │   │   ├── accountForm.validation.ts
│   │   │   ├── common.validation.ts
│   │   │   ├── loginForm.validation.ts
│   │   │   ├── reportForm.validation.ts
│   │   │   └── validationExports.ts # Validation exports
│   │   ├── formatting.ts      # Data formatting utilities
│   │   └── utilityExports.ts  # Main utility exports
│   ├── App.tsx                # Main application component
│   ├── App.css                # Application styles
│   ├── main.tsx               # Application entry point
│   └── index.css              # Global styles
├── dist/                      # Build output directory
├── node_modules/              # Dependencies
├── .git/                      # Git repository
├── .kiro/                     # Kiro IDE configuration
├── .vscode/                   # VS Code configuration
├── eslint.config.js           # ESLint configuration
├── index.html                 # HTML template
├── package.json               # Project dependencies and scripts
├── package-lock.json          # Dependency lock file
├── postcss.config.js          # PostCSS configuration
├── tailwind.config.js         # Tailwind CSS configuration
├── tsconfig.json              # TypeScript configuration
├── tsconfig.app.json          # App-specific TypeScript config
├── tsconfig.node.json         # Node-specific TypeScript config
├── vite.config.ts             # Vite build configuration
└── README.md                  # Project documentation
```

## Getting Started

### Prerequisites
- Node.js (version 18 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd frontend-service-aws-management
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build the application for production
- `npm run lint` - Run ESLint for code quality checks
- `npm run preview` - Preview the production build locally

## Application Architecture

### Authentication Flow
1. **Initial Access**: Unauthenticated users are automatically redirected to the login page
2. **Login Process**: Secure authentication with email/password validation
3. **Route Protection**: All application routes require authentication except `/login`
4. **Session Persistence**: Authentication state maintained across browser sessions
5. **Automatic Redirection**: Authenticated users accessing root path are redirected to dashboard

### Navigation Structure & User Journey

#### 🏠 Dashboard (`/dashboard`)
- **Primary Landing Page**: Central hub after successful authentication
- **Key Metrics Display**: 
  - Total Accounts: 12 active AWS accounts
  - Active Users: 24 team members
  - Recent Onboarding: Latest account addition tracking
- **Quick Actions**: Direct navigation to frequently used features
- **Activity Stream**: Real-time updates of system changes and user activities

#### 🏢 Accounts (`/accounts`)
- **Account Overview**: Grid layout of all managed AWS accounts
- **Search & Filter**: Real-time search across account names, IDs, and regions
- **Account Operations**:
  - Create new AWS accounts with region selection
  - Edit existing account configurations
  - Delete accounts with confirmation dialogs
- **Region Management**: Multi-region selector supporting all AWS regions
- **Visual Feedback**: Hover effects, loading states, and success notifications

#### 📊 Reports (`/reports`)
- **Report Configuration**: 
  - Account selection (individual or all accounts)
  - Custom date range selection (month/year dropdowns)
  - Form validation with real-time error feedback
- **Report Generation**: PDF export with comprehensive usage and cost data
- **Interactive UI**: Searchable dropdowns, animated form elements
- **Data Visualization**: Detailed breakdowns by service, region, and cost categories

#### 🚀 User Onboard (`/user-onboard`)
- **Step-by-Step Process**:
  1. **AWS Connection**: Secure credential linking
  2. **Permissions**: IAM role configuration
  3. **Monitoring**: CloudWatch setup
  4. **Completion**: Final review and activation
- **Progress Tracking**: Visual completion indicators
- **Guided Experience**: Contextual help and documentation

#### 👤 My Account (`/my-account`)
- **Profile Management**: User settings and preferences
- **Account Configuration**: Personal dashboard customization
- **Security Settings**: Password management and session control

### Data Flow Architecture
- **Redux Store**: Centralized state management for authentication and loading states
- **Custom Hooks**: Encapsulated business logic for data fetching and mutations
- **Type-Safe APIs**: Full TypeScript integration with interface definitions
- **Error Handling**: Comprehensive error boundaries and user feedback
- **Loading Management**: Global and component-level loading state handling

## Development Guidelines

### Code Organization
- Components are organized by feature and reusability
- Custom hooks encapsulate business logic
- Types and interfaces are centrally managed
- Constants are separated by domain
- Utilities provide common functionality

### State Management
- Redux Toolkit for global state management
- Separate slices for different domains (auth, loading)
- Custom hooks for accessing store state
- Type-safe store configuration

### Styling Approach
- Tailwind CSS for utility-first styling
- Custom CSS for complex animations
- Responsive design with mobile-first approach
- Consistent design system through Tailwind configuration

## Build and Deployment

### Production Build
```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory, ready for deployment to any static hosting service.

### Build Optimization
- Uses Rolldown-Vite for enhanced build performance
- Tree shaking for optimal bundle size
- TypeScript compilation with strict type checking
- ESLint integration for code quality

## Contributing

1. Follow the established project structure
2. Use TypeScript for all new code
3. Implement proper error handling
4. Add appropriate type definitions
5. Follow the existing code style and conventions
6. Test your changes thoroughly before submitting

## License

This project is private and proprietary.
