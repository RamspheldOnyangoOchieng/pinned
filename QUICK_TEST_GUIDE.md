# 🎯 Quick Test Guide

## How to Test the New Character Creation Flow

### 1. Start the Development Server
```bash
pnpm dev
# or
npm run dev
```

### 2. Open in Browser
Navigate to: **http://localhost:3000/create-character**

### 3. Test Each Step

#### ✅ Step 0: Choose Style
- Click "Realistic" or "Anime"
- Verify style selection highlights

#### ✅ Step 1: Select Model  
- Choose a base character model
- Click "Next"

#### ✅ Step 2: Age (WITH IMAGES)
- **Should see:** Real human portrait images, NO emojis
- **Should NOT see:** Emoji placeholders
- Images should accurately represent age (teenage vs elderly)
- Click an age option → should highlight with checkmark

#### ✅ Step 3: Body Type (WITH IMAGES)
- **Should see:** Real human body images
- **Should NOT see:** Emoji placeholders
- Images should show accurate body types (muscles, curves, etc.)
- Select a body type

#### ✅ Step 4: Ethnicity (WITH IMAGES)
- **Should see:** Real human portraits of different ethnicities
- **Should NOT see:** Flag or emoji placeholders
- Images should show distinct ethnic features
- Select ethnicity

#### ✅ Step 5: Hair Style (WITH IMAGES) - NEW!
- **Should see:** Close-up portraits showing hair styles
- Options: Straight, Wavy, Curly, Coily, Braided, Bun, Ponytail, Bob
- Select hair style

#### ✅ Step 6: Hair Length (WITH IMAGES) - NEW!
- **Should see:** Portraits showing different hair lengths
- Options: Bald, Buzz Cut, Short, Shoulder, Mid-Back, Waist, Hip, Floor
- Select hair length

#### ✅ Step 7: Hair Color (WITH IMAGES) - NEW!
- **Should see:** Portraits with different hair colors
- Options: Black, Dark Brown, Brown, Light Brown, Blonde, Platinum, Red, Auburn, Gray, White
- Select hair color

#### ✅ Step 8: Eye Color (WITH IMAGES) - NEW!
- **Should see:** Extreme close-ups of eyes with different colors
- Options: Brown, Dark Brown, Amber, Hazel, Green, Blue, Light Blue, Gray, Violet, Heterochromia
- Select eye color

#### ✅ Step 9: Eye Shape (WITH IMAGES) - NEW!
- **Should see:** Close-ups showing different eye shapes
- Options: Almond, Round, Hooded, Monolid, Upturned, Downturned, Close-Set, Wide-Set, Deep-Set, Prominent
- Select eye shape

#### ✅ Step 10: Lip Shape (WITH IMAGES) - NEW!
- **Should see:** Close-ups of different lip shapes
- Options: Full, Thin, Heart-Shaped, Bow-Shaped, Round, Wide, Heavy Bottom, Heavy Top, Downturned, Upturned
- Select lip shape

#### ✅ Step 11: Face Shape (WITH IMAGES) - NEW!
- **Should see:** Portraits showing different face structures
- Options: Oval, Round, Square, Heart, Diamond, Triangle, Oblong, Rectangle, Pear, Long
- Select face shape

#### ✅ Step 12: Hips (WITH IMAGES) - NEW!
- **Should see:** Full-body or hip-focused images
- Options: Narrow, Moderate, Wide, Pear, Hip Dips, Round Hips
- Select hip type

#### ✅ Step 13: Bust (WITH IMAGES) - NEW!
- **Should see:** Upper body images showing different proportions
- Options: Petite, Small, Medium, Large, Extra Large, Athletic
- Select bust size

#### ✅ Step 14-19: Remaining Steps
- Language (emoji badges - these are OK)
- Relationship (emoji badges)
- Occupation (emoji badges)
- Hobbies (multi-select badges)
- Personality (multi-select badges)
- Name & Preview

### 4. What to Look For

#### ✅ Good Signs
- Images load smoothly
- No emoji placeholders in steps 2-13
- Loading spinner shows while fetching images
- Selected cards highlight with blue border + checkmark
- "Next" button only enables after selection
- Progress bar updates correctly
- Images are high quality and accurate

#### ❌ Red Flags
- Emojis appearing in steps 2-13 (should be images only)
- Images not loading (stuck on spinner)
- "⚠️ Image unavailable" appearing (means API issue)
- React errors in browser console
- "Next" button stuck disabled
- Images don't match descriptions

### 5. Browser Console Check

Open DevTools (F12) → Console tab

**Should see:**
```
🖼️ Loading images for age, style: realistic
📡 Fetching: /api/attribute-images?category=age&value=20s&style=realistic
📦 Response for age-20s-realistic: ✅
🎯 setSingleSelect called: age = 20s
✅ Updated customization: {age: "20s", ...}
🚦 canProceed(step 2): true
```

**Should NOT see:**
- Red error messages
- "Failed to fetch" errors
- "Image not found" errors
- React key warnings

### 6. Mobile Testing

Resize browser to mobile width (375px)

**Check:**
- Images scale properly
- Cards stack vertically
- Text is readable
- Buttons are clickable
- Progress bar scrolls horizontally if needed

### 7. Style Switching

**Test both styles:**
1. Start with "Realistic"
2. Go through a few steps
3. Go back to Step 0
4. Switch to "Anime"
5. Verify images change to anime style

### 8. Final Checklist

```
[ ] All 198 images load correctly
[ ] NO emojis in steps 2-13
[ ] Loading spinners work
[ ] Selection highlights work
[ ] Navigation (Next/Back) works
[ ] Progress bar updates
[ ] Both Realistic and Anime styles work
[ ] Mobile responsive
[ ] No console errors
[ ] Character can be created successfully
```

---

## 🐛 Troubleshooting

### Images Not Loading
**Symptom:** Spinner keeps showing, image never appears

**Fix:**
1. Check browser console for errors
2. Test API directly: http://localhost:3000/api/attribute-images?category=age&value=20s&style=realistic
3. Should return: `{"success":true,"image_url":"https://..."}`

### Emojis Still Showing
**Symptom:** Emoji appears instead of image

**Fix:**
1. Check if image URL is actually returned
2. Verify SelectionCard component is using imageUrl prop
3. Check browser Network tab to see if image request is made

### Next Button Stuck
**Symptom:** Can't proceed to next step

**Fix:**
1. Check console for validation errors
2. Verify canProceed() function is checking correct state
3. Make sure a selection was actually made

### Database Connection Issues
**Symptom:** "Image not found" errors

**Fix:**
```bash
# Verify database has images
PGPASSWORD="UWpeuVPyaX17Yarx" psql -h "aws-0-us-east-1.pooler.supabase.com" -p 6543 -U "postgres.qfjptqdkthmejxpwbmvq" -d "postgres" -c "SELECT COUNT(*) FROM attribute_images;"

# Should return: 198
```

---

## 📊 Expected Results

### Database Query
```sql
SELECT category, COUNT(*) FROM attribute_images GROUP BY category;
```

**Should return:**
```
age         | 14
body        | 14
bust        | 12
ethnicity   | 14
eye_color   | 20
eye_shape   | 20
face_shape  | 20
hair_color  | 20
hair_length | 16
hair_style  | 16
hips        | 12
lip_shape   | 20
```

### API Test
```bash
curl "http://localhost:3000/api/attribute-images?category=hair_style&value=Straight&style=realistic"
```

**Should return:**
```json
{
  "success": true,
  "image_url": "https://qfjptqdkthmejxpwbmvq.supabase.co/storage/v1/object/public/assets/attribute-images/hair_style-straight-realistic-*.jpg",
  "category": "hair_style",
  "value": "Straight",
  "style": "realistic",
  ...
}
```

---

## ✅ Success Criteria

The transformation is successful if:

1. ✅ **Zero emojis** in image-based steps (2-13)
2. ✅ **All 198 images** load correctly
3. ✅ **Both styles** (realistic & anime) work
4. ✅ **Loading states** show before images
5. ✅ **Selection works** for all options
6. ✅ **Navigation works** smoothly
7. ✅ **Mobile responsive** on all devices
8. ✅ **No console errors** during flow
9. ✅ **Character creation** completes successfully
10. ✅ **Professional appearance** throughout

---

## 🎉 You're Done!

If all tests pass, you now have:
- 📸 198 professional human portrait images
- 🎨 12 visual customization categories
- 📱 20 total character creation steps
- ✨ Zero emoji placeholders
- 💯 100% professional user experience

**Ready to create amazing AI characters!** 🚀

---

*Quick Reference Guide - October 20, 2025*
