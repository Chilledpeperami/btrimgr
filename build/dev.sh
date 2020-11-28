mkdir "../bin"
mkdir "../bin/dev"
mkdir "../bin/dev/static"

cp -r "../src/." "../bin/release/static"
cp "../src/index.html" "../bin/release"
rm "../bin/release/static/index.html"
cp "../src/_redirects" "../bin/release"
rm "../bin/release/static/_redirects"
cp "../lib/snuownd.js" "../bin/release/static"

awk -v f="../../keys" 'BEGIN {while (getline < f) txt=txt $0 ""} /putClientKeysHere/ {sub("putClientKeysHere", txt)} 1' "../bin/dev/static/j.js" > "../bin/dev/static/temp.js"
rm "../bin/dev/static/j.js"
mv "../bin/dev/static/temp.js" "../bin/dev/static/j.js"
