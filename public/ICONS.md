# Icon Files

## Current Setup

The app uses `icon.svg` which works on all modern browsers.

## Optional: Generate PNG Icons

If you want PNG icons for better compatibility:

### Option 1: Online Generator
1. Visit https://realfavicongenerator.net/
2. Upload `icon.svg`
3. Download and extract to this folder

### Option 2: ImageMagick (Command Line)
```bash
cd public/
convert -background white -density 512 icon.svg -resize 192x192 icon-192.png
convert -background white -density 512 icon.svg -resize 512x512 icon-512.png
```

### Option 3: Manual Creation
Use any image editor to create:
- `icon-192.png` - 192x192 pixels, black and white
- `icon-512.png` - 512x512 pixels, black and white

## Note

The app works perfectly fine with just the SVG icon. PNG icons are optional and only improve compatibility with older browsers.
