# NexEvent

Event management platform for the developer community. Browse hackathons, meetups, & conferences, or create and manage your own events.

🔗 **Live Demo:** [https://nex-event-flax.vercel.app](https://nex-event-flax.vercel.app)


## Tech Stack

**Core**

- Next.js 16 (App Router) + TypeScript + React 19
- MongoDB + Mongoose ODM
- Redis (Upstash) for caching
- NextAuth.js v5 + bcrypt

**UI/UX**

- Tailwind CSS v4 + Radix UI + shadcn/ui 
- Framer Motion + Motion Primitives
- Lucide React icons
- Sonner toast notifications

**Features**

- Google Gemini AI (chatbot)
- Cloudinary (image CDN)
- date-fns + React Day Picker
- Zod validation

**Dev Tools**

- PostHog analytics
- ESLint + TypeScript

## How It Works

- **Browse Events** - Discover and search events with real-time filtering
- **Create Events** - Organizers can host and manage their own events
- **Book Events** - One-click registration with email confirmation
- **Save Favourites** - Mark events you're interested in
- **Share Events** - Share to Twitter, LinkedIn, Facebook, or copy link
- **Calendar Integration** - Add events to Google Calendar
- **AI Chatbot** - Ask questions about events and get instant answers

---

## Security & Performance

### Security

- Session-based auth with NextAuth v5 + bcrypt
- RBAC with protected routes
- Defense-in-depth validation (Zod API layer + Mongoose DB layer)
- Type-safe schemas with runtime validation

### Performance

- **Caching**: Redis layer (60s events, 5min pages) - 90% faster
- **Database**: Connection pooling (50 max), indexes on hot paths
- **Images**: Cloudinary CDN + Next.js optimization (AVIF/WebP, q_100, dpr_2.0)
- **Code splitting**: Dynamic imports for heavy components
- **UI**: Optimistic updates, font display swap

## Project Structure

```
app/
├── api/                  # API routes (auth, chat, events, favorites, users)
├── (pages)/              # Event pages, bookings, favorites, auth
└── layout.tsx            # Root layout

components/
├── form/                 # Form inputs
├── ui/                   # shadcn/ui components
└── [features]/           # EventCard, ChatBot, Navbar, etc.

database/                 # Mongoose models (user, event, booking, favorite)
lib/
├── actions/              # Server actions
├── validations/          # Zod schemas (event, user, booking, favorite, chat)
└── mongoose.ts           # DB connection

hooks/                    # Custom React hooks
```

## Getting Started

### Quick Start

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/NexEvent.git
cd NexEvent

# Install dependencies
pnpm install

# Set up environment variables (see CONTRIBUTING.md)
cp .env.example .env

# Run development server
pnpm dev
```

Visit [http://localhost:3000](http://localhost:3000)

## Contributing

For detailed setup instructions, see [CONTRIBUTING.md](CONTRIBUTING.md)
