const fs = require('fs-extra');
const jsonfn = require('json-fn');
const replace_in_file = require('replace-in-file');
var httpResults, wssResults, httpConfigValue, wssConfigValue

// const basedata = JSON.parse(fs.readFileSync(__dirname + "/basedata.json"));
var API_URL = process.env.API_URL
var WSS_BASE_URL = process.env.WSS_BASE_URL
var APP_NAME = process.env.APP_NAME
var PAGE_PUBLISHER_VERSION = process.env.PAGE_PUBLISHER_VERSION
var APP_ID = process.env.APP_ID
var PAGE_BUILDER = process.env.PAGE_BUILDER

if (PAGE_PUBLISHER_VERSION === "NEW"){
    httpConfigValue = fs.readFileSync(__dirname +"/src/common/configs/api_config.js").toString('utf8')

        console.log(httpConfigValue)

    httpResults = replace_in_file.sync({
      files: __dirname +"/src/common/configs/api_config.js",
      from: /API_URL/g,
      to:  API_URL,
      countMatches: true
    });

    console.log(httpResults)

    wssConfigValue = fs.readFileSync(__dirname +"/src/common/configs/api_config.js").toString('utf8')

        console.log(wssConfigValue)

    wssResults = replace_in_file.sync({
      files: __dirname +"/src/common/configs/api_config.js",
      from: /WSS_BASE_URL/g,
      to:  WSS_BASE_URL,
      countMatches: true
    });

  console.log(wssResults)

  nameConfigValue = fs.readFileSync(__dirname +"/src/common/configs/api_config.js").toString('utf8')

      console.log(nameConfigValue)

  nameResults = replace_in_file.sync({
    files: __dirname +"/src/common/configs/api_config.js",
    from: /APP_NAME/g,
    to:  APP_NAME,
    countMatches: true
  });

console.log(nameResults)

// APP_IDConfigValue = fs.readFileSync(__dirname +"/src/common/configs/api_config.js").toString('utf8')
//
//     console.log(APP_IDConfigValue)
//
// APP_IDResults = replace_in_file.sync({
//   files: __dirname +"/src/common/configs/api_config.js",
//   from: /APP_ID/g,
//   to:  APP_ID,
//   countMatches: true
// });
//
// console.log(APP_IDResults)
//
// pageBuilderConfigValue = fs.readFileSync(__dirname +"/src/common/configs/api_config.js").toString('utf8')
//
//     console.log(pageBuilderConfigValue)
//
// pageBuilderResults = replace_in_file.sync({
//   files: __dirname +"/src/common/configs/api_config.js",
//   from: /PAGE_BUILDER/g,
//   to:  PAGE_BUILDER,
//   countMatches: true
// });
//
// console.log(pageBuilderResults)

  // console.log("new done")

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
