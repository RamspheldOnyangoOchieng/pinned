# 🎯 Quick Reference Card - Novita AI Image Generation

**Keep this handy for quick lookups**

---

## 🔑 Setup (One-Time)

```bash
# 1. Get API key from https://novita.ai
# 2. Add to .env.local:
NOVITA_API_KEY=sk_your_key_here
NEXT_PUBLIC_NOVITA_API_KEY=sk_your_key_here

# 3. Test it works:
pnpm run test-novita
```

---

## ⚡ Quick Commands

| Command | What It Does |
|---------|--------------|
| `pnpm run test-novita` | Test Novita AI connection |
| `node scripts/generate-all-attribute-images.js` | Pre-generate all images |
| `node scripts/generate-missing-images.js` | Generate only missing images |
| `node scripts/check-images.js` | Check what exists |
| `sudo journalctl -u yourapp \| grep novita` | View Novita logs |

---

## 💰 Costs

| Item | Cost |
|------|------|
| Single test image | $0.02-0.05 |
| Full attribute library (one-time) | $2-10 |
| Per user-generated image | $0.02-0.10 |
| Monthly (100 active users) | ~$10-50 |

---

## 🎨 Models Quick Reference

| Model | Speed | Quality | Use For |
|-------|-------|---------|---------|
| flux-schnell_v1.1 | ⚡⚡⚡ | ⭐⭐⭐ | Testing, previews |
| flux-dev_v1.1 | 🐢 | ⭐⭐⭐⭐⭐ | Final/premium |
| sd_xl_base_1.0 | 🚀 | ⭐⭐⭐⭐ | General use |

---

## 🔧 Troubleshooting (30 seconds)

### API Key Error
```bash
echo $NOVITA_API_KEY
sudo systemctl restart yourapp
```

### Out of Credits
- Go to novita.ai → Billing → Add Credits

### Timeout
- Use faster model: flux-schnell
- Wait and retry

### Can't Upload to Storage
```bash
node scripts/create_resources.js
```

---

## 📊 Monitor Usage

```bash
# Check Novita balance
curl -X GET "https://api.novita.ai/v3/user/info" \
  -H "Authorization: Bearer $NOVITA_API_KEY"

# Count today's generations
sudo journalctl -u yourapp --since today | grep "Image generated" | wc -l

# Watch live
sudo journalctl -u yourapp -f | grep -i novita
```

---

## 📍 Important URLs

| Service | URL |
|---------|-----|
| Novita Dashboard | https://novita.ai/dashboard |
| API Documentation | https://novita.ai/docs |
| Pricing | https://novita.ai/pricing |
| Status Page | https://status.novita.ai |

---

## ✅ Testing Checklist

- [ ] API key in .env.local
- [ ] `pnpm run test-novita` passes
- [ ] Credits added to Novita account
- [ ] Storage buckets created
- [ ] Test generation through UI works
- [ ] Images save to storage
- [ ] Spending limit set

---

## 🚨 Emergency

**If image generation breaks:**

```bash
# 1. Check API key
cat .env.local | grep NOVITA

# 2. Test directly
pnpm run test-novita

# 3. Check balance
# Visit: https://novita.ai/dashboard

# 4. Check logs
sudo journalctl -u yourapp -n 50 | grep -i novita

# 5. Restart app
sudo systemctl restart yourapp
```

---

## 📱 Support Contacts

- **Novita Support:** support@novita.ai
- **Status Updates:** https://status.novita.ai
- **Documentation:** See DEPLOYMENT.md section 13

---

**Print this card and keep it near your workstation!**

*Version 1.0 - October 23, 2025*
