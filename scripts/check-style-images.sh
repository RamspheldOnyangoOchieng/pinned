#!/bin/bash

# Query the style_images table to verify the data

echo "🔍 Checking style_images table..."
echo "=================================="
echo ""

# Call the API to get style images
RESPONSE=$(curl -s http://localhost:3000/api/get-style-images)

echo "Database Records:"
echo "$RESPONSE" | jq '.' 2>/dev/null || echo "$RESPONSE"

echo ""
echo "=================================="
echo "✅ Check complete!"
