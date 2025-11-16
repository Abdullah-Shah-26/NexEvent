# Implementation Plan

- [x] 1. Add ChatBot component to root layout

  - Import ChatBot component in app/layout.tsx
  - Add ChatBot component inside SessionProvider (after main element)
  - Verify it renders on all pages
  - _Requirements: 1.1, 1.3_

- [x] 2. Improve floating button styling

  - Enhance hover effects with scale and shadow
  - Ensure proper positioning and sizing
  - _Requirements: 1.1, 1.2, 1.3_

- [x] 3. Create simple typing indicator

  - Build basic "Thinking..." text indicator
  - Add conditional rendering based on isLoading state
  - Style as assistant message
  - _Requirements: 2.5_

- [x] 4. Implement auto-scroll functionality

  - Create ref for message thread container using useRef
  - Add useEffect hook that triggers on messages array changes
  - Implement scrollIntoView with smooth behavior on last message
  - _Requirements: 2.3, 2.4_

- [x] 5. Enhance button and input styling

  - [x] 5.1 Improve send button visual feedback

    - Add hover state with darker purple background
    - Add smooth color transitions
    - _Requirements: 4.4, 4.5_

  - [x] 5.2 Improve input field styling

    - Add focus ring with purple glow
    - Ensure disabled state has visual feedback
    - _Requirements: 4.1, 4.3_

- [x] 6. Add custom scrollbar styling

  - Add CSS for webkit-scrollbar on message thread
  - Style scrollbar with purple theme
  - _Requirements: 2.3_

- [x] 7. Improve responsive design for mobile

  - Adjust chat window width for mobile (full width minus margins)
  - Adjust chat window height to 80vh on mobile
  - Reduce floating button size on mobile
  - _Requirements: 1.3, 2.2_

- [x] 8. Add basic accessibility features

  - Add aria-label to floating button ("Open chat")
  - Add aria-label to close button ("Close chat")
  - Add aria-label to send button ("Send message")
  - _Requirements: 1.1, 3.1, 4.1_
