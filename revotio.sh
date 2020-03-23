#!/bin/bash

# turn on bash's job control
# turn on bash's job control
echo Are you sure you want to clone the new revotio repo? y/n
read DATA

echo $DATA
echo  created

if [ "$DATA" = "y" ]
then
  pm2 stop all
  figlet pm2 stoped
  rm -rf ../../../../root/.node-red/projects/revotio
  figlet revotio REVOVED // revotio script
  npm install node-cmd && echo node-cmd installed && npm i fs-extra && echo fs-extra installed &&  node revotio.js
  figlet revotio cloned // revotio script
  cd ../../../../root/.node-red/projects/revotio
  chmod +x script.sh
  source script.sh
else
  figlet revotio NOT cloned // revotio script
fi
