const fs = require('fs-extra');
const jsonfn = require('json-fn');
const replace_in_file = require('replace-in-file');


// const basedata = JSON.parse(fs.readFileSync(__dirname + "/basedata.json"));
var API_URL = process.env.API_URL

if (process.env.pagePublisherVersion === "NEW"){
    var configValue = fs.readFileSync(__dirname +"/src/common/configs/api_config.js").toString('utf8')

    console.log(configValue)

    // var configValue = fs.readFileSync(__dirname +"/js/value/configValue.js")
    // console.log(configValue)

    const results = replace_in_file.sync({
      files: __dirname +"/src/common/configs/api_config.js",
      from: /baseUrlPlaceholder/g,
      to:  API_URL,
      countMatches: true
    });


  console.log(results)

} else {

    var configValue = fs.readFileSync(__dirname +"/js/value/configValue.js").toString('utf8')

    console.log(configValue)

    // var configValue = fs.readFileSync(__dirname +"/js/value/configValue.js")
    // console.log(configValue)

    const results = replace_in_file.sync({
      files: __dirname +"/js/value/configValue.js",
      from: /baseUrlPlaceholder/g,
      to:  API_URL,
      countMatches: true
    });


    console.log(results)
}




// var configValue2 = jsonfn.parse(fs.readFileSync(__dirname +"/js/value/configValue.js"))
// console.log(configValue2)
