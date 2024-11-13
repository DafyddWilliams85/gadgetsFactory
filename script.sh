# turn on bash's job control
# echo Provide env key
# read ENV_NAME

# ENV_JSON=$3
sudo apt-get install jq

echo  ____________________________ ____________________________
echo  jq installed proceeding with == ENV_NAME = $2
echo  ____________________________ ____________________________

# echo  curl '/Info per env.json'
# ENV_JSON=`jq --compact-output '.'$2 "deploymentData.appData.json"`
ENV_JSON= jq '.deploymentData.appData' appData.json

echo  ENV_JSON  = $ENV_JSON
if [ "$ENV_JSON" = "null" ]
then
    echo ENV_NAME = $ENV_NAME , not supported
else

    sudo apt-get install fortune cowsay -y
    sudo apt-get install figlet -y
    sudo apt-get install jq -y

    echo $ENV_JSON > deploymentData.json
    echo deploymentData.json created
    #
    TYPE=$( jq -r  '.deploymentData.'$2'.TYPE'  appData.json)
    APP_ID=$1
    DEPLOYMENTTYPE=$( jq -r  '.deploymentData.'$2'.DEPLOYMENTTYPE'  appData.json)
    GIT_USERNAME=$( jq -r  '.deploymentData.GITHUB_DATA.GIT_USERNAME'  appData.json)
    GIT_PASSWORD=$( jq -r  '.deploymentData.GITHUB_DATA.GIT_PASSWORD'  appData.json)
    GIT_REPO=$( jq -r  '.deploymentData.GITHUB_DATA.GIT_REPO'  appData.json)
    API_KEY=$( jq -r  '.appData.SystemVars.tokenSecret'  appData.json)
    API_URL=$( jq -r  '.deploymentData.'$2'.API_URL'  appData.json)
    pagePublisherBranch=$( jq -r  '.deploymentData.'$2'.pagePublisherBranch'  appData.json)
    publisherBuild=$( jq -r  '.deploymentData.'$2'.publisherBuild'  appData.json)
    WSS_BASE_URL=$( jq -r  '.deploymentData.'$2'.WSS_BASE_URL'  appData.json)
    APP_NAME=$( jq -r  '.deploymentData.'$2'.APP_NAME'  appData.json)
    PAGE_PUBLISHER_VERSION=$( jq -r  '.deploymentData.'$2'.PAGE_PUBLISHER_VERSION'  appData.json)
    CLUSTER=$( jq -r  '.deploymentData.'$2'.CLUSTER'  appData.json)
    PAGE_BUILDER=$( jq -r  '.deploymentData.'$2'.PAGE_BUILDER'  appData.json)
    CLUSTER_PUBLISHER=$( jq -r  '.deploymentData.'$2'.CLUSTER_PUBLISHER'  appData.json)
    APP_LOGO=$( jq -r  '.deploymentData.'$2'.APP_LOGO'  appData.json)
    PREFORMANCE_CHECK=$( jq -r  '.deploymentData.'$2'.PREFORMANCE_CHECK'  appData.json)
    PUBLIC_URL=$( jq -r  '.deploymentData.'$2'.PUBLIC_URL'  appData.json)
    PREFORMANCE_CHECK=$( jq -r  '.deploymentData.'$2'.PREFORMANCE_CHECK'  appData.json)
    APP_THEME=$( jq -r  '.deploymentData.'$2'.APP_THEME'  appData.json)
    APP_PROGRESS_TYPE=$( jq -r  '.deploymentData.'$2'.APP_PROGRESS_TYPE'  appData.json)
    APP_PRIMARY_COLOR=$( jq -r  '.deploymentData.'$2'.APP_PRIMARY_COLOR'  appData.json)
    ICON=$( jq -r  '.deploymentData.'$2'.ICON'  appData.json)
    TITLE=$( jq -r  '.deploymentData.'$2'.TITLE'  appData.json)
    ACTIVE_TABS=$( jq -r  '.deploymentData.'$2'.ACTIVE_TABS'  appData.json)
    PROMETHEUS=$( jq -r  '.deploymentData.'$2'.PROMETHEUS'  appData.json)
    SETUP_TYPE=$( jq -r  '.deploymentData.'$2'.SETUP_TYPE'  appData.json)
    FILE_ENDPOINT_URL=$( jq -r  '.deploymentData.'$2'.FILE_ENDPOINT_URL'  appData.json)
    CONTEXT_DATA_LOCATION=$( jq -r  '.deploymentData.'$2'.CONTEXT_DATA_LOCATION'  appData.json)

    now=$(date +"%T")
    figlet "Started @ : $now"

    rm -rf "../../../../var/www/pagePublisher"
    echo "pagePublisher reset completed" | cowsay

    rm -rf "../../../../../../root/pagePublisher.log"
    rm -rf "../../../../../../root/node-redLogs.log"
    echo "Log files removed" | cowsay

    if [ -d "../../../../files/initPayloads/" ]
    then
        rsync -a ../../../../root/.node-red/projects/$GIT_REPO/files/initPayloads/  ../../../../files/initPayloads/
        echo "rsync initPayloads completed"  | cowsay
    else
      cp -r ../../../../root/.node-red/projects/$GIT_REPO/files/initPayloads/  ../../../../files/initPayloads/
      echo "copy initPayloads completed"  | cowsay
    fi

    cd ../../../../../root/.node-red/ && npm i jetpack && figlet jetpack installed in node red ROOT    && npm i exceljs && figlet exceljs installed in node red ROOT && npm install nodemailer && figlet nodemailer installed in node red ROOT  &&  npm i request && figlet request installed in node red ROOT &&   npm i nodemailer-mailgun-transport && figlet nodemailer-mailgun-transport installed in node red ROOT &&  npm i fs-extra && figlet fs-extra installed node red ROOT && npm install mongodb && figlet NPM mongodb installed node red ROOT  && npm install mime && figlet NPM MIME installed node red ROOT && npm install @google-cloud/translate && figlet NPM @google-cloud/translate installed node red ROOT && npm install request && figlet NPM request installed node red ROOT && npm i mailgun-js && figlet NPM mailgun-js installed node red ROOT && npm install simple-git && figlet npm install simple-git installed node red ROOT && npm i node-os-utils && figlet node-os-utils installed

    rm -rf ../../../../../root/.node-red/node_modules/node-red-mongodb-tool-belt && cp -r ../../../../../root/.node-red/projects/$GIT_REPO/customNodeModules/node-red-mongodb-tool-belt ../../../../../root/.node-red/node_modules/node-red-mongodb-tool-belt && cd ../../../../../root/.node-red/node_modules/node-red-mongodb-tool-belt && npm i -g && echo node-red-mongodb-tool-belt INSTALLED



    cd ../../../../../root/.node-red/projects/$GIT_REPO && npm i fs-extra && figlet fs-extra installed && npm i json-fn && figlet json-fn installed && npm i replace-in-file && echo replace-in-file installed  && DEPLOYMENTTYPE=$DEPLOYMENTTYPE TYPE=$TYPE APP_ID=$APP_ID TITLE=$TITLE ICON=$ICON ACTIVE_TABS=$ACTIVE_TABS node flows_script.js



      rm -rf ../../../../../files/SystemFiles
      mkdir -p ../../../../../files/SystemFiles
      cp -r ../../../../../root/.node-red/projects/$GIT_REPO/files/SystemFiles ../../../../../files
      echo  Content of SystemFiles/ is now: | cowsay

      for entry in "../../../../../files/SystemFiles"/*
      do
        echo "$entry"
      done

      rm -rf ../../../../../files/logo
      mkdir -p ../../../../../files/logo
      cp -r ../../../../../root/.node-red/projects/$GIT_REPO/files/logo ../../../../../files
      echo  Content of logo/ is now: | cowsay

      for entry in "../../../../../files/logo"/*
      do
        echo "$entry"
      done

      rm -rf ../../../../../files/domainProperties
      mkdir -p ../../../../../files/domainProperties
      cp -r ../../../../../root/.node-red/projects/$GIT_REPO/appData.json ../../../../../files
      echo  Content of appData.json/ is now: | cowsay

      for entry in "../../../../../files/appData.json"/*
      do
        echo "$entry"
      done

      cd  ../../../../root/.node-red/projects/$GIT_REPO

    npm install minizip-asm.js && echo minizip-asm.js installed &&  npm install node-cmd && echo node-cmd installed && npm i fs-extra && echo fs-extra installed &&  BRANCH=$pagePublisherBranch GIT_USERNAME=$GIT_USERNAME GIT_PASSWORD=$GIT_PASSWORD PAGE_PUBLISHER_VERSION=$PAGE_PUBLISHER_VERSION node startScript.js

    echo  pagePublisher branch : $pagePublisherBranch cloned | cowsay

    cp  ../../../../root/.node-red/projects/$GIT_REPO/pagePublisherStartScript.mjs ../../../../var/www/pagePublisher/pagePublisherStartScript.mjs

    echo  pagePublisherStartScript.mjs copied | cowsay

    rm -rf ../../../../root/.node-red/lib && cp -R  ../../../../root/.node-red/projects/$GIT_REPO/lib ../../../../root/.node-red/lib

    echo  lib folder updated | cowsay

    cd  ../../../../var/www/pagePublisher&& figlet In PagePublisherFolder &&  rm -rf package-lock.json && figlet package-lock.json  REMOVED && npm i fs-extra && figlet fs-extra installed && npm i json-fn && figlet json-fn installed && npm i replace-in-file && echo replace-in-file installed && APP_THEME=$APP_THEME PAGE_BUILDER=$PAGE_BUILDER APP_ID=$APP_ID API_URL=$API_URL WSS_BASE_URL=$WSS_BASE_URL APP_NAME=$APP_NAME PAGE_PUBLISHER_VERSION=$PAGE_PUBLISHER_VERSION APP_LOGO=$APP_LOGO PUBLIC_URL=$PUBLIC_URL APP_PROGRESS_TYPE=$APP_PROGRESS_TYPE APP_PRIMARY_COLOR=$APP_PRIMARY_COLOR FILE_ENDPOINT_URL=$FILE_ENDPOINT_URL API_KEY=$API_KEY node pagePublisherStartScript.mjs
    echo  configValue.js file changed | cowsay

    # cd ../../../root/.node-red/ && npm i twilio && figlet twilio installed in node red ROOT   && npm i jetpack && figlet jetpack installed in node red ROOT    && npm i exceljs && figlet exceljs installed in node red ROOT && npm install nodemailer && figlet nodemailer installed in node red ROOT  &&  npm i request && figlet request installed in node red ROOT &&   npm i nodemailer-mailgun-transport && figlet nodemailer-mailgun-transport installed in node red ROOT &&  npm i fs-extra && figlet fs-extra installed node red ROOT && npm install mongodb && figlet NPM mongodb installed node red ROOT  && npm install mime && figlet NPM MIME installed node red ROOT
    #
    # rm -rf ../../../../../root/.node-red/node_modules/node-red-mongodb-tool-belt && cp -r ../../../../../root/.node-red/projects/$GIT_REPO/customNodeModules/node-red-mongodb-tool-belt ../../../../../root/.node-red/node_modules/node-red-mongodb-tool-belt && cd ../../../../../root/.node-red/node_modules/node-red-mongodb-tool-belt && npm i -g && echo node-red-mongodb-tool-belt INSTALLED
    # cd ../../../../../root/.node-red/projects/$GIT_REPO && DEPLOYMENTTYPE=$DEPLOYMENTTYPE TYPE=$TYPE APP_ID=$APP_ID node flows_script.js

    rm -rf ../../../../../files/SystemFiles
    mkdir -p ../../../../../files/SystemFiles
    cp -r ../../../../../root/.node-red/projects/$GIT_REPO/files/SystemFiles ../../../../../files
    echo  Content of SystemFiles/ is now: | cowsay

    for entry in "../../../../../files/SystemFiles"/*
    do
      echo "$entry"
    done

    rm -rf ../../../../../files/logo
    mkdir -p ../../../../../files/logo
    cp -r ../../../../../root/.node-red/projects/$GIT_REPO/files/logo ../../../../../files
    echo  Content of logo/ is now: | cowsay

    for entry in "../../../../../files/logo"/*
    do
      echo "$entry"
    done

    cp -r ../../../../../files/logo/$TYPE/favicon.ico ../../../../var/www/pagePublisher/static
    echo favicon.ico copied | cowsay

    pm2 stop all && pm2 del all

    figlet Lets fire them up!!!!

    figlet $PAGE_PUBLISHER_VERSION  $DEPLOYMENTTYPE

    if [ "$CLUSTER" = "YES" ]
    then
      if [ "$publisherBuild" = "develop" ]
      then
        echo TYPE=$TYPE APP_ID=$APP_ID APP_NAME=$APP_NAME API_URL=$API_URL WEBSOCKET_URL=$WSS_BASE_URL
        cd ../../../../../../var/www/pagePublisher &&  rm -rf node-modules && figlet node-modules REMOVED &&  npm i && figlet PagePublisherFolder Installed &&  TYPE=$TYPE APP_ID=$APP_ID pm2 start 'npm run dev' --name $TYPE'- == run dev >> Publisher' -i max --restart-delay=3000 -l ../../../../../../root/pagePublisher.log
        echo NEW DEV pagePublisher started
      else
        echo TYPE=$TYPE APP_ID=$APP_ID APP_NAME=$APP_NAME API_URL=$API_URL WEBSOCKET_URL=$WSS_BASE_URL
        cd ../../../../../../var/www/pagePublisher  &&  rm -rf node-modules && figlet node-modules REMOVED &&  npm i && figlet PagePublisherFolder Installed && TYPE=$TYPE APP_ID=$APP_ID pm2 start 'npm start' --name $TYPE'Publisher' -i max --restart-delay=3000 -l ../../../../../../root/pagePublisher.log
        echo NEW PROD pagePublisher started
      fi
      echo  1 = TYPE = $TYPE, 2 = APP_ID = $APP_ID = starting Backend
      cd ../../../../../../root/.node-red &&  PREFORMANCE_CHECK=$PREFORMANCE_CHECK TYPE=$TYPE APP_ID=$APP_ID GIT_REPO=$GIT_REPO pagePublisherBranch=$pagePublisherBranch pm2 start node-red --name 'Backend - API' -i max --restart-delay=3000 -l ../../../../../../root/node-redLogs.log
      echo Backend started CLUSTER
    else
      if [ "$publisherBuild" = "develop" ]
      then
        echo TYPE=$TYPE APP_ID=$APP_ID APP_NAME=$APP_NAME API_URL=$API_URL WEBSOCKET_URL=$WSS_BASE_URL
        cd ../../../../../../var/www/pagePublisher &&  rm -rf node-modules && figlet node-modules REMOVED &&  npm i && figlet PagePublisherFolder Installed &&  TYPE=$TYPE APP_ID=$APP_ID pm2 start 'npm run dev' --name $TYPE'- == run dev >> Publisher' --restart-delay=3000 -l ../../../../../../root/pagePublisher.log
        echo NEW DEV pagePublisher started
      else
        echo TYPE=$TYPE APP_ID=$APP_ID APP_NAME=$APP_NAME API_URL=$API_URL WEBSOCKET_URL=$WSS_BASE_URL
        cd ../../../../../../var/www/pagePublisher  &&  rm -rf node-modules && figlet node-modules REMOVED &&  npm i && figlet PagePublisherFolder Installed && TYPE=$TYPE APP_ID=$APP_ID pm2 start 'npm start' --name $TYPE'Publisher' -i 2 --restart-delay=3000 -l ../../../../../../root/pagePublisher.log
        echo NEW PROD pagePublisher started
      fi
      echo  1 = TYPE = $TYPE, 2 = APP_ID = $APP_ID = starting Backend
      cd ../../../../../../root/.node-red &&  PREFORMANCE_CHECK=$PREFORMANCE_CHECK TYPE=$TYPE APP_ID=$APP_ID GIT_REPO=$GIT_REPO pagePublisherBranch=$pagePublisherBranch pm2 start node-red --name 'Backend - API'  --restart-delay=3000 -l ../../../../../../root/node-redLogs.log
      echo Backend started CLUSTER
    fi

    figlet DONE :-D

    now=$(date +"%T")
    echo "Completed @ : $now" | cowsay -f ghostbusters

fi
