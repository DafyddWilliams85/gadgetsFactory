#!/bin/bash

# turn on bash's job control
cd ../../../data && node dockerbasescript.js

# Start the primary process and put it in the background
cd ../../../data/basedata && node dockerscript.js
#node dockerscript.js &

# Start the helper process


cd ../../usr/src/node-red && npm start -- --userDir /data

# the my_helper_process might need to know how to wait on the
# primary process to start before it does its work and returns


# now we bring the primary process back into the foreground
# and leave it there
