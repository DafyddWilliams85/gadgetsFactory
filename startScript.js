const fs = require('fs-extra');
const cmd = require('node-cmd');


if (process.env.pagePublisherVersion === "NEW" ){
      // const basedata = JSON.parse(fs.readFileSync(__dirname + "/basedata.json"));

      var BRANCH = process.env.BRANCH
      var GIT_USERNAME = process.env.GIT_USERNAME
      var GIT_PASSWORD = process.env.GIT_PASSWORD
      console.log({
        BRANCH:BRANCH,
        GIT_USERNAME:GIT_USERNAME,
        GIT_PASSWORD:GIT_PASSWORD
      })

      const remote = `https://${GIT_USERNAME}:${GIT_PASSWORD}@${"github.com/DafyddWilliams85/Publisher.git"}` ;

} else if (){}
        // const basedata = JSON.parse(fs.readFileSync(__dirname + "/basedata.json"));

        var BRANCH = process.env.BRANCH
        var GIT_USERNAME = process.env.GIT_USERNAME
        var GIT_PASSWORD = process.env.GIT_PASSWORD
        console.log({
          BRANCH:BRANCH,
          GIT_USERNAME:GIT_USERNAME,
          GIT_PASSWORD:GIT_PASSWORD
        })

        const remote = `https://${GIT_USERNAME}:${GIT_PASSWORD}@${"github.com/DafyddWilliams85/pagePublisher.git"}` ;

}
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
