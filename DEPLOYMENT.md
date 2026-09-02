# Deployment Guide - Situs Sekolah Resmi

## 🚀 Deployment ke Vercel (Recommended)

### Step 1: Prepare Repository
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

### Step 2: Connect to Vercel
1. Go to https://vercel.com
2. Click "New Project"
3. Select your GitHub repository
4. Vercel akan auto-detect Next.js

### Step 3: Environment Variables
Di Vercel Project Settings → Environment Variables, tambahkan:

```
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxxxx
SUPABASE_SERVICE_ROLE_KEY=xxxxx
NEXT_PUBLIC_APP_NAME=SD Negeri Sumber Waru 2
```

### Step 4: Deploy
Klik "Deploy" - Vercel akan otomatis build dan deploy!

---

## 🌐 Setup Custom Domain

### Di Vercel:
1. Project Settings → Domains
2. Add your domain (e.g., sekolah.local)
3. Follow DNS configuration

### Di Domain Provider:
1. Update DNS records sesuai Vercel instructions
2. Tunggu DNS propagation (15-30 menit)

---

## 🔧 Supabase Production Setup

### Database
```bash
# Enable backups
Project Settings → Backups → Enable

# Increase compute size jika needed
Project Settings → Compute Size
```

### Authentication
```bash
# Site URL
Authentication → URL Configuration → Site URL = https://yourdomain.com

# Redirect URLs
Add: https://yourdomain.com/auth/callback
```

### Storage
```bash
# Enable Storage bucket
Storage → Create new bucket
Nama: situs-public, situs-private
```

### Realtime
```bash
# Enable Realtime
Database → Replication → Enable
```

---

## 🔐 Security Checklist

- [ ] Set strong database passwords
- [ ] Enable row-level security (RLS)
- [ ] Configure storage bucket policies
- [ ] Enable JWT verification
- [ ] Setup email providers for auth
- [ ] Enable 2FA for Supabase account
- [ ] Use environment variables (never hardcode secrets)
- [ ] Enable rate limiting
- [ ] Setup backup & recovery
- [ ] Monitor usage & quotas

---

## 📊 Monitoring

### Vercel Analytics
- Dashboard → Analytics
- Monitor: Performance, Errors, Usage

### Supabase Monitoring
- Dashboard → Reports
- Monitor: Database, Auth, Storage usage

### Error Tracking
- Setup Sentry (optional)
- Email alerts for errors

---

## 🚨 Troubleshooting

### Build fails
```bash
# Check logs di Vercel
# Verify environment variables
# Check Node version compatibility
```

### Database connection error
```bash
# Verify SUPABASE_URL dan keys
# Check IP whitelist di Supabase
# Verify network access
```

### Image optimization issues
```bash
# Update next/image remotePatterns
# Verify Supabase storage config
```

---

## 🔄 CI/CD Pipeline

### GitHub Actions (Optional)
Buat `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Vercel

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: vercel/action@master
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
```

---

## 📈 Scaling

### Database
- Increase compute size
- Enable connection pooling
- Optimize queries

### Storage
- Use CDN for assets
- Compress images
- Implement caching

### API
- Implement rate limiting
- Use Redis for caching
- Monitor performance

---

## 📞 Support

- Vercel Support: https://vercel.com/support
- Supabase Docs: https://supabase.com/docs
- Next.js Docs: https://nextjs.org/docs
