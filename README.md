# Digital C - Digital Wallet Platform
Credentials:
admin: a1@example.com || password123
agent: ag1@example.com || password123

live client:https://ass6-digital-wallet-client.vercel.app/

A modern, feature-rich digital wallet platform built with React and TypeScript, offering secure money transfers, transaction management, and multi-role user support.

## 🚀 Project Overview

Digital C is a comprehensive digital wallet application that enables users to manage their finances, send money, track transactions, and maintain their wallet balance. The platform supports three distinct user roles:

- **Users**: Send money, withdraw funds, view transaction history, and manage their wallet
- **Agents**: Handle cash-in and cash-out operations for users
- **Admins**: Manage all users, agents, wallets, and transactions across the platform

### Key Features

- 💳 **Wallet Management**: View balance, transaction history, and wallet settings
- 💸 **Money Transfers**: Send money to other users securely
- 📊 **Transaction Tracking**: Detailed transaction logs and history
- 👥 **Multi-Role Support**: User, Agent, and Admin interfaces
- 🎨 **Modern UI**: Beautiful, responsive design with dark/light theme support
- 🎯 **Guided Tour**: Interactive onboarding for new users
- 🔒 **Secure Authentication**: Protected routes and role-based access
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile devices

## 🛠 Technology Stack

### Frontend
- **React 18** - Modern React with hooks and functional components
- **TypeScript** - Type-safe JavaScript development
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **Shadcn/ui** - Beautiful, accessible component library
- **Lucide React** - Modern icon library

### State Management & API
- **Redux Toolkit** - State management with RTK Query
- **Axios** - HTTP client for API requests
- **React Router** - Client-side routing

### UI/UX Libraries
- **Driver.js** - Interactive guided tour system
- **React Hook Form** - Form handling and validation
- **Zod** - Schema validation
- **Sonner** - Toast notifications

### Development Tools
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **TypeScript** - Static type checking

## 📦 Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd digital-c
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Configuration**
   Create a `.env` file in the root directory:
   ```env
   VITE_API_BASE_URL=your_api_base_url_here
   VITE_APP_NAME=Digital C
   ```

4. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
# or
yarn build
```

### Preview Production Build

```bash
npm run preview
# or
yarn preview
```

## 🏗 Project Structure

```
digital-c/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── ui/             # Shadcn/ui components
│   │   ├── layout/         # Layout components
│   │   └── GuidedTour.tsx  # Interactive tour system
│   ├── pages/              # Page components
│   │   ├── admin/          # Admin-specific pages
│   │   ├── agent/          # Agent-specific pages
│   │   └── user/           # User-specific pages
│   ├── redux/              # Redux store and API slices
│   ├── routes/             # Route configurations
│   ├── types/              # TypeScript type definitions
│   ├── utils/              # Utility functions
│   └── hooks/              # Custom React hooks
├── public/                 # Static assets
└── package.json           # Dependencies and scripts
```

## 🎯 Features in Detail

### User Dashboard
- **Overview**: Wallet balance, recent transactions, quick actions
- **Send Money**: Transfer funds to other users
- **Withdraw**: Cash out funds from wallet
- **Transaction History**: Detailed logs of all financial activities
- **Profile Management**: Update personal information and settings

### Agent Features
- **Cash In**: Process user deposits
- **Cash Out**: Handle user withdrawals
- **Transaction Management**: Track all cash operations
- **User Management**: View and manage assigned users

### Admin Panel
- **User Management**: View, edit, and manage all users
- **Agent Management**: Block/unblock agents and manage permissions
- **Wallet Overview**: Monitor all wallet activities
- **Transaction Monitoring**: Track all platform transactions
- **System Settings**: Configure platform-wide settings

### Guided Tour System
- **Interactive Onboarding**: 6-step tour for new users
- **Smart Detection**: Only shows for new users (localStorage + sessionStorage)
- **Manual Restart**: Available in Settings and floating button
- **Keyboard Shortcuts**: Ctrl/Cmd + H to restart tour
- **Role-Based Content**: Adapts to user role (User/Agent/Admin)

## 🌐 Live URL

The application is deployed and accessible at:
**Coming Soon** - Deployment in progress

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Configure environment variables
3. Deploy automatically on push to main branch

### Netlify
1. Build the project: `npm run build`
2. Upload the `dist` folder to Netlify
3. Configure environment variables

### Other Platforms
The application can be deployed to any static hosting platform that supports React applications.

## 🔧 Configuration

### Environment Variables
```env
VITE_API_BASE_URL=https://your-api-domain.com/api
VITE_APP_NAME=Digital C
VITE_APP_VERSION=1.0.0
```

### API Configuration
The application expects a RESTful API with the following endpoints:
- Authentication (login, register, user info)
- Wallet operations (balance, transactions)
- User management (CRUD operations)
- Transaction processing

## 🎨 Customization

### Themes
The application supports both light and dark themes:
- Toggle via the theme button in the sidebar
- Automatically detects system preference
- Persists user choice in localStorage

### Styling
- Built with Tailwind CSS for easy customization
- Shadcn/ui components for consistent design
- Custom CSS variables for theming

## 🧪 Testing

```bash
# Run tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## 📝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes and commit: `git commit -m 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Support

For support and questions:
- Create an issue in the GitHub repository
- Contact the development team
- Check the documentation in the `/docs` folder

## 🔄 Version History

- **v1.0.0** - Initial release with core wallet functionality
- **v1.1.0** - Added guided tour system and improved UX
- **v1.2.0** - Enhanced admin panel and transaction monitoring

---

**Built with ❤️ using React, TypeScript, and modern web technologies**
