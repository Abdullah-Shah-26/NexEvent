# Contributing to NexEvent

## Setup

### Prerequisites

- Node.js 18+
- pnpm
- MongoDB (local or Atlas)
- Cloudinary account

### Installation

```bash
# Clone and install
git clone https://github.com/YOUR_USERNAME/NexEvent.git
cd NexEvent
pnpm install

# Setup .env
cp .env.example .env
```

### Environment Variables

Create `.env` in the root:

```env
# Database
MONGODB_URI=mongodb://localhost:27017/nexevent

# Auth (generate with: openssl rand -base64 32)
AUTH_SECRET=your-secret-here
NEXTAUTH_URL=http://localhost:3000

# Cloudinary (from https://cloudinary.com/console)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Gemini AI (from https://aistudio.google.com/app/apikey)
GEMINI_API_KEY=your_gemini_api_key

# Optional
NEXT_PUBLIC_POSTHOG_KEY=your_posthog_key
NEXT_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com
```

**Note:** The AI chatbot requires a Gemini API key. Get one for free at [Google AI Studio](https://aistudio.google.com/app/apikey).

### Run

```bash
pnpm dev  # http://localhost:3000
```

## Feature Ideas

Want to contribute? Pick a feature you would like to implement & start coding :)

### Quick Wins (Easy to implement)

- **Event Capacity**: Add max attendees limit and show "Full" when reached
- **Loading States**: Add skeleton loaders for better UX

### Core Features (Build the foundation)

- **Guest Dashboard**: Overview page showing upcoming events, past events, and favourites
- **Organizer Dashboard**: Manage events, view registrations, and basic analytics
- **User Profiles**: Display user info, registered events, and activity
- **Email Notifications**: Send booking confirmations and event reminders
- **Event Categories**: Tag system with filtering (Hackathon, Workshop, Conference, etc.)

### Advanced Features (After core is solid)

- **Payment Integration**: Support paid events with Stripe
- **QR Code Check-in**: Generate QR codes for event entry
- **Event Analytics**: Charts showing registrations, attendance trends
- **Attendee Networking**: Allow attendees to connect with each other
- **Event Waitlist**: Join waitlist when event is full
- **Multi-day Events**: Support for events spanning multiple days

### AI Features (Requires Gemini API)

- **Smart Event Recommendations**: AI suggests events based on user history
- **Event Summaries**: Auto-generate TL;DR for long descriptions
- **Smart Tags**: Auto-tag events based on content
- **Chatbot Enhancement**: Make the assistant smarter with context awareness

### Moonshot Ideas (Complex, high impact)

- **GitHub Integration**: Recommend events based on GitHub activity
- **Team Matchmaking**: AI-powered team formation for hackathons
- **Gamification**: XP, badges, leaderboards for engagement
- **Voice Commands**: Create events using voice input
- **Judging System**: Complete hackathon judging platform

## Workflow

1. Create branch: `git checkout -b feature/your-feature`
2. Make changes
3. Test: `pnpm lint` and `pnpm build`
4. Commit: `git commit -m "feat: your feature"`
5. Push and create PR
