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

# Optional
NEXT_PUBLIC_POSTHOG_KEY=your_posthog_key
NEXT_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com
```

### Run

```bash
pnpm dev  # http://localhost:3000
```

## Feature Ideas

Want to contribute? Pick a feature you would like to implement & start coding :)

### Foundation Features

Build these core features first to establish the user experience:

- **Guest Dashboard**: Personal dashboard showing upcoming events, booking history, saved events, and user profile
- **Organizer Dashboard**: Comprehensive dashboard for organizers to manage their events, view attendee lists, and track event analytics
- **User Profiles**: Display user information, interests, skills, and activity history
- **Event Calendar View**: Display events in calendar format with month/week/day views

### Easy Features

- **Booking Confirmation Email**: Send email when guest books event with event details
- **Event Capacity**: Add max attendees limit and show "Full" when reached

### Medium Features

- **Attendee Management**: Organizers can view and manage event attendees
- **Event Search**: Full-text search across events with autocomplete
- **Event Categories**: Organize events by categories and subcategories
- **Notification System**: In-app notifications for bookings, reminders, and updates

### Advanced Features

- **Payment Integration**: Support paid events with Stripe
- **QR Code Check-in**: Generate QR codes for event entry and attendance tracking
- **Email Reminders**: Auto-send reminder emails 24hrs before event
- **Event Analytics**: Detailed insights for organizers on attendance, engagement, and trends

### AI & Innovation Features

- **AI Event Recommendations**: Personalized event suggestions based on user interests and behavior
- **GitHub Skill Dashboard**: Showcase developer skills and contributions from GitHub profile
- **Gamification System**: XP points, badges, and achievements for user engagement
- **Team Matchmaking**: Connect developers to form teams for hackathons and events
- **AI Chat Assistant**: Intelligent chatbot to help users find events and answer questions
- **Judging System**: Comprehensive judging and scoring system for hackathons
- **Embeddable Widget**: Shareable event widgets for external websites
- **Voice Event Creation**: Create events using voice commands
- **Personality-Based Matching**: AI-powered team matching based on personality traits
- **Predictive Analytics**: Data insights and predictions for event organizers

## Workflow

1. Create branch: `git checkout -b feature/your-feature`
2. Make changes
3. Test: `pnpm lint` and `pnpm build`
4. Commit: `git commit -m "feat: your feature"`
5. Push and create PR
