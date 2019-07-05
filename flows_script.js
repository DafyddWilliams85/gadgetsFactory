var fs = require('fs-extra');
var cmd = require('node-cmd');

// set settings.js
// fs.moveSync(__dirname + "/settings.js", '/data/settings.js')
global.set("flows_scrips", "RUNNNN!!!!!!!") ;
var flows_flows_credActions =  function(flowsLocation, flowsCredLocation, subFlowLocation, database, github  ){

  var flows = JSON.parse(fs.readFileSync(flowsLocation));
  var flows_cred = JSON.parse(fs.readFileSync(flowsCredLocation));
  var subflowList = fs.readdirSync(subFlowLocation);
  var database = JSON.parse(fs.readFileSync(database));
  var github = JSON.parse(fs.readFileSync(github));
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

    database[CONTAINER_TYPE].MongoDb2Match.forEach(function(MongoDb2MatchItem) {
      if (item.hasOwnProperty(MongoDb2MatchItem.key) === false || item[MongoDb2MatchItem.key] !== MongoDb2MatchItem.value){
        match = false
      }
    });
    if (match === true){

      // update cred object
      if (flows_cred.hasOwnProperty(item.id)){
        console.log("flow cred change action")
         flows_cred[item.id]={
          "user":database[CONTAINER_TYPE].MongoDbUser,
          'password':database[CONTAINER_TYPE].MongoDbPassword
        }
          item.uri = database[CONTAINER_TYPE].MongoDbConnection ;
          item.name = database[CONTAINER_TYPE].MongoDbName ;
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

  var createdElements_json_flows = JSON.stringify(createdElements);
  fs.writeFile('/data/mount/flow.json', createdElements_json_flows, 'utf8');
  var json_flows_cred = JSON.stringify(flows_cred);
  fs.writeFile('/data/mount/flow_cred.json', json_flows_cred, 'utf8');
  fs.writeFile('/data/flow_cred.json', json_flows_cred, 'utf8');
  var deletedSubflowItems_json_flows = JSON.stringify(deletedElements);
  fs.writeFile('/data/mount/deletedSubflowItems_json_flow.json', deletedSubflowItems_json_flows, 'utf8');

  console.log( "success, deletedElements = " +  deletedElements.length + ", createdElements = " +  createdElements.length + ", flows_cred = " + flows_cred );

};

    // flows_flows_credActions(
    //   "/data/flow.json",               // flowsLocation
    //   "/data/flow_cred.json",          // flowsCredLocation
    //     __dirname+ "/flows/",             // subFlowLocation
    //     __dirname + "/database.json",     // database
    //     __dirname + "/github.json")       // github
    //   }



// }
