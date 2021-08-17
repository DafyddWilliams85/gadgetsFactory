const fs = require('fs-extra');
const cmd = require('node-cmd');

// const GIT_USERNAME = "innonationNL";
// const GIT_PASSWORD = "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";

GIT_USERNAME = process.env.GIT_USERNAME
GIT_PASSWORD = process.env.GIT_PASSWORD
// console.log(process.env.PAGE_PUBLISHER_VERSION);

// if (process.env.PAGE_PUBLISHER_VERSION === 'NEW' ){
//       // const basedata = JSON.parse(fs.readFileSync(__dirname + "/basedata.json"));
      //
      // GIT_USERNAME = process.env.GIT_USERNAME
      // GIT_PASSWORD = process.env.GIT_PASSWORD

remote = `https://${GIT_USERNAME}:${GIT_PASSWORD}@${"github.com/DafyddWilliams85/gadgetsFactory.git"}` ;

// remote = `https://${GIT_USERNAME}:${GIT_PASSWORD}@${"github.com/DafyddWilliams85/PNO_portfolio_management.git"}` ;

const syncClone=cmd.runSync(  'git clone -b master '  + remote + ' ../../../../root/.node-red/projects/gadgetsFactory');

console.log(syncClone);

// cmd.get(
//   'git clone -b ' + 'master'  + " "+ remote + ' ../../../../root/.node-red/projects/gadgetsFactory',
//   function(err, data, stderr){
//     if (err){
//       console.log(err);
//     }
//     if (stderr){
//       console.log(stderr);
//     }
//     console.log(data);
//
// });
