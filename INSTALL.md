# EBeep Installation Guide

Simple installation options for E Ink devices and regular browsers.

## Option 1: Install from Hosted URL (Easiest)

### Once Deployed to GitHub Pages:

1. **On Your E Ink Device:**
   - Open the browser
   - Navigate to: `https://yourusername.github.io/ebeep/`
   - Tap the browser menu (usually three dots)
   - Select "Install App" or "Add to Home Screen"
   - EBeep will install as a standalone app

2. **On Desktop:**
   - Visit the URL in Chrome/Edge
   - Click the install icon in the address bar (⊕ or computer icon)
   - Click "Install"

## Option 2: Deploy Your Own Instance

### GitHub Pages (Free Hosting):

```bash
# 1. Clone and setup
git clone <your-repo-url>
cd ebeep
npm install

# 2. Build
npm run build

# 3. Deploy to GitHub Pages
npm install -D gh-pages
npm run deploy
```

The app will be available at: `https://yourusername.github.io/ebeep/`

### Other Static Hosts:

The app is just static files. Deploy the `dist/` folder to:
- **Netlify**: Drag and drop the `dist/` folder to netlify.com/drop
- **Vercel**: `vercel deploy dist/`
- **Cloudflare Pages**: Connect your repo and build
- **Any Web Server**: Copy `dist/` contents to your web root

## Option 3: Sideload to E Ink Device

### For Devices with File Access (Onyx Boox, reMarkable, etc.):

1. **Build the app:**
   ```bash
   npm install
   npm run build
   ```

2. **Transfer to device:**
   - Connect device via USB
   - Copy the entire `dist/` folder to your device's storage
   - Note the path (e.g., `/storage/emulated/0/ebeep/`)

3. **Open on device:**
   - Open the browser
   - Type in address bar: `file:///storage/emulated/0/ebeep/index.html`
   - Bookmark this page for easy access
   - (Path may vary by device)

4. **Optional - Add to launcher:**
   - Some E Ink devices allow adding web apps to launcher
   - Check your device's documentation for "web app shortcuts"

### For Devices with SD Card:

1. Build the app (see above)
2. Copy `dist/` folder to SD card
3. Insert SD card in device
4. Open browser and navigate to: `file:///sdcard/ebeep/index.html`

## Option 4: Run Locally (Development)

```bash
# 1. Clone and install
git clone <your-repo-url>
cd ebeep
npm install

# 2. Run development server
npm run dev

# 3. Access at http://localhost:3000
```

Connect your E Ink device to the same network and access via your computer's IP:
`http://192.168.1.XXX:3000`

## Option 5: Quick Preview (No Install)

```bash
# Build and preview
npm run build
npm run preview

# Access at http://localhost:4173
```

## PWA Installation Tips

### Browser Support:
- **Chrome/Edge**: Best support, install button in address bar
- **Safari**: Tap Share → Add to Home Screen
- **Firefox**: Limited PWA support

### E Ink Device Tips:
- Use landscape orientation for best layout
- Set browser to "high contrast" or "crisp" mode if available
- Disable browser animations in settings
- Clear cache if updates don't appear

## Offline Usage

Once installed as PWA:
- App works offline (after first load)
- Matrix messages require internet connection
- Login session persists across visits
- Service worker caches the app for faster loading

## Updating the App

### For Self-Hosted:
1. Pull latest changes: `git pull`
2. Rebuild: `npm run build`
3. Redeploy: `npm run deploy` (or copy dist/ to server)

### For Installed PWA:
- The app checks for updates automatically
- Force update: Close app completely and reopen
- Or: Clear browser cache and reinstall

## Troubleshooting Installation

### "App not installing"
- Ensure you're using HTTPS (not HTTP)
- Some browsers require HTTPS for PWA installation
- Try a different browser
- Check if browser supports PWA

### "File access not working"
- Check file path syntax for your device
- Try different path formats:
  - `file:///sdcard/ebeep/index.html`
  - `file:///storage/emulated/0/ebeep/index.html`
  - `file:///mnt/sdcard/ebeep/index.html`

### "Can't connect to Matrix"
- Ensure device has internet connection
- Check if homeserver URL is correct
- Try HTTPS version of homeserver URL
- Some corporate networks block Matrix

### "Icons not showing"
- PNG icons are optional
- The SVG icon works on most modern devices
- To generate PNG icons: `npm run generate-icons`

## Advanced: Custom Domain

1. Deploy to GitHub Pages (see Option 2)
2. Add CNAME file to public/ folder:
   ```
   echo "ebeep.yourdomain.com" > public/CNAME
   ```
3. Rebuild and deploy
4. Configure DNS:
   - Add CNAME record: `ebeep` → `yourusername.github.io`
5. Access at: `https://ebeep.yourdomain.com`

## Security Notes

- Always use HTTPS for production deployments
- Matrix credentials stored in browser localStorage
- Never share your deployed URL if it contains tokens
- Use strong Matrix passwords
- Consider self-hosting for sensitive communications

## For Developers

### Quick Build:
```bash
npm run build          # Build for production
npm run preview        # Preview build
```

### File Size:
- Total: ~10 MB (mostly Matrix SDK)
- Compresses to ~3.5 MB with gzip
- First load may be slow on E Ink devices
- Subsequent loads are cached

### Customization:
- Edit `src/index.css` for styling
- Modify `public/manifest.json` for PWA settings
- Adjust `src/utils/uiBatcher.ts` for update timing

## Platform-Specific Instructions

### Onyx Boox:
- Use NeoReader or built-in browser
- Enable "App Mode" in browser settings
- Set refresh mode to "Quality"

### reMarkable:
- Install Toltec package manager first
- Use Oxide or draft browser
- May need to enable web apps in settings

### Kobo:
- Requires browser like Nickel Browser
- May need to sideload browser first
- Limited JavaScript support on older models

### PocketBook:
- Use built-in browser
- Enable JavaScript in settings
- Set E Ink refresh mode to maximum quality

## Next Steps

After installation:
1. Login with your Matrix credentials
2. Wait for initial sync (may take a minute)
3. Conversations will appear in left panel
4. Select a conversation to view messages
5. Type and send messages

See README.md for usage instructions.
