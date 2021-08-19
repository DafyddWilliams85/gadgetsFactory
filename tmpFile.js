const fs = require('fs-extra');
const cmd = require('node-cmd');

GIT_USERNAME  = process.env.GIT_USERNAME
GIT_PASSWORD  = process.env.GIT_PASSWORD
GIT_REPO    = process.env.GIT_REPO

remote = `https://${GIT_USERNAME}:${GIT_PASSWORD}@github.com/DafyddWilliams85/${REPOSITORY}.git` ;
destination = ` ../../../../root/.node-red/projects/${REPOSITORY}` ;

const syncClone=cmd.runSync(  'git clone -b master '  + remote + destination);

console.log(syncClone);
