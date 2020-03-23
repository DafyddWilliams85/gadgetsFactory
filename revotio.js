const fs = require('fs-extra');
const cmd = require('node-cmd');

const GIT_USERNAME = "revotio";
const GIT_PASSWORD = "jW21h3MTebDXg1JrF26OZzmQLcRhNCYjJ9DWh";

// var remote , BRANCH, GIT_USERNAME, GIT_PASSWORD
// console.log(process.env.PAGE_PUBLISHER_VERSION);
//
// if (process.env.PAGE_PUBLISHER_VERSION === 'NEW' ){
//       // const basedata = JSON.parse(fs.readFileSync(__dirname + "/basedata.json"));
//
//       BRANCH = process.env.BRANCH
//       GIT_USERNAME = process.env.GIT_USERNAME
//       GIT_PASSWORD = process.env.GIT_PASSWORD
//       console.log({
//         PAGE_PUBLISHER_VERSION:process.env.PAGE_PUBLISHER_VERSION,
//         BRANCH:BRANCH,
//         GIT_USERNAME:GIT_USERNAME,
//         GIT_PASSWORD:GIT_PASSWORD
//       })
//
//       remote = `https://${GIT_USERNAME}:${GIT_PASSWORD}@${"github.com/DafyddWilliams85/Publisher.git"}` ;
//
// } else if (process.env.PAGE_PUBLISHER_VERSION === 'OLD'){
//         // const basedata = JSON.parse(fs.readFileSync(__dirname + "/basedata.json"));
//
//         BRANCH = process.env.BRANCH
//         GIT_USERNAME = process.env.GIT_USERNAME
//         GIT_PASSWORD = process.env.GIT_PASSWORD
//         console.log({
//           PAGE_PUBLISHER_VERSION:process.env.PAGE_PUBLISHER_VERSION,
//           BRANCH:BRANCH,
//           GIT_USERNAME:GIT_USERNAME,
//           GIT_PASSWORD:GIT_PASSWORD
//         })
//
//         remote = `https://${GIT_USERNAME}:${GIT_PASSWORD}@${"github.com/DafyddWilliams85/pagePublisher.git"}` ;
//
// }

remote = `https://${GIT_USERNAME}:${GIT_PASSWORD}@${"github.com/DafyddWilliams85/revotio.git"}` ;

cmd.get(
  'git clone -b ' + 'master'  + " "+ remote + ' ../../../../root/.node-red/projects/revotio',
  function(err, data, stderr){
    if (err){
      console.log(err);
    }
    if (stderr){
      console.log(stderr);
    }
    console.log(data);

});
