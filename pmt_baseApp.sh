#!/bin/bash

# turn on bash's job control
# turn on bash's job control
echo Are you sure you want to clone the new pmt_baseApp repo? y/n
read DATA

echo $DATA
echo  created

if [ "$DATA" = "y" ]
  pm2 stop all
  figlet pm2 stoped
  rm -rf ../../../../root/.node-red/projects/pmt_baseApp
  figlet pmt_baseApp REVOVED // pmt_baseApp script
  npm install node-cmd && echo node-cmd installed && npm i fs-extra && echo fs-extra installed &&  node pmt_baseApp.js
  figlet pmt_baseApp cloned // pmt_baseApp script
  source ../../../../root/.node-red/projects/pmt_baseApp/script.sh

else
  figlet pmt_baseApp NOT cloned // pmt_baseApp script
fi
