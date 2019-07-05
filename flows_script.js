var fs = require('fs-extra');
// var cmd = require('node-cmd');

// set settings.js
// fs.moveSync(__dirname + "/settings.js", '/data/settings.js')

global.globalString = "a context chac";

console.log(global.globalString )

console.log({

  "test" : "flows_scrips RUNNNN!!!!!!!",
  "dir":__dirname,
    "database": JSON.parse(fs.readFileSync(__dirname+"/database.json")),
    [process.env.DBTYPE + "_database"]: JSON.parse(fs.readFileSync(__dirname+"/database.json"))[process.env.DBTYPE],
    APP_ID:process.env.APP_ID,
}) ;
var flows_flows_credActions =  function(flowsLocation, flowsCredLocation, database  ){

 fs.ensureDirSync(__dirname + '/old/');

  var flows = JSON.parse(fs.readFileSync(flowsLocation));
  fs.writeFile(__dirname + '/old/flow.json', flows, 'utf8');
  var flows_cred = JSON.parse(fs.readFileSync(flowsCredLocation));
  fs.writeFile(__dirname + '/old/flows_cred.json', flows_cred, 'utf8');
  var database = JSON.parse(fs.readFileSync(database));


console.log(flows_cred)
  var subflowsReplace     = [];
  var createdElements     = [];
  var deletedElements     = [];

  // flows.forEach(function(item) {
  //       if (item.type === "subflow"){
  //           subflowList.forEach(function(subflowListItem) {
  //                 if (subflowListItem ===  (item.name+".json")){
  //                       subflowsReplace.push({name :item.name , id: item.id})
  //                         JSON.parse(fs.readFileSync(__dirname + "/flows/" + item.name+ ".json")).forEach(function(subflowListItem) {
  //                                 if ( subflowListItem.hasOwnProperty("z") &&  subflowListItem.z ===  item.id){
  //                                     createdElements.push(subflowListItem)
  //                                 }
  //                         })
  //                 }
  //           })
  //       };
  //   })

    flows.forEach(function(item) {
    // database
    var match = true

    database[process.env.DBTYPE].match.forEach(function(MongoDb2MatchItem) {
      if (item.hasOwnProperty(MongoDb2MatchItem.key) === false || item[MongoDb2MatchItem.key] !== MongoDb2MatchItem.value){
        match = false
      }
    });

    if (match === true){

      // update cred object
      if (flows_cred.hasOwnProperty(item.id)){
        console.log("flow cred change action")
         flows_cred[item.id].user       = database[process.env.DBTYPE].username;
          flows_cred[item.id].password  = database[process.env.DBTYPE].password;
          item.uri = database[process.env.DBTYPE].connection ;
          item.name = database[process.env.DBTYPE].name ;
      }
    }

    // subflow
    replaced = false
    // if (item.hasOwnProperty("z") && item.z.length > 1 ){
    //   subflowsReplace.forEach(function(subflowsReplaceItem) {
    //     if (item.z === subflowsReplaceItem.id ){
    //       replaced = true
    //         deletedElements.push(item)
    //     }
    //   })
    //   if (replaced === false){
    //      createdElements.push(item)
    //   }
    // } else  {
      createdElements.push(item)
    // }

  });

  flowsLocation, flowsCredLocation, database



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



// }
