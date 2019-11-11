#!/bin/bash

# turn on bash's job control
echo 1/9 Hello, what type of application would you like to deploy?
read TYPE
echo 2/9 Whats the app_ id?
read APP_ID
echo 3/9 Deployment type ?
read DEPLOYMENTTYPE
echo 4/9 GitHub username?
read GIT_USERNAME
echo 5/9 GitHub password?
read GIT_PASSWORD
echo 6/9 nodeAPI URL ? Should be services- + root domain
read API_URL
echo 7/9 the pagePublisher Branch ?
read pagePublisherBranch
echo 8/9 Web socket connection  ?
read WSS_BASE_URL
echo 8/9 Finally the pagePublisher version , options are NEW or OLD  ?
read pagePublisherVersion

sudo apt-get install fortune cowsay -y
sudo apt-get install figlet -y

echo  1 = TYPE = $TYPE, 2 = APP_ID = $APP_ID ,  3 = DEPLOYMENTTYPE  = $DEPLOYMENTTYPE , 4 = GIT_USERNAME = $GIT_USERNAME ,5 = GIT_PASSWORD = $GIT_PASSWORD , 6 = API_URL = $API_URL , 7 = pagePublisherBranch = $pagePublisherBranch, 8 = WSS_BASE_URL = WSS_BASE_URL, 9, pagePublisherVersion = $pagePublisherVersion ,

now=$(date +"%T")
figlet "Started @ : $now"

rm -rf "../../../../var/www/pagePublisher"

echo "pagePublisher reset completed" | cowsay

rm -rf "../../../../../../root/pagePublisher.log"
rm -rf "../../../../../../root/node-redLogs.log"

echo "Log files removed" | cowsay

npm install node-cmd && echo node-cmd installed && npm i fs-extra && echo fs-extra installed &&  BRANCH=$pagePublisherBranch GIT_USERNAME=$GIT_USERNAME GIT_PASSWORD=$GIT_PASSWORD PAGE_PUBLISHER_VERSION=$pagePublisherVersion node startScript.js

echo  pagePublisher branch : $pagePublisherBranch cloned | cowsay

cp  ../../../../root/.node-red/projects/pmt_baseApp/pagePublisherStartScript.js ../../../../var/www/pagePublisher/pagePublisherStartScript.js

echo  pagePublisherStartScript.js copied | cowsay

cd  ../../../../var/www/pagePublisher && figlet In PagePublisherFolder && npm install && figlet In PagePublisherFolder INSTALLED && npm i fs-extra && figlet fs-extra installed && npm i json-fn && figlet json-fn installed && npm i replace-in-file && echo replace-in-file installed && API_URL=$API_URL WSS_BASE_URL=$WSS_BASE_URL pagePublisherVersion=$pagePublisherVersion node pagePublisherStartScript.js

echo  baseUrl in configValue.js file changed to : $API_URL | cowsay
 # npm i shelljs &&  echo shelljs installed in pmt_baseApp &&   rsync(settings.js ../../settings.js) && echo >>>>>rsync move completed<<<<< &&

cd ../../../root/.node-red/ && npm i exceljs && figlet exceljs installed in node red ROOT && npm i fs-extra && figlet fs-extra installed node red ROOT && npm install mime && figlet NPM MIME installed node red ROOT

rm -rf ../../../../../root/.node-red/node_modules/node-red-mongodb-tool-belt && cp -r ../../../../../root/.node-red/projects/pmt_baseApp/customNodeModules/node-red-mongodb-tool-belt ../../../../../root/.node-red/node_modules/node-red-mongodb-tool-belt && cd ../../../../../root/.node-red/node_modules/node-red-mongodb-tool-belt && npm i -g && echo node-red-mongodb-tool-belt INSTALLED
rm -rf ../../../../../root/.node-red/node_modules/node-red-contrib-mongodb2 && cp -r ../../../../../root/.node-red/projects/pmt_baseApp/customNodeModules/node-red-contrib-mongodb2 ../../../../../root/.node-red/node_modules/node-red-contrib-mongodb2 && cd ../../../../../root/.node-red/node_modules/node-red-contrib-mongodb2 && npm i -g && echo node-red-contrib-mongodb2 INSTALLED
rm -rf ../../../../../root/.node-red/node_modules/node-red-fsmanager && cp -r ../../../../../root/.node-red/projects/pmt_baseApp/customNodeModules/node-red-fsmanager ../../../../../root/.node-red/node_modules/node-red-fsmanager && cd ../../../../../root/.node-red/node_modules/node-red-fsmanager && npm i -g && echo node-red-fsmanager INSTALLED
rm -rf ../../../../../root/.node-red/node_modules/node-red-mailgun && cp -r ../../../../../root/.node-red/projects/pmt_baseApp/customNodeModules/node-red-mailgun ../../../../../root/.node-red/node_modules/node-red-mailgun && cd ../../../../../root/.node-red/node_modules/node-red-mailgun && npm i -g && echo node-red-mailgun INSTALLED

 # && npm i exceljs && figlet exceljs installed in pmt_baseApp && npm i fs-extra && figlet fs-extra installed in pmt_baseApp && npm install mime && figlet NPM MIME installed in pmt_baseApp &&
cd ../../../../../root/.node-red/projects/pmt_baseApp/ && DEPLOYMENTTYPE=$DEPLOYMENTTYPE TYPE=$TYPE APP_ID=$APP_ID node flows_script.js

rm -rf "../../../../../root/.node-red/projects/pmt_baseApp/node_modules"

pm2 stop all && pm2 del all

pm2 stop 'Backend API = '$TYPE && pm2 del 'Backend API = '$TYPE
pm2 stop $TYPE'- API' && pm2 del $TYPE'- API'
cd ../../../../../../root/.node-red && TYPE=$TYPE APP_ID=$APP_ID pm2 start node-red --name $TYPE'- API' -i max --restart-delay=3000 -l ../../../../../../root/node-redLogs.log

pm2 stop 'pagePublisher = '$TYPE && pm2 del 'pagePublisher = '$TYPE
pm2 stop $TYPE'- pP' && pm2 del $TYPE'- pP'
# cd ../../../../../../var/www/pagePublisher && TYPE=$TYPE APP_ID=$APP_ID pm2 start 'npm start' --name $TYPE'- pP' -i max --restart-delay=3000 -l ../../../../../../root/pagePublisher.log

figlet Lets fire them up!!!!
figlet $pagePublisherVersion  $DEPLOYMENTTYPE
if [ "$pagePublisherVersion" = "OLD" ]
then
  cd ../../../../../../var/www/pagePublisher && TYPE=$TYPE APP_ID=$APP_ID pm2 start 'npm start' --name $TYPE'- pP' -i max --restart-delay=3000 -l ../../../../../../root/pagePublisher.log
  echo OLD pagePublisher started
elif [ "$pagePublisherBranch" = "develop" ]
then
  cd ../../../../../../var/www/pagePublisher && TYPE=$TYPE APP_ID=$APP_ID pm2 start 'npm run dev' --name $TYPE'- == run dev >> pP' -i max --restart-delay=3000 -l ../../../../../../root/pagePublisher.log
  echo NEW DEV pagePublisher started
else
  cd ../../../../../../var/www/pagePublisher && TYPE=$TYPE APP_ID=$APP_ID pm2 start 'npm run build' --name $TYPE'- == run build >> pP' -i max --restart-delay=3000 -l ../../../../../../root/pagePublisher.log
  echo NEW PROD pagePublisher started
fi

figlet DONE :-D

now=$(date +"%T")
echo "Completed @ : $now" | cowsay -f ghostbusters
