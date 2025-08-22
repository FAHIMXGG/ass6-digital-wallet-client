# Digital C - Digital Wallet Platform

A modern digital wallet and money transfer platform built with React, TypeScript, and Vite.

## Features

- 🔐 Secure authentication and authorization
- 💰 Digital wallet management
- 💸 Money transfer and transactions
- 👥 Multi-role support (Admin, Agent, User)
- 📱 Responsive design with modern UI
- 🌙 Dark/Light theme support
- 📊 Real-time transaction monitoring

## Tech Stack

- **Frontend**: React 19 + TypeScript + Vite
- **UI Components**: Radix UI + Tailwind CSS
- **State Management**: Redux Toolkit + RTK Query
- **Routing**: React Router
- **HTTP Client**: Axios
- **Form Handling**: React Hook Form + Zod validation

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd digital-c
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file in the root directory:
```env
VITE_BASE_URL=http://localhost:8000/api
```

4. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Deployment

This project is configured for easy deployment on Vercel. See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

### Quick Deploy to Vercel

1. Push your code to a Git repository
2. Connect your repository to Vercel
3. Set the environment variable `VITE_BASE_URL` to your production API URL
4. Deploy!

## Project Structure

```
src/
├── components/     # Reusable UI components
├── pages/         # Page components
├── redux/         # Redux store and API slices
├── routes/        # Routing configuration
├── types/         # TypeScript type definitions
├── utils/         # Utility functions
└── lib/           # External library configurations
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.
