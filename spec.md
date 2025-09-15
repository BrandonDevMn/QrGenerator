# QR Code Generator PWA Spec

## Overview
A Progressive Web App (PWA) that allows users to generate QR codes from URLs and download them as images. Optimized for iPad and iOS devices using only HTML, CSS, and JavaScript.

## Core Functionality
- **Primary Feature:** URL to QR code conversion
- **Input:** Text input field for URL entry
- **Output:** Generated QR code displayed as an image
- **Download:** Save QR code as downloadable PNG/JPEG image

## Development Guidelines

### Code Quality
- Write simple, easy to read, well-commented code
- Use only HTML, CSS, and JavaScript (no frameworks or libraries)
- Ensure code is self-documenting with clear variable and function names

### File Structure
- **Entry point:** `index.html`
- **App icon:** `icon.jpg` (180x180px QR code themed icon)
- Include `manifest.json` for PWA functionality
- Include `sw.js` (service worker) for offline support
- `qr-generator.js` - Core QR code generation logic
- `style.css` - Main stylesheet

### QR Code Generation Requirements
- Generate QR codes using vanilla JavaScript (no external libraries)
- Support URL validation before QR generation
- Display generated QR code in a canvas element
- Provide download functionality for the generated image
- Support multiple image formats (PNG, JPEG)
- Handle error states (invalid URLs, generation failures)

## UI/UX Requirements

### Layout Structure
- **Bottom Navigation Tabs:**
  - **Left Tab (Primary):** "Generate" - Main QR code generation interface
  - **Right Tab:** "About" - App information, version, usage instructions
- **Main Interface Elements:**
  - URL input field with placeholder text
  - "Generate QR Code" button
  - QR code display area (canvas/image)
  - Download button (appears after generation)
  - Error message area

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

### Download Functionality
- Generate downloadable image files
- Support PNG and JPEG formats
- Customizable file naming (include timestamp or custom name)
- Mobile-friendly download experience

## iOS PWA Requirements
- Support iOS "Add to Home Screen" functionality
- Include proper meta tags for iOS Safari
- Ensure responsive design for iPad and iPhone
- Handle iOS safe areas and notches
- Touch-friendly interface with 56px minimum tap targets

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
- Implement QR code generation using vanilla JavaScript
- Support QR code error correction levels
- Handle different QR code versions based on data length
- Optimize for URL data type encoding

### Canvas Implementation
- Use HTML5 Canvas for QR code rendering
- Implement pixel-perfect QR code drawing
- Support high-resolution output for downloads
- Handle canvas to image conversion for downloads

### File Download System
- Create blob URLs for image downloads
- Support multiple file formats
- Implement filename generation with timestamps
- Handle browser download permissions

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

### About Tab
- App description and version information
- Usage instructions and tips
- QR code best practices
- Privacy policy and data handling

## Error Handling
- Invalid URL format validation
- Network connectivity issues
- QR code generation failures
- Download permission errors
- File system access issues

## Performance Requirements
- Fast QR code generation (< 1 second)
- Smooth animations and transitions
- Efficient memory usage for large QR codes
- Responsive interface on slower devices
- Offline capability for generated QR codes

## Security Considerations
- URL validation and sanitization
- No external API dependencies for QR generation
- Local processing only (no data transmission)
- Secure file download handling
- Input validation against malicious URLs

## Testing Requirements
- Test QR code generation accuracy
- Verify download functionality across browsers
- Test responsive design on various iOS devices
- Validate PWA installation process
- Ensure offline functionality works correctly
- Test with various URL formats and edge cases

## Accessibility Standards
- Screen reader support for all interactive elements
- Keyboard navigation for input fields and buttons
- High contrast mode support
- Alternative text for generated QR codes
- Voice-over announcements for generation status

When implementing this spec, ensure the QR codes are properly scannable, the download functionality works reliably on iOS devices, and the app provides a smooth, native-like experience when installed as a PWA.