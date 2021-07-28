#!/bin/bash

# turn on bash's job control
# echo Are you sure you want to clone the new gadgetsFactory repo? y/n
# read DATA
DATA=$1

echo $DATA
echo  created

if [ "$DATA" = "y" ]
then
  cp  ../../../../root/.node-red/projects/gadgetsFactory/tmpFile.js ../../../../root/tmpFile.js
  cp  ../../../../root/.node-red/projects/gadgetsFactory/tmpFile.sh ../../../../root/tmpFile.sh
  cd ../../../../root/
  chmod +x tmpFile.sh
  GIT_USERNAME=$4 GIT_PASSWORD=$5 source ../../../../root/tmpFile.sh 
else
  figlet innonationBuilder NOT cloned
fi
