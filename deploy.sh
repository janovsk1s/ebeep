#!/bin/bash

# Simple deployment script for EBeep
# Builds and deploys to GitHub Pages

echo "Building EBeep..."
npm run build

echo ""
echo "Build complete! The app is in the dist/ folder."
echo ""
echo "To deploy to GitHub Pages:"
echo "1. Install gh-pages: npm install -D gh-pages"
echo "2. Add to package.json scripts: \"deploy\": \"gh-pages -d dist\""
echo "3. Run: npm run deploy"
echo ""
echo "Or manually:"
echo "1. Push the dist/ folder to gh-pages branch"
echo "2. Enable GitHub Pages in repository settings"
echo ""
echo "For quick local testing:"
echo "  npm run preview"
