# EBeep - E Ink Optimized Matrix Client

A React web application for Beeper/Matrix messaging protocol, specifically optimized for E Ink displays.

## Quick Install

### 🚀 Easiest: Standalone Single File

Download `standalone.html` from this repo and open it in any browser. That's it!
- No installation needed
- No build step required
- Works offline after first load
- Just double-click to open

### 📱 Install as PWA (Progressive Web App)

Once deployed:
1. Visit the URL on your E Ink device
2. Tap browser menu → "Install App" or "Add to Home Screen"
3. Use as standalone app with offline support

### 🔧 Deploy Your Own

**Quick Deploy to GitHub Pages:**
```bash
npm install
npm run build
npm run deploy
```

**Or use any static host:**
- Netlify: Drag `dist/` folder to netlify.com/drop
- Vercel: `vercel deploy dist/`
- Any web server: Copy `dist/` contents

**See [INSTALL.md](INSTALL.md) for detailed installation options including:**
- Sideloading to E Ink devices
- Local file access
- Custom domain setup
- Device-specific instructions

## Features

- **Pure Black & White UI**: No grays or colors, optimized for E Ink contrast
- **Minimized Screen Refreshes**: Batched UI updates (2-3 second intervals)
- **Large, Readable Fonts**: 16px minimum for body text
- **No Animations**: All transitions and animations disabled
- **Keyboard Navigation**: Full keyboard support for accessibility
- **Core Messaging**: Send/receive text messages, unread counts, search
- **Two-Column Layout**: 30% conversation list, 70% message view
- **Static Hosting Ready**: Single-page application for easy deployment

## E Ink Optimizations

### Visual Design
- Pure `#000000` (black) and `#FFFFFF` (white) color scheme
- High contrast borders (2px minimum)
- Monospace fonts for crisp rendering
- No font smoothing or anti-aliasing
- Clear visual hierarchy using font size/weight only

### Performance
- **Batched UI Updates**: Changes collected for 2 seconds before redrawing
- **Debounced Search**: Search queries debounced to reduce redraws
- **Minimal Reflows**: Static layouts that don't change size
- **Efficient Scrolling**: Virtual scrolling ready for large message lists
- **Cached Renders**: React optimization for minimal re-renders

### Technical Details
- All CSS animations and transitions disabled
- Scroll behavior set to instant (no smooth scrolling)
- Font smoothing disabled
- Text rendering optimized for legibility
- Focus indicators with clear borders

## Prerequisites

- **For Standalone Version**: Any modern browser (Chrome, Edge, Safari, Firefox)
- **For Building**: Node.js 18+ and npm
- **For Usage**: Matrix/Beeper account

## Development

```bash
git clone <repository-url>
cd ebeep
npm install
npm run dev
```

Open http://localhost:3000 in your browser.

## Building

```bash
npm run build    # Builds to dist/ folder
npm run preview  # Preview production build
```

**For detailed installation instructions** including PWA installation, sideloading to E Ink devices, deployment options, and device-specific guides, see **[INSTALL.md](INSTALL.md)**.

## Usage

### Login

1. Enter your Matrix homeserver (e.g., `matrix.org` or `matrix.beeper.com`)
2. Enter your Matrix username (e.g., `@user:matrix.org`)
3. Enter your password
4. Click "Login"

Your session will be saved in localStorage for future visits.

### Messaging

- **Select Conversation**: Click on a conversation in the left panel
- **Send Message**: Type in the text area and press Enter (Shift+Enter for new line)
- **Search**: Use the search box at the top of the conversation list
- **Keyboard Navigation**: Tab through items, Enter to select
- **Mark as Read**: Automatically marked when viewing a conversation

### Keyboard Shortcuts

- `Tab`: Navigate between UI elements
- `Enter`: Select conversation or send message
- `Shift+Enter`: New line in message input
- `Escape`: Unfocus current element

## Project Structure

```
ebeep/
├── src/
│   ├── components/
│   │   ├── ConversationList.tsx  # Left panel with room list
│   │   ├── Login.tsx              # Login form
│   │   └── MessageView.tsx        # Right panel with messages
│   ├── hooks/
│   │   └── useMatrixClient.tsx    # Matrix SDK context/hook
│   ├── types/
│   │   └── index.ts               # TypeScript type definitions
│   ├── utils/
│   │   ├── matrixHelpers.ts       # Matrix SDK helper functions
│   │   └── uiBatcher.ts           # UI batching and debouncing
│   ├── App.tsx                    # Main app component
│   ├── main.tsx                   # Entry point
│   └── index.css                  # E Ink optimized styles
├── index.html                     # HTML template
├── package.json                   # Dependencies
├── tsconfig.json                  # TypeScript config
└── vite.config.ts                 # Vite build config
```

## E Ink Device Recommendations

### Optimal Settings
- Set device to "Crisp" or "High Contrast" mode if available
- Disable device animations
- Set refresh mode to "Quality" rather than "Speed"
- Use landscape orientation for better use of the two-column layout

### Tested Devices
- Onyx Boox devices (via built-in browser)
- reMarkable tablets (via browser)
- Any E Ink device with a modern web browser

### Browser Recommendations
- Chrome/Chromium-based browsers work best
- Disable browser features like smooth scrolling
- Set zoom level to 100% for crisp text rendering

## Performance Tips

### For Better E Ink Experience
1. Keep the number of visible conversations reasonable (under 50)
2. Archive old conversations you don't use
3. Wait for UI updates to complete before interacting (2-3 second delay)
4. Use search instead of scrolling when possible
5. Avoid rapid navigation between conversations

### Network Optimization
- The app uses Matrix's incremental sync for efficiency
- Initial sync may take time on slow connections
- Session is cached for faster subsequent loads

## Limitations

- **Text Only**: No support for images, videos, or files (by design for E Ink)
- **No Reactions**: Emoji reactions not displayed
- **No Encryption Verification**: Device verification not implemented
- **Basic Search**: Only searches room names and last messages
- **Limited Notifications**: Browser notifications not implemented

## Security

- Credentials stored in localStorage (encrypted by browser)
- HTTPS required for security (homeserver must support HTTPS)
- Session tokens handled by Matrix SDK
- No sensitive data logged to console

## Troubleshooting

### Login Failed
- Check homeserver URL format (with or without https://)
- Verify username includes homeserver (e.g., `@user:matrix.org`)
- Ensure password is correct
- Check if homeserver is accessible

### Messages Not Loading
- Check browser console for errors
- Verify network connection
- Try refreshing the page
- Clear localStorage and log in again

### UI Not Updating
- Wait 2-3 seconds for batched updates
- Check if Matrix sync is working (console logs)
- Try hard refresh (Ctrl+Shift+R)

### Build Warnings
- "Module externalized" warnings are normal for Matrix SDK
- Large chunk size is expected due to Matrix SDK bundle size
- These don't affect functionality

## Development

### Running Locally
```bash
npm run dev
```

### Type Checking
```bash
npx tsc --noEmit
```

### Production Build
```bash
npm run build
npm run preview  # Preview production build
```

## Contributing

Contributions welcome! Please focus on:
- Maintaining E Ink optimization principles
- Keeping the UI simple and high-contrast
- Avoiding features that require frequent redraws
- Testing on actual E Ink devices when possible

## License

MIT License - feel free to use and modify as needed.

## Acknowledgments

- Built with [Matrix JS SDK](https://github.com/matrix-org/matrix-js-sdk)
- Optimized for [Beeper](https://www.beeper.com/) and Matrix protocol
- Inspired by the need for efficient E Ink messaging clients

## Support

For issues or questions:
- Check the Troubleshooting section above
- Review Matrix SDK documentation
- Check browser console for error messages

## Roadmap

Potential future improvements:
- Persistent message caching
- Offline support
- Multiple account support
- Custom E Ink refresh intervals
- Better virtual scrolling implementation
- End-to-end encryption verification
