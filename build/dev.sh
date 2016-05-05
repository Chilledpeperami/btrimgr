mkdir ../bin
mkdir ../bin/dev
mkdir ../bin/dev/lib
cp -r ../src/. ../bin/dev
cp ../lib/jquery-2.2.3.js ../bin/dev/lib/
mv ../bin/dev/lib/jquery-2.2.3.js ../bin/dev/lib/jquery.js 
