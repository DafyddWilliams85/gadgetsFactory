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

echo  1 = TYPE = $TYPE, 2 = APP_ID = $APP_ID ,3 = GIT_USERNAME = $GIT_USERNAME ,4 = GIT_PASSWORD = $GIT_PASSWORD , 5 = API_URL = $API_URL , 6 = pagePublisherBranch = $pagePublisherBranch ,

rm -rf "../../../../var/www/pagePublisher"

mkdir "../../../../var/www/pagePublisher"

echo "pagePublisher reset completed"

npm install node-cmd && echo node-cmd installed && npm i fs-extra && echo fs-extra installed &&  BRANCH=$pagePublisherBranch GIT_USERNAME=$GIT_USERNAME GIT_PASSWORD=$GIT_PASSWORD node startScript.js

echo  pagePublisher branch : $pagePublisherBranch cloned

cd  ../../../../var/www/pagePublisher && echo In PagePublisherFolder && npm i && echo In PagePublisherFolder INSTALLED && npm i replace-in-file && echo replace-in-file installed && API_URL=$API_URL node pagePublisherStartScript.js

echo  baseUrl in configValue.js file changed to : $API_URL
 # npm i shelljs &&  echo shelljs installed in pmt_baseApp &&
cd ../../../root/.node-red/projects/pmt_baseApp/ && npm i fs-extra && echo fs-extra installed in pmt_baseApp && TYPE=$TYPE APP_ID=$APP_ID node flows_script.js

rm -rf "../../../../../root/.node-red/projects/pmt_baseApp/node_modules"

pm2 kill 'all' && pm2 del 'all' 

cd ../../../../../../root/.node-red && TYPE=$TYPE APP_ID=$APP_ID pm2 start node-red --name 'Backend API' -i max --restart-delay=3000 -l ../../../../../../root/node-redLogs.log

cd ../../../../../../var/www/pagePublisher && TYPE=$TYPE APP_ID=$APP_ID  pm2 start 'npm start' --name 'pagePublisher' -i max --restart-delay=3000 -l ../../../../../../root/pagePublisher.log
