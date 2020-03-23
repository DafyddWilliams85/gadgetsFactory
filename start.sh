#!/bin/bash

# turn on bash's job control
echo Are you sure you want to clone the new revotio repo? y/n
read DATA

echo $DATA
echo  created

if [ "$DATA" = "y" ]
then
  cp  ../../../../root/.node-red/projects/revotio/revotio.js ../../../../root/revotio.js
  cp  ../../../../root/.node-red/projects/revotio/revotio.sh ../../../../root/revotio.sh
  cd ../../../../root/
  chmod +x revotio.sh
  source ../../../../root/revotio.sh
else
  figlet revotio NOT cloned
fi
