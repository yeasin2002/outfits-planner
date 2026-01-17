# Product Overview

Outfit Planner is a cross-platform mobile application built with Expo and React Native. The app helps users organize their wardrobe, create outfit combinations, and plan their daily looks with AI-powered suggestions.

## Core Features

### Authentication & Security

- User authentication (sign in/sign up) via Better Auth
- Secure token storage with expo-secure-store
- Password recovery and reset flow
- OTP verification support
- Protected routes with auth wrapper

### Wardrobe Management

- Add and organize clothing items
- Categorize items by type (tops, bottoms, shoes, accessories)
- Filter items by category
- Upload item photos via image picker
- View wardrobe in grid layout with cards

### Outfit Planning

- Create outfit combinations from wardrobe items
- Browse "My Outfits" collection
- Save favorite outfits for quick access
- AI-powered outfit suggestions (AI Pick)
- Visual outfit cards with category badges
- Favorite/unfavorite outfits with heart icon

### User Interface

- Light/dark theme support with system preference detection
- Drawer navigation for main sections
- Bottom navigation bar for quick access (Home, Wardrobe, Outfits, Settings)
- Tab navigation within sections (e.g., My Outfits, Favorites, AI Pick)
- Modal screens for dialogs and confirmations
- Smooth animations and transitions
- Haptic feedback for interactions

### Design System

- Custom color palette from Figma designs
- Typography: Caudex (headers), Lora (body), Urbanist (system)
- Consistent spacing and layout patterns
- HeroUI Native component library
- Tailwind CSS for styling

## User Flows

### Onboarding

1. User opens app
2. Sees login/signup screens
3. Creates account or signs in
4. Redirects to home screen

### Adding Wardrobe Items

1. Navigate to Wardrobe
2. Tap "Add Item" button
3. Select image from gallery
4. Choose category
5. Save item to wardrobe

### Creating Outfits

1. Navigate to Outfits
2. Tap "Create New Outfit"
3. Select items from wardrobe
4. Mix and match pieces
5. Save outfit with name and category

### Browsing Outfits

1. Navigate to Outfits
2. View "My Outfits" by default
3. Switch to "Favorites" or "AI Pick" tabs
4. Tap outfit card to view details
5. Toggle favorite status with heart icon

## Target Platforms

- **iOS** - iPhone and iPad (iOS 13.4+)
- **Android** - Phones and tablets (Android 5.0+, API 21+)
- **Web** - Progressive Web App via Expo

## Future Enhancements

- Weather-based outfit suggestions
- Calendar integration for outfit planning
- Social sharing of outfits
- Style recommendations based on preferences
- Outfit history and analytics
- Collaborative outfit planning
- Virtual try-on with AR
- Shopping integration for missing items
