const fs = require('fs-extra');
const cmd = require('node-cmd');
var remote , BRANCH, GIT_USERNAME, GIT_PASSWORD

if(process.env.BRANCH === null){

BRANCH = 'staging'
console.log("manual branch to " + BRANCH);
} else{
  BRANCH = process.env.BRANCH
  console.log("mapped branch to " + BRANCH);
}

      
      GIT_USERNAME = process.env.GIT_USERNAME
      GIT_PASSWORD = process.env.GIT_PASSWORD
      console.log({
        // PAGE_PUBLISHER_VERSION:process.env.PAGE_PUBLISHER_VERSION,
        BRANCH:BRANCH,
        GIT_USERNAME:GIT_USERNAME,
        GIT_PASSWORD:GIT_PASSWORD
      })

      remote = `https://${GIT_USERNAME}:${GIT_PASSWORD}@${"github.com/DafyddWilliams85/Publisher.git"}` ;

cmd.get(
  'git clone -b ' + BRANCH  + " "+ remote + ' ../../../../var/www/pagePublisher',
  function(err, data, stderr){
    if (err){
      console.log(err);
    }
    if (stderr){
      console.log(stderr);
    }
    console.log(data);

});
