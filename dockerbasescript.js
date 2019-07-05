const fs = require('fs-extra');
const cmd = require('node-cmd');

// const basedata = JSON.parse(fs.readFileSync(__dirname + "/basedata.json"));

if (process.env.hasOwnProperty("GIT_USERNAME")){
  var GIT_USERNAME = process.env.GIT_USERNAME
} else {
    var GIT_USERNAME = process.env.DEFAULT_GIT_USERNAME
}

if (process.env.hasOwnProperty("GIT_PASSWORD")){
  var GIT_PASSWORD = process.env.GIT_PASSWORD
} else {
    var GIT_PASSWORD = process.env.DEFAULT_GIT_PASSWORD
}

if (process.env.hasOwnProperty("PMT_BASE_URL")){
  var PMT_BASE_URL = process.env.PMT_BASE_URL
} else {
    var PMT_BASE_URL = process.env.DEFAULT_PMT_BASE_URL
}

const remote = `https://${GIT_USERNAME}:${GIT_PASSWORD}@${PMT_BASE_URL}`;

cmd.get(
  'git clone ' + remote + ' basedata',
  function(err, data, stderr){
    if (err){
      console.log(err);
    }
    if (stderr){
      console.log(stderr);
    }
    console.log(data);

});
