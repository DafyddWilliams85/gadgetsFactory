#!/bin/bash

# turn on bash's job control
echo 1/8 Hello, what type of application would you like to deploy?
read TYPE
echo 2/8 Whats the app_ id?
read APP_ID
echo 3/8 Deployment type ?
read DEPLOYMENTTYPE
echo 4/8 GitHub username?
read GIT_USERNAME
echo 5/8 GitHub password?
read GIT_PASSWORD
echo 6/8 nodeAPI URL ? Should be services- + root domain
read API_URL
echo 7/8 the pagePublisher Branch ?
read pagePublisherBranch
echo 8/8 Finally the pagePublisher version , options are NEW or OLD  ?
read pagePublisherVersion

sudo apt-get install fortune cowsay -y
sudo apt-get install figlet -y

echo  1 = TYPE = $TYPE, 2 = APP_ID = $APP_ID ,  3 = DEPLOYMENTTYPE  = $DEPLOYMENTTYPE , 4 = GIT_USERNAME = $GIT_USERNAME ,5 = GIT_PASSWORD = $GIT_PASSWORD , 6 = API_URL = $API_URL , 7 = pagePublisherBranch = $pagePublisherBranch, 8 = pagePublisherVersion = $pagePublisherVersion ,

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

cd  ../../../../var/www/pagePublisher && figlet In PagePublisherFolder && npm install && figlet In PagePublisherFolder INSTALLED && npm i fs-extra && figlet fs-extra installed && npm i json-fn && figlet json-fn installed && npm i replace-in-file && echo replace-in-file installed && API_URL=$API_URL pagePublisherVersion=$pagePublisherVersion node pagePublisherStartScript.js

echo  baseUrl in configValue.js file changed to : $API_URL | cowsay
 # npm i shelljs &&  echo shelljs installed in pmt_baseApp &&   rsync(settings.js ../../settings.js) && echo >>>>>rsync move completed<<<<< &&

cd ../../../root/.node-red/projects/pmt_baseApp/ && npm i fs-extra && figlet fs-extra installed in pmt_baseApp && npm install mime && figlet NPM MIME installed in pmt_baseApp && DEPLOYMENTTYPE=$DEPLOYMENTTYPE TYPE=$TYPE APP_ID=$APP_ID node flows_script.js

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
elif [ "$DEPLOYMENTTYPE" = "production" ]
then
  cd ../../../../../../var/www/pagePublisher && TYPE=$TYPE APP_ID=$APP_ID pm2 start 'npm run build' --name $TYPE'- pP' -i max --restart-delay=3000 -l ../../../../../../root/pagePublisher.log
  echo NEW PROD pagePublisher started
else
    cd ../../../../../../var/www/pagePublisher && TYPE=$TYPE APP_ID=$APP_ID pm2 start 'npm run dev' --name $TYPE'- pP' -i max --restart-delay=3000 -l ../../../../../../root/pagePublisher.log
    echo NEW DEV pagePublisher started
fi




figlet DONE :-D

now=$(date +"%T")
echo "Completed @ : $now" | cowsay -f ghostbusters
