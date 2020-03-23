#!/bin/bash

# turn on bash's job control
echo Paste your json data
read DATA

echo $DATA > DATA.json
echo DATA.json created

sudo apt-get install fortune cowsay -y
sudo apt-get install figlet -y
sudo apt-get install jq -y

#
TYPE=$( jq -r  '.TYPE'  DATA.json)
APP_ID=$( jq -r  '.APP_ID'  DATA.json)
DEPLOYMENTTYPE=$( jq -r  '.DEPLOYMENTTYPE'  DATA.json)
GIT_USERNAME=$( jq -r  '.GIT_USERNAME'  DATA.json)
GIT_PASSWORD=$( jq -r  '.GIT_PASSWORD'  DATA.json)
API_URL=$( jq -r  '.API_URL'  DATA.json)
pagePublisherBranch=$( jq -r  '.pagePublisherBranch'  DATA.json)
WSS_BASE_URL=$( jq -r  '.WSS_BASE_URL'  DATA.json)
APP_NAME=$( jq -r  '.APP_NAME'  DATA.json)

CLUSTER=$( jq -r  '.CLUSTER'  DATA.json)
# #
echo  1 = TYPE = $TYPE, 2 = APP_ID = $APP_ID ,  3 = DEPLOYMENTTYPE  = $DEPLOYMENTTYPE , 4 = GIT_USERNAME = $GIT_USERNAME ,5 = GIT_PASSWORD = $GIT_PASSWORD , 6 = API_URL = $API_URL , 7 = pagePublisherBranch = $pagePublisherBranch, 8 = WSS_BASE_URL = $WSS_BASE_URL, 9, PAGE_PUBLISHER_VERSION = $PAGE_PUBLISHER_VERSION ,PAGE_BUILDER = $PAGE_BUILDER, CLUSTER = $CLUSTER

rm -rf "DATA.json"
echo DATA.json removed

now=$(date +"%T")
figlet "Started @ : $now"

rm -rf "../../../../var/www/pagePublisher"
echo "pagePublisher reset completed" | cowsay

rm -rf "../../../../../../root/pagePublisher.log"
rm -rf "../../../../../../root/node-redLogs.log"
echo "Log files removed" | cowsay

cd  ../../../../root/.node-red/projects/revotio

npm install node-cmd && echo node-cmd installed && npm i fs-extra && echo fs-extra installed &&  BRANCH=$pagePublisherBranch GIT_USERNAME=$GIT_USERNAME GIT_PASSWORD=$GIT_PASSWORD PAGE_PUBLISHER_VERSION=$PAGE_PUBLISHER_VERSION node startScript.js

echo  pagePublisher branch : $pagePublisherBranch cloned | cowsay

cp  ../../../../root/.node-red/projects/revotio/pagePublisherStartScript.js ../../../../var/www/pagePublisher/pagePublisherStartScript.js

echo  pagePublisherStartScript.js copied | cowsay

rm -rf ../../../../root/.node-red/lib && cp -R  ../../../../root/.node-red/projects/revotio/lib ../../../../root/.node-red/lib

echo  lib folder updated | cowsay

cd  ../../../../var/www/pagePublisher&& figlet In PagePublisherFolder &&  rm -rf package-lock.json && figlet package-lock.json  REMOVED && npm i fs-extra && figlet fs-extra installed && npm i json-fn && figlet json-fn installed && npm i replace-in-file && echo replace-in-file installed && PAGE_BUILDER=$PAGE_BUILDER APP_ID=$APP_ID API_URL=$API_URL WSS_BASE_URL=$WSS_BASE_URL APP_NAME=$APP_NAME PAGE_PUBLISHER_VERSION=$PAGE_PUBLISHER_VERSION node pagePublisherStartScript.js

# cd  ../../../../var/www/pagePublisher&& figlet In PagePublisherFolder &&  rm -rf package-lock.json && figlet package-lock.json  REMOVED &&  npm i && figlet PagePublisherFolder Installed && npm i fs-extra && figlet fs-extra installed && npm i json-fn && figlet json-fn installed && npm i replace-in-file && echo replace-in-file installed && PAGE_BUILDER=$PAGE_BUILDER APP_ID=$APP_ID API_URL=$API_URL WSS_BASE_URL=$WSS_BASE_URL APP_NAME=$APP_NAME PAGE_PUBLISHER_VERSION=$PAGE_PUBLISHER_VERSION node pagePublisherStartScript.js

echo  configValue.js file changed | cowsay

cd ../../../root/.node-red/ && npm i jetpack && figlet jetpack installed in node red ROOT    && npm i exceljs && figlet exceljs installed in node red ROOT && npm install nodemailer && figlet nodemailer installed in node red ROOT  &&  npm i request && figlet request installed in node red ROOT &&   npm i nodemailer-mailgun-transport && figlet nodemailer-mailgun-transport installed in node red ROOT &&  npm i fs-extra && figlet fs-extra installed node red ROOT && npm install mongodb && figlet NPM mongodb installed node red ROOT  && npm install mime && figlet NPM MIME installed node red ROOT

rm -rf ../../../../../root/.node-red/node_modules/node-red-mongodb-tool-belt && cp -r ../../../../../root/.node-red/projects/revotio/customNodeModules/node-red-mongodb-tool-belt ../../../../../root/.node-red/node_modules/node-red-mongodb-tool-belt && cd ../../../../../root/.node-red/node_modules/node-red-mongodb-tool-belt && npm i -g && echo node-red-mongodb-tool-belt INSTALLED
rm -rf ../../../../../root/.node-red/node_modules/node-red-contrib-mongodb2 && cp -r ../../../../../root/.node-red/projects/revotio/customNodeModules/node-red-contrib-mongodb2 ../../../../../root/.node-red/node_modules/node-red-contrib-mongodb2 && cd ../../../../../root/.node-red/node_modules/node-red-contrib-mongodb2 && npm i -g && echo node-red-contrib-mongodb2 INSTALLED

cd ../../../../../root/.node-red/projects/revotio && DEPLOYMENTTYPE=$DEPLOYMENTTYPE TYPE=$TYPE APP_ID=$APP_ID node flows_script.js

rm -rf ../../../../../files/SystemFiles
mkdir -p ../../../../../files/SystemFiles
cp -r ../../../../../root/.node-red/projects/revotio/files/SystemFiles ../../../../../files
echo  Content of SystemFiles/ is now: | cowsay

for entry in "../../../../../files/SystemFiles"/*
do
  echo "$entry"
done

rm -rf ../../../../../files/logo
mkdir -p ../../../../../files/logo
cp -r ../../../../../root/.node-red/projects/revotio/files/logo ../../../../../files
echo  Content of logo/ is now: | cowsay

for entry in "../../../../../files/logo"/*
do
  echo "$entry"
done

cp -r ../../../../../root/.node-red/projects/revotio/files/logo/$TYPE/favicon.ico ../../../../var/www/pagePublisher/static
echo favicon.ico copied | cowsay


rm -rf "../../../../../root/.node-red/projects/revotio/node_modules"

pm2 stop all && pm2 del all

figlet Lets fire them up!!!!

figlet $PAGE_PUBLISHER_VERSION  $DEPLOYMENTTYPE

if [ "$CLUSTER" = "YES" ]
then
  if [ "$pagePublisherBranch" = "develop" ]
  then
    # cd ../../../../../../var/www/pagePublisher && TYPE=$TYPE APP_ID=$APP_ID pm2 start 'npm run dev' --name $TYPE'- == run dev >> pP' -i max --restart-delay=3000 -l ../../../../../../root/pagePublisher.log
    echo TYPE=$TYPE APP_ID=$APP_ID APP_NAME=$APP_NAME API_URL=$API_URL WEBSOCKET_URL=$WSS_BASE_URL
    cd ../../../../../../var/www/pagePublisher &&  rm -rf node-modules && figlet node-modules REMOVED &&  npm i && figlet PagePublisherFolder Installed &&  TYPE=$TYPE APP_ID=$APP_ID pm2 start 'npm run dev' --name $TYPE'- == run dev >> Publisher' -i max --restart-delay=3000 -l ../../../../../../root/pagePublisher.log
    echo NEW DEV pagePublisher started
  else
    echo TYPE=$TYPE APP_ID=$APP_ID APP_NAME=$APP_NAME API_URL=$API_URL WEBSOCKET_URL=$WSS_BASE_URL
    cd ../../../../../../var/www/pagePublisher  &&  rm -rf node-modules && figlet node-modules REMOVED &&  npm i && figlet PagePublisherFolder Installed && TYPE=$TYPE APP_ID=$APP_ID pm2 start 'npm run build' --name $TYPE'- == run build >> Publisher' -i max --restart-delay=3000 -l ../../../../../../root/pagePublisher.log
    echo NEW PROD pagePublisher started
  fi

  echo  1 = TYPE = $TYPE, 2 = APP_ID = $APP_ID = starting Backend
  cd ../../../../../../root/.node-red && TYPE=$TYPE APP_ID=$APP_ID pm2 start node-red --name 'Backend - API' -i max --restart-delay=3000 -l ../../../../../../root/node-redLogs.log
  echo Backend started CLUSTER
else

  if [ "$pagePublisherBranch" = "develop" ]
  then
    # cd ../../../../../../var/www/pagePublisher && TYPE=$TYPE APP_ID=$APP_ID pm2 start 'npm run dev' --name $TYPE'- == run dev >> pP' -i max --restart-delay=3000 -l ../../../../../../root/pagePublisher.log
    echo TYPE=$TYPE APP_ID=$APP_ID APP_NAME=$APP_NAME API_URL=$API_URL WEBSOCKET_URL=$WSS_BASE_URL
    cd ../../../../../../var/www/pagePublisher &&  rm -rf node-modules && figlet node-modules REMOVED &&  npm i && figlet PagePublisherFolder Installed &&  TYPE=$TYPE APP_ID=$APP_ID pm2 start 'npm run dev' --name $TYPE'- == run dev >> Publisher' --restart-delay=3000 -l ../../../../../../root/pagePublisher.log
    echo NEW DEV pagePublisher started
  else
    echo TYPE=$TYPE APP_ID=$APP_ID APP_NAME=$APP_NAME API_URL=$API_URL WEBSOCKET_URL=$WSS_BASE_URL
    cd ../../../../../../var/www/pagePublisher  &&  rm -rf node-modules && figlet node-modules REMOVED &&  npm i && figlet PagePublisherFolder Installed && TYPE=$TYPE APP_ID=$APP_ID pm2 start 'npm run build' --name $TYPE'- == run build >> Publisher' --restart-delay=3000 -l ../../../../../../root/pagePublisher.log
    echo NEW PROD pagePublisher started
  fi

  echo  1 = TYPE = $TYPE, 2 = APP_ID = $APP_ID = starting Backend
  cd ../../../../../../root/.node-red && TYPE=$TYPE APP_ID=$APP_ID pm2 start node-red --name 'Backend - API'  --restart-delay=3000 -l ../../../../../../root/node-redLogs.log
  echo Backend started CLUSTER
fi



figlet DONE :-D

now=$(date +"%T")
echo "Completed @ : $now" | cowsay -f ghostbusters
