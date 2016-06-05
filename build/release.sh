mkdir "../bin"
mkdir "../bin/release"
cp -r "../src/." "../bin/release"
cp "../lib/snuownd.js" "../bin/release"

java -jar "../lib/buildlibs/closureCompiler.jar" --js "../bin/release/j.js" --js_output_file "../bin/release/j_compiled.js"
rm "../bin/release/j.js"
mv "../bin/release/j_compiled.js" "../bin/release/j.js"

java -jar "../lib/buildlibs/closureCompiler.jar" --js "../bin/release/snuownd.js" --js_output_file "../bin/release/snuownd_compiled.js"
rm "../bin/release/snuownd.js"
mv "../bin/release/snuownd_compiled.js" "../bin/release/snuownd.js"

java -jar "../lib/buildlibs/htmlcompressor-1.5.3.jar" "../bin/release/index.html" > "../bin/release/compressed.html"
rm "../bin/release/index.html"
mv "../bin/release/compressed.html" "../bin/release/index.html"
