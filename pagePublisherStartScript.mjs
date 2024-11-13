import fs from 'fs-extra'
import jsonfn from 'json-fn'
import path from 'path';
import { fileURLToPath } from 'url';
// const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file

const dirname = "/var/www/pagePublisher" //path.dirname(__filename);
// import replace_in_file from 'replace-in-file'
// const fs = require('fs-extra');
// const jsonfn = require('json-fn');
// const replace_in_file = require('replace-in-file');
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
var FILE_ENDPOINT_URL = process.env.FILE_ENDPOINT_URL




if (PAGE_PUBLISHER_VERSION === "NEW"){
// API_URL

  // progressApiKey = fs.readFileSync(__dirname +"/src/common/configs/api_config.js").toString('utf8')
  // console.log("progressApiKey = " + progressApiKey)

  // progressResults = replace_in_file.sync({
  //   files: __dirname +"/src/common/configs/api_config.js",
  //   from: /API_KEY/g,
  //   to:  API_KEY,
  //   countMatches: true
  // });

  // console.log("progressResults = " + progressResults)


console.log("STart page publisher start script")
// Read file into a string
fs.readFile(dirname +"/src/common/configs/api_config.js", 'utf-8', (err, contents) => {
  if (err) {
    return console.error(err)
  }
console.log("API_KEY" + API_KEY)
  // Replace string occurrences
  var updated = contents.replace(/API_KEY/g, API_KEY)
  console.log("API_KEY" + API_KEY)
console.log(updated)
    // Replace string occurrences
  var updated = updated.replace(/WSS_BASE_URL/g, WSS_BASE_URL)

    // Replace string occurrences
  var updated = updated.replace(/APP_NAME/g, APP_NAME)

    // Replace string occurrences
  var updated = updated.replace(/APP_LOGO/g, APP_LOGO)

    // Replace string occurrences
  var updated = updated.replace(/API_URL/g, API_URL)

    // Replace string occurrences
  var updated = updated.replace(/FILE_ENDPOINT_URL/g, FILE_ENDPOINT_URL)


  // Write back to file
  fs.writeFile(dirname +"/src/common/configs/api_config.js", updated, 'utf-8', err2 => {
    if (err2) {
      console.log(err2)
    }
  })
})
console.log("Start page publisher start script")





fs.readFile(dirname +"/index.html", 'utf-8', (err, contents) => {
  if (err) {
    return console.error(err)
  }

  // Replace string occurrences
  var updated = contents.replace(/pagepublisherv2/g, APP_NAME)


  // Write back to file
  fs.writeFile(dirname +"/index.html", updated, 'utf-8', err2 => {
    if (err2) {
      console.log(err2)
    }
  })
})


fs.readFile(dirname + "/config/index.js", 'utf-8', (err, contents) => {
  if (err) {
    return console.error(err)
  }

  // Replace string occurrences
  var updated = contents.replace(/APP_PUBLIC_URL/g, PUBLIC_URL)


  // Write back to file
  fs.writeFile(dirname +"/config/index.js", updated, 'utf-8', err2 => {
    if (err2) {
      console.log(err2)
    }
  })
})





//   httpConfigValue = fs.readFileSync(__dirname +"/src/common/configs/api_config.js").toString('utf8')

//   console.log("httpConfigValue = " + httpConfigValue)
//   httpResults = replace_in_file.sync({
//     files: __dirname +"/src/common/configs/api_config.js",
//     from: /API_URL/g,
//     to:  API_URL,
//     countMatches: true
//   });

//   console.log("httpResults = " + httpResults)
// // WSS_BASE_URL
//     wssConfigValue = fs.readFileSync(__dirname +"/src/common/configs/api_config.js").toString('utf8')

//   console.log("wssConfigValue = " + wssConfigValue)

//     wssResults = replace_in_file.sync({
//       files: __dirname +"/src/common/configs/api_config.js",
//       from: /WSS_BASE_URL/g,
//       to:  WSS_BASE_URL,
//       countMatches: true
//     });

//   console.log("wssResults = " + wssResults)
// // APP_NAME
//   nameConfigValue = fs.readFileSync(__dirname +"/src/common/configs/api_config.js").toString('utf8')

//     console.log("nameConfigValue = " + nameConfigValue)
//   nameResults = replace_in_file.sync({
//     files: __dirname +"/src/common/configs/api_config.js",
//     from: /APP_NAME/g,
//     to:  APP_NAME,
//     countMatches: true
//   });

//   console.log("nameResults = " + nameResults)
// // APP_LOGO
//   appLogoConfigValue = fs.readFileSync(__dirname +"/src/common/configs/api_config.js").toString('utf8')

//     console.log("appLogoConfigValue = " + appLogoConfigValue)
//   appLogoResults = replace_in_file.sync({
//     files: __dirname +"/src/common/configs/api_config.js",
//     from: /APP_LOGO/g,
//     to:  APP_LOGO,
//     countMatches: true
//   });

//   console.log("appLogoResults = " + appLogoResults)
// // APP_NAME
  // nameIndexValue = fs.readFileSync(__dirname +"/index.html").toString('utf8')

  // console.log("nameIndexValue = " + nameIndexValue)
  // nameIndexResults = replace_in_file.sync({
  //   files: __dirname +"/index.html",
  //   from: /pagepublisherv2/g,
  //   to:  APP_NAME,
  //   countMatches: true
  // });

  // console.log("nameIndexResults = " + nameIndexResults)
  // // APP_PUBLIC_URL
  //   appPublicURLValue = fs.readFileSync(__dirname +"/config/index.js").toString('utf8')

  // console.log("appPublicURLValue = " + appPublicURLValue)
  //   appPublicURLResults = replace_in_file.sync({
  //     files: __dirname +"/config/index.js",
  //     from: /APP_PUBLIC_URL/g,
  //     to:  PUBLIC_URL,
  //     countMatches: true
  //   });

  // console.log("appPublicURLResults = " + appPublicURLResults)
} else {

  fs.readFile(dirname +"/js/value/configValue.js", 'utf-8', (err, contents) => {
  if (err) {
    return console.error(err)
  }

  // Replace string occurrences
  var updated = contents.replace(/baseUrlPlaceholder/g, API_URL)


  // Write back to file
  fs.writeFile(dirname +"/js/value/configValue.js", updated, 'utf-8', err2 => {
    if (err2) {
      console.log(err2)
    }
  })
})

  

  //   httpConfigValue = fs.readFileSync(__dirname +"/js/value/configValue.js").toString('utf8')

  // console.log("httpConfigValue = " + httpConfigValue)
  //   // var configValue = fs.readFileSync(__dirname +"/js/value/configValue.js")
  //   // console.log(configValue)

  //   httpResults = replace_in_file.sync({
  //     files: __dirname +"/js/value/configValue.js",
  //     from: /baseUrlPlaceholder/g,
  //     to:  API_URL,
  //     countMatches: true
  //   });

  // console.log("httpResults = " + httpResults)
}




// var configValue2 = jsonfn.parse(fs.readFileSync(__dirname +"/js/value/configValue.js"))
// console.log(configValue2)
