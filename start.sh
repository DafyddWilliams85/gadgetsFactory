#!/bin/bash

# turn on bash's job control
echo Are you sure you want to clone the new pmt_baseApp repo? y/n
read DATA

echo $DATA
echo  created

if [ "$DATA" = "y" ]
then
  cp  ../../../../root/.node-red/projects/pmt_baseApp/pmt_baseApp.js ../../../../root/pmt_baseApp.js
  cp  ../../../../root/.node-red/projects/pmt_baseApp/pmt_baseApp.sh ../../../../root/pmt_baseApp.sh
  source ../../../../root/pmt_baseApp.sh
else
  figlet pmt_baseApp NOT cloned
fi
