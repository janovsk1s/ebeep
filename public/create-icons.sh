#!/bin/bash

# Simple script to create placeholder PNG icons
# Creates basic black and white icons for PWA

# Check if ImageMagick is installed
if command -v convert &> /dev/null; then
    echo "Creating PNG icons from SVG..."
    convert -background white -density 512 icon.svg -resize 192x192 icon-192.png
    convert -background white -density 512 icon.svg -resize 512x512 icon-512.png
    echo "Icons created successfully!"
else
    echo "ImageMagick not found. Creating simple placeholder PNGs..."

    # Create simple black square placeholders using base64
    # 192x192 black square
    echo "iVBORw0KGgoAAAANSUhEUgAAAMAAAADACAAAAAB3tzPOAAAARklEQVR4nO3BMQEAAADCoPVPbQwfoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOBjYOAAAXmYpwUAAAAASUVORK5CYII=" | base64 -d > icon-192.png

    # 512x512 black square
    echo "iVBORw0KGgoAAAANSUhEUgAAAgAAAAIACAAAAADRE4smAAAARklEQVR4nO3BMQEAAADCoPVPbQwfoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOBjYOAAAXmYpwUAAAAASUVORK5CYII=" | base64 -d > icon-512.png

    echo "Placeholder icons created."
    echo "For better icons, install ImageMagick and run this script again."
fi
