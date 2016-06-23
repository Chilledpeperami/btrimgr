mkdir "../bin"
mkdir "../bin/dev"
mkdir "../bin/dev/static"

cp -r "../src/." "../bin/dev/static"
cp "../src/index.html" "../bin/dev"
rm "../bin/dev/static/index.html"
cp "../lib/snuownd.js" "../bin/dev/static"

awk -v f="../../keys" 'BEGIN {while (getline < f) txt=txt $0 ""} /putClientKeysHere/ {sub("putClientKeysHere", txt)} 1' "../bin/dev/static/j.js" > "../bin/dev/static/temp.js"
rm "../bin/dev/static/j.js"
mv "../bin/dev/static/temp.js" "../bin/dev/static/j.js"
