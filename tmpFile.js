const fs = require('fs-extra');
const cmd = require('node-cmd');

const GIT_USERNAME = "innonationNL";
const GIT_PASSWORD = "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";

remote = `https://${GIT_USERNAME}:${GIT_PASSWORD}@${"github.com/DafyddWilliams85/gadgetsFactory.git"}` ;

cmd.get(
  'git clone -b ' + 'master'  + " "+ remote + ' ../../../../root/.node-red/projects/gadgetsFactory',
  function(err, data, stderr){
    if (err){
      console.log(err);
    }
    if (stderr){
      console.log(stderr);
    }
    console.log(data);

});
