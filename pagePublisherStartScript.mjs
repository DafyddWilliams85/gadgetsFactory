const fs = require('fs-extra');
const jsonfn = require('json-fn');
const replace_in_file = require('replace-in-file');
var httpResults, wssResults, httpConfigValue, wssConfigValue

// const basedata = JSON.parse(fs.readFileSync(__dirname + "/basedata.json"));
var API_URL = process.env.API_URL
var PUBLIC_URL = process.env.PUBLIC_URL
var WSS_BASE_URL = process.env.WSS_BASE_URL
var APP_NAME = process.env.APP_NAME
var PAGE_PUBLISHER_VERSION = process.env.PAGE_PUBLISHER_VERSION
var APP_ID = process.env.APP_ID
var PAGE_BUILDER = process.env.PAGE_BUILDER
var APP_LOGO = process.env.APP_LOGO
var API_KEY = process.env.API_KEY


if (PAGE_PUBLISHER_VERSION === "NEW"){
// API_URL

  progressApiKey = fs.readFileSync(__dirname +"/src/common/configs/api_config.js").toString('utf8')
  console.log(progressApiKey)

  progressResults = replace_in_file.sync({
    files: __dirname +"/src/common/configs/api_config.js",
    from: /API_KEY/g,
    to:  API_KEY,
    countMatches: true
  });

  console.log(progressResults)


  httpConfigValue = fs.readFileSync(__dirname +"/src/common/configs/api_config.js").toString('utf8')

  console.log(httpConfigValue)

  httpResults = replace_in_file.sync({
    files: __dirname +"/src/common/configs/api_config.js",
    from: /API_URL/g,
    to:  API_URL,
    countMatches: true
  });

  console.log(httpResults)

// WSS_BASE_URL
    wssConfigValue = fs.readFileSync(__dirname +"/src/common/configs/api_config.js").toString('utf8')

    console.log(wssConfigValue)

    wssResults = replace_in_file.sync({
      files: __dirname +"/src/common/configs/api_config.js",
      from: /WSS_BASE_URL/g,
      to:  WSS_BASE_URL,
      countMatches: true
    });

  console.log(wssResults)

// APP_NAME
  nameConfigValue = fs.readFileSync(__dirname +"/src/common/configs/api_config.js").toString('utf8')
  console.log(nameConfigValue)
  nameResults = replace_in_file.sync({
    files: __dirname +"/src/common/configs/api_config.js",
    from: /APP_NAME/g,
    to:  APP_NAME,
    countMatches: true
  });

  console.log(nameResults)

// APP_LOGO
  appLogoConfigValue = fs.readFileSync(__dirname +"/src/common/configs/api_config.js").toString('utf8')
  console.log(appLogoConfigValue)
  appLogoResults = replace_in_file.sync({
    files: __dirname +"/src/common/configs/api_config.js",
    from: /APP_LOGO/g,
    to:  APP_LOGO,
    countMatches: true
  });

  console.log(appLogoResults)

// APP_NAME
  nameIndexValue = fs.readFileSync(__dirname +"/index.html").toString('utf8')

  console.log(nameIndexValue)

  nameIndexResults = replace_in_file.sync({
    files: __dirname +"/index.html",
    from: /pagepublisherv2/g,
    to:  APP_NAME,
    countMatches: true
  });

  console.log(nameIndexResults)

  // APP_PUBLIC_URL
    appPublicURLValue = fs.readFileSync(__dirname +"/config/index.js").toString('utf8')

    console.log(appPublicURLValue)

    appPublicURLResults = replace_in_file.sync({
      files: __dirname +"/config/index.js",
      from: /APP_PUBLIC_URL/g,
      to:  PUBLIC_URL,
      countMatches: true
    });

    console.log(appPublicURLResults)

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
