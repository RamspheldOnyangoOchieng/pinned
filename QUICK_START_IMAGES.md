# 🚀 Quick Start: AI Image Generation

## What You Need

1. **Novita AI API Key** - Sign up at https://novita.ai/
2. **Supabase Database** - Already configured
3. **10-15 minutes** - For initial setup

## Step-by-Step Setup

### 1️⃣ Get API Key (2 minutes)

```bash
# Visit https://novita.ai/
# Sign up/Login → API Section → Copy Key
```

### 2️⃣ Configure Environment (1 minute)

Add to `.env.local`:
```bash
NOVITA_API_KEY=your_actual_api_key_here
```

### 3️⃣ Run Database Migration (2 minutes)

**Option A: Supabase Studio**
1. Open https://supabase.com/dashboard
2. Select your project
3. Go to SQL Editor
4. Paste `migrations/create_attribute_images_tables.sql`
5. Click "Run"

**Option B: Supabase CLI**
```bash
supabase db push migrations/create_attribute_images_tables.sql
```

### 4️⃣ Start Dev Server (1 minute)

```bash
npm run dev
# or
pnpm dev
```

### 5️⃣ Generate Images (30-60 minutes)

Navigate to: **http://localhost:3000/admin/image-generator**

Generate in this order:
1. **Realistic → Age** → Click "Generate All"
2. **Realistic → Body** → Click "Generate All"
3. **Realistic → Ethnicity** → Click "Generate All"
4. **Anime → Age** → Click "Generate All"
5. **Anime → Body** → Click "Generate All"
6. **Anime → Ethnicity** → Click "Generate All"

**⏱️ Time:** ~5-10 minutes per category
**💰 Cost:** ~$0.05-0.10 per category (one-time)

### 6️⃣ Test It Out!

Navigate to: **http://localhost:3000/create-character**

You'll now see beautiful AI-generated images for each attribute!

## 🎯 What Gets Generated

### For Each Attribute:

**Age Categories (5 images each):**
- 🌸 18-22 (Young Adult)
- ✨ 23-27 (Mid Twenties)  
- 💫 28-32 (Late Twenties)
- 🌟 33-37 (Early Thirties)
- 👑 38+ (Mature)

**Body Types (5 images each):**
- 🌿 Slim
- 💪 Athletic
- 🌺 Curvy
- ⭐ Average
- 🌹 Plus-size

**Ethnicities (8 images each):**
- 🇪🇺 European
- 🇯🇵 East Asian
- 🇮🇳 South Asian
- 🌙 Middle Eastern
- 🌍 African
- 🌎 Latina
- 🏝️ Caribbean
- 🌈 Mixed

**Total:** 36 images per style (72 total for both Realistic and Anime)

## 🎨 Image Quality

All images are:
- ✅ Professional portrait photography style
- ✅ Tasteful and appropriate
- ✅ High quality (512x768px)
- ✅ Clearly represent the attribute
- ✅ Elegant and sophisticated
- ✅ No explicit/NSFW content

## 💡 Pro Tips

### Speed Up Generation
- Generate during off-hours
- Run one category at a time
- Keep browser tab open while generating

### Reduce Costs
- Generate only the style you need first (Realistic OR Anime)
- Test with one category before doing all
- Images are cached forever (one-time cost)

### Quality Control
- Check generated images in admin interface
- Use "Regenerate" button for any you don't like
- Each regeneration creates a new unique image

## 🔧 Troubleshooting

### "API Key Not Configured"
- Check `.env.local` file exists
- Verify `NOVITA_API_KEY` is set correctly
- Restart dev server after adding key

### "Generation Failed"
- Check API key is valid
- Verify you have credits in Novita account
- Check browser console for error details

### Images Not Showing
- Wait for generation to complete (look for ✓)
- Refresh the page
- Check browser console for errors
- Verify database migration ran successfully

### Slow Generation
- Normal! Each image takes 30-60 seconds
- Total time: 30-60 minutes for all images
- Run in background, come back later

## 📊 Progress Tracking

Watch the admin interface for:
- ✓ Green checkmarks = Success
- ✗ Red X = Failed (click regenerate)
- Loading spinner = In progress
- Image count = Total generated

## ✅ You're Done When...

1. All categories show green checkmarks
2. Images appear in the grid
3. `/create-character` page shows images
4. No error messages in console

## 🎉 Congratulations!

Your character creation flow now has beautiful, AI-generated images for every attribute!

---

**Need Help?** Check `IMAGE_GENERATION_SYSTEM.md` for detailed documentation.
