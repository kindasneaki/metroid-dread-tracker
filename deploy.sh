#!/usr/bin/env bash
#
# Deploy the production build to the gh-pages branch.
# Cross-platform replacement for deploy.bat (works on macOS/Linux and Git Bash).
#
# Flow: build -> stage dist/ as a throwaway git repo -> force-push to gh-pages.
# A .nojekyll file is added so GitHub Pages serves the webpack output verbatim
# instead of running it through Jekyll (which can drop files and break the SPA).
#
set -euo pipefail

REPO_URL="https://github.com/kindasneaki/metroid-dread-tracker.git"
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo "▶ Building production bundle..."
npm run build

echo "▶ Preparing dist/ for GitHub Pages..."
cd "$ROOT/dist"

# Disable Jekyll processing of the webpack output.
touch .nojekyll

# Fresh throwaway repo each deploy (vue-cli-service build clears dist/ anyway).
rm -rf .git
git init -q
git checkout -q -b deploy
git add -A
git commit -q -m "deploy"

echo "▶ Force-pushing to gh-pages..."
git push -f "$REPO_URL" deploy:gh-pages

cd "$ROOT"
echo "✅ Deployed. Live in ~1-10 min at https://kindasneaki.github.io/metroid-dread-tracker/"
echo "   (hard-refresh with Cmd+Shift+R if you still see the old build)"
