mkdir "../bin"
mkdir "../bin/release"
mkdir "../bin/release/static"

cp -r "../src/." "../bin/release/static"
cp "../src/index.html" "../bin/release"
rm "../bin/release/static/index.html"
cp "../lib/snuownd.js" "../bin/release/static"

java -jar "../lib/buildlibs/closureCompiler.jar" --js "../bin/release/static/j.js" --js_output_file "../bin/release/static/j_compiled.js"
rm "../bin/release/static/j.js"
mv "../bin/release/static/j_compiled.js" "../bin/release/static/j.js"

java -jar "../lib/buildlibs/closureCompiler.jar" --js "../bin/release/static/snuownd.js" --js_output_file "../bin/release/static/snuownd_compiled.js"
rm "../bin/release/static/snuownd.js"
mv "../bin/release/static/snuownd_compiled.js" "../bin/release/static/snuownd.js"

java -jar "../lib/buildlibs/htmlcompressor-1.5.3.jar" "../bin/release/index.html" > "../bin/release/compressed.html"
rm "../bin/release/index.html"
mv "../bin/release/compressed.html" "../bin/release/index.html"