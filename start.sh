#!/bin/bash

# turn on bash's job control
echo Are you sure you want to clone the new innonationBuilder repo? y/n
read DATA

echo $DATA
echo  created

if [ "$DATA" = "y" ]
then
  cp  ../../../../root/.node-red/projects/innonationBuilder/tmpFile.js ../../../../root/tmpFile.js
  cp  ../../../../root/.node-red/projects/innonationBuilder/tmpFile.sh ../../../../root/tmpFile.sh
  cd ../../../../root/
  chmod +x tmpFile.sh
  source ../../../../root/tmpFile.sh
else
  figlet innonationBuilder NOT cloned
fi
