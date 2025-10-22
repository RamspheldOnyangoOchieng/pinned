# 🎨 Novita AI Image Generation - Quick Start Guide

**Quick reference for setting up and testing image generation**

---

## ⚡ Quick Setup (5 minutes)

### 1. Get Novita API Key

```bash
# Visit https://novita.ai and sign up
# Navigate to Dashboard → API Keys
# Create new key and copy it
```

### 2. Add to Environment

```bash
# Edit .env.local
nano .env.local

# Add these lines:
NOVITA_API_KEY=sk_your_key_here
NEXT_PUBLIC_NOVITA_API_KEY=sk_your_key_here
```

### 3. Test Connection

```bash
# Run test script
pnpm run test-novita

# Expected output: ✅ Novita AI test completed successfully!
```

### 4. Done! 🎉

Your image generation is now ready to use in the application.

---

## 🧪 Test Commands

```bash
# Quick API test
pnpm run test-novita

# Test single image generation
node scripts/test-single-image.js

# Check what images exist
node scripts/check-images.js
```

---

## 🚀 Pre-generate Attribute Images (Optional)

For better user experience, pre-generate all character attribute images:

```bash
# This takes 30-60 minutes and costs ~$2-10 in API credits
node scripts/generate-all-attribute-images.js

# Or run in background:
node scripts/generate-all-attribute-images.js > ~/generation.log 2>&1 &

# Monitor progress:
tail -f ~/generation.log
```

**What gets generated:**
- Body types (slim, athletic, curvy, etc.) × 2 styles = ~20 images
- Ethnicities (caucasian, asian, african, etc.) × 2 styles = ~20 images  
- Hair colors (blonde, brunette, red, black, etc.) × 2 styles = ~20 images
- Hair styles (straight, wavy, curly, etc.) × 2 styles = ~20 images
- Eye colors (blue, green, brown, etc.) × 2 styles = ~20 images
- Plus other attributes...

**Total:** ~100-200 images for complete attribute library

---

## 💰 Cost Estimates

| Action | Cost | When |
|--------|------|------|
| Single test image | $0.02-0.05 | Testing only |
| Full attribute library | $2-10 | One-time setup |
| User-generated image | $0.02-0.10 | Per user request |
| Monthly (100 users, 5 images each) | ~$10-50 | Ongoing |

**Tip:** Set spending limits in Novita dashboard to avoid surprises!

---

## 🎨 Available Models

| Model | Speed | Quality | Cost | Best For |
|-------|-------|---------|------|----------|
| flux-schnell_v1.1 | ⚡⚡⚡ Fast | ⭐⭐⭐ Good | $ | Previews, testing |
| flux-dev_v1.1 | 🐢 Slow | ⭐⭐⭐⭐⭐ Excellent | $$$ | Final/premium |
| sd_xl_base_1.0 | 🚀 Medium | ⭐⭐⭐⭐ Great | $$ | General use |
| realisticVisionV60 | 🚀 Medium | ⭐⭐⭐⭐ Great | $$ | Realistic photos |

---

## 🔧 Troubleshooting

### Error: "API Key Invalid"

```bash
# Check key is set
echo $NOVITA_API_KEY

# Test directly
curl -X GET "https://api.novita.ai/v3/user/info" \
  -H "Authorization: Bearer $NOVITA_API_KEY"

# Restart app
sudo systemctl restart yourapp
```

### Error: "Out of Credits"

1. Go to [novita.ai/dashboard](https://novita.ai/dashboard)
2. Navigate to Billing → Add Credits
3. Add credits (minimum $5 recommended)

### Error: "Generation Timeout"

- Novita API might be under heavy load
- Try using faster model (flux-schnell instead of flux-dev)
- Wait a few minutes and try again

### Images Not Saving to Storage

```bash
# Check storage buckets exist
node scripts/create_resources.js

# Verify service role key
echo $SUPABASE_SERVICE_ROLE_KEY

# Check logs
sudo journalctl -u yourapp | grep -i storage
```

---

## 📊 Monitor Usage

```bash
# Check Novita dashboard
# Visit: https://novita.ai/dashboard/usage

# View application logs
sudo journalctl -u yourapp | grep -i novita

# Count generations in last 24 hours
sudo journalctl -u yourapp --since "24 hours ago" | grep "Image generated" | wc -l
```

---

## 🎯 Next Steps

After testing successfully:

1. ✅ Pre-generate attribute images (optional)
2. ✅ Set spending limit in Novita dashboard
3. ✅ Configure token costs in admin panel
4. ✅ Test image generation through UI
5. ✅ Monitor costs and usage

---

## 📚 Full Documentation

For complete details, see:
- [DEPLOYMENT.md](../DEPLOYMENT.md#novita-ai-image-generation-setup) - Full setup guide
- [scripts/README.md](README.md) - All available scripts
- [Novita AI Docs](https://novita.ai/docs) - API documentation

---

**Need Help?**
- Check error messages in logs: `sudo journalctl -u yourapp -f`
- Test connection: `pnpm run test-novita`
- Review Novita status: https://status.novita.ai
