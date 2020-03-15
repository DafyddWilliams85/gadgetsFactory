/*jshint strict:false */
const MongoClient = require('mongodb').MongoClient;

var resolveAsync = function(dbObj, node, _callback) {


    var err = {};
    var dbo = "";
    var connUrl = "";
    var database = "";
    var collection = "";
    var collStr = "";
    var operation = "";
    var query = "";
    var projection = "";
    var update = "";
    var options = "";
    var isFind = false;
    var isAggregate = false;
    var isUpdate = false;
    var isFindOneAndUpdate = false

    // dbObj.connection
    if (!dbObj.connection || dbObj.connection.length == 0 || typeof dbObj.connection !== 'string' ) {
        err = {
            Error: 'Wrong connection string!'
        };
        node.error(err);
        return;
    } else {
        connUrl = dbObj.connection;
    }
    // dbObj.database
    if (!dbObj.database || dbObj.database.length == 0 || typeof dbObj.database !== 'string' ) {
        err = {
            Error: 'Wrong database string!'
        };
        node.error(err);
        return;
    } else {
        database = dbObj.database;
    }
    // dbObj.collection
    if (!dbObj.collection || dbObj.collection.length == 0 || typeof dbObj.collection !== 'string') {
        err = {
            Error: 'Wrong collection string!'
        };
        node.error(err);
        return;
    } else {
        collStr = dbObj.collection;
    }
    // dbObj.operation
    if (!dbObj.operation || dbObj.operation.length == 0 || typeof dbObj.operation !== 'string' ) {
        err = {
            Error: 'Wrong operation string!'
        };
        node.error(err);
        return;
    } else {
        if (dbObj.operation === 'find'){
            isFind = true;
        }
        if (dbObj.operation.indexOf('update') !== -1){
            isUpdate = true;
            // console.log('isUpdate yeahhh');
            if (dbObj.query.update) {
                update = dbObj.query.update;

            } else {

                err = {
                    Error: dbObj.operation+' has a wrong update object!'
                }
                node.error(err);
                console.log({err:err });
                return;
            }
            if (dbObj.query.options) {

                options = dbObj.query.options;

            } else {

                err = {
                    Error: dbObj.operation+' has a wrong options object!'
                }
                console.log({err:err });
                node.error(err);
                return;
            }
        }
        if (dbObj.operation.indexOf('findOneAndUpdate') !== -1){
            isFindOneAndUpdate = true;
            // console.log('isUpdate yeahhh');
            if (dbObj.query.update) {
                update = dbObj.query.update;

            } else {

                err = {
                    Error: dbObj.operation+' has a wrong findOneAndUpdate object!'
                }
                node.error(err);
                console.log({err:err });
                return;
            }
            if (dbObj.query.options) {

                options = dbObj.query.options;

            } else {

                err = {
                    Error: dbObj.operation+' has a wrong options object!'
                }
                console.log({err:err });
                node.error(err);
                return;
            }
        }

        if (dbObj.operation.indexOf('aggregate') !== -1) {
            isAggregate = true;
        }

        operation = dbObj.operation;
    }
    // query object
    if (!dbObj.query || typeof dbObj.query !== 'object' ) {
        err = {
            Error: 'Wrong query object!'
        }
        node.error(err);
        return;
    }
    // dbObj.query
    if (!dbObj.query.query || typeof dbObj.query.query !== 'object' ) {
        err = {
            Error: 'Wrong query'
        }

        node.error(err);
        return;
    } else {
        query = dbObj.query.query;

    }
    // dbObj.query.projection
    if (dbObj.query.projection) {
        projection = dbObj.query.projection;

    } else {
        projection = '';
    }

    MongoClient.connect(connUrl, function(err, db) {

        if (err) {
            console.log({err:err, text:"server response - connection error" });
			       node.error(err);
        return;
		}
		else {
	        dbo = db.db(database);
	        collection = dbo.collection(collStr);
	        if (isFind) {

	            collection[operation](query, projection).toArray(function(err, result) {

	                if (err) {
						              node.error(err);
                          console.log({err:err, text: "find error"});
        				return;
					}else {

              if (result.result) {
                	_callback(result.result);

              } else {
                	_callback(result);

              }
					}
	                db.close();
	            });

	        } else if (isUpdate) {

                collection[operation](query, update, options, function(err, result) {

                    if (err) {
                       console.log({err:err, text: "update error"});
                        node.error(err);
                        return;
                    } else {

                      if (result.result) {
                          _callback(result.result);

                      } else {
                          _callback(result);

                      }
                    }

                    db.close();
                });

            }
            else if (isFindOneAndUpdate) {

                  collection[operation](query, update, options, function(err, result) {

                      if (err) {
                         console.log({err:err, text: "update error"});
                          node.error(err);
                          return;
                      } else {

                        if (result.result) {
                            _callback(result.result);

                        } else {
                            _callback(result);

                        }
                      }

                      db.close();
                  });

              }else if (isAggregate) {

	            collection.aggregate(query, function(err, result) {

	                if (err) {
                      console.log({err:err, text: "isAggregate err"});
						                node.error(err);
        				return;
					}else {
            if (result.result) {
                _callback(result.result);

            } else {
                _callback(result);

            }

					}
	                db.close();
	            });

	        } else {

	            collection[operation](query, function(err, result) {

	                if (err) {
						node.error(err);
        				return;
					}else {
            if (result.result) {
                _callback(result.result);

            } else {
                _callback(result);

            }
					}
	                db.close();
	            });
	        }
		}

    });

}; // End resolveAsync

module.exports.resolveAsync = resolveAsync;
