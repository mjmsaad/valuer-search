#!/bin/bash
# ─────────────────────────────────────────────
#  Wickman's Valuer Search — Deploy Script
# ─────────────────────────────────────────────

echo ""
echo "🍷  Wickman's Valuer Search — Deploying..."
echo "──────────────────────────────────────────"

cd ~/Desktop/valuer-search || { echo "❌  Could not find ~/Desktop/valuer-search"; exit 1; }

echo "📋  Staging changes..."
git add .

echo "💬  Enter a commit message (or press Enter for default):"
read -r msg
if [ -z "$msg" ]; then
  msg="update app"
fi

git commit -m "$msg"

echo "🚀  Pushing to GitHub..."
git push origin main

echo ""
echo "✅  Done! GitHub Actions will now build and deploy."
echo "🔗  Watch progress: https://github.com/mjmsaad/valuer-search/actions"
echo "🌐  Live site:      https://mjmsaad.github.io/valuer-search/"
echo ""
