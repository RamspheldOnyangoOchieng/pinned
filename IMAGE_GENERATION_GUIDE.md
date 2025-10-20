# 🎨 Complete Image Generation Guide
## Generate Real Human Images for Character Creation Flow

**Last Updated:** October 18, 2025

---

## 📋 Overview

This guide will help you generate **professional, realistic human images** for the character creation flow using Novita AI. All images will be stored in Supabase and automatically rendered in the selection interface.

### What You're Generating

**Real portrait photographs** depicting:
- Different age ranges (18-19, 20s, 30s, 40s, 50s, 60s, 70+)
- Different body types (Muscular, Athletic, Slim, Chubby, Cub, Average, Curvy)
- Different ethnicities (Caucasian, Asian, Arab, Indian, Latina, African, Mixed)

**Two visual styles for each:**
- **Realistic**: Life-like, ultra-realistic photographic portraits
- **Anime**: Stylized anime-style illustrations

---

## 📊 Image Requirements

### Total Images Needed:

| Category    | Options | Realistic | Anime | Total |
|-------------|---------|-----------|-------|-------|
| Age         | 7       | 7         | 7     | 14    |
| Body Type   | 7       | 7         | 7     | 14    |
| Ethnicity   | 7       | 7         | 7     | 14    |
| **TOTAL**   | **21**  | **21**    | **21**| **42**|

### Image Specifications:

```
Dimensions: 512x768px (portrait)
Aspect Ratio: 2:3
Format: JPG
Quality: High (professional studio quality)
Content: Upper body portraits, tasteful and professional
```

---

## 🚀 Step-by-Step Generation Process

### Phase 1: Update the Admin Generator

The admin interface needs to be updated to support the new categories. I've already updated the prompts in the code.

### Phase 2: Generate Images

#### Option A: Using Admin Interface (Recommended)

1. **Start Dev Server:**
```bash
cd /home/ramspheld/Projects/Ramspheld/DINTYP.SE-2025-master(1)/DINTYP.SE-2025-master
pnpm dev
```

2. **Open Admin Interface:**
```
http://localhost:3000/admin/image-generator
```

3. **Generate Age Images (Realistic):**
   - Select Style: `Realistic`
   - Select Category: `Age`
   - Values to generate:
     - 18-19
     - 20s
     - 30s
     - 40s
     - 50s
     - 60s
     - 70+
   - Click: `Generate All`
   - Wait: ~7-10 minutes (7 images)

4. **Generate Body Type Images (Realistic):**
   - Keep Style: `Realistic`
   - Change Category to: `Body`
   - Values to generate:
     - Muscular
     - Athletic
     - Slim
     - Chubby
     - Cub
     - Average
     - Curvy
   - Click: `Generate All`
   - Wait: ~7-10 minutes (7 images)

5. **Generate Ethnicity Images (Realistic):**
   - Keep Style: `Realistic`
   - Change Category to: `Ethnicity`
   - Values to generate:
     - Caucasian
     - Asian
     - Arab
     - Indian
     - Latina
     - African
     - Mixed
   - Click: `Generate All`
   - Wait: ~7-10 minutes (7 images)

6. **Repeat for Anime Style:**
   - Change Style to: `Anime`
   - Repeat steps 3-5 for all categories
   - Total time: ~20-30 minutes

#### Option B: Using API Directly

```bash
# Generate all age images (realistic)
curl -X POST http://localhost:3000/api/attribute-images \
  -H "Content-Type: application/json" \
  -d '{
    "action": "batch",
    "category": "age",
    "values": ["18-19", "20s", "30s", "40s", "50s", "60s", "70+"],
    "style": "realistic"
  }'

# Generate all body type images (realistic)
curl -X POST http://localhost:3000/api/attribute-images \
  -H "Content-Type: application/json" \
  -d '{
    "action": "batch",
    "category": "body",
    "values": ["Muscular", "Athletic", "Slim", "Chubby", "Cub", "Average", "Curvy"],
    "style": "realistic"
  }'

# Generate all ethnicity images (realistic)
curl -X POST http://localhost:3000/api/attribute-images \
  -H "Content-Type: application/json" \
  -d '{
    "action": "batch",
    "category": "ethnicity",
    "values": ["Caucasian", "Asian", "Arab", "Indian", "Latina", "African", "Mixed"],
    "style": "realistic"
  }'

# Repeat for anime style by changing "style": "anime"
```

---

## 📝 Detailed Prompt Specifications

### Age Categories

#### 18-19
```
Realistic: Very youthful, fresh-faced woman with smooth skin and a playful, 
energetic presence typical of late teens. Professional portrait photography, 
studio lighting, idealized and polished.

Anime: Very youthful anime girl character, fresh-faced appearance, playful 
expression, energetic pose, vibrant colors, professional anime art.
```

#### 20s
```
Realistic: Woman in her twenties, vibrant, fit, adventurous appearance with 
youthful maturity emerging. Professional photography, elegant outfit, confident 
expression.

Anime: Anime character in her twenties, vibrant and fit appearance, adventurous 
vibe, detailed features, colorful styling.
```

#### 30s
```
Realistic: Confident woman in her thirties, balanced and attractive with slightly 
more defined features showing maturity and self-assurance. Sophisticated styling, 
professional portrait.

Anime: Mature anime character in thirties, balanced features, confident expression, 
refined styling, elegant appearance.
```

#### 40s
```
Realistic: Sophisticated woman in her forties with experienced, confident adult 
presence. Professional portrait, elegant styling, mature beauty.

Anime: Sophisticated anime character in forties, experienced appearance, confident 
demeanor, elegant mature styling.
```

#### 50s
```
Realistic: Mature woman in her fifties, refined with signs of life experience and 
charisma, subtle aging features. Distinguished appearance, professional photography.

Anime: Mature anime character in fifties, refined appearance, charismatic expression, 
subtle aging details, elegant styling.
```

#### 60s
```
Realistic: Distinguished woman in her sixties, wise and attractive, possibly 
silver-haired showing graceful aging. Elegant professional portrait.

Anime: Distinguished anime character in sixties, wise appearance, graceful aging, 
silver or gray hair possible, elegant styling.
```

#### 70+
```
Realistic: Older woman 70+ years, deeply mature with unique charm, strong character 
lines showing wisdom. Professional portrait celebrating aging beauty.

Anime: Elderly anime character 70+, deeply mature with character lines, wise 
expression, unique charm, respectful portrayal.
```

### Body Type Categories

#### Muscular
```
Realistic: Athletic woman with defined and strong physique, toned muscles visible, 
emphasizing power and intensity. Professional fitness photography.

Anime: Athletic anime character with defined muscles, strong physique, powerful 
presence, dynamic pose.
```

#### Athletic
```
Realistic: Woman with lean and toned body, reflecting agility and balanced strength. 
Fit appearance, professional sports photography style.

Anime: Anime character with athletic build, lean and toned, agile appearance, 
balanced proportions.
```

#### Slim
```
Realistic: Slender woman with light, elegant figure projecting subtle charm. 
Petite build, graceful presence, professional fashion photography.

Anime: Slender anime character with light elegant figure, petite proportions, 
graceful appearance.
```

#### Chubby
```
Realistic: Woman with soft and full body, radiating warmth, comfort, and 
approachability. Natural beauty, professional portrait.

Anime: Anime character with soft full figure, warm approachable appearance, 
comfortable presence.
```

#### Cub
```
Realistic: Woman with youthful yet stocky build, blending playful vibe with 
strength. Unique body type, professional photography.

Anime: Anime character with stocky playful build, youthful strength, unique 
proportions.
```

#### Average
```
Realistic: Woman with natural and relatable physique, everyday realism, balanced 
proportions. Approachable beauty, professional portrait.

Anime: Anime character with average natural build, relatable proportions, everyday 
realistic styling.
```

#### Curvy
```
Realistic: Woman with curvy hourglass figure, full feminine proportions, elegant 
curves. Professional glamour photography.

Anime: Anime character with curvy hourglass figure, full proportions, feminine 
curves, elegant styling.
```

### Ethnicity Categories

#### Caucasian
```
Realistic: Attractive woman with lighter skin tones and sharper or angular facial 
structure. European features, idealized and desirable, professional portrait.

Anime: Anime character with lighter skin tones, sharper facial features, European-
inspired styling.
```

#### Asian
```
Realistic: Attractive woman with fair to golden skin tones and softer or oval 
facial structure. Asian features, idealized and desirable, professional portrait.

Anime: Anime character with fair to golden skin, soft oval face, Asian-inspired 
features and styling.
```

#### Arab
```
Realistic: Attractive woman with olive to light brown skin tones and strong, 
defined facial features. Middle Eastern beauty, idealized and desirable.

Anime: Anime character with olive to light brown skin, strong defined features, 
Middle Eastern-inspired styling.
```

#### Indian
```
Realistic: Attractive woman with medium brown to deep brown skin tones and rounded 
or symmetrical facial features. South Asian beauty, idealized and desirable.

Anime: Anime character with medium to deep brown skin, rounded symmetrical features, 
South Asian-inspired styling.
```

#### Latina
```
Realistic: Attractive woman with warm tan to light brown skin tones and expressive, 
vibrant facial features. Latin American beauty, idealized and desirable.

Anime: Anime character with warm tan to light brown skin, expressive vibrant 
features, Latin-inspired styling.
```

#### African
```
Realistic: Attractive woman with deep brown to dark skin tones and bold, well-
defined facial features. African beauty, idealized and desirable.

Anime: Anime character with deep brown to dark skin, bold defined features, 
African-inspired styling.
```

#### Mixed
```
Realistic: Attractive woman with blended skin tones and unique facial harmony 
combining traits from multiple backgrounds. Mixed heritage beauty, idealized.

Anime: Anime character with blended skin tones, unique mixed heritage features, 
harmonious diverse styling.
```

---

## 🔧 Technical Implementation

### How Images Are Loaded

1. **User enters Step 2, 3, or 4**
2. Component calls `loadCategoryImages()` function
3. Function checks if images are cached in `attributeImages` state
4. If not cached, fetches from `/api/attribute-images` endpoint
5. API checks database for cached generated image
6. If not in database, generates new image with Novita AI
7. Image URL returned and displayed in SelectionCard
8. User selection cached for character creation

### Caching Strategy

```
Level 1: Component State (Session)
  ↓
Level 2: Database (attribute_images table)
  ↓
Level 3: Supabase Storage (CDN delivery)
```

### Database Schema

```sql
CREATE TABLE attribute_images (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  category TEXT NOT NULL,  -- 'age', 'body', 'ethnicity'
  value TEXT NOT NULL,     -- '20s', 'Athletic', 'Asian', etc.
  style TEXT NOT NULL,     -- 'realistic' or 'anime'
  image_url TEXT NOT NULL,
  seed INTEGER,
  width INTEGER,
  height INTEGER,
  prompt TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(category, value, style)
);
```

---

## 💰 Cost & Time Estimates

### Novita AI Pricing
- **Per Image:** ~$0.01-0.02 (512x768px, 30 steps)
- **Generation Time:** 30-60 seconds per image

### Total Costs

| Category    | Images | Time      | Cost    |
|-------------|--------|-----------|---------|
| Age         | 14     | ~10-15min | ~$0.21  |
| Body Type   | 14     | ~10-15min | ~$0.21  |
| Ethnicity   | 14     | ~10-15min | ~$0.21  |
| **TOTAL**   | **42** | **~40min**| **$0.63**|

**One-time cost:** ~$0.63
**One-time effort:** ~40-60 minutes
**Result:** Professional, cached images forever!

---

## ✅ Verification Checklist

After generation, verify:

### Database Check
```sql
-- Check total images generated
SELECT style, category, COUNT(*) 
FROM attribute_images 
GROUP BY style, category;

-- Should show:
-- realistic, age, 7
-- realistic, body, 7
-- realistic, ethnicity, 7
-- anime, age, 7
-- anime, body, 7
-- anime, ethnicity, 7
```

### Visual Check
1. Navigate to: `http://localhost:3000/create-character`
2. Select Realistic style (Step 0)
3. Proceed to Age selection (Step 2)
4. Verify: All 7 age images load
5. Select each age option - images should display
6. Repeat for Body Type (Step 3) and Ethnicity (Step 4)
7. Go back to Step 0, select Anime style
8. Verify anime images load for all categories

### API Check
```bash
# Check if images are accessible
curl http://localhost:3000/api/attribute-images?category=age&style=realistic

# Should return array of 7 images with URLs
```

---

## 🐛 Troubleshooting

### Issue: Images not generating

**Check Environment Variables:**
```bash
# In your .env.local file:
NOVITA_API_KEY=your_actual_key_here
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

**Restart Dev Server:**
```bash
# Stop current server (Ctrl+C)
pnpm dev
```

### Issue: Images generate but don't appear

**Check Browser Console:**
- Open DevTools (F12)
- Look for network errors
- Check if API calls are successful

**Clear Cache:**
```bash
# Clear Next.js cache
rm -rf .next
pnpm dev
```

### Issue: Some images fail to generate

**Regenerate Individual Images:**
1. Go to admin interface
2. Find failed image
3. Click regenerate button (↻)

**Or use API:**
```bash
curl -X POST http://localhost:3000/api/attribute-images \
  -H "Content-Type: application/json" \
  -d '{
    "action": "regenerate",
    "category": "age",
    "value": "20s",
    "style": "realistic"
  }'
```

---

## 📚 Related Files

### Code Files:
- `components/create-character-flow.tsx` - Main flow component
- `lib/novita-api.ts` - Image generation prompts and API
- `lib/attribute-images-service.ts` - Image caching service
- `app/api/attribute-images/route.ts` - API endpoint
- `app/admin/image-generator/page.tsx` - Admin interface

### Documentation:
- `CREATE_CHARACTER_FLOW_STATUS.md` - Overall status
- `CREATE_CHARACTER_VISUAL_MAP.md` - Visual flow diagram
- `QUICK_ACTION_PLAN.md` - Quick start guide
- This file: `IMAGE_GENERATION_GUIDE.md`

---

## 🎯 Success Criteria

You're successful when:

✅ All 42 images generated (21 realistic + 21 anime)
✅ Images visible in database (`attribute_images` table)
✅ Images load on create character page (Steps 2, 3, 4)
✅ Both realistic and anime styles work
✅ Selection works smoothly with real images
✅ Images show real human portraits (not emojis)
✅ Fallback to emojis works if image fails
✅ Can complete character creation end-to-end

---

## 🚀 Quick Start Commands

```bash
# 1. Start dev server
pnpm dev

# 2. Open admin interface
open http://localhost:3000/admin/image-generator

# 3. Generate all realistic images (~20min)
# - Select Realistic → Age → Generate All
# - Select Realistic → Body → Generate All  
# - Select Realistic → Ethnicity → Generate All

# 4. Generate all anime images (~20min)
# - Select Anime → Age → Generate All
# - Select Anime → Body → Generate All
# - Select Anime → Ethnicity → Generate All

# 5. Test the flow
open http://localhost:3000/create-character

# Done! 🎉
```

---

**Total Time: 40-60 minutes**
**Total Cost: ~$0.63**
**Result: Professional character creation flow with real human images!**

---

Last Updated: October 18, 2025
Next Review: After image generation complete
