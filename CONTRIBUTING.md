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

### Easy Features

- **Booking Confirmation Email**: Send email when guest books event with event details
- **Event Capacity**: Add max attendees limit and show "Full" when reached
- **Social Sharing**: Share buttons for Twitter, LinkedIn, WhatsApp

### Medium Features

- **Event Calendar View**: Display events in calendar format
- **Event Filtering**: Filter by date, mode, location
- **Save Events**: Bookmark events for later
- **Attendee List**: Show registered attendees to organizers

### Advanced Features

- **Payment Integration**: Support paid events with Stripe
- **QR Code Check-in**: Generate QR codes for event entry
- **Email Reminders**: Auto-send reminder 24hrs before event

## Workflow

1. Create branch: `git checkout -b feature/your-feature`
2. Make changes
3. Test: `pnpm lint` and `pnpm build`
4. Commit: `git commit -m "feat: your feature"`
5. Push and create PR
