#!/bin/bash

# EBeep Phone Setup Script
# Prepares the app for E Ink phones (Mudita Kompakt, etc.)

echo "======================================"
echo "  EBeep - E Ink Phone Setup"
echo "======================================"
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "Error: Run this script from the ebeep directory"
    exit 1
fi

echo "Choose installation method:"
echo ""
echo "1. Build and deploy to hosting (GitHub Pages, Netlify, etc.)"
echo "2. Create standalone HTML file for direct phone transfer"
echo "3. Build PWA for sideloading"
echo "4. Quick test server"
echo ""
read -p "Enter choice (1-4): " choice

case $choice in
    1)
        echo ""
        echo "Building for deployment..."
        npm run build

        echo ""
        echo "✅ Build complete! Files in dist/ folder"
        echo ""
        echo "Next steps:"
        echo "  1. Deploy dist/ folder to hosting:"
        echo "     - GitHub Pages: npm run deploy"
        echo "     - Netlify: Drag dist/ to netlify.com/drop"
        echo "     - Vercel: vercel deploy dist/"
        echo ""
        echo "  2. On your phone:"
        echo "     - Open browser"
        echo "     - Visit your deployment URL"
        echo "     - Tap menu → Install App"
        echo ""
        ;;

    2)
        echo ""
        echo "Creating standalone HTML file..."

        if [ -f "standalone.html" ]; then
            echo "✅ standalone.html already exists!"
            echo ""
            echo "Transfer to phone:"
            echo "  1. Connect phone via USB"
            echo "  2. Copy standalone.html to phone storage"
            echo "  3. On phone browser:"
            echo "     - Open: file:///storage/standalone.html"
            echo "     - Bookmark for easy access"
            echo ""
        else
            echo "❌ standalone.html not found"
            echo "Please ensure it's in the repository"
        fi
        ;;

    3)
        echo ""
        echo "Building PWA for sideloading..."
        npm run build

        echo ""
        echo "Creating transfer package..."
        mkdir -p phone-package
        cp -r dist/* phone-package/

        echo "✅ Package created in phone-package/ folder"
        echo ""
        echo "Transfer to phone:"
        echo "  1. Connect phone via USB"
        echo "  2. Copy phone-package/ folder to phone storage"
        echo "  3. On phone browser:"
        echo "     - Navigate to: file:///storage/phone-package/index.html"
        echo "     - Bookmark or install as PWA"
        echo ""
        ;;

    4)
        echo ""
        echo "Starting test server..."
        echo "This will run on your local network"
        echo ""

        # Get local IP
        LOCAL_IP=$(hostname -I | awk '{print $1}' 2>/dev/null || ipconfig getifaddr en0 2>/dev/null || echo "localhost")

        echo "📱 Access from phone at:"
        echo "   http://$LOCAL_IP:3000"
        echo ""
        echo "Make sure phone is on same WiFi network!"
        echo ""
        echo "Press Ctrl+C to stop server"
        echo ""

        npm run dev
        ;;

    *)
        echo "Invalid choice"
        exit 1
        ;;
esac

echo ""
echo "======================================"
echo "  Quick Login Info"
echo "======================================"
echo ""
echo "For Signal/Instagram/WhatsApp:"
echo "  1. Setup Beeper at https://beeper.com"
echo "  2. Connect your platforms"
echo "  3. In EBeep, login with:"
echo "     - Server: matrix.beeper.com"
echo "     - User: @yourname:beeper.com"
echo "     - Pass: your Beeper password"
echo ""
echo "For Matrix only:"
echo "  - Server: matrix.org (or your server)"
echo "  - User: @yourname:matrix.org"
echo "  - Pass: your Matrix password"
echo ""
echo "📖 See BEEPER.md for detailed guide"
echo "📱 See MUDITA-KOMPAKT.md for phone setup"
echo ""
