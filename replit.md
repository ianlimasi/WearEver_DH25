# WearEver - Fairytale Clothing Exchange Platform

## Overview
WearEver is a fairytale-themed clothing exchange platform designed for college students to trade clothes money-free. The platform uses AI to match users with clothes that fit their desired aesthetic, fostering sustainability, creativity, and community on campus.

**Concept:** Shazam + Depop, but cashless

## Current State (MVP)
The MVP demonstrates the core user experience with mock AI functionality and full upload/closet management:

### Implemented Features
1. **Fairytale-themed UI** with whimsical design, pastel gradient background, and enchanted aesthetics
2. **Header Navigation**:
   - Home icon - returns to main page
   - Upload icon - navigates to clothing upload page
   - Closet icon - navigates to user's personal closet
   - Inbox icon - navigates to trade inbox
3. **Home Page**:
   - AI Outfit Matcher (left panel) with image upload and mock tag generation
   - Clothing Grid (right panel) displaying all available items (user uploads + sample items)
   - "Request Trade" button on each clothing item (except user's own items)
   - Smart filtering showing items matching AI-generated tags
4. **Upload Page** (`/upload`):
   - Image upload with preview
   - Item name input field
   - Five dropdown selectors (one for each tag type: category, color, style, fit, vibe)
   - Form validation requiring all fields before submission
   - Saves uploaded items to localStorage
5. **Closet Page** (`/closet`):
   - Displays all user-uploaded clothing items
   - Delete functionality with confirmation
   - Empty state with call-to-action
   - Quick "Add Item" button
6. **Inbox Page** (`/inbox`):
   - Outgoing Requests: Trade requests initiated by the user
     - Select item to offer from closet
     - Choose meeting place (10 UW campus locations)
     - Select meeting time
     - View trade status (in progress, accepted, declined)
   - Incoming Requests: Trade requests from other users
     - View requested item and offered item
     - See proposed meeting details
     - Accept or decline trade requests
7. **Smart Filtering System**:
   - Requires exact category match (same garment type)
   - Plus at least 1 additional tag match (color, style, fit, or vibe)
   - Ensures relevant, aesthetic-aligned results
   - Works with both user-uploaded items and sample items

### Tag System
The platform uses 5 tag categories to match clothing:

- **Category:** dress, jacket, pants, top, shoes, accessories
- **Color:** black, white, beige, brown, red, pink, blue, green, yellow, purple, gray, multicolor
- **Style:** vintage, streetwear, minimalist, y2k, cottagecore, grunge, academia, boho, chic, sporty, preppy, kawaii, techwear, classic, fairycore, indie, retro, girly, punk, elegant
- **Fit:** oversized, cropped, fitted, flowy, high-waisted, loose, bodycon, layered, structured
- **Vibe:** casual, formal, date night, interview, presentation, party, everyday, picnic, beach, festival, cozy, academic, workwear

## Tech Stack
- **Frontend:** Next.js 14 with App Router, React 18, TypeScript
- **Styling:** Tailwind CSS with custom fairytale color palette
- **Icons:** Lucide React
- **Data Storage:** localStorage for user-uploaded items
- **Sample Data:** 16 pre-tagged clothing items

## Project Structure
```
├── app/
│   ├── page.tsx          # Main home page with filtering logic
│   ├── upload/
│   │   └── page.tsx      # Upload page for adding new clothing items
│   ├── closet/
│   │   └── page.tsx      # Closet page showing user's items
│   ├── inbox/
│   │   └── page.tsx      # Inbox page for managing trades
│   ├── layout.tsx        # Root layout
│   └── globals.css       # Global styles with fairytale theme
├── components/
│   ├── Header.tsx        # Top navigation with home/upload/closet/inbox icons
│   ├── AIOutfitMatcher.tsx  # Left panel for image upload and mock AI
│   ├── ClothingGrid.tsx  # Right panel displaying filtered clothing items
│   ├── OutgoingTradeCard.tsx  # Component for outgoing trade requests
│   └── IncomingTradeCard.tsx  # Component for incoming trade requests
├── lib/
│   ├── types.ts          # TypeScript type definitions including Trade types
│   ├── sampleData.ts     # Sample clothing items with tags
│   ├── tagOptions.ts     # Lists of all available tags for each category
│   ├── storage.ts        # localStorage utilities for user uploads
│   ├── tradeStorage.ts   # localStorage utilities for trades
│   ├── campusLocations.ts # UW campus meeting locations
│   └── seedTrades.ts     # Helper to seed sample trades
└── public/images/        # Image assets
```

## Next Phase Features
1. **Real AI Integration:**
   - Integrate OpenAI Vision API or Amazon Bedrock
   - Actual image-to-tag analysis
   - Real-time aesthetic matching

2. **User Authentication:**
   - Replit Auth integration
   - User profiles and accounts
   - Per-user ownership tracking
   - Private closets

3. **Messaging System:**
   - Direct messaging for trade negotiations
   - Trade request and approval workflow
   - Inbox functionality (currently placeholder)

4. **Database Integration:**
   - PostgreSQL for persistent storage
   - Replace localStorage with proper database
   - User data, clothing items, and messages
   - Trade history

5. **Image Storage:**
   - Cloud storage for uploaded images (currently using data URLs)
   - Integration with storage services
   - Image optimization

6. **Advanced Features:**
   - Search and advanced filtering
   - User ratings and review system
   - Favorites and wishlists
   - Trade completion tracking
   - Item availability status

## Recent Changes
- **2025-10-19:** Initial MVP implementation
  - Created fairytale-themed UI with gradient backgrounds
  - Built AI Outfit Matcher with mock functionality
  - Implemented smart filtering requiring category match + 1 additional tag
  - Added 16 diverse sample clothing items across all tag categories
  - Configured Next.js 14 with TypeScript and Tailwind CSS

- **2025-10-19:** Upload and Closet Features
  - Created upload page with image upload and tag selection dropdowns
  - Implemented closet page to view and manage user uploads
  - Added localStorage-based storage system
  - Updated header with navigation to all pages
  - Integrated user-uploaded items into home page clothing grid
  - Adjusted filtering to category + 1 additional match for better visibility

- **2025-10-19:** Trade Inbox Feature
  - Added "Request Trade" button to clothing items in home grid
  - Created Inbox page with outgoing and incoming trade sections
  - Implemented outgoing trade cards with offer selection and meeting details
  - Implemented incoming trade cards with accept/decline functionality
  - Added 10 UW campus locations for meeting places
  - Trade status tracking (in progress, accepted, declined)
  - localStorage-based trade management system

## Development Notes
- The filtering algorithm prioritizes category matching to ensure garment type relevance
- Filter requires category match PLUS at least 1 other tag match (color, style, fit, or vibe)
- Mock AI returns placeholder tags: `{category: 'dress', color: 'pink', style: 'cottagecore', fit: 'flowy', vibe: 'casual'}`
- User uploads are stored in localStorage (browser-based, not persistent across devices)
- Uploaded images are stored as data URLs (base64) in localStorage
- Sample images use Unsplash URLs; some may fail to load (404) which is expected
- Development server runs on port 5000
- Fast Refresh is enabled for rapid development

## User Experience Flow

### Browsing and Matching
1. User sees all available clothing items on the right grid (sample + uploaded items)
2. User uploads an inspiration image in the AI Outfit Matcher (left panel)
3. Mock AI analyzes and returns 5 tags (one per category)
4. Grid automatically filters to show only matching items (same category + 1+ other tag matches)
5. User can reset and try another image to see different results

### Uploading Clothing
1. User clicks upload icon in header
2. User fills out upload form: item name, image, and all 5 tag categories
3. User submits and item is saved to localStorage
4. User is redirected to closet page to see their new item
5. Uploaded item now appears in home page grid and can be matched by AI

### Managing Closet
1. User clicks closet icon in header
2. User sees all their uploaded items in a grid
3. User can delete items (with confirmation)
4. User can click "Add Item" to upload more

### Requesting and Managing Trades
1. **Initiating a Trade:**
   - User browses clothing items on home page
   - User clicks "Request Trade" on an item they want
   - Trade request is created and user is taken to inbox
   - User selects item to offer from their closet
   - User chooses meeting place and time
   - Trade status shows "in progress" until owner responds

2. **Responding to Trade Requests:**
   - User clicks inbox icon to view incoming requests
   - User sees items others want to trade for
   - User reviews offered item and meeting details
   - User can accept or decline the trade
   - Status updates accordingly

3. **Trade Completion:**
   - When trade is accepted, both users see meeting details
   - Users meet at specified UW campus location at agreed time
   - Trade is completed in person
