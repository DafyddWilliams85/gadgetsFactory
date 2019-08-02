#!/bin/bash

# turn on bash's job control
echo 1/6 Hello, what type of application would you like to deploy?
read TYPE
echo 2/6 Whats the app_ id?
read APP_ID
echo 3/6 GitHub username?
read GIT_USERNAME
echo 4/6 GitHub password?
read GIT_PASSWORD
echo 5/6 nodeAPI URL ? Should be services- + root domain
read API_URL
echo 6/6 Finally the pagePublisher Branch ?
read pagePublisherBranch

sudo apt-get install fortune cowsay -y
sudo apt-get install figlet -y

echo  1 = TYPE = $TYPE, 2 = APP_ID = $APP_ID ,3 = GIT_USERNAME = $GIT_USERNAME ,4 = GIT_PASSWORD = $GIT_PASSWORD , 5 = API_URL = $API_URL , 6 = pagePublisherBranch = $pagePublisherBranch | cowsay ,

now=$(date +"%T")
figlet "Started @ : $now"

rm -rf "../../../../var/www/pagePublisher"

# mkdir "../../../../var/www/pagePublisher"

echo "pagePublisher reset completed" | cowsay

npm install node-cmd && echo node-cmd installed && npm i fs-extra && echo fs-extra installed &&  BRANCH=$pagePublisherBranch GIT_USERNAME=$GIT_USERNAME GIT_PASSWORD=$GIT_PASSWORD node startScript.js

echo  pagePublisher branch : $pagePublisherBranch cloned | cowsay

cd  ../../../../var/www/pagePublisher && figlet In PagePublisherFolder && npm i && figlet In PagePublisherFolder INSTALLED && npm i fs-extra && figlet fs-extra installed && npm i replace-in-file && echo replace-in-file installed && API_URL=$API_URL node pagePublisherStartScript.js

echo  baseUrl in configValue.js file changed to : $API_URL | cowsay
 # npm i shelljs &&  echo shelljs installed in pmt_baseApp &&   rsync(settings.js ../../settings.js) && echo >>>>>rsync move completed<<<<< &&

cd ../../../root/.node-red/projects/pmt_baseApp/ && npm i fs-extra && figlet fs-extra installed in pmt_baseApp && npm install mime && figlet NPM MIME installed in pmt_baseApp && TYPE=$TYPE APP_ID=$APP_ID node flows_script.js

rm -rf "../../../../../root/.node-red/projects/pmt_baseApp/node_modules"

pm2 stop all && pm2 del all

pm2 stop 'Backend API = '$TYPE && pm2 del 'Backend API = '$TYPE
pm2 stop $TYPE'- API' && pm2 del $TYPE'- API'
cd ../../../../../../root/.node-red && TYPE=$TYPE APP_ID=$APP_ID pm2 start node-red --name $TYPE'- API' -i max --restart-delay=3000 -l ../../../../../../root/node-redLogs.log

pm2 stop 'pagePublisher = '$TYPE && pm2 del 'pagePublisher = '$TYPE
pm2 stop $TYPE'- pP' && pm2 del $TYPE'- pP'
cd ../../../../../../var/www/pagePublisher && TYPE=$TYPE APP_ID=$APP_ID pm2 start 'npm start' --name $TYPE'- pP' -i max --restart-delay=3000 -l ../../../../../../root/pagePublisher.log

figlet DONE :-D

now=$(date +"%T")
echo "Completed @ : $now" | cowsay -f ghostbusters
