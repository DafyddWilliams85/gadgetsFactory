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

rm -rf "../../../../var/www/pagePublisher"

mkdir "../../../../var/www/pagePublisher"

echo  1 = TYPE = $TYPE, 2 = APP_ID = $APP_ID ,3 = GIT_USERNAME = $GIT_USERNAME ,4 = GIT_PASSWORD = $GIT_PASSWORD , 5 = API_URL = $API_URL , 6 = pagePublisherBranch = $pagePublisherBranch ,

npm install node-cmd && echo node-cmd installed && npm i fs-extra && echo fs-extra installed &&  BRANCH=$pagePublisherBranch GIT_USERNAME=$GIT_USERNAME GIT_PASSWORD=$GIT_PASSWORD node startScript.js && npm i

echo  pagePublisher branch : $pagePublisherBranch cloned

cd  ../../../../var/www/pagePublisher &&  echo In PagePublisherFolder && npm i fs-extra && echo fs-extra installed  && npm i replace-in-file && echo replace-in-file installed && API_URL=$API_URL node pagePublisherStartScript.js

echo  baseUrl in configValue.js file changed to : $API_URL

cd ../../../root/.node-red/projects/pmt_baseApp/ && npm i fs-extra && echo fs-extra installed in pmt_baseApp && npm i shelljs &&  echo shelljs installed in pmt_baseApp && TYPE=$TYPE APP_ID=$APP_ID node flows_script.js
