# 📖 DIY BUILD & DEPLOY GUIDE - Tripler Holidays

Build and deploy your site to cPanel **by yourself** using these simple steps.

---

## 🎯 WHAT YOU'LL LEARN

By the end of this guide, you'll know how to:
1. Build the Next.js site for production
2. Create a compact zip file
3. Upload to cPanel and deploy
4. Do this yourself next time in 5 minutes

---

## 📋 PREREQUISITES

You need:
- **Git** (version control - already installed)
- **Node.js** v18+ with **npm** or **pnpm** (to build)
- **Terminal/Command Line** access
- **cPanel access** (for hosting)

Check if you have Node.js:
```bash
node --version
npm --version
```

---

## 🚀 STEP-BY-STEP GUIDE

### STEP 1: PREPARE YOUR PROJECT

```bash
# Navigate to your project folder
cd /path/to/tripler-holidays

# Install dependencies (first time only)
npm install
# OR if using pnpm:
pnpm install
```

**What this does:** Downloads all libraries your site needs.

---

### STEP 2: BUILD FOR PRODUCTION

```bash
npm run build
```

**What happens:**
- Compiles all code
- Optimizes JavaScript & CSS
- Generates static HTML pages
- Creates `out/` folder with everything ready

**Expected output:**
```
✓ Compiled successfully
✓ Generating static pages (12/12)
```

**⏱️ Takes:** 2-3 minutes

---

### STEP 3: VERIFY BUILD SUCCESS

```bash
# Check if out folder exists
ls -la out/

# You should see:
# - index.html (homepage)
# - holiday-tours/index.html
# - attractions/index.html
# - _next/ (JavaScript bundles)
# - etc.
```

---

### STEP 4: CREATE COMPACT ZIP FILE

```bash
# Go into the out folder
cd out

# Create zip (method 1 - Standard)
zip -r ../tripler-site.zip .

# OR create compressed zip (smaller file, method 2)
zip -r -9 ../tripler-site.zip .

# Go back
cd ..
```

**File sizes:**
- Standard zip: ~270 MB
- Compressed zip (-9): ~265-270 MB

**⏱️ Takes:** 1-2 minutes

---

### STEP 5: VERIFY ZIP FILE

```bash
# Check zip file created
ls -lh tripler-site.zip

# Verify contents
unzip -l tripler-site.zip | head -20
```

Should show:
```
Archive: tripler-site.zip
  Length      Date    Time    Name
      446  06-16-2026 16:50   __next._tree.txt
    82481  06-16-2026 16:50   holiday-tours/index.html
    ...
```

---

## 📤 STEP 6: UPLOAD TO CPANEL

### Option A: Via cPanel File Manager (Easiest)

```
1. Log in to cPanel
2. Click "File Manager"
3. Navigate to /public_html/
4. Click "Upload" button
5. Select: tripler-site.zip
6. Wait for upload (5-10 minutes for 270MB)
```

### Option B: Via FTP (Faster for large files)

```
1. Use FTP client (FileZilla, WinSCP, Transmit)
2. Connect with your cPanel FTP credentials
3. Go to: /public_html/
4. Drag & drop: tripler-site.zip
```

---

## 📂 STEP 7: EXTRACT ZIP ON SERVER

### In cPanel File Manager:

```
1. Right-click on tripler-site.zip
2. Select "Extract" or "Decompress"
3. Choose destination: /public_html/
4. Click "Extract File(s)"
5. Wait for completion message
```

**Result:** All files extracted to `/public_html/`

---

## ✅ STEP 8: VERIFY DEPLOYMENT

Visit your domain in browser:

```
https://triplerholidays.com
```

**Check:**
- ✅ Page loads instantly (no reload needed)
- ✅ All pages work:
  - /holiday-tours
  - /attractions
  - /outbound-tours
  - /services
  - /about
  - /contact

---

## 🔄 QUICK REFERENCE (Next Time)

When you make changes and want to redeploy:

```bash
# 1. Make your code changes in editor

# 2. Build again
npm run build

# 3. Create zip
cd out && zip -r -9 ../tripler-site.zip . && cd ..

# 4. Upload tripler-site.zip to cPanel
# 5. Extract in /public_html/
# 6. Delete old extracted files first (optional)
# 7. Done! 🎉
```

**Total time:** 5-10 minutes

---

## ⚡ AUTOMATION SCRIPT (Optional)

Create a file called `deploy.sh` to automate everything:

```bash
#!/bin/bash

echo "🚀 Building Tripler Holidays..."
npm run build

echo "📦 Creating zip file..."
cd out
zip -r -9 ../tripler-site.zip .
cd ..

echo "✅ Ready to upload: tripler-site.zip"
echo "📍 Size: $(du -h tripler-site.zip | cut -f1)"
echo ""
echo "Next: Upload tripler-site.zip to cPanel /public_html/"
```

**To use:**
```bash
chmod +x deploy.sh
./deploy.sh
```

---

## ❓ TROUBLESHOOTING

### Q: Build fails with errors?
**A:** 
```bash
# Clear cache and try again
rm -rf .next
npm run build
```

### Q: Zip file won't create?
**A:** 
```bash
# Make sure you're in the right folder
cd /path/to/tripler-holidays
# Make sure 'out' folder exists
ls out/
```

### Q: Pages not loading after upload?
**A:**
- Ensure files are in `/public_html/` root (not in a subfolder)
- Check file permissions (644 for files, 755 for folders)
- Clear browser cache (Ctrl+Shift+Delete)

### Q: Images/videos not showing?
**A:**
- Verify `public/` folder is in `/public_html/`
- Check file paths in HTML (should be relative)

---

## 📊 FILE SIZE BREAKDOWN

```
out/ folder contents:
├── HTML pages (small)          ~5 MB
├── _next/ (JS, CSS)            ~80 MB  
└── [media, fonts]              ~185 MB
─────────────────────────────────
Total (uncompressed):           ~270 MB
After zip compression:          ~265 MB
```

---

## 🎓 WHAT YOU LEARNED

✅ How to build a Next.js site for production
✅ How to create a deployment-ready zip
✅ How to upload to cPanel
✅ How to troubleshoot common issues
✅ How to do this yourself in under 10 minutes

---

## 📝 NEXT STEPS

### When You Make Changes:
1. Edit code in your editor
2. Run `npm run build`
3. Zip the `out/` folder
4. Upload to cPanel
5. Extract and refresh browser

### Keep Learning:
- Learn about Git for version control
- Setup GitHub for backups
- Automate with CI/CD pipelines (advanced)

---

## 💡 TIPS & TRICKS

**Faster uploads:**
- Use FTP instead of cPanel File Manager (2-3x faster)
- Upload during off-peak hours
- Use WinSCP (resume on disconnect)

**Faster zipping:**
```bash
# Use tar + gzip (smaller, faster)
tar -czf tripler-site.tar.gz out/
# Size: ~60-80 MB (3x smaller!)
```

**Backup before deploying:**
```bash
# Download current site from cPanel first
# Keep local backup
```

---

## 📞 REMEMBER

- **Build time:** 2-3 minutes
- **Zip creation:** 1-2 minutes  
- **Upload time:** 5-10 minutes (depends on internet)
- **Extract time:** 2-5 minutes
- **Total:** ~15-20 minutes

You now have **full control** of your deployment! 🚀

---

**Need help?** Check the specific error in terminal output.

**Done!** Your site is now live with the latest changes. ✨
