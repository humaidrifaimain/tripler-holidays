#!/bin/bash

# ============================================================
# TRIPLER HOLIDAYS - One-Command Deploy Script
# ============================================================
# Usage: ./deploy.sh
# This script builds and zips your site in one command
# ============================================================

echo ""
echo "╔════════════════════════════════════════════════════════╗"
echo "║   🚀 TRIPLER HOLIDAYS - AUTO DEPLOY                     ║"
echo "╚════════════════════════════════════════════════════════╝"
echo ""

# Step 1: Build
echo "📦 Step 1: Building site..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
npm run build

# Check if build succeeded
if [ ! -d "out" ]; then
    echo "❌ Build failed! Please fix errors above."
    exit 1
fi
echo "✅ Build completed successfully"
echo ""

# Step 2: Create zip
echo "📤 Step 2: Creating zip file..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
cd out
zip -r -9 -q ../tripler-site.zip .
cd ..

# Check if zip created
if [ ! -f "tripler-site.zip" ]; then
    echo "❌ Zip creation failed!"
    exit 1
fi

ZIP_SIZE=$(du -h tripler-site.zip | cut -f1)
echo "✅ Zip created: tripler-site.zip ($ZIP_SIZE)"
echo ""

# Step 3: Summary
echo "╔════════════════════════════════════════════════════════╗"
echo "║   ✨ READY TO DEPLOY!                                  ║"
echo "╚════════════════════════════════════════════════════════╝"
echo ""
echo "📁 File: tripler-site.zip"
echo "📊 Size: $ZIP_SIZE"
echo "📍 Location: $(pwd)/tripler-site.zip"
echo ""
echo "Next steps:"
echo "1. Log in to cPanel"
echo "2. Go to File Manager"
echo "3. Navigate to /public_html/"
echo "4. Upload tripler-site.zip"
echo "5. Extract/Decompress"
echo "6. Visit your domain"
echo ""
echo "✅ Done! Your site will be live in 5-10 minutes!"
echo ""
