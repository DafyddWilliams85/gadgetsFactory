const fs = require('fs-extra');
const cmd = require('node-cmd');

GIT_USERNAME  = process.env.GIT_USERNAME
GIT_PASSWORD  = process.env.GIT_PASSWORD
GIT_REPO    = process.env.GIT_REPO

remote = `https://${GIT_USERNAME}:${GIT_PASSWORD}@github.com/DafyddWilliams85/${GIT_REPO}.git` ;
destination = ` ../../../../root/.node-red/projects/${GIT_REPO}` ;

cmd.get(
  'git clone -b master '  + remote + destination,
  function(err, data, stderr){
    if (err){
      console.log(err);
    }
    if (stderr){
      console.log(stderr);
    }
    console.log(data);

});