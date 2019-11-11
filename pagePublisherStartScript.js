const fs = require('fs-extra');
const jsonfn = require('json-fn');
const replace_in_file = require('replace-in-file');
var httpResults, wssResults, httpConfigValue, wssConfigValue

// const basedata = JSON.parse(fs.readFileSync(__dirname + "/basedata.json"));
var API_URL = process.env.API_URL
var WSS_BASE_URL = process.env.WSS_BASE_URL

if (process.env.pagePublisherVersion === "NEW"){
    httpConfigValue = fs.readFileSync(__dirname +"/src/common/configs/api_config.js").toString('utf8')

        console.log(httpConfigValue)

    httpResults = replace_in_file.sync({
      files: __dirname +"/src/common/configs/api_config.js",
      from: /baseUrlPlaceholder/g,
      to:  API_URL,
      countMatches: true
    });

    console.log(httpResults)

    wssConfigValue = fs.readFileSync(__dirname +"/src/common/configs/api_config.js").toString('utf8')

        console.log(wssConfigValue)

    wssResults = replace_in_file.sync({
      files: __dirname +"/src/common/configs/api_config.js",
      from: /wssBaseUrlPlaceholder/g,
      to:  WSS_BASE_URL,
      countMatches: true
    });

  console.log(wssResults)

} else {

    httpConfigValue = fs.readFileSync(__dirname +"/js/value/configValue.js").toString('utf8')

    console.log(httpConfigValue)

    // var configValue = fs.readFileSync(__dirname +"/js/value/configValue.js")
    // console.log(configValue)

    httpResults = replace_in_file.sync({
      files: __dirname +"/js/value/configValue.js",
      from: /baseUrlPlaceholder/g,
      to:  API_URL,
      countMatches: true
    });


    console.log(httpResults)
}




// var configValue2 = jsonfn.parse(fs.readFileSync(__dirname +"/js/value/configValue.js"))
// console.log(configValue2)
