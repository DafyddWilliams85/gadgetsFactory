#!/bin/bash

HTTP_CODE=$(curl --write-out "%{http_code}\n" "https://api.innonation.nl/test_post?appid="$1 -k -o appData.json)
echo $HTTP_CODE

if [ "$HTTP_CODE" = "200" ]
then
  cp  ../../../../root/.node-red/projects/gadgetsFactory/appData.json ../../../../root/appData.json
  cp  ../../../../root/.node-red/projects/gadgetsFactory/tmpFile.js ../../../../root/tmpFile.js
  cp  ../../../../root/.node-red/projects/gadgetsFactory/tmpFile.sh ../../../../root/tmpFile.sh
  cd ../../../../root/
  chmod +x tmpFile.sh
  source ../../../../root/tmpFile.sh 
else
  figlet innonationBuilder NOT cloned
fi
