/*jshint strict:false */
module.exports = function(RED) {
  // Require the fs-jetpack library
  const jetpack = require('fs-jetpack');
  var fileSystemPath, openOnFolder;

  function fileManagerNode(n) {
    RED.nodes.createNode(this, n);
    var node = this;
    node.on('input', function(msg, req) {
      if (typeof msg.payload !== "object") {
        err = {
          Error: 'The payload must be an object!'
        };
        node.error(err);
        return;
      }
      if (msg.payload.fileSystemPath && msg.payload.fileSystemPath.length !== 0 && typeof msg.payload.fileSystemPath === 'string') {
        fileSystemPath = msg.payload.fileSystemPath;
      } else {
        err = {
          Error: 'Wrong content for fileSystemPath!'
        };
        node.error(err);
        return;
      }
      if (msg.payload.fsop && msg.payload.fsop === 'removeObject') {
        if (msg.payload.openOnFolder && msg.payload.openOnFolder.length !== 0 && typeof msg.payload.openOnFolder === 'string') {
          openOnFolder = msg.payload.openOnFolder;
        } else {
          err = {
            Error: 'Wrong content for openOnFolder!'
          };
          node.error(err);
          return;
        }
      }
      if (msg.payload.hasOwnProperty("fsop") && msg.payload.fsop.length !== 0 && typeof msg.payload.fsop === 'string') {
        console.log('before switch', msg.payload);
        switch (msg.payload.fsop) {
          case "listAll":
            {
              asyncSpacelist(function(list) {
                msg.payload.list = list;
                node.send(msg);
              });
              break;
            }
          case "listDir":
            {
              if (msg.payload.listPath) {
                var listPath = '';
                if (msg.payload.listPath.charAt(0) === '/') {
                  listPath = fileSystemPath + msg.payload.listPath;
                } else {
                  listPath = fileSystemPath + '/' + msg.payload.listPath;
                }
                existsAsync(listPath, function(exists) {
                  if (exists) {
                    asyncDirlist(listPath, function(list) {
                      msg.payload.list = list;
                      node.send(msg);
                    });
                  } else {
                    err = {
                      Error: 'Error the path: : ' + listPath + '    is not valid!'
                    };
                    node.error(err);
                    return;
                  }
                });
              }
              break;
            }
          case "removeObject":
            {
              if (msg.payload.removePath) {
                if (msg.payload.removePath.charAt(0) === '/') {
                  var removePath = fileSystemPath + msg.payload.removePath;
                } else {
                  var removePath = fileSystemPath + '/' + msg.payload.removePath;
                }
                if (openOnFolder.charAt(0) === '/') {
                  openOnFolder = fileSystemPath + openOnFolder;
                } else {
                  openOnFolder = fileSystemPath + '/' + openOnFolder;
                }
                existsAsync(removePath, function(exists) {
                  if (exists) {
                    asyncRemove(removePath, function(resp) {
                      existsAsync(openOnFolder, function(exists) {
                        if (exists) {
                          asyncDirlist(openOnFolder, function(list) {
                            msg.payload.list = list;
                            node.send(msg);
                          });
                        } else {
                          asyncDirlist(fileSystemPath, function(list) {
                            msg.payload.list = list;
                            node.send(msg);
                          });
                          node.warn({
                            Warning: 'Warning! the openOnFolder path: ' + openOnFolder + '    is not valid!'
                          });
                          return;
                        }
                      });
                    });
                  } else {
                    err = {
                      Error: 'Error the path: ' + removePath + '    is not valid!'
                    };
                    node.error(err);
                    return;
                  }
                });
              }
              break;
            }
          case "renameObject":
            {
              if (msg.payload.renameFrom && msg.payload.renameTo) {
                if (msg.payload.renameFrom.charAt(0) === '/') {
                  var renameFrom = fileSystemPath + msg.payload.renameFrom;
                } else {
                  var renameFrom = fileSystemPath + '/' + msg.payload.renameFrom;
                }
                if (msg.payload.renameTo.charAt(0) === '/') {
                  var renameTo = msg.payload.renameTo.substring(1);
                } else {
                  var renameTo = msg.payload.renameTo;
                }
                existsAsync(renameFrom, function(exists) {
                  if (exists) {
                    var lastSlash = renameFrom.lastIndexOf("/");
                    var inspect = renameFrom.substring(0, lastSlash + 1);
                    inspect = inspect + renameTo;
                    asyncRename(renameFrom, renameTo, function(resp) {
                      asyncInspect(inspect, function(item) {
                        item.absolutePath = item.absolutePath.replace(fileSystemPath, "");
                        msg.payload = {
                          Item: item
                        };
                        node.send(msg);
                      });
                    });
                  } else {
                    err = {
                      Error: 'Error the path: ' + renameFrom + '    is not valid!'
                    };
                    node.error(err);
                    return;
                  }
                });
              }
              break;
            }
          case "moveObject":
            {
              if (msg.payload.moveFrom && msg.payload.moveTo) {
                if (msg.payload.moveFrom.charAt(0) === '/') {
                  var moveFrom = fileSystemPath + msg.payload.moveFrom;
                } else {
                  var moveFrom = fileSystemPath + '/' + msg.payload.moveFrom;
                }
                if (msg.payload.moveTo.charAt(0) === '/') {
                  var moveTo = fileSystemPath + msg.payload.moveTo;
                } else {
                  var moveTo = fileSystemPath + '/' + msg.payload.moveTo;
                }
                existsAsync(moveFrom, function(exists) {
                  if (exists) {
                    asyncMove(moveFrom, moveTo, function(resp) {
                      asyncInspect(moveTo, function(item) {
                        // item.absolutePath = item.absolutePath.replace(fileSystemPath, "");
                        item.absolutePath = item.absolutePath + moveTo;
                        msg.payload = {
                          Item: item
                        };
                        node.send(msg);
                      });
                    });
                  } else {
                    err = {
                      Error: 'Error the path: ' + moveFrom + '    is not valid!'
                    };
                    node.error(err);
                    return;
                  }
                });
              }
              break;
            }
          case "copyObject":
            {
              if (msg.payload.copyFrom && msg.payload.copyTo) {
                if (msg.payload.copyFrom.charAt(0) === '/') {
                  var copyFrom = fileSystemPath + msg.payload.copyFrom;
                } else {
                  var copyFrom = fileSystemPath + '/' + msg.payload.copyFrom;
                }
                if (msg.payload.copyTo.charAt(0) === '/') {
                  var copyTo = fileSystemPath + msg.payload.copyTo;
                } else {
                  var copyTo = fileSystemPath + '/' + msg.payload.copyTo;
                }
                existsAsync(copyFrom, function(exists) {
                  if (exists) {
                    existsAsync(copyTo, function(exists) {
                      console.log('die dafydd , in a car fire please i prey to the goods', exists);
                      if (!exists) {
                        asyncCopy(copyFrom, copyTo, function(resp) {
                          asyncInspect(copyTo, function(item) {
                            item.absolutePath = item.absolutePath.replace(fileSystemPath, "");
                            msg.payload = {
                              Item: item
                            };
                            node.send(msg);
                          });
                        });
                      } else {
                        err = {
                          Error: 'Error the destination path: ' + copyTo + '    already exists!'
                        };
                        node.error(err);
                        return;
                      }
                    });
                  } else {
                    err = {
                      Error: 'Error the path: ' + copyFrom + '    is not valid!'
                    };
                    node.error(err);
                    return;
                  }
                });
              }
              break;
            }
          case "createDir":
            {
              if (msg.payload.dirPath) {
                if (msg.payload.dirPath.charAt(0) === '/') {
                  var newDir = fileSystemPath + msg.payload.dirPath;
                } else {
                  var newDir = fileSystemPath + '/' + msg.payload.dirPath;
                }
                existsAsync(newDir, function(exists) {
                  if (exists) {
                    err = {
                      Error: 'Error the ' + newDir + '    already exists!'
                    };
                    node.error(err);
                    return;
                  } else {
                    dirAsync(newDir, function(resp) {
                      asyncInspect(newDir, function(item) {
                        // item.absolutePath = item.absolutePath.replace(fileSystemPath, "");
                        // item.absolutePath = fileSystemPath + item.absolutePath;
                        msg.payload = {
                          Item: item
                        };
                        node.send(msg);
                      });
                    });
                  }
                });
              }
              break;
            }
          case "readFile":
            {
              if (msg.payload.filePath) {
                if (msg.payload.filePath.charAt(0) === '/') {
                  var filePath = fileSystemPath + msg.payload.filePath;
                } else {
                  var filePath = fileSystemPath + '/' + msg.payload.filePath;
                }
                existsAsync(filePath, function(exists) {
                  if (exists) {
                    readFileAsync(filePath, function(resp) {
                      if (resp) {
                        msg.fileData = resp;
                        node.send(msg);
                      }
                    });
                  } else {
                    err = {
                      Error: 'Error the path: ' + filePath + '    is not valid!'
                    };
                    node.error(err);
                    return;
                  }
                });
              }
              break;
            }
          case "writeFile":
            {
              if (msg.payload.filePath && msg.payload.fileData) {
                if (msg.payload.filePath.charAt(0) === '/') {
                  var filePath = fileSystemPath + msg.payload.filePath;
                } else {
                  var filePath = fileSystemPath + '/' + msg.payload.filePath;
                }
                var fileData = msg.payload.fileData;
                writeFileAsync(filePath, fileData, function(resp) {
                  if (resp) {
                    msg.fileData = resp;
                    node.send(msg);
                  }
                });
              }
              break;
            }
          default:
            {
              break;
            }
        }
      } else {
        err = {
          Error: 'Wrong content for the fsop!'
        };
        node.error(err);
        return;
      }
    }); //end switch
    // aSync methods with a callback to the main operation
    var asyncSpacelist = function(_callback) {
      jetpack.inspectAsync(fileSystemPath, {
        times: true,
        mode: true,
        absolutePath: true
      }).then(function success(res) {
        res.absolutePath = res.absolutePath.replace(fileSystemPath, "");
        var folder = res;
        var root = fileSystemPath;
        jetpack.listAsync(fileSystemPath).then(function success(list) {
          folder.children = [];
          var listSize = list.length;
          if (listSize > 0) {
            list.forEach(function(item, i) {
              var itemPath = root + '/' + item;
              asyncInspect(itemPath, function(child) {
                child.absolutePath = child.absolutePath.replace(fileSystemPath, "");
                folder.children.push(child);
                if (i === listSize - 1) {
                  _callback(folder);
                }
              });
            });
          } else {
            _callback(folder);
          }
        }, function error(err) {
          _callback(err);
        });
      }, function error(err) {
        _callback(err);
      });
    }
    var asyncDirlist = function(userDirPath, _callback) {
      console.log('userDirPath', userDirPath);
      jetpack.inspectAsync(userDirPath, {
        times: true,
        mode: true,
        absolutePath: true
      }).then(function success(res) {
        res.absolutePath = res.absolutePath.replace(fileSystemPath, "");
        var folder = res;
        jetpack.listAsync(userDirPath).then(function success(list) {
          folder.children = [];
          var listSize = list.length;
          if (listSize !== 0) {
            list.forEach(function(item, i) {
              var itemPath = userDirPath + '/' + item;
              asyncInspect(itemPath, function(child) {
                child.absolutePath = child.absolutePath.replace(fileSystemPath, "");
                folder.children.push(child);
                if (i === listSize - 1) {
                  _callback(folder);
                }
              });
            });
          } else {
            _callback(folder);
          }
        }, function error(err) {
          _callback(err);
        });
      }, function error(err) {
        _callback(err);
      });
    }
    var asyncRemove = function(removePath, _callback) {
      jetpack.removeAsync(removePath).then(function success(res) {
        _callback('removed');
      }, function error(err) {
        _callback(err);
      });
    }
    var asyncInspect = function(objectPath, _callback) {
      jetpack.inspectAsync(objectPath, {
        times: true,
        mode: true,
        absolutePath: true
      }).then(function success(res) {
        _callback(res);
      }, function error(err) {
        _callback(err);
      });
    }
    var asyncRename = function(renameFrom, renameTo, _callback) {
      jetpack.renameAsync(renameFrom, renameTo).then(function success(res) {
        _callback(res);
      }, function error(err) {
        _callback(err);
      });
    }
    var asyncMove = function(moveFrom, moveTo, _callback) {
      jetpack.moveAsync(moveFrom, moveTo).then(function success(res) {
        _callback(res);
      }, function error(err) {
        _callback(err);
      });
    }
    var asyncCopy = function(copyFrom, copyTo, _callback) {
      jetpack.copyAsync(copyFrom, copyTo).then(function success(res) {
        _callback(res);
      }, function error(err) {
        _callback(err);
      });
    }
    var dirAsync = function(dirPath, _callback) {
      jetpack.dirAsync(dirPath).then(function success(res) {
        _callback(res);
      }, function error(err) {
        _callback(err);
      });
    }
    var readFileAsync = function(filePath, _callback) {
      jetpack.readAsync(filePath).then(function success(res) {
        _callback(res);
      }, function error(err) {
        _callback(err);
      });
    }
    var writeFileAsync = function(filePath, data, _callback) {
      jetpack.writeAsync(filePath, data).then(function success(res) {
        _callback(res);
      }, function error(err) {
        _callback(err);
      });
    }
    var existsAsync = function(path, _callback) {
      jetpack.existsAsync(path).then(function success(res) {
        _callback(res);
      }, function error(err) {
        _callback(err);
      });
    }
  }
  RED.nodes.registerType("fsmanager", fileManagerNode);
};