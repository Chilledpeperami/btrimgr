mkdir "../bin"
mkdir "../bin/release"
mkdir "../bin/release/static"

cp -r "../src/." "../bin/release/static"
cp "../src/index.html" "../bin/release"
rm "../bin/release/static/index.html"
cp "../src/_redirects" "../bin/release"
rm "../bin/release/static/_redirects"
cp "../lib/snuownd.js" "../bin/release/static"

awk -v f="../../keys" 'BEGIN {while (getline < f) txt=txt $0 ""} /putClientKeysHere/ {sub("putClientKeysHere", txt)} 1' "../bin/release/static/j.js" > "../bin/release/static/temp.js"
rm "../bin/release/static/j.js"
mv "../bin/release/static/temp.js" "../bin/release/static/j.js"

java -jar "../lib/buildlibs/closure-compiler-v20201102.jar" --js "../bin/release/static/j.js" --js_output_file "../bin/release/static/j_compiled.js"
rm "../bin/release/static/j.js"
mv "../bin/release/static/j_compiled.js" "../bin/release/static/j.js"

java -jar "../lib/buildlibs/closure-compiler-v20201102.jar" --js "../bin/release/static/snuownd.js" --js_output_file "../bin/release/static/snuownd_compiled.js"
rm "../bin/release/static/snuownd.js"
mv "../bin/release/static/snuownd_compiled.js" "../bin/release/static/snuownd.js"

html-minifier --collapse-boolean-attributes --collapse-inline-tag-whitespace --collapse-whitespace --decode-entities --minify-css --minify-urls --remove-comments "../bin/release/index.html" -o "../bin/release/minified.html"
rm "../bin/release/index.html"
mv "../bin/release/minified.html" "../bin/release/index.html"

sed -i 's|src="/static/j.js">|>\nreplaceJavascriptHerePlease\n|g' "../bin/release/index.html"
awk 'NR==FNR { a[n++]=$0; next } /replaceJavascriptHerePlease/ { for (i=0;i<n;++i) print a[i]; next }1' "../bin/release/static/j.js" "../bin/release/index.html" > "../bin/release/index.html.temp"
rm "../bin/release/index.html"
mv "../bin/release/index.html.temp" "../bin/release/index.html"
rm "../bin/release/static/j.js"
