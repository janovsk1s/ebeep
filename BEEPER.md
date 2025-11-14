# Signal & Instagram Support via Beeper

EBeep works with **Beeper** to support Signal, Instagram DMs, WhatsApp, and many other messaging platforms - all in one app!

## What is Beeper?

Beeper is a service that bridges multiple chat platforms to the Matrix protocol. This means you can use EBeep to access:

- **Signal** messages
- **Instagram** DMs
- **WhatsApp** messages
- **Telegram** chats
- **Discord** servers
- **SMS** (on Android)
- **iMessage** (with Beeper Cloud)
- And 10+ more platforms!

All these platforms appear as Matrix conversations in EBeep.

## Quick Setup (Easiest)

### 1. Create a Beeper Account

**Option A: Beeper Cloud (Recommended)**
1. Go to https://www.beeper.com/
2. Sign up for a free account (or waitlist)
3. Once approved, you'll get a Beeper account

**Option B: Self-Hosted Beeper (Advanced)**
- Requires running your own Matrix server with bridges
- See "Advanced Setup" section below

### 2. Connect Your Platforms to Beeper

1. **Open Beeper** (on desktop or phone app)
2. **Add bridges** for the platforms you want:
   - Click "+ Add Network"
   - Select Signal, Instagram, WhatsApp, etc.
   - Follow the connection steps for each

**For Signal:**
- Link your phone number
- Scan QR code with Signal app
- Wait for sync to complete

**For Instagram:**
- Enter your Instagram username/password
- Complete 2FA if enabled
- Allow connection

**For WhatsApp:**
- Scan QR code with WhatsApp
- Wait for sync

### 3. Login to EBeep

1. **Open EBeep** on your E Ink device
2. **Login with Beeper credentials:**
   - Homeserver: `matrix.beeper.com`
   - Username: Your Beeper username (e.g., `@you:beeper.com`)
   - Password: Your Beeper password

3. **Wait for sync** - Your conversations from all platforms will appear!

## Using EBeep with Beeper

### How It Works

- **All platforms appear as Matrix rooms** in the conversation list
- **Signal chats** show with [Signal] prefix (or similar)
- **Instagram DMs** show with [Instagram] prefix
- **Send messages** normally - they route to the correct platform
- **Receive messages** from all platforms in real-time

### Conversation Identification

Beeper typically prefixes conversations:
- `[Signal] John Doe` - Signal conversation
- `[Instagram] @username` - Instagram DM
- `[WhatsApp] Contact` - WhatsApp chat
- Or uses avatar/icon metadata

### Features Available

✅ **Text messages** - Full support
✅ **Read receipts** - Works on most platforms
✅ **Unread counts** - Shows unread messages
✅ **Real-time sync** - Messages arrive instantly
❌ **Images/files** - Not displayed (E Ink limitation)
❌ **Reactions** - Not shown (E Ink optimization)

## Platform-Specific Notes

### Signal
- Full text message support
- Group chats supported
- Typing indicators (debounced in EBeep)
- End-to-end encrypted (via Beeper bridge)

### Instagram DMs
- Direct messages supported
- Text-only in EBeep
- Images/stories not shown
- May require periodic re-authentication

### WhatsApp
- Full chat support
- Groups supported
- QR code linking required
- Must stay connected on phone

### Others
- Most text-based platforms work well
- Check Beeper documentation for specifics

## Mudita Kompakt Setup

### Quick Setup for E Ink Phone

1. **Get Beeper account** (see above)
2. **Connect platforms** (Signal, Instagram, etc.) using Beeper desktop app or website
3. **On Mudita Kompakt:**
   - Open browser
   - Visit your EBeep deployment URL
   - Or open `standalone.html` from storage
   - Login with Beeper credentials
   - Install as PWA (browser menu → Add to Home Screen)

4. **Set as default messaging app** (optional)
   - Some E Ink phones allow setting web apps as defaults
   - Check Mudita settings for "Default apps"

### Mudita-Specific Tips

- Use **landscape mode** for best layout
- Enable **high contrast mode** in browser
- Disable **browser animations** in settings
- Set **E Ink refresh** to "Quality" mode
- **Bookmark** the app URL for quick access
- Consider **offline mode** - works after first load

## Troubleshooting

### "Can't connect to Beeper"
- Check internet connection
- Verify homeserver is `matrix.beeper.com`
- Ensure username includes `@` and `:beeper.com`
- Try re-entering password

### "Conversations not syncing"
- Wait 1-2 minutes for initial sync
- Check if bridges are connected in Beeper app
- Re-link platforms in Beeper settings
- Restart EBeep (logout and login again)

### "Messages not sending"
- Verify internet connection
- Check if bridge is online in Beeper
- Try sending from Beeper app first
- Re-authenticate platform if needed

### "Instagram/Signal not showing"
- Ensure you connected them in Beeper first
- Wait for full sync to complete
- Check Beeper app to confirm bridge status
- May need to trigger a message to appear

## Advanced: Self-Hosted Beeper

For privacy or control, you can self-host Matrix bridges:

### Requirements
- Matrix homeserver (Synapse, Dendrite, etc.)
- Docker or Linux server
- Domain name (optional but recommended)

### Install Bridges

1. **Signal Bridge** (mautrix-signal)
   ```bash
   docker run -d \
     --name mautrix-signal \
     -v /path/to/config:/data \
     dock.mau.dev/mautrix/signal:latest
   ```

2. **Instagram Bridge** (mautrix-instagram)
   ```bash
   docker run -d \
     --name mautrix-instagram \
     -v /path/to/config:/data \
     dock.mau.dev/mautrix/instagram:latest
   ```

3. **Configure each bridge** with your homeserver details

4. **Link accounts** by chatting with bridge bot

5. **Login to EBeep** with your homeserver URL

### Resources
- mautrix bridges: https://github.com/mautrix
- Matrix bridges list: https://matrix.org/bridges/
- Self-hosting guide: https://matrix.org/docs/guides/self-hosting/

## Privacy & Security

### Beeper Cloud
- Beeper hosts the bridges
- Messages pass through Beeper servers
- End-to-end encrypted where supported
- Read Beeper privacy policy

### Self-Hosted
- You control all data
- Messages stay on your server
- More privacy, but more maintenance
- Requires technical setup

### EBeep Security
- Credentials stored locally in browser
- HTTPS required for security
- No data sent to third parties
- Session stored in localStorage

## Comparison: Beeper Cloud vs Self-Hosted

| Feature | Beeper Cloud | Self-Hosted |
|---------|--------------|-------------|
| Setup | Easy, 5 minutes | Complex, 1-2 hours |
| Cost | Free tier available | Server costs |
| Maintenance | None | Regular updates |
| Privacy | Beeper has access | Full control |
| Reliability | High uptime | Depends on setup |
| Support | Beeper support | Community/yourself |

## Recommended Setup for Mudita Kompakt

**For most users:**
1. Use Beeper Cloud (easiest)
2. Connect Signal + Instagram + others
3. Install EBeep as PWA
4. Use daily for all messaging

**For advanced users:**
1. Self-host Matrix + bridges
2. Configure for maximum privacy
3. Deploy EBeep to personal domain
4. Full control over all data

## Alternative: Direct Matrix

If you only want Matrix (not Signal/Instagram):
1. Create account on matrix.org or other server
2. Login to EBeep with Matrix credentials
3. Use native Matrix features only
4. No bridges needed

## Getting Help

- **Beeper support:** https://www.beeper.com/support
- **Matrix help:** https://matrix.org/docs/
- **EBeep issues:** Check README and INSTALL.md
- **Bridges:** Check specific bridge documentation

## Summary

✅ **Use Beeper Cloud** for Signal + Instagram + more
✅ **Works on Mudita Kompakt** and other E Ink phones
✅ **All messages in one app** - EBeep via Matrix
✅ **Simple setup** - Connect platforms, login, done!
✅ **Self-hosting option** available for advanced users

Start with Beeper Cloud for the easiest experience!
