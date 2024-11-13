var fs    = require('fs-extra');
// var shell = require('shelljs');

var flows_flows_credActions =  function(flowsLocation, flowsCredLocation, database  ){

 fs.ensureDirSync(__dirname + '/old/');

  var flows = JSON.parse(fs.readFileSync(flowsLocation));
  fs.writeFile(__dirname + '/old/flow.json', flows, 'utf8');
  var flows_cred = JSON.parse(fs.readFileSync(flowsCredLocation));
  // fs.writeFile(__dirname + '/old/flows_cred.json', flows_cred, 'utf8');
  // var database = JSON.parse(fs.readFileSync(database));

  var subflowsReplace     = [];
  var createdElements     = [];
  var deletedElements     = [];

    flows.forEach(function(item) {
    // database
    // var dbMatch = true;
    //
    // database[process.env.TYPE].match.forEach(function(MongoDb2MatchItem) {
    //   if (item.hasOwnProperty(MongoDb2MatchItem.key) === false || item[MongoDb2MatchItem.key] !== MongoDb2MatchItem.value){
    //     dbMatch = false;
    //   }
    // });
    //
    // if (dbMatch === true){
    //
    //   // update cred object
    //   if (flows_cred.hasOwnProperty(item.id)){
    //     console.log("flow cred change action")
    //      flows_cred[item.id].user       = database[process.env.TYPE].username;
    //       flows_cred[item.id].password  = database[process.env.TYPE].password;
    //       item.uri = database[process.env.TYPE].connection ;
    //       item.name = database[process.env.TYPE].name ;
    //   }
    // }

    if (item.hasOwnProperty("type") && item.type === "function"){
      // function node

      // replace GadgetId with gadgetId
      var GadgetId = /GadgetId/gi;
      item.func = item.func.replace(GadgetId, 'gadgetId');

      // replace GadgetName with gadgetName
      var GadgetName = /GadgetName/gi;
      item.func = item.func.replace(GadgetName, 'gadgetName');

      // replace GadgetType with gadgetType
      var GadgetType = /GadgetType/gi;
      item.func = item.func.replace(GadgetType, 'gadgetType');

      // replace GadgetContent with gadgetData
      var GadgetContent = /GadgetContent/gi;
      item.func = item.func.replace(GadgetContent, 'gadgetData');

      // replace GadgetOptions with gadgetOptions
      var GadgetOptions = /GadgetOptions/gi;
      item.func = item.func.replace(GadgetOptions, 'gadgetOptions');

      // replace GadgetSettings with gadgetOptions
      var GadgetSettings = /GadgetSettings/gi;
      item.func = item.func.replace(GadgetSettings, 'gadgetOptions');

      // replace GadgetSettings with gadgetData
      var gadgetSettings = /gadgetSettings/gi;
      item.func = item.func.replace(gadgetSettings, 'gadgetOptions');

      // replace GadgetData with gadgetData
      var GadgetData = /GadgetData/gi;
      item.func = item.func.replace(GadgetData, 'gadgetData');

      // replace GadgetsList with gadgetsList
      var GadgetsList = /GadgetsList/gi;
      item.func = item.func.replace(GadgetsList, 'gadgetsList');

      // replace ActionType with actionType
      var ActionType = /ActionType/gi;
      item.func = item.func.replace(ActionType, 'actionType');

      // replace GadgetsList with gadgetsList
      var DeviceId = /DeviceId/gi;
      item.func = item.func.replace(DeviceId, 'deviceId');

      // replace appuseraccounts with user_accounts
      var appuseraccounts = /appuseraccounts/gi;
      item.func = item.func.replace(appuseraccounts, 'user_accounts');

      // replace appuserpermissions with user_permissions
      var appuserpermissions = /appuserpermissions/gi;
      item.func = item.func.replace(appuserpermissions, 'user_permissions');

      // replace appusers with users
      var appusers = /appusers/gi;
      item.func = item.func.replace(appusers, 'users');

      // replace appusers with users
      var FormactionType = /FormactionType/gi;
      item.func = item.func.replace(FormactionType, 'FormActionType');



  }


    if (
     process.env.DEPLOYMENTTYPE.toLowerCase() === "production" &&
     item.type === "debug"
   ){
        if (item.name !== "ERROR"){
          item.active  = false
        } else {
          item.active  = true
        }

   } else if (
     process.env.DEPLOYMENTTYPE.toLowerCase() === "development" &&
     item.type === "debug"
   ){
       item.active  = true
   }  else if (
     process.env.DEPLOYMENTTYPE.toLowerCase() === "staging" &&
     item.type === "debug"
   ){
     if (item.name !== "ERROR"){
       item.active  = false
     } else {
       item.active  = true
     }
   }


       replaced = false
       createdElements.push(item)




  });

  var createdElements_json_flows = JSON.stringify(createdElements);
  fs.writeFile(flowsLocation, createdElements_json_flows, 'utf8');
  // var json_flows_cred = JSON.stringify(flows_cred);
  // fs.writeFile(flowsCredLocation, json_flows_cred, 'utf8');
  var deletedSubflowItems_json_flows = JSON.stringify(deletedElements);
  fs.writeFile(__dirname + "/deletedSubflowItems_json_flow.json", deletedSubflowItems_json_flows, 'utf8');

};

fs.removeSync('/root/.node-red/settings.js')
fs.copySync('settings.js', '/root/.node-red/settings.js')

    flows_flows_credActions(
      __dirname+ "/flow.json",
      __dirname+ "/flow_cred.json",
      __dirname+ "/database.json"
    )

// console.log("pre PM2 start with TYPE === " + process.env.TYPE )
// shell.exec('pm2 restart ../../../../../root/ecosystem.config.js --env ' + process.env.TYPE , function(code, output) {
//       console.log('Exit code:', code);
//       console.log('Program output:', output);
//     });
// console.log("POST PM2 start with TYPE === " + process.env.TYPE )
