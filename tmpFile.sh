#!/bin/bash

# turn on bash's job control
# turn on bash's job control
# echo Are you sure you want to clone the new gadgetsFactory repo? y/n
# read DATA
DATA=$2
echo $DATA
echo  created

if [ "$DATA" = "y" ]
then
  pm2 stop all
  figlet pm2 stoped
  rm -rf ../../../../root/.node-red/projects/gadgetsFactory
  figlet gadgetsFactory REVOVED // gadgetsFactory script
  npm install node-cmd && echo node-cmd installed && npm i fs-extra && echo fs-extra installed && GIT_USERNAME=$4 GIT_PASSWORD=$5 REPOSITORY=$6 node tmpFile.js
  figlet gadgetsFactory cloned // gadgetsFactory script
  cd ../../../../root/.node-red/projects/gadgetsFactory
  chmod +x script.sh
  source script.sh
else
  figlet gadgetsFactory NOT cloned // gadgetsFactory script
fi
