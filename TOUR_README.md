# Guided Tour Implementation

## Overview
This project includes a comprehensive guided tour using driver.js that helps new users understand the key features of the Digital Wallet application.

## Features

### 🎯 **Tour Steps (8 Total)**
1. **Sidebar Header** - Welcome message and navigation hub
2. **Home Dashboard** - Quick access to main dashboard
3. **Wallet Management** - Digital wallet features
4. **Transaction History** - Money transfers and payments
5. **User Management** - Account and administrative tasks
6. **Analytics & Reports** - Financial insights and reports
7. **Help & Support** - FAQs and support access
8. **Theme & Settings** - Dark/light mode toggle

### 🔧 **Key Features**
- ✅ **Runs only once** for new users (localStorage)
- ✅ **"Restart Tour" option** in Settings page
- ✅ **Attached to actual DOM elements** with data attributes
- ✅ **8 comprehensive steps** covering key features
- ✅ **Modern tooltip styling** with app's design system
- ✅ **Mobile responsive** design
- ✅ **Error handling** and graceful fallbacks
- ✅ **Dark/light mode support**

## How It Works

### Automatic Tour Start
- Tour automatically starts for new users when they visit any dashboard page
- Only runs on `/user/*`, `/admin/*`, or `/agent/*` routes
- Uses localStorage to track completion status

### Manual Tour Restart
- Users can restart the tour from the Settings page
- Located at `/user/settings`, `/admin/settings`, or `/agent/settings`
- Click "Restart Tour" button to begin again

### DOM Element Detection
The tour intelligently detects available elements and only shows steps for elements that exist:
- Sidebar header and navigation items
- Menu items based on user role
- Theme toggle button

## Technical Implementation

### Files Created/Modified
1. **`src/components/GuidedTour.tsx`** - Main tour component
2. **`src/components/tour-styles.css`** - Custom styling for tour elements
3. **`src/components/app-sidebar.tsx`** - Added tour data attributes
4. **`src/pages/Settings.tsx`** - New settings page with tour restart option
5. **`src/routes/*SidebarItems.ts`** - Added Settings route to all user types

### Dependencies
- `driver.js` - Tour library for step-by-step guidance
- Custom CSS for styling that matches the app's design system

### Data Attributes
The sidebar uses data attributes to identify tour elements:
- `data-tour="sidebar-header"` - Main navigation header
- `data-tour="home-link"` - Home dashboard link
- `data-tour="wallet-section"` - Wallet management items
- `data-tour="transactions-section"` - Transaction history items
- `data-tour="user-management"` - User management items
- `data-tour="analytics-section"` - Analytics and reports items
- `data-tour="help-section"` - Help and support items
- `data-tour="settings-toggle"` - Theme toggle button

## Testing

### New User Experience
1. Clear localStorage: `localStorage.removeItem('tour-completed')`
2. Visit any dashboard page (`/user/overview`, `/admin/overview`, etc.)
3. Tour should start automatically after 2 seconds

### Restart Tour
1. Navigate to Settings page
2. Click "Restart Tour" button
3. Tour will restart immediately

### Mobile Testing
- Resize browser window to test mobile responsiveness
- Tour adapts to smaller screens with adjusted styling

### Theme Testing
- Toggle between light and dark modes
- Tour styling adapts to current theme

## Customization

### Adding New Tour Steps
1. Add data attributes to DOM elements
2. Update the `allSteps` array in `GuidedTour.tsx`
3. Add corresponding CSS styling if needed

### Modifying Tour Content
- Edit titles and descriptions in the `allSteps` array
- Update styling in `tour-styles.css`
- Modify timing and behavior in the component logic

### Styling
The tour uses CSS custom properties that match your app's design system:
- `--background`, `--foreground` for colors
- `--primary`, `--secondary` for accent colors
- Responsive breakpoints for mobile support

## Browser Support
- Modern browsers with ES6+ support
- Mobile browsers (iOS Safari, Chrome Mobile)
- Responsive design for all screen sizes
