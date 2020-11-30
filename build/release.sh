mkdir "../bin"
mkdir "../bin/release"
mkdir "../bin/release"

cp -r "../src/." "../bin/release/"

awk -v f="../../keys" 'BEGIN {while (getline < f) txt=txt $0 ""} /putClientKeysHere/ {sub("putClientKeysHere", txt)} 1' "../bin/release/j.js" > "../bin/release/temp.js"
rm "../bin/release/j.js"
mv "../bin/release/temp.js" "../bin/release/j.js"

java -jar "../lib/buildlibs/closure-compiler-v20201102.jar" --js "../bin/release/j.js" --js_output_file "../bin/release/j_compiled.js"
rm "../bin/release/j.js"
mv "../bin/release/j_compiled.js" "../bin/release/j.js"

html-minifier --collapse-boolean-attributes --collapse-inline-tag-whitespace --collapse-whitespace --decode-entities --minify-css --minify-urls --remove-comments "../bin/release/index.html" -o "../bin/release/minified.html"
rm "../bin/release/index.html"
mv "../bin/release/minified.html" "../bin/release/index.html"

sed -i 's|src="/static/j.js">|>\nreplaceJavascriptHerePlease\n|g' "../bin/release/index.html"
awk 'NR==FNR { a[n++]=$0; next } /replaceJavascriptHerePlease/ { for (i=0;i<n;++i) print a[i]; next }1' "../bin/release/j.js" "../bin/release/index.html" > "../bin/release/index.html.temp"
rm "../bin/release/index.html"
mv "../bin/release/index.html.temp" "../bin/release/index.html"
rm "../bin/release/j.js"

sed -i 's|src="/static/marked.1.2.5.min.js">|>\nreplaceJavascriptHerePlease\n\t|g' "../bin/release/index.html"
awk 'NR==FNR { a[n++]=$0; next } /replaceJavascriptHerePlease/ { for (i=0;i<n;++i) print a[i]; next }1' "../lib/marked.1.2.5.min.js" "../bin/release/index.html" > "../bin/release/index.html.temp"
rm "../bin/release/index.html"
mv "../bin/release/index.html.temp" "../bin/release/index.html"