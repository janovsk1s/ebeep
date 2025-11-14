# EBeep on Mudita Kompakt - Complete Setup Guide

Step-by-step guide for installing and using EBeep on your Mudita Kompakt E Ink phone.

## What You'll Get

- **Signal messages** on your E Ink phone
- **Instagram DMs** with black & white UI
- **WhatsApp, Telegram, Discord** and more (via Beeper)
- **Pure E Ink optimized** interface
- **Minimal battery drain** - no animations
- **Works offline** after initial setup

## Prerequisites

✅ Mudita Kompakt phone with browser
✅ Internet connection (WiFi or mobile data)
✅ Beeper account (free - see BEEPER.md)
✅ 5-10 minutes for setup

## Installation Methods

Choose the method that works best for you:

### Method 1: PWA Install (Recommended)

**Easiest - install as a standalone app**

1. **Setup Beeper first** (one-time):
   - On your computer or another phone
   - Go to https://www.beeper.com/
   - Create account and connect Signal, Instagram, etc.
   - See BEEPER.md for detailed steps

2. **On Mudita Kompakt:**
   - Open the browser
   - Navigate to: `https://yourusername.github.io/ebeep/`
     (Or wherever you deployed EBeep)
   - Wait for page to load (may take 30-60 seconds first time)

3. **Install as app:**
   - Tap browser menu (⋮ or similar)
   - Select "Add to Home Screen" or "Install App"
   - Name it "EBeep" or "Messages"
   - Tap "Add" or "Install"

4. **Login:**
   - Open EBeep from home screen
   - Homeserver: `matrix.beeper.com`
   - Username: `@yourname:beeper.com`
   - Password: Your Beeper password
   - Tap "Login"

5. **Wait for sync:**
   - First sync takes 1-2 minutes
   - All your conversations will appear
   - Signal, Instagram, etc. all in one list!

### Method 2: Standalone File (No Internet After Setup)

**Works completely offline**

1. **On your computer:**
   - Download `standalone.html` from the repo
   - Or build the app: `npm run build`

2. **Transfer to Mudita Kompakt:**
   - Connect phone via USB
   - Copy `standalone.html` to phone storage
   - Remember the path (e.g., `/storage/ebeep.html`)

3. **On Mudita Kompakt:**
   - Open browser
   - Type in address bar: `file:///storage/ebeep.html`
   - Bookmark this page for easy access!

4. **Login and use** (same as Method 1 above)

### Method 3: Hosted URL (Quick Test)

**No installation needed**

1. **Open browser** on Mudita Kompakt
2. **Navigate to:** Your deployed URL or use the standalone.html link
3. **Bookmark** the page for easy return
4. **Login** with Beeper credentials

## First-Time Setup Checklist

- [ ] Create Beeper account on computer
- [ ] Connect Signal to Beeper
- [ ] Connect Instagram to Beeper (optional)
- [ ] Connect other platforms to Beeper (optional)
- [ ] Install EBeep on Mudita Kompakt
- [ ] Login with Beeper credentials
- [ ] Wait for initial sync
- [ ] Send a test message
- [ ] Bookmark or install as PWA

## Mudita Kompakt Optimizations

### Browser Settings

1. **Enable High Contrast Mode:**
   - Settings → Display → High Contrast
   - Or Browser → Settings → Accessibility

2. **Disable Animations:**
   - Settings → Display → Animations → Off
   - Reduces unnecessary refreshes

3. **Set E Ink Refresh:**
   - Settings → E Ink → Refresh Mode → Quality
   - Better text clarity

4. **Adjust Font Size:**
   - Browser → Settings → Font Size → Medium/Large
   - EBeep already uses large fonts

### Phone Settings

1. **Orientation:**
   - Landscape mode works best (30/70 split)
   - Portrait mode shows full-screen messages

2. **Power Saving:**
   - EBeep uses minimal power already
   - Enable battery saver if needed

3. **Data Usage:**
   - Initial sync uses ~5-10MB
   - Ongoing usage is very light (~1-2MB/day)

## Daily Usage

### Opening EBeep

**If installed as PWA:**
- Tap EBeep icon on home screen
- Opens in standalone mode

**If using bookmark:**
- Open browser
- Tap bookmarks
- Select EBeep

**If using file:**
- Open browser
- Type: `file:///storage/ebeep.html`

### Sending Messages

1. **Select conversation** from left panel (tap)
2. **Type message** in text box at bottom
3. **Tap Send** or press Enter
4. **Wait 2-3 seconds** for E Ink refresh
5. **Message sent!** Recipient gets it on their platform

### Receiving Messages

- **Messages arrive automatically** when online
- **Unread count** shows in conversation list (bold)
- **Tap conversation** to read messages
- **Messages auto-marked as read** when viewed

### Navigation

**Portrait Mode:**
- See conversation list first
- Tap a conversation to open
- Tap "← Back" to return to list

**Landscape Mode:**
- See both panels simultaneously
- Left: Conversations
- Right: Messages
- Tap conversation to switch

### Keyboard Shortcuts

- **Tab** - Navigate between fields
- **Enter** - Send message (in message box)
- **Shift+Enter** - New line in message
- **Escape** - Unfocus current field

## Optimized Features for E Ink

### What Works Great

✅ **Text messages** - Clear, crisp black text
✅ **Conversation list** - Bold for unread
✅ **Search** - Find conversations quickly
✅ **Read receipts** - Shows when read
✅ **Long battery life** - No animations or colors
✅ **Offline mode** - Works after first load

### What's Intentionally Disabled

❌ **Images/Photos** - Not shown (E Ink limitation)
❌ **Animations** - Disabled for refresh speed
❌ **Colors** - Pure black & white only
❌ **Emoji reactions** - Not displayed
❌ **Typing indicators** - Heavily debounced

### UI Update Behavior

- **Updates batched** every 2-3 seconds
- **Reduces screen refreshes** (saves battery)
- **New messages** appear after short delay
- **This is intentional** for E Ink optimization

## Troubleshooting

### "Page won't load"

- Check internet connection
- Try reloading (pull down or refresh)
- Clear browser cache
- Restart browser

### "Can't login"

- Verify homeserver: `matrix.beeper.com`
- Check username format: `@name:beeper.com`
- Confirm password is correct
- Try logging in on computer first

### "Conversations not showing"

- Wait 1-2 minutes for sync
- Check internet connection
- Ensure Beeper bridges are connected
- Try logging out and back in

### "Messages delayed"

- This is normal - batched for E Ink
- Updates every 2-3 seconds
- Refresh by changing conversation and back
- Or logout/login to force sync

### "App is slow"

- First load is always slower
- Subsequent loads use cache
- Consider using PWA install
- Mudita Kompakt has limited processing power

### "Can't send messages"

- Check internet connection
- Verify recipient platform is online
- Try sending from Beeper app first
- Check if bridge needs re-auth

### "Battery draining fast"

- EBeep should use minimal battery
- Check other apps running
- Disable unused Beeper bridges
- Close browser when not in use

## Tips & Tricks

### Quick Access

1. **Set as default messaging app:**
   - Some launchers support this
   - Check Mudita settings

2. **Home screen widget:**
   - Add browser shortcut
   - Name it "Messages" or "EBeep"

3. **Quick bookmark:**
   - Browser → Bookmarks → Add
   - Place in toolbar for easy access

### Better Performance

1. **Use landscape mode** for best experience
2. **Close other browser tabs** to free memory
3. **Clear cache weekly** for speed
4. **Disable unused bridges** in Beeper

### Privacy

1. **Use screen lock** on phone
2. **Logout when done** (if shared device)
3. **HTTPS only** for security
4. **Consider self-hosted** Beeper for more privacy

### Notifications

- Browser notifications may work
- Check Mudita notification settings
- Or open app periodically to check
- Beeper can email for important messages

## Advanced Setup

### Custom Domain

1. Deploy EBeep to your own domain
2. Easier to remember URL
3. See INSTALL.md for deployment guide

### Self-Hosted Beeper

1. Run your own Matrix bridges
2. Maximum privacy
3. See BEEPER.md for instructions

### Offline-First Setup

1. Use standalone.html method
2. Store on SD card
3. Only connect for sync
4. Save mobile data

## Comparison to Other Apps

### EBeep vs Beeper App

| Feature | EBeep | Beeper App |
|---------|-------|------------|
| E Ink Optimized | ✅ Yes | ❌ No |
| Battery Usage | ⚡ Very low | 🔋 Moderate |
| Text Messages | ✅ Yes | ✅ Yes |
| Images/Media | ❌ No | ✅ Yes |
| Animations | ❌ None | ✅ Full |
| Offline | ✅ Partial | ❌ No |
| Works on Mudita | ✅ Yes | ❌ No app |

### EBeep vs Signal App

| Feature | EBeep | Signal App |
|---------|-------|------------|
| E Ink Optimized | ✅ Yes | ❌ No |
| Signal Messages | ✅ Via Beeper | ✅ Native |
| Instagram DMs | ✅ Via Beeper | ❌ No |
| Multi-Platform | ✅ Yes | ❌ Signal only |
| Privacy | ⚠️ Via Beeper | ✅ Direct |

## Frequently Asked Questions

**Q: Do I need Beeper for Signal/Instagram?**
A: Yes, Beeper bridges these platforms to Matrix. Alternatively, self-host bridges.

**Q: Does this use mobile data?**
A: Yes, but very little (~1-2MB/day). Offline mode works after first load.

**Q: Can I use without Beeper?**
A: Yes! Use any Matrix account. You'll only see Matrix messages, not Signal/Instagram.

**Q: Is it secure?**
A: Yes, uses same encryption as Matrix/Beeper. HTTPS required.

**Q: Works on other E Ink phones?**
A: Yes! Works on any E Ink device with a browser (Boox, reMarkable, etc.)

**Q: Can I make voice calls?**
A: No, text only. This is intentional for E Ink optimization.

**Q: Multiple accounts?**
A: Not yet. One account at a time. Logout to switch.

**Q: Costs money?**
A: EBeep is free. Beeper has free tier. Self-hosting has server costs.

## Getting Help

1. **Check this guide** first
2. **Read BEEPER.md** for platform issues
3. **See INSTALL.md** for deployment help
4. **Check README.md** for features
5. **Beeper support** for bridge issues

## Quick Reference Card

**Installation:** Deploy → Open URL → Install PWA → Login

**Login:**
- Server: `matrix.beeper.com`
- User: `@name:beeper.com`
- Pass: Your Beeper password

**Usage:**
- Tap conversation
- Type message
- Tap Send or Enter
- Wait 2-3 sec for refresh

**Navigation:**
- Portrait: Back button to list
- Landscape: Both panels visible
- Tab key to switch fields

**Settings:**
- High contrast mode on
- Animations off
- E Ink quality mode
- Landscape orientation

## Summary

✅ **Install EBeep** as PWA or use standalone.html
✅ **Setup Beeper** to bridge Signal, Instagram, WhatsApp
✅ **Login on Mudita Kompakt** with Beeper credentials
✅ **Use for all messaging** - optimized for E Ink
✅ **Enjoy long battery life** and crisp text!

Perfect for E Ink phones! 🎉
