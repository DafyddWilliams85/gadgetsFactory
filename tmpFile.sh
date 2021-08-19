#!/bin/bash


  pm2 stop all
  figlet pm2 stoped
  rm -rf ../../../../root/.node-red/projects/gadgetsFactory
  figlet gadgetsFactory REVOVED // gadgetsFactory script

  sudo apt-get install jq -y
  GIT_USERNAME=$( jq -r  '.deploymentData.GITHUB_DATA.GIT_USERNAME'  appData.json)
  GIT_PASSWORD=$( jq -r  '.deploymentData.GITHUB_DATA.GIT_PASSWORD'  appData.json)
  GIT_REPO=$( jq -r  '.deploymentData.GITHUB_DATA.GIT_REPO'  appData.json)


  npm install node-cmd && echo node-cmd installed && npm i fs-extra && echo fs-extra installed && GIT_USERNAME=$GIT_USERNAME GIT_PASSWORD=$GIT_PASSWORD GIT_REPO=$GIT_REPO node tmpFile.js
  figlet $GIT_REPO cloned // $GIT_REPO script
  cp ../../../../root/appData.json ../../../../root/.node-red/projects/$GIT_REPO/appData.json
  cd ../../../../root/.node-red/projects/$GIT_REPO
  chmod +x script.sh && source script.sh
