# turn on bash's job control
# echo Provide env key
# read ENV_NAME

# ENV_JSON=$3
sudo apt-get install jq

echo  ____________________________ ____________________________
echo  jq installed proceeding with == ENV_NAME = $2
echo  ____________________________ ____________________________

# echo  curl '/Info per env.json'
ENV_JSON=`jq --compact-output '.'$2 "deploymentData.appData.json"`

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
    # #
    echo  1 = TYPE = $TYPE, 2 = APP_ID = $APP_ID ,  3 = DEPLOYMENTTYPE  = $DEPLOYMENTTYPE , 4 = GIT_USERNAME = $GIT_USERNAME ,5 = GIT_PASSWORD = $GIT_PASSWORD , 6 = API_URL = $API_URL , 7 = pagePublisherBranch = $pagePublisherBranch, 8 = WSS_BASE_URL = $WSS_BASE_URL, 9, PAGE_PUBLISHER_VERSION = $PAGE_PUBLISHER_VERSION ,PAGE_BUILDER = $PAGE_BUILDER, CLUSTER = $CLUSTER, PAGE_PUBLISHER_VERSION  = $PAGE_PUBLISHER_VERSION , publisherBuild = $publisherBuild , API_KEY=$API_KEY

    # rm -rf "DATA.json"
    # echo DATA.json removed

    now=$(date +"%T")
    figlet "Started @ : $now"

    rm -rf "../../../../var/www/pagePublisher"
    echo "pagePublisher reset completed" | cowsay

    rm -rf "../../../../../../root/pagePublisher.log"
    rm -rf "../../../../../../root/node-redLogs.log"
    echo "Log files removed" | cowsay

    cd  ../../../../root/.node-red/projects/gadgetsFactory


    npm install minizip-asm.js && echo minizip-asm.js installed &&  npm install node-cmd && echo node-cmd installed && npm i fs-extra && echo fs-extra installed &&  BRANCH=$pagePublisherBranch GIT_USERNAME=$GIT_USERNAME GIT_PASSWORD=$GIT_PASSWORD PAGE_PUBLISHER_VERSION=$PAGE_PUBLISHER_VERSION node startScript.js

      echo  pagePublisher branch : $pagePublisherBranch cloned | cowsay

      cp  ../../../../root/.node-red/projects/gadgetsFactory/pagePublisherStartScript.js ../../../../var/www/pagePublisher/pagePublisherStartScript.js

      echo  pagePublisherStartScript.js copied | cowsay

      rm -rf ../../../../root/.node-red/lib && cp -R  ../../../../root/.node-red/projects/gadgetsFactory/lib ../../../../root/.node-red/lib

      echo  lib folder updated | cowsay

      cd  ../../../../var/www/pagePublisher&& figlet In PagePublisherFolder &&  rm -rf package-lock.json && figlet package-lock.json  REMOVED && npm i fs-extra && figlet fs-extra installed && npm i json-fn && figlet json-fn installed && npm i replace-in-file && echo replace-in-file installed && PAGE_BUILDER=$PAGE_BUILDER APP_ID=$APP_ID API_URL=$API_URL WSS_BASE_URL=$WSS_BASE_URL APP_NAME=$APP_NAME PAGE_PUBLISHER_VERSION=$PAGE_PUBLISHER_VERSION APP_LOGO=$APP_LOGO PUBLIC_URL=$PUBLIC_URL API_KEY=$API_KEY  node pagePublisherStartScript.js

      # cd  ../../../../var/www/pagePublisher&& figlet In PagePublisherFolder &&  rm -rf package-lock.json && figlet package-lock.json  REMOVED &&  npm i && figlet PagePublisherFolder Installed && npm i fs-extra && figlet fs-extra installed && npm i json-fn && figlet json-fn installed && npm i replace-in-file && echo replace-in-file installed && PAGE_BUILDER=$PAGE_BUILDER APP_ID=$APP_ID API_URL=$API_URL WSS_BASE_URL=$WSS_BASE_URL APP_NAME=$APP_NAME PAGE_PUBLISHER_VERSION=$PAGE_PUBLISHER_VERSION node pagePublisherStartScript.js

      echo  configValue.js file changed | cowsay

    cd ../../../root/.node-red/ && npm i twilio && figlet twilio installed in node red ROOT   && npm i jetpack && figlet jetpack installed in node red ROOT    && npm i exceljs && figlet exceljs installed in node red ROOT && npm install nodemailer && figlet nodemailer installed in node red ROOT  &&  npm i request && figlet request installed in node red ROOT &&   npm i nodemailer-mailgun-transport && figlet nodemailer-mailgun-transport installed in node red ROOT &&  npm i fs-extra && figlet fs-extra installed node red ROOT && npm install mongodb && figlet NPM mongodb installed node red ROOT  && npm install mime && figlet NPM MIME installed node red ROOT

    rm -rf ../../../../../root/.node-red/node_modules/node-red-mongodb-tool-belt && cp -r ../../../../../root/.node-red/projects/gadgetsFactory/customNodeModules/node-red-mongodb-tool-belt ../../../../../root/.node-red/node_modules/node-red-mongodb-tool-belt && cd ../../../../../root/.node-red/node_modules/node-red-mongodb-tool-belt && npm i -g && echo node-red-mongodb-tool-belt INSTALLED
    # rm -rf ../../../../../root/.node-red/node_modules/node-red-contrib-mongodb2 && cp -r ../../../../../root/.node-red/projects/gadgetsFactory/customNodeModules/node-red-contrib-mongodb2 ../../../../../root/.node-red/node_modules/node-red-contrib-mongodb2 && cd ../../../../../root/.node-red/node_modules/node-red-contrib-mongodb2 && npm i -g && echo node-red-contrib-mongodb2 INSTALLED

    cd ../../../../../root/.node-red/projects/gadgetsFactory && DEPLOYMENTTYPE=$DEPLOYMENTTYPE TYPE=$TYPE APP_ID=$APP_ID node flows_script.js

    rm -rf ../../../../../files/SystemFiles
    mkdir -p ../../../../../files/SystemFiles
    cp -r ../../../../../root/.node-red/projects/gadgetsFactory/files/SystemFiles ../../../../../files
    echo  Content of SystemFiles/ is now: | cowsay

    for entry in "../../../../../files/SystemFiles"/*
    do
      echo "$entry"
    done

    rm -rf ../../../../../files/logo
    mkdir -p ../../../../../files/logo
    cp -r ../../../../../root/.node-red/projects/gadgetsFactory/files/logo ../../../../../files
    echo  Content of logo/ is now: | cowsay

    for entry in "../../../../../files/logo"/*
    do
      echo "$entry"
    done

    cp -r ../../../../../root/.node-red/projects/gadgetsFactory/files/logo/$TYPE/favicon.ico ../../../../var/www/pagePublisher/static
    echo favicon.ico copied | cowsay


    rm -rf "../../../../../root/.node-red/projects/gadgetsFactory/node_modules"

    pm2 stop all && pm2 del all

    figlet Lets fire them up!!!!

    figlet $PAGE_PUBLISHER_VERSION  $DEPLOYMENTTYPE

    if [ "$CLUSTER" = "YES" ]
    then

      # if [ "$PAGE_PUBLISHER_VERSION" = "OLD" ]
      # then
      #   cd ../../../../../../var/www/pagePublisher &&  TYPE=$TYPE APP_ID=$APP_ID  pagePublisherBranch=$pagePublisherBranch  pm2 start 'npm start' --name $TYPE'- pP' -i max --restart-delay=3000 -l ../../../../../../root/pagePublisher.log
      #   echo OLD pagePublisher started
      # el
      if [ "$publisherBuild" = "develop" ]
      then
        # cd ../../../../../../var/www/pagePublisher && TYPE=$TYPE APP_ID=$APP_ID pm2 start 'npm run dev' --name $TYPE'- == run dev >> pP' -i max --restart-delay=3000 -l ../../../../../../root/pagePublisher.log
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

      # if [ "$PAGE_PUBLISHER_VERSION" = "OLD" ]
      # then
      #   cd ../../../../../../var/www/pagePublisher &&  TYPE=$TYPE APP_ID=$APP_ID pm2 start 'npm start' --name $TYPE'- pP' -i max --restart-delay=3000 -l ../../../../../../root/pagePublisher.log
      #   echo OLD pagePublisher started
      # el
      if [ "$publisherBuild" = "develop" ]
      then
        # cd ../../../../../../var/www/pagePublisher && TYPE=$TYPE APP_ID=$APP_ID pm2 start 'npm run dev' --name $TYPE'- == run dev >> pP' -i max --restart-delay=3000 -l ../../../../../../root/pagePublisher.log
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
