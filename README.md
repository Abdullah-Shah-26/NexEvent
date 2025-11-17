# NexEvent

Event management platform for the developer community. Browse hackathons, meetups, & conferences, or create and manage your own events.

🔗 **Live Demo:** [https://nex-event-flax.vercel.app](https://nex-event-flax.vercel.app)

## 🎥 Demo Video

[![NexEvent Demo](https://img.youtube.com/vi/K6a8aNuHI7w/maxresdefault.jpg)](https://www.youtube.com/watch?v=K6a8aNuHI7w)

_Click to watch the full walkthrough_(Recently added Chatbot Assistance + Favourites + Sharing option)

---

## Tech Stack

- **Next.js 16** (App Router) + TypeScript
- **MongoDB** with Mongoose ODM
- **NextAuth.js v5** for authentication
- **Cloudinary** for image storage
- **Google Gemini AI** for chatbot assistant
- **Tailwind CSS v4** + Radix UI + shadcn/ui
- **Animations** React Bits + Motion Primitives + Framer Motion
- **Lucide React** for icons
- **date-fns** + React Day Picker for date handling
- **Zod** for validation
- **Sonner** for toast notifications
- **PostHog** for analytics (optional)

## How It Works

- **Browse Events** - Anyone can discover and view events
- **Create Events** - Organizers can host their own events
- **Book Events** - Guests can register for events
- **Save Favourites** - Guests can save events they're interested in
- **AI Chatbot** - Ask questions about events and get instant answers

---

## Security & Performance

### Security

- **Password hashing** with bcrypt
- **Session-based authentication** with NextAuth
- **Role-based access control** (organizer/guest)
- **Input validation** with Zod on client + server

### Performance

- **Server Components** render on server (reduced client JS)
- **Dynamic routes** use force-dynamic for real-time data
- **MongoDB connection pooling** prevents reconnection overhead
- **Image optimization** via Cloudinary CDN

### Development

- **Type-safe** with TypeScript across the stack
- **Client-side validation** with Zod schemas

## Project Structure

```
app/
├── api/                   # RESTful API endpoints
│   ├── auth/              # NextAuth routes
│   ├── chat/              # AI chatbot endpoint (Gemini)
│   ├── events/            # Event CRUD operations
│   ├── favorites/         # Favourites management
│   └── users/             # User profile
├── bookings/              # User registered events page
├── favorites/             # User favourites page
├── create-event/          # Event creation (protected)
├── events/                # Event listing & details
│   └── [slug]/            # Dynamic event pages
│       └── edit/          # Event editor
├── signin/ & signup/     # Authentication pages
├── layout.tsx            # Root layout
├── page.tsx              # Landing page
└── globals.css           # Global styles

components/
├── form/                 # Form inputs (FormInput, ImageUpload, TagInput)
├── ui/                   # shadcn/ui primitives (button, calendar, select)
├── motion-primitives/    # Animation components
├── ChatBot.tsx           # AI chatbot assistant
└── [features]/           # EventCard, EventForm, BookEvent, Navbar, etc.

database/
├── user.model.ts         # User schema
├── event.model.ts        # Event schema
├── booking.model.ts      # Booking schema
└── favorite.model.ts     # Favourites schema

lib/
├── actions/              # Server actions
│   ├── event.actions.ts  # Event CRUD logic
│   └── booking.actions.ts # Booking logic
├── validations/          # Zod schemas
├── mongoose.ts           # DB connection
└── utils.ts              # Helper functions

hooks/                    # Custom React hooks
types/                    # TypeScript definitions
public/                   # Static assets
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
