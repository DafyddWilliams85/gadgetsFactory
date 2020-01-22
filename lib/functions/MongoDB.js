// name: MongoDB
// outputs: 1

// findOne 
findOneObj = {
                    query : {
                            query :{} 
                            },
                    connection:global.get("DB_data.connection"),
                    database:global.get("DB_data.appDB"),
                    collection:'settings',
                    operation:'find',
                    }

            mongodbTools.resolveAsync(findOneObj, node, function(res){
                if (res.length > 0){
                    msg.payload = res[0]
                } else {
                    msg.payload = {}
                }
                    
                    node.send(msg) 
            })  
            
//**********************************************
// findMany

findManyObj = {
                    query : {
                            query :{}, 
                            },
                    connection:global.get("DB_data.connection"),
                    database:global.get("DB_data.appDB"),
                    collection:'settings',
                    operation:'find',
                    }

            mongodbTools.resolveAsync(findManyObj, node, function(res){
                    msg.payload = res
                    node.send(msg) 
            }) 

//**********************************************
// aggregate

            aggregateObj = {
                    query : { query : [{
                                $match: {
                                  "organization_id": new ObjectID("5b48463d9d184d10f2f81537"),
                                  "type": "project"
                                }
                              },
                         
                            ],},
                    connection:global.get("DB_data.connection"),
                    database:global.get("DB_data.appDB"),
                    collection:'settings',
                    operation:'aggregate',
                    }
                    
            mongodbTools.resolveAsync(aggregateObj, node, function(res){
                    msg.payload = res
                    node.send(msg) 
            })  
            
            
//**********************************************
// distinct

            aggregateObj = {
                    query : { query : [{
                                $match: {organization_id: new ObjectID(msg.RevotioData.FlowData.organization_id)}
                              },
                                 { 
                                        "$group" : { 
                                            "_id" : "$project_id"
                                        }
                                    }
                            ],},
                    connection:global.get("DB_data.connection"),
                    database:global.get("DB_data.appDB"),
                    collection:'participants',
                    operation:'aggregate',
                    }
                    
            mongodbTools.resolveAsync(aggregateObj, node, function(res){
                     msg.payload = [] ; 
                    
                    _.each(res, function(Item, Index ){
                         msg.payload.push(new ObjectID(Item._id))
                    })
                    node.send(msg) 
            }) 
            
//**********************************************
// update    

    updateObj = {
                    query : {
                            query :{name:"Guam"}, 
                            update : { "$set" : {newName : new Date()}},
                            options : {upsert: true}
                            },
                    connection:global.get("DB_data.connection"),
                    database:global.get("DB_data.appDB"),
                    collection:'countries',
                    operation:'update', // updateMany , updateOne
                    }

            mongodbTools.resolveAsync(updateObj, node, function(res){
                    msg.payload = res
                    node.send(msg) 
            })  

//**********************************************
// remove 
            removeObj = {
                    query : {
                            query :{name:"Guam"}, 
                            },
                    connection:global.get("DB_data.connection"),
                    database:global.get("DB_data.appDB"),
                    collection:'countries',
                    operation:'remove',
                    }

            mongodbTools.resolveAsync(removeObj, node, function(res){
                    msg.payload = res
                    node.send(msg) 
            })   
