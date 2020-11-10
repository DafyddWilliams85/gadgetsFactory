#!/bin/bash

# turn on bash's job control
# turn on bash's job control
echo Are you sure you want to clone the new innonationBuilder repo? y/n
read DATA

echo $DATA
echo  created

if [ "$DATA" = "y" ]
then
  pm2 stop all
  figlet pm2 stoped
  rm -rf ../../../../root/.node-red/projects/innonationBuilder
  figlet innonationBuilder REVOVED // innonationBuilder script
  npm install node-cmd && echo node-cmd installed && npm i fs-extra && echo fs-extra installed &&  node tmpFile.js
  figlet innonationBuilder cloned // innonationBuilder script
  cd ../../../../root/.node-red/projects/innonationBuilder
  chmod +x script.sh
  source script.sh
else
  figlet innonationBuilder NOT cloned // innonationBuilder script
fi
