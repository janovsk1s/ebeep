#!/usr/bin/env python3
from PIL import Image, ImageDraw, ImageFont

# Create 192x192 icon
img192 = Image.new('RGB', (192, 192), 'white')
draw = ImageDraw.Draw(img192)
draw.rectangle([10, 10, 182, 182], outline='black', width=4)
draw.rectangle([20, 20, 172, 172], fill='black')
draw.rectangle([30, 30, 162, 162], fill='white')
try:
    font = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSansMono-Bold.ttf', 24)
except:
    font = ImageFont.load_default()
draw.text((96, 96), 'E', fill='black', anchor='mm', font=font)
img192.save('icon-192.png')

# Create 512x512 icon
img512 = Image.new('RGB', (512, 512), 'white')
draw = ImageDraw.Draw(img512)
draw.rectangle([32, 32, 480, 480], outline='black', width=8)
draw.rectangle([48, 48, 464, 464], fill='black')
draw.rectangle([64, 64, 448, 448], fill='white')
try:
    font = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSansMono-Bold.ttf', 64)
except:
    font = ImageFont.load_default()
draw.text((256, 256), 'E', fill='black', anchor='mm', font=font)
img512.save('icon-512.png')

print('Icons created successfully!')
