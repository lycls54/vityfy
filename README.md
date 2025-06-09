# CVCraft - Professional CV Builder

Modern, high-performance CV builder application built with Next.js 15 and a scalable monorepo architecture.

## 🚀 Features

- ⚡ **Performance Optimized** - Image optimization, bundle analysis, edge runtime
- 🔍 **SEO Ready** - Meta tags, structured data, sitemap generation  
- 🎨 **Modern UI** - Tailwind CSS with shadcn/ui components
- 🔐 **Authentication** - NextAuth.js with multiple providers
- 📊 **Database** - Prisma with PostgreSQL
- 🧪 **Testing** - Vitest + Playwright
- 📝 **Type Safety** - Full TypeScript support
- 🚀 **Developer Experience** - ESLint, Prettier, Husky
- 🤖 **AI Integration** - AI-powered content suggestions
- 📄 **Multiple Export Formats** - PDF, DOCX, HTML

## 🏗️ Architecture

This project uses a monorepo structure with multiple packages:

```
cvcraft/
├── apps/
│   └── web/                 # Next.js web application
├── packages/
│   ├── core/               # Shared types, utils, validation
│   ├── ui/                 # Reusable UI components
│   ├── cv-builder/         # CV building logic
│   ├── templates/          # CV templates
│   ├── export/             # Export functionality
│   └── api/                # API client
```

## 🛠️ Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **React 19** - Latest stable React
- **TypeScript 5. **Run development server:**
```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## 📜 Scripts

### Development
- `pnpm dev` - Start all development servers in parallel
- `pnpm build` - Build all packages and applications
- `pnpm start` - Start production server
- `pnpm clean` - Clean all build artifacts and dependencies

### Code Quality
- `pnpm lint` - Run ESLint on all packages
- `pnpm lint:fix` - Fix ESLint issues automatically
- `pnpm type-check` - Run TypeScript compiler checks
- `pnpm format` - Format code with Prettier
- `pnpm format:check` - Check code formatting

### Testing
- `pnpm test` - Run unit tests with Vitest
- `pnpm test:coverage` - Run tests with coverage report
- `pnpm e2e` - Run end-to-end tests with Playwright
- `pnpm e2e:ui` - Run E2E tests with UI

### Package Management
- `pnpm build:packages` - Build only packages
- `pnpm build:apps` - Build only applications
- `pnpm analyze` - Analyze bundle size

## 📦 Package Structure

### @cvcraft/core
Core utilities, types, and shared logic for the entire monorepo.

**Features:**
- TypeScript type definitions for all entities
- Zod validation schemas
- Utility functions (string, date, ID generation)
- Shared constants and error messages

### @cvcraft/ui
Reusable UI component library built with Radix UI and Tailwind CSS.

**Components:**
- Form components (Button, Input, Select, etc.)
- Layout components (Container, Card, Grid)
- Feedback components (Toast, Progress, Spinner)
- Navigation components (Tabs, Dropdown)

### @cvcraft/cv-builder
Core CV building functionality and business logic.

**Features:**
- CV data management
- Section editing logic
- Validation and form handling
- Real-time preview

### @cvcraft/templates
CV template system with customizable designs.

**Features:**
- Template engine
- Dynamic styling
- Layout customization
- Preview generation

### @cvcraft/export
Export functionality for multiple formats.

**Features:**
- PDF generation
- DOCX export
- HTML export
- Print optimization

### @cvcraft/api
API client and data fetching utilities.

**Features:**
- Type-safe API calls
- Authentication handling
- Error management
- Caching strategies

## 🎨 UI Components

The design system is built with accessibility and consistency in mind:

```tsx
import { Button, Card, Input, Label } from '@cvcraft/ui'

function MyForm() {
  return (
    <Card>
      <form className="space-y-4 p-6">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input id="name" placeholder="Enter your name" />
        </div>
        <Button type="submit">Save</Button>
      </form>
    </Card>
  )
}
```

## 🧪 Testing

### Unit Tests
```bash
# Run all unit tests
pnpm test

# Run tests in watch mode
pnpm test --watch

# Run with coverage
pnpm test:coverage
```

### E2E Tests
```bash
# Run all E2E tests
pnpm e2e

# Run E2E tests with UI
pnpm e2e:ui

# Run specific test file
pnpm e2e tests/cv-builder.spec.ts
```

## 🚀 Deployment

### Vercel (Recommended)
```bash
# Deploy to Vercel
vercel

# Set environment variables
vercel env add
```

### Docker
```bash
# Build Docker image
docker build -t cvcraft .

# Run container
docker run -p 3000:3000 cvcraft
```

### Environment Variables

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/cvcraft"

# Authentication
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key"

# OAuth Providers
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
GITHUB_CLIENT_ID="your-github-client-id"
GITHUB_CLIENT_SECRET="your-github-client-secret"

# AI Services
OPENAI_API_KEY="your-openai-api-key"

# Analytics
NEXT_PUBLIC_GA_ID="your-google-analytics-id"

# Storage
NEXT_PUBLIC_STORAGE_URL="your-storage-url"
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Workflow

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Run tests: `pnpm test`
5. Run linting: `pnpm lint:fix`
6. Commit changes: `git commit -m 'Add amazing feature'`
7. Push to branch: `git push origin feature/amazing-feature`
8. Open a Pull Request

### Code Style

- Use TypeScript for all new code
- Follow the existing code style (Prettier + ESLint)
- Write tests for new features
- Update documentation as needed

## 📈 Performance

- **Lighthouse Score:** 95+ across all metrics
- **Bundle Size:** Optimized with tree shaking and code splitting
- **Image Optimization:** Automatic WebP/AVIF conversion
- **Caching:** Aggressive caching strategies for static assets
- **Edge Runtime:** Deployed to edge locations globally

## 🔒 Security

- **CSP Headers:** Content Security Policy implementation
- **HTTPS Only:** Secure connections enforced
- **Input Validation:** All inputs validated on client and server
- **Authentication:** Secure session management
- **Data Protection:** GDPR compliant data handling

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

- **Documentation:** [docs.cvcraft.app](https://docs.cvcraft.app)
- **Issues:** [GitHub Issues](https://github.com/your-org/cvcraft/issues)
- **Discord:** [Join our community](https://discord.gg/cvcraft)
- **Email:** support@cvcraft.app

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React framework for production
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Radix UI](https://www.radix-ui.com/) - Low-level UI primitives
- [Prisma](https://www.prisma.io/) - Next-generation ORM
- [Vercel](https://vercel.com/) - Deployment and hosting platform6** - Type safety
- **Tailwind CSS 3.4** - Utility-first CSS
- **Framer Motion** - Animations
- **Radix UI** - Accessible components

### Backend & Data
- **Prisma 5.22** - Type-safe ORM
- **NextAuth.js 4.24** - Authentication
- **TanStack Query 5.59** - Server state management
- **Zustand 5.0** - Client state management

### Development & Testing
- **Vitest** - Unit testing
- **Playwright** - E2E testing
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Husky** - Git hooks

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm 9+

### Installation

1. **Clone the repository:**
```bash
git clone https://github.com/your-org/cvcraft.git
cd cvcraft
```

2. **Install dependencies:**
```bash
pnpm install
```

3. **Setup environment variables:**
```bash
cp .env.example .env
# Fill in your environment variables
```

4. **Setup database:**
```bash
pnpm db:push
pnpm db:generate
```

5.