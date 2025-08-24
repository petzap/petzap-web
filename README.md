# PetZap Web Application

A modern Next.js application for pet management with role-based access control, featuring separate admin and super admin panels.

## Features

- **Role-Based Authentication**: Separate login panels for admin and super admin users
- **Modern UI**: Built with Tailwind CSS and Radix UI components
- **State Management**: Zustand for efficient state management
- **Type Safety**: Full TypeScript support
- **Responsive Design**: Mobile-first responsive design
- **API Integration**: Axios-based API service layer with interceptors

## Tech Stack

- **Frontend**: Next.js 14 with App Router
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI
- **State Management**: Zustand
- **Form Handling**: React Hook Form with Zod validation
- **HTTP Client**: Axios
- **Icons**: Lucide React
- **TypeScript**: Full type safety

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd petzap-web
```

2. Install dependencies:
```bash
npm install
```

3. Create environment variables (optional):
```bash
cp .env.example .env.local
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/                    # Next.js app router pages
│   ├── admin/             # Admin dashboard routes
│   ├── super-admin/       # Super admin dashboard routes
│   ├── login/             # Login page
│   └── globals.css        # Global styles
├── components/             # Reusable UI components
│   ├── ui/                # Base UI components (Button, Input, etc.)
│   └── auth/              # Authentication components
├── lib/                    # Utility functions
├── store/                  # Zustand stores
├── services/               # API services
├── types/                  # TypeScript type definitions
└── hooks/                  # Custom React hooks
```

## Authentication

The application supports two user roles:

### Admin Panel
- Access to pet management
- Client management
- Appointment scheduling
- Basic reporting

### Super Admin Panel
- Full system access
- User management
- System configuration
- Infrastructure monitoring
- Advanced analytics

## Demo Credentials

For testing purposes, use these credentials:

**Admin Login:**
- Email: `admin@example.com`
- Password: `password123`

**Super Admin Login:**
- Email: `super.admin@example.com`
- Password: `password123`

## API Integration

The application includes a comprehensive API service layer:

- **Axios Configuration**: Base URL, timeouts, and headers
- **Request Interceptors**: Automatic token injection
- **Response Interceptors**: Token refresh handling
- **Error Handling**: Centralized error management

### API Service Methods

```typescript
import { apiService } from '@/services/api'

// GET request
const data = await apiService.get('/endpoint')

// POST request
const response = await apiService.post('/endpoint', data)

// PUT request
const updated = await apiService.put('/endpoint', data)

// DELETE request
await apiService.delete('/endpoint')
```

## State Management

Zustand is used for state management with persistence:

```typescript
import { useAuthStore } from '@/store/auth-store'

const { user, isAuthenticated, login, logout } = useAuthStore()
```

## Customization

### Adding New Components

1. Create component in `src/components/ui/`
2. Export from `src/components/ui/index.ts`
3. Use in your pages

### Adding New Routes

1. Create directory in `src/app/`
2. Add `page.tsx` file
3. Implement your component

### Styling

The application uses Tailwind CSS with custom CSS variables. Modify `src/app/globals.css` to change the design system.

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Code Style

- Use TypeScript for all components
- Follow ESLint configuration
- Use Tailwind CSS for styling
- Implement proper error handling

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Connect repository to Vercel
3. Deploy automatically

### Other Platforms

1. Build the application: `npm run build`
2. Deploy the `out` directory
3. Configure environment variables

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions, please open an issue in the repository.
