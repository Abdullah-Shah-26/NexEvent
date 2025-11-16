# Design Document

## Overview

The enhanced ChatBot component will provide a polished, animated chat interface that integrates with the existing Gemini AI backend. The design focuses on smooth animations, visual feedback, and maintaining consistency with NexEvent's dark purple theme. The component will use Framer Motion for animations and follow the existing design system established in the application.

## Architecture

### Component Structure

```
ChatBot (Main Component)
├── FloatingButton (Animated trigger button)
└── ChatWindow (Expandable chat interface)
    ├── ChatHeader (Title and close button)
    ├── MessageThread (Scrollable message list)
    │   ├── UserMessage (Right-aligned purple bubbles)
    │   ├── AssistantMessage (Left-aligned dark bubbles)
    │   └── TypingIndicator (Animated loading state)
    └── InputArea (Text input and send button)
```

### State Management

The component will manage the following state:

- `isOpen`: Boolean to control chat window visibility
- `messages`: Array of message objects with role and content
- `input`: Current text input value
- `isLoading`: Boolean to show typing indicator during API calls

### Animation Strategy

Using Framer Motion for:

- Floating button: Pulse animation loop, hover scale effect
- Chat window: Slide-up/slide-down entrance/exit animations
- Messages: Fade-in and slide-up when added
- Typing indicator: Bouncing dots animation

## Components and Interfaces

### FloatingButton Component

**Purpose**: Eye-catching trigger button that remains fixed on screen

**Visual Design**:

- Size: 56px × 56px circular button
- Position: Fixed at bottom-right (24px from edges)
- Background: Purple-to-pink gradient (`from-purple-500 to-pink-500`)
- Icon: MessageCircle from lucide-react
- Shadow: Large shadow with glow effect

**Animations**:

- Continuous pulse animation (scale 1.0 to 1.05)
- Hover: Scale to 1.1 with enhanced shadow
- Click: Scale down to 0.95 then expand chat window

**Implementation**:

```typescript
<motion.button
  initial={{ scale: 0 }}
  animate={{ scale: 1 }}
  whileHover={{ scale: 1.1 }}
  whileTap={{ scale: 0.95 }}
  className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"
>
  <MessageCircle />
</motion.button>
```

### ChatWindow Component

**Purpose**: Main chat interface container

**Visual Design**:

- Size: 384px width × 500px height
- Position: Fixed at bottom-right (24px from edges)
- Background: Dark theme (`#1e1b2e`)
- Border: Purple glow (`border-purple-500/30`)
- Border radius: 12px
- Shadow: Large shadow with blur

**Animations**:

- Enter: Slide up from bottom with fade-in (duration: 300ms)
- Exit: Slide down with fade-out (duration: 200ms)
- Spring physics for natural feel

**Layout**:

- Flexbox column layout
- Header: Fixed height (64px)
- Messages: Flex-grow with scroll
- Input: Fixed height (80px)

### ChatHeader Component

**Purpose**: Display title and close button

**Visual Design**:

- Height: 64px
- Padding: 16px
- Border bottom: Purple divider
- Title: "NexEvent Assistant" with MessageCircle icon
- Close button: X icon with hover effect

**Interactions**:

- Close button hover: Color transition to white
- Close button click: Trigger chat window exit animation

### MessageThread Component

**Purpose**: Scrollable container for conversation history

**Visual Design**:

- Flex-grow to fill available space
- Padding: 16px
- Overflow-y: Auto with custom scrollbar styling
- Gap between messages: 16px

**Scrolling Behavior**:

- Auto-scroll to bottom when new message added
- Smooth scroll animation
- Use `useEffect` with ref to scroll on message changes

**Custom Scrollbar**:

```css
.message-thread::-webkit-scrollbar {
  width: 6px;
}
.message-thread::-webkit-scrollbar-track {
  background: transparent;
}
.message-thread::-webkit-scrollbar-thumb {
  background: rgba(168, 80, 252, 0.3);
  border-radius: 3px;
}
```

### Message Components

**UserMessage**:

- Alignment: Right (justify-end)
- Background: Purple gradient (`bg-purple-600`)
- Text color: White
- Max width: 80%
- Padding: 12px
- Border radius: 12px (rounded-lg)
- Animation: Slide in from right with fade

**AssistantMessage**:

- Alignment: Left (justify-start)
- Background: Dark (`#2a2640`)
- Text color: Light gray (`text-gray-200`)
- Max width: 80%
- Padding: 12px
- Border radius: 12px
- Animation: Slide in from left with fade

**Message Animation**:

```typescript
<motion.div
  initial={{ opacity: 0, y: 10 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.2 }}
>
  {message.content}
</motion.div>
```

### TypingIndicator Component

**Purpose**: Show assistant is generating response

**Visual Design**:

- Same styling as AssistantMessage
- Content: Three animated dots
- Animation: Bouncing dots with staggered delay

**Implementation**:

```typescript
<motion.div className="flex gap-1">
  {[0, 1, 2].map((i) => (
    <motion.div
      key={i}
      animate={{ y: [0, -8, 0] }}
      transition={{
        duration: 0.6,
        repeat: Infinity,
        delay: i * 0.1,
      }}
      className="w-2 h-2 bg-gray-400 rounded-full"
    />
  ))}
</motion.div>
```

### InputArea Component

**Purpose**: Text input and send button

**Visual Design**:

- Height: 80px
- Padding: 16px
- Border top: Purple divider
- Layout: Horizontal flex with gap

**Input Field**:

- Flex-grow: 1
- Background: Dark (`#2a2640`)
- Border: None
- Border radius: 8px
- Padding: 8px 16px
- Focus ring: Purple glow
- Placeholder: "Ask about events..."

**Send Button**:

- Size: 40px × 40px
- Background: Purple (`bg-purple-600`)
- Icon: Send from lucide-react
- Hover: Darker purple
- Disabled state: Gray background
- Transition: All properties 200ms

**Interactions**:

- Enter key: Send message
- Button click: Send message
- Disabled when: Input empty or loading
- Clear input immediately after send

## Data Models

### Message Interface

```typescript
interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp?: Date; // Optional for future features
}
```

### ChatBot Props

```typescript
interface ChatBotProps {
  // No props needed - fully self-contained component
}
```

## Error Handling

### API Errors

**Scenario**: Fetch request to `/api/chat` fails

**Handling**:

1. Catch error in try-catch block
2. Add error message to conversation:
   - Content: "Sorry, something went wrong. Please try again."
   - Role: "assistant"
3. Set `isLoading` to false
4. Log error to console for debugging

### Empty Response

**Scenario**: API returns but response is empty or invalid

**Handling**:

1. Check if `data.response` exists
2. If not, add fallback message:
   - Content: "Sorry, I couldn't process that. Please try again."
   - Role: "assistant"

### Network Timeout

**Scenario**: Request takes too long

**Handling**:

- Rely on browser's default timeout
- Future enhancement: Add custom timeout with AbortController

## Testing Strategy

### Unit Tests

**Component Rendering**:

- Test floating button renders when chat is closed
- Test chat window renders when open
- Test messages render correctly based on role
- Test typing indicator shows when loading

**State Management**:

- Test `isOpen` toggles correctly
- Test messages array updates on send
- Test input clears after send
- Test loading state during API call

**User Interactions**:

- Test floating button click opens chat
- Test close button click closes chat
- Test send button click sends message
- Test Enter key sends message
- Test send disabled when input empty

### Integration Tests

**API Integration**:

- Test message sent to `/api/chat` endpoint
- Test response added to messages
- Test error handling for failed requests

**Animation Tests**:

- Test chat window animates in/out
- Test messages animate when added
- Test typing indicator animates

### Manual Testing Checklist

- [ ] Floating button visible and animated
- [ ] Chat opens smoothly on button click
- [ ] Messages display correctly for both roles
- [ ] Typing indicator shows during API call
- [ ] Auto-scroll works when new messages added
- [ ] Input field clears after sending
- [ ] Send button disabled appropriately
- [ ] Close button closes chat smoothly
- [ ] Conversation persists when reopening
- [ ] Responsive on mobile devices
- [ ] Keyboard navigation works (Tab, Enter)
- [ ] Error messages display correctly

## Responsive Design

### Desktop (>768px)

- Chat window: 384px × 500px
- Positioned bottom-right with 24px margins
- Full feature set

### Mobile (<768px)

- Chat window: Full width minus 16px margins
- Height: 80vh (80% of viewport height)
- Positioned bottom-center
- Floating button: Slightly smaller (48px)

### Tablet (768px - 1024px)

- Same as desktop
- Ensure touch targets are adequate (min 44px)

## Accessibility

### Keyboard Navigation

- Floating button: Focusable with Tab
- Close button: Focusable with Tab
- Input field: Focusable with Tab
- Send button: Focusable with Tab
- Enter key: Send message from input

### ARIA Labels

- Floating button: `aria-label="Open chat"`
- Close button: `aria-label="Close chat"`
- Send button: `aria-label="Send message"`
- Chat window: `role="dialog"` with `aria-label="Chat assistant"`

### Screen Reader Support

- Announce new messages as they arrive
- Use `aria-live="polite"` on message thread
- Provide text alternatives for icons

## Performance Considerations

### Optimization Strategies

1. **Message Limit**: Cap conversation history at 50 messages to prevent memory issues
2. **Lazy Loading**: Only render visible messages (future enhancement)
3. **Debounce**: Add debounce to input if implementing typing indicators
4. **Animation Performance**: Use `transform` and `opacity` for GPU acceleration
5. **Memoization**: Use `React.memo` for message components if performance issues arise

### Bundle Size

- Framer Motion: ~30KB gzipped (already used in navbar)
- Lucide React icons: Minimal impact (tree-shaken)
- No additional dependencies needed

## Integration with Existing Code

### Current Implementation

The existing ChatBot component already has:

- Basic structure and state management
- API integration with `/api/chat` endpoint
- Message rendering logic
- Input handling

### Enhancement Approach

1. Keep existing logic intact
2. Add Framer Motion animations
3. Enhance styling with better colors and spacing
4. Add typing indicator component
5. Improve button and input interactions
6. Add auto-scroll functionality
7. Enhance error handling

### Files to Modify

- `components/ChatBot.tsx`: Main component enhancement
- `app/globals.css`: Add custom styles for chat (optional)

### Dependencies to Add

```json
{
  "framer-motion": "^10.16.0" // Already installed
}
```

## Design Tokens

### Colors

- Primary gradient: `from-purple-500 to-pink-500`
- Chat background: `#1e1b2e`
- Message background (user): `bg-purple-600`
- Message background (assistant): `#2a2640`
- Border color: `border-purple-500/30`
- Input background: `#2a2640`

### Spacing

- Container padding: 16px
- Message gap: 16px
- Input gap: 8px
- Border radius: 8px (inputs), 12px (messages, window)

### Typography

- Message text: 14px (text-sm)
- Title: 16px font-semibold
- Input placeholder: 14px text-gray-400

### Shadows

- Floating button: `shadow-lg hover:shadow-xl`
- Chat window: `shadow-2xl`

### Transitions

- Default: 200ms ease
- Hover effects: 200ms
- Animations: 300ms for entrance, 200ms for exit
