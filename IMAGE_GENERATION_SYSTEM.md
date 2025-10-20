# AI-Generated Attribute Images System

## Overview

Complete implementation of AI-powered image generation for character attribute selection cards. Images are generated using Novita AI and cached in the database for fast loading.

## 🎨 Features

- ✅ **AI Image Generation** - Professional, tasteful images using Novita AI
- ✅ **Smart Caching** - Images stored in database, generated once
- ✅ **Batch Generation** - Generate all images for a category at once
- ✅ **Admin Interface** - Easy management and regeneration of images
- ✅ **Automatic Fallbacks** - Graceful degradation if images fail to load
- ✅ **Style Support** - Separate images for Realistic and Anime styles
- ✅ **Progress Tracking** - Real-time feedback during generation

## 📁 Files Created

### Core Services
- `lib/novita-api.ts` - Novita AI API client
- `lib/attribute-images-service.ts` - Image caching and management
- `hooks/use-attribute-images.ts` - React hooks for image loading
- `app/api/attribute-images/route.ts` - API endpoints

### Database
- `migrations/create_attribute_images_tables.sql` - Database schema

### Admin Interface
- `app/admin/image-generator/page.tsx` - Image generation UI

### Configuration
- `.env.novita.example` - Environment variable template

## 🚀 Setup Instructions

### 1. Get Novita AI API Key

1. Visit https://novita.ai/
2. Sign up for an account
3. Navigate to API section
4. Copy your API key

### 2. Configure Environment Variables

Add to your `.env.local` file:

```bash
NOVITA_API_KEY=your_actual_api_key_here
```

### 3. Run Database Migration

Execute the SQL migration:

```bash
# Using Supabase CLI
supabase db push migrations/create_attribute_images_tables.sql

# Or manually in Supabase Studio SQL editor
# Copy and paste the contents of create_attribute_images_tables.sql
```

### 4. Generate Images

#### Option A: Using Admin Interface (Recommended)

1. Navigate to `/admin/image-generator`
2. Select style (Realistic or Anime)
3. Choose category (Age, Body, or Ethnicity)
4. Click "Generate All"
5. Wait for generation to complete (~5-10 minutes per category)

#### Option B: Using API Directly

```bash
# Generate all age images for realistic style
curl -X POST http://localhost:3000/api/attribute-images \
  -H "Content-Type: application/json" \
  -d '{
    "action": "batch",
    "category": "age",
    "values": ["18-22", "23-27", "28-32", "33-37", "38+"],
    "style": "realistic"
  }'
```

### 5. Update Create Character Component

The component will automatically use cached images once generated. No code changes needed!

## 🎯 How It Works

### 1. Image Generation Flow

```
User Request → Check Cache → Cache Hit? → Return Image
                                ↓
                           Cache Miss
                                ↓
                       Generate with Novita AI
                                ↓
                        Save to Database
                                ↓
                          Return Image
```

### 2. Prompt Engineering

Images are generated with carefully crafted prompts:

**Example for Age 23-27, European, Realistic:**
```
professional portrait photography, woman in her mid twenties, 
vibrant, confident, European descent, fair skin, wearing elegant 
fashionable outfit, professional portrait, upper body shot, 
elegant, sophisticated, high fashion, studio lighting, 
professional makeup, tasteful, classy, high quality, detailed
```

**Negative Prompt (Always Applied):**
```
nude, naked, nsfw, explicit, sexual, vulgar, inappropriate, 
low quality, blurry, distorted
```

### 3. Database Schema

**attribute_images** table:
- `id` - UUID primary key
- `category` - 'age', 'body', 'ethnicity', etc.
- `value` - Specific value ('18-22', 'Slim', etc.)
- `style` - 'realistic' or 'anime'
- `image_url` - Generated image URL
- `seed` - Reproducible generation seed
- `prompt` - Full prompt used
- `created_at`, `updated_at` - Timestamps

### 4. Caching Strategy

- Images are checked in database first
- If not found, generate with Novita AI
- Store result immediately
- Subsequent requests use cached version
- Admin can regenerate any image

## 📊 Usage in Components

### Basic Usage

```typescript
import { useAttributeImage } from '@/hooks/use-attribute-images';

function MyComponent() {
  const { image, loading, error } = useAttributeImage(
    'age',
    '23-27',
    'realistic'
  );

  if (loading) return <Loader />;
  if (error) return <FallbackImage />;
  
  return <img src={image?.image_url} alt="Age 23-27" />;
}
```

### Batch Loading

```typescript
import { usePreloadImages } from '@/hooks/use-attribute-images';

function AgeSelection() {
  const ageValues = ['18-22', '23-27', '28-32', '33-37', '38+'];
  const { images, loading, getImage } = usePreloadImages(
    'age',
    ageValues,
    'realistic'
  );

  return (
    <div>
      {ageValues.map(value => {
        const image = getImage(value);
        return (
          <img key={value} src={image?.image_url} alt={value} />
        );
      })}
    </div>
  );
}
```

## 🔧 API Endpoints

### GET /api/attribute-images

Get cached image(s):

```bash
# Get specific image
GET /api/attribute-images?category=age&value=23-27&style=realistic

# Get all images for category
GET /api/attribute-images?category=age&style=realistic
```

### POST /api/attribute-images

Generate or regenerate images:

```bash
# Generate single image
POST /api/attribute-images
{
  "category": "age",
  "value": "23-27",
  "style": "realistic"
}

# Regenerate image
POST /api/attribute-images
{
  "action": "regenerate",
  "category": "age",
  "value": "23-27",
  "style": "realistic"
}

# Batch generate
POST /api/attribute-images
{
  "action": "batch",
  "category": "age",
  "values": ["18-22", "23-27", "28-32"],
  "style": "realistic"
}
```

## 🎨 Categories & Values

### Age
- 18-22 (Young Adult)
- 23-27 (Mid Twenties)
- 28-32 (Late Twenties)
- 33-37 (Early Thirties)
- 38+ (Mature)

### Body Type
- Slim
- Athletic
- Curvy
- Average
- Plus-size

### Ethnicity
- European
- East Asian
- South Asian
- Middle Eastern
- African
- Latina
- Caribbean
- Mixed

## 💰 Cost Estimates

Novita AI pricing (approximate):
- ~$0.01-0.02 per image (512x768px)
- Total for all categories: ~$0.30-0.60
- Images are cached, so cost is one-time

**Recommended:** Generate all images once, then use cached versions.

## 🛠️ Maintenance

### Regenerate Single Image

Use admin interface or API:
```bash
POST /api/attribute-images
{
  "action": "regenerate",
  "category": "age",
  "value": "23-27",
  "style": "realistic"
}
```

### Bulk Regeneration

In admin interface:
1. Select category
2. Click "Generate All"
3. Images will be overwritten

### Clear Cache

```sql
-- Clear all cached images
DELETE FROM attribute_images;

-- Clear specific category
DELETE FROM attribute_images WHERE category = 'age';

-- Clear specific style
DELETE FROM attribute_images WHERE style = 'anime';
```

## 🐛 Troubleshooting

### Images Not Generating

**Check API Key:**
```bash
echo $NOVITA_API_KEY
```

**Test API Connection:**
```bash
curl -X GET https://api.novita.ai/v3/user/info \
  -H "Authorization: Bearer YOUR_API_KEY"
```

**Check Logs:**
- Browser console for client errors
- Server logs for API errors
- Supabase logs for database errors

### Slow Generation

- Each image takes 30-60 seconds
- Run generation during off-hours
- Use batch generation for efficiency

### Low Quality Images

- Adjust prompt in `lib/novita-api.ts`
- Increase `steps` parameter (30-50)
- Try different models

## 📝 Best Practices

1. **Pre-generate all images** before launch
2. **Monitor API usage** and costs
3. **Back up database** regularly
4. **Use CDN** for image delivery (optional)
5. **Implement lazy loading** for better performance
6. **Add loading states** for better UX
7. **Have fallback images** ready

## 🔒 Security

- API key stored in environment variables
- Never expose key client-side
- Images stored with unique URLs
- Database access controlled by RLS policies
- Admin interface should be protected

## 📈 Future Enhancements

- [ ] Automatic image optimization
- [ ] CDN integration
- [ ] Image variant generation (multiple per attribute)
- [ ] User preference learning
- [ ] A/B testing different images
- [ ] Video generation support
- [ ] Custom upload option

---

**Ready to generate images!** Navigate to `/admin/image-generator` and start creating beautiful, professional images for your character creation flow.
