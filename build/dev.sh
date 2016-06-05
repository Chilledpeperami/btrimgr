mkdir "../bin"
mkdir "../bin/dev"
mkdir "../bin/dev/static"

cp -r "../src/." "../bin/dev/static"
cp "../src/index.html" "../bin/dev"
rm "../bin/dev/static/index.html"
cp "../lib/snuownd.js" "../bin/dev/static"
