var fs    = require('fs-extra');
var shell = require('shelljs');
// var cmd = require('node-cmd');

console.log({
  "test" : "flows_scrips RUNNNN!!!!!!!",
  "dir":__dirname,
    "database": JSON.parse(fs.readFileSync(__dirname+"/database.json")),
    [process.env.TYPE + "_database"]: JSON.parse(fs.readFileSync(__dirname+"/database.json"))[process.env.TYPE],
    APP_ID:process.env.APP_ID,
    shell:shell
}) ;
var flows_flows_credActions =  function(flowsLocation, flowsCredLocation, database  ){

 fs.ensureDirSync(__dirname + '/old/');

  var flows = JSON.parse(fs.readFileSync(flowsLocation));
  fs.writeFile(__dirname + '/old/flow.json', flows, 'utf8');
  var flows_cred = JSON.parse(fs.readFileSync(flowsCredLocation));
  fs.writeFile(__dirname + '/old/flows_cred.json', flows_cred, 'utf8');
  var database = JSON.parse(fs.readFileSync(database));

  var subflowsReplace     = [];
  var createdElements     = [];
  var deletedElements     = [];

    flows.forEach(function(item) {
    // database
    var match = true;

    database[process.env.TYPE].match.forEach(function(MongoDb2MatchItem) {
      if (item.hasOwnProperty(MongoDb2MatchItem.key) === false || item[MongoDb2MatchItem.key] !== MongoDb2MatchItem.value){
        match = false;
      }
    });

    if (match === true){

      // update cred object
      if (flows_cred.hasOwnProperty(item.id)){
        console.log("flow cred change action")
         flows_cred[item.id].user       = database[process.env.TYPE].username;
          flows_cred[item.id].password  = database[process.env.TYPE].password;
          item.uri = database[process.env.TYPE].connection ;
          item.name = database[process.env.TYPE].name ;
      }
    }

    replaced = false

      createdElements.push(item)

  });

  var createdElements_json_flows = JSON.stringify(createdElements);
  fs.writeFile(flowsLocation, createdElements_json_flows, 'utf8');
  var json_flows_cred = JSON.stringify(flows_cred);
  fs.writeFile(flowsCredLocation, json_flows_cred, 'utf8');
  var deletedSubflowItems_json_flows = JSON.stringify(deletedElements);
  fs.writeFile(__dirname + "/deletedSubflowItems_json_flow.json", deletedSubflowItems_json_flows, 'utf8');

};
    flows_flows_credActions(
      __dirname+ "/flow.json",
      __dirname+ "/flow_cred.json",
      __dirname+ "/database.json"
    )

shell.exec('pm2 restart ecosystem.config.js --env ' + process.env.TYPE , function(code, output) {
      console.log('Exit code:', code);
      console.log('Program output:', output);
    });
