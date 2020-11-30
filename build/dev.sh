mkdir "../bin"
mkdir "../bin/dev"

cp -r "../src/." "../bin/dev/"

awk -v f="../../keys" 'BEGIN {while (getline < f) txt=txt $0 ""} /putClientKeysHere/ {sub("putClientKeysHere", txt)} 1' "../bin/dev/j.js" > "../bin/dev/temp.js"
rm "../bin/dev/j.js"
mv "../bin/dev/temp.js" "../bin/dev/j.js"

sed -i 's|src="/static/j.js">|>\nreplaceJavascriptHerePlease\n\t|g' "../bin/dev/index.html"
awk 'NR==FNR { a[n++]=$0; next } /replaceJavascriptHerePlease/ { for (i=0;i<n;++i) print a[i]; next }1' "../bin/dev/j.js" "../bin/dev/index.html" > "../bin/dev/index.html.temp"
rm "../bin/dev/index.html"
mv "../bin/dev/index.html.temp" "../bin/dev/index.html"
rm "../bin/dev/j.js"

sed -i 's|src="/static/marked.1.2.5.min.js">|>\nreplaceJavascriptHerePlease\n\t|g' "../bin/dev/index.html"
awk 'NR==FNR { a[n++]=$0; next } /replaceJavascriptHerePlease/ { for (i=0;i<n;++i) print a[i]; next }1' "../lib/marked.1.2.5.min.js" "../bin/dev/index.html" > "../bin/dev/index.html.temp"
rm "../bin/dev/index.html"
mv "../bin/dev/index.html.temp" "../bin/dev/index.html"