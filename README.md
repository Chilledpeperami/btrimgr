# btrimgr

A web-based Imgur viewer, made to be as minimal as possible for speed and scalabilty.

## Requirements
* Http server setup to return same html irrelevant of path except when path starts with /static.
* Imgur API keys.
* Java for Closurecompiler.
* [html-minifier](https://github.com/kangax/html-minifier) installed.

## Deployment
1. Download/checkout master branch zip from github.
2. Packaging and placement of api keys:
  1. The keys should be put in a text file called "keys" in the format of: "key1","key2","key3"
  2. This file is to be put in the root of the folder above the master branch folder.
3. cd into /build.
4. Build website
  * Run dev.sh to not minify sources
  * Run release.sh to minify sources(requires Java)
5. Point HTTP server to /bin/release/index.html with configuration mentioned in requirements.
