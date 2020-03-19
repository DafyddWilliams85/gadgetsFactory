#!/bin/bash

# turn on bash's job control

  pm2 stop all
  figlet pm2 stoped
  rm -rf ../../../../root/.node-red/projects/pmt_baseApp
  figlet pmt_baseApp REVOVED
  npm install node-cmd && echo node-cmd installed && npm i fs-extra && echo fs-extra installed &&  node pmt_baseApp.js
  figlet pmt_baseApp cloned
  source ../../../../root/.node-red/projects/pmt_baseApp/script.sh
