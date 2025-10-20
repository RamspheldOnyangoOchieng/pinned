#!/bin/bash

# Setup script for AI Image Generation System

echo "🎨 AI Image Generation System Setup"
echo "===================================="
echo ""

# Check if .env.local exists
if [ ! -f .env.local ]; then
    echo "❌ .env.local file not found!"
    echo "Creating from template..."
    cp .env.novita.example .env.local
    echo "✅ Created .env.local"
    echo "⚠️  Please add your NOVITA_API_KEY to .env.local"
    exit 1
fi

# Check if NOVITA_API_KEY is set
if ! grep -q "NOVITA_API_KEY=" .env.local || grep -q "NOVITA_API_KEY=your_novita_api_key_here" .env.local; then
    echo "⚠️  NOVITA_API_KEY not configured in .env.local"
    echo ""
    echo "To get your API key:"
    echo "1. Visit https://novita.ai/"
    echo "2. Sign up/Login"
    echo "3. Go to API section"
    echo "4. Copy your API key"
    echo "5. Add to .env.local: NOVITA_API_KEY=your_actual_key"
    echo ""
    exit 1
fi

echo "✅ Environment variables configured"
echo ""

# Check database migration
echo "📊 Checking database setup..."
echo ""
echo "Please run the database migration:"
echo "  1. Open Supabase Studio"
echo "  2. Go to SQL Editor"
echo "  3. Paste contents of migrations/create_attribute_images_tables.sql"
echo "  4. Run the query"
echo ""
echo "Or use Supabase CLI:"
echo "  supabase db push migrations/create_attribute_images_tables.sql"
echo ""

read -p "Have you run the database migration? (y/n) " -n 1 -r
echo ""
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "❌ Please run the database migration first"
    exit 1
fi

echo "✅ Database migration confirmed"
echo ""

# Summary
echo "🎉 Setup Complete!"
echo ""
echo "Next steps:"
echo "1. Start your dev server: npm run dev"
echo "2. Navigate to /admin/image-generator"
echo "3. Generate images for each category:"
echo "   - Age (Realistic)"
echo "   - Age (Anime)"
echo "   - Body (Realistic)"
echo "   - Body (Anime)"
echo "   - Ethnicity (Realistic)"
echo "   - Ethnicity (Anime)"
echo ""
echo "⏱️  Estimated time: 30-60 minutes for all images"
echo "💰 Estimated cost: ~$0.30-0.60 (one-time)"
echo ""
echo "📚 See IMAGE_GENERATION_SYSTEM.md for full documentation"
