# AI Girlfriend Chat Platform

A Next.js-based AI companion platform featuring romantic AI characters with image generation capabilities.

## Features

- 🤖 **AI Character Chat** - Engage in deeply romantic, passionate conversations with AI companions
- 🎨 **AI Image Generation** - Create custom AI-generated images using advanced models
- 👥 **Character Creation** - Design and customize your own AI characters with unique personalities
- 💎 **Token System** - Credit-based system for image generation and premium features
- 🔐 **User Authentication** - Secure login with Supabase authentication
- 👑 **Admin Dashboard** - Complete admin panel for user, character, and token management
- 💳 **Premium Subscriptions** - Multiple subscription tiers with different benefits
- 🌐 **Multi-language Support** - English language interface with translation system
- 📱 **Responsive Design** - Mobile-friendly interface with dark mode support

## Tech Stack

- **Framework**: Next.js 15.5.2 (App Router)
- **Language**: TypeScript
- **Database**: Supabase (PostgreSQL with Row Level Security)
- **Authentication**: Supabase Auth
- **AI Chat**: Novita AI API (Llama 3.1 8B Instruct)
- **Image Generation**: Novita AI API (Flux models)
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Package Manager**: pnpm

## Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm installed globally
- Supabase account and project
- Novita AI API key

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd DINTYP.SE-2025-master
```

2. Install dependencies:
```bash
pnpm install
```

3. Set up environment variables (create `.env.local`):
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
NOVITA_API_KEY=your_novita_api_key
NEXT_PUBLIC_NOVITA_API_KEY=your_novita_api_key
```

4. Run database migrations (SQL files in `/migrations` and root directory)

5. Start the development server:
```bash
pnpm dev
```

6. Open [http://localhost:3000](http://localhost:3000)

## Admin Access

Default admin credentials:
- Email: `admin@example.com`
- Password: `admin`

**Important**: Change these credentials immediately after first login!

## Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes (image generation, token management)
│   ├── admin/             # Admin dashboard pages
│   ├── chat/              # Chat interface
│   ├── characters/        # Character browsing
│   ├── create-character/  # Character creation
│   └── ...
├── components/            # React components
├── lib/                   # Utility functions and API clients
├── hooks/                 # Custom React hooks
├── types/                 # TypeScript type definitions
├── migrations/            # Database migration files
└── public/               # Static assets
```

## Key Features Explained

### Token System
- Users receive tokens to generate images
- Different image models cost different amounts of tokens
- Tokens can be purchased or granted by admins
- All token transactions are logged

### Character System
- Create custom AI characters with personalities, occupations, and backstories
- System prompts are generated or manually configured
- Characters respond with deeply romantic, passionate personality
- No roleplay actions (asterisks) - natural conversational style

### Image Generation
- Multiple AI models supported (Flux, Stable Diffusion variants)
- Configurable image sizes and quantities
- Token-based cost system
- Automatic refunds on generation failures

### Admin Features
- User management and role assignment
- Character moderation and management
- Token package configuration
- Premium content management
- Analytics and payment tracking
- Database setup and configuration

## License

All rights reserved.

## Support

For issues and questions, please contact the administrator.
