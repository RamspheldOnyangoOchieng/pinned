#!/bin/bash

# Script to generate style images using Novita AI and upload to Supabase

echo "🎨 Starting Style Image Generation..."
echo "===================================="

# Check if server is running
if ! curl -s http://localhost:3000 > /dev/null; then
    echo "❌ Error: Dev server is not running!"
    echo "Please start the server with: pnpm dev"
    exit 1
fi

echo ""
echo "📸 Generating Realistic Style Image..."
echo "---------------------------------------"

REALISTIC_RESPONSE=$(curl -s -X POST http://localhost:3000/api/generate-style-images \
  -H "Content-Type: application/json" \
  -d '{"style": "realistic"}')

echo "Response: $REALISTIC_RESPONSE"

if echo "$REALISTIC_RESPONSE" | grep -q "error"; then
    echo "❌ Failed to generate Realistic image"
    echo "$REALISTIC_RESPONSE"
else
    echo "✅ Realistic style image generated successfully!"
fi

echo ""
echo "🎌 Generating Anime Style Image..."
echo "-----------------------------------"

ANIME_RESPONSE=$(curl -s -X POST http://localhost:3000/api/generate-style-images \
  -H "Content-Type: application/json" \
  -d '{"style": "anime"}')

echo "Response: $ANIME_RESPONSE"

if echo "$ANIME_RESPONSE" | grep -q "error"; then
    echo "❌ Failed to generate Anime image"
    echo "$ANIME_RESPONSE"
else
    echo "✅ Anime style image generated successfully!"
fi

echo ""
echo "===================================="
echo "✨ Image Generation Complete!"
echo ""
echo "The images have been:"
echo "  1. Generated using Novita AI"
echo "  2. Uploaded to Supabase Storage (assets bucket)"
echo "  3. Seeded to the style_images table"
echo ""
echo "Check your Supabase Storage bucket to see the images!"
