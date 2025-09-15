# QR Code Generator PWA Spec

## Overview
A Progressive Web App (PWA) that allows users to generate QR codes from URLs and download them as images. Optimized for iPad and iOS devices using HTML, CSS, JavaScript, and the QRCode.js library.

## Implementation Status
✅ **COMPLETED** - App is fully implemented and functional
- All core features implemented
- PWA functionality with offline support
- iOS-optimized responsive design
- QRCode.js integration for reliable QR generation
- Local development server available at http://localhost:8000

## Core Functionality
- **Primary Feature:** URL to QR code conversion
- **Input:** Text input field for URL entry
- **Output:** Generated QR code displayed as an image
- **Download:** Save QR code as downloadable PNG image with timestamp

## Development Guidelines

### Code Quality
- Write simple, easy to read, well-commented code
- Use only HTML, CSS, and JavaScript with QRCode.js library
- Ensure code is self-documenting with clear variable and function names

### File Structure ✅ IMPLEMENTED
- **Entry point:** `index.html` - Main HTML with PWA meta tags and tab navigation
- **App icon:** `icon.jpg` (180x180px QR code themed icon) - Available
- `manifest.json` - PWA configuration for "Add to Home Screen"
- `sw.js` - Service worker for offline support and caching
- `qrcode.min.js` - Downloaded QRCode.js library (19.9KB)
- `qr-generator.js` - Core app logic with QRCode.js integration
- `style.css` - iOS-optimized responsive stylesheet with safe areas

### QR Code Generation Requirements
- Generate QR codes using QRCode.js library
- Support URL validation before QR generation
- Display generated QR code in a canvas element
- Provide download functionality for the generated image
- Support PNG image format with high quality output
- Handle error states (invalid URLs, generation failures)

## UI/UX Requirements

### Layout Structure ✅ IMPLEMENTED
- **Bottom Navigation Tabs:**
  - **Left Tab (Primary):** "Generate" - Main QR code generation interface with lightning icon
  - **Right Tab:** "About" - App information, usage instructions, and privacy policy
- **Main Interface Elements:**
  - URL input field with placeholder text and real-time validation
  - "Generate QR Code" button with loading states
  - QR code display area (256x256px canvas) with container styling
  - Download button (appears after generation) with success feedback
  - Error message area with styled error states

### Input Validation
- Real-time URL validation with visual feedback
- Support for various URL formats (http, https, ftp, etc.)
- Clear error messages for invalid inputs
- Input sanitization and security validation

### QR Code Display
- Responsive QR code sizing for different screen sizes
- Minimum size requirements for scannability
- High contrast black and white pattern
- Preview before download with size options

### Download Functionality ✅ IMPLEMENTED
- Generate downloadable PNG image files via canvas.toDataURL
- Automatic filename generation with ISO timestamp format
- Mobile-friendly download experience with blob URLs
- Success feedback with temporary button state change

## iOS PWA Requirements ✅ IMPLEMENTED
- Support iOS "Add to Home Screen" functionality via manifest.json
- Include proper meta tags for iOS Safari (apple-mobile-web-app-*)
- Responsive design for iPad and iPhone with breakpoints
- Handle iOS safe areas and notches with env(safe-area-inset-bottom)
- Touch-friendly interface with 56px minimum tap targets
- Fixed bottom navigation with proper z-index and shadows

## Required Meta Tags
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="default">
<meta name="apple-mobile-web-app-title" content="QR Generator">
<meta name="mobile-web-app-capable" content="yes">
<meta name="theme-color" content="#2563eb">
<link rel="apple-touch-icon" href="icon.jpg">
<link rel="icon" href="icon.jpg">
<link rel="manifest" href="manifest.json">
```

## Web App Manifest
```json
{
    "name": "QR Code Generator",
    "short_name": "QR Gen",
    "description": "Generate QR codes from URLs and download as images",
    "start_url": "./index.html",
    "scope": "./",
    "display": "standalone",
    "orientation": "portrait-primary",
    "theme_color": "#2563eb",
    "background_color": "#ffffff",
    "icons": [
        {
            "src": "icon.jpg",
            "sizes": "180x180",
            "type": "image/jpeg",
            "purpose": "any maskable"
        }
    ]
}
```

## Technical Implementation

### QR Code Generation Algorithm
- Implement QR code generation using QRCode.js library
- Support QR code error correction levels
- Handle different QR code versions based on data length
- Optimize for URL data type encoding

### Canvas Implementation
- Use HTML5 Canvas for QR code rendering
- Implement pixel-perfect QR code drawing
- Support high-resolution output for downloads
- Handle canvas to image conversion for downloads

### File Download System ✅ IMPLEMENTED
- Create blob URLs for image downloads via canvas.toDataURL
- PNG format support with high quality output
- Automatic filename generation with ISO timestamps (qr-code-YYYY-MM-DDTHH-mm-ss.png)
- Handle browser download permissions with programmatic link clicks

## User Interface Components

### Generate Tab
```
┌─────────────────────────────────┐
│          QR Generator           │
├─────────────────────────────────┤
│                                 │
│  Enter URL:                     │
│  ┌─────────────────────────────┐ │
│  │ https://example.com         │ │
│  └─────────────────────────────┘ │
│                                 │
│  ┌─────────────────────────────┐ │
│  │      Generate QR Code       │ │
│  └─────────────────────────────┘ │
│                                 │
│  ┌─────────────────────────────┐ │
│  │                             │ │
│  │      [QR Code Display]      │ │
│  │                             │ │
│  └─────────────────────────────┘ │
│                                 │
│  ┌─────────────────────────────┐ │
│  │       Download Image        │ │
│  └─────────────────────────────┘ │
└─────────────────────────────────┘
│   Generate  │    About    │
└─────────────┴─────────────┘
```

### About Tab ✅ IMPLEMENTED
- App description and feature overview
- Step-by-step usage instructions
- Feature highlights (offline, iOS optimized, high-quality)
- Privacy policy emphasizing local processing only

## Error Handling
- Invalid URL format validation
- Network connectivity issues
- QR code generation failures
- Download permission errors
- File system access issues

## Performance Requirements ✅ IMPLEMENTED
- Fast QR code generation (< 100ms) with QRCode.js
- Smooth CSS transitions and loading states
- Efficient memory usage with 256x256px QR codes
- Responsive interface optimized for slower devices
- Offline capability via service worker caching all assets

## Security Considerations
- URL validation and sanitization
- QRCode.js library dependency (local file, no external CDN)
- Local processing only (no data transmission)
- Secure file download handling
- Input validation against malicious URLs

## Testing Requirements
- ✅ QR code generation accuracy verified with QRCode.js
- ✅ Download functionality works via canvas.toDataURL and blob URLs
- ✅ Responsive design with iOS safe areas and touch targets
- ✅ PWA installation ready with manifest.json and service worker
- ✅ Offline functionality implemented via comprehensive caching
- ✅ URL validation supports http, https, ftp protocols with regex

**Test Server:** Local development server running at http://localhost:8000

## Accessibility Standards
- Screen reader support for all interactive elements
- Keyboard navigation for input fields and buttons
- High contrast mode support
- Alternative text for generated QR codes
- Voice-over announcements for generation status

## Implementation Complete ✅

This spec has been fully implemented with all requirements met:

- **QR Generation:** High-quality, scannable QR codes via QRCode.js
- **iOS Optimization:** Native-like PWA experience with proper meta tags
- **Offline Support:** Complete offline functionality via service worker
- **Download Feature:** Reliable PNG downloads with timestamp naming
- **Responsive Design:** Touch-friendly interface with proper safe areas

**Ready for deployment and iOS installation as a PWA.**