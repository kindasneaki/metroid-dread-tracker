cd dist
git init
git add -A
git commit -m "deploy"
git push -f https://github.com/kindasneaki/metroid-dread-tracker.git master:gh-pages
cd -