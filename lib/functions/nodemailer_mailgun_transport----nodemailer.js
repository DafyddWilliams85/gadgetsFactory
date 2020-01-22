// name: nodemailer_mailgun_transport && nodemailer
// outputs: 1
// var request = global.get('request'); 
var Moment = global.get('moment');
var MomentRange = global.get('momentrange');
var moment = MomentRange.extendMoment(Moment)
var momentTimezone = global.get('moment_timezone');
var lodash = global.get('lodash');
var _ = global.get('underscore');
var BSON = global.get('bson');
var ObjectID = BSON.ObjectID;
var accounting = global.get('accounting');
var accountingoptions = {	symbol : "€",	decimal : ".", 	thousand: " ", 	precision : 0, 	format: "%s %v"}; // example = Output = accounting.formatMoney(Number, accountingoptions );
var jsonwebtoken = global.get('jsonwebtoken');
var mongodbTools = global.get('mongodbTools');
var excelToJson = global.get('excelToJson');
var Excel = global.get('exceljs');
var fs = global.get('fsextra');
var xml2js = global.get('xml2js');
var json2xls = global.get('json2xls');
var request = global.get('request');
var nodemailer = global.get('nodemailer');
var mg = global.get('nodemailer_mailgun_transport');

// This is your API key that you retrieve from www.mailgun.com/cp (free up to 10K monthly emails)
const auth = {
  auth: {
    api_key: global.get("mailgun.apiKey"),
    domain: global.get("mailgun.domain")
  },
//   proxy: 'http://user:pass@localhost:8080' // optional proxy, default is false
}
 
const nodemailerMailgun = nodemailer.createTransport(mg(auth));
 
data = fs.readFileSync(msg.data.attachment);
base64Attachment =  data.toString('base64');

nodemailerMailgun.sendMail({
  from: global.get("mailgun.from"),
  to: 'dafydd85@gmail.com', // An array if you have multiple recipients.
//   cc:'second@domain.com',
//   bcc:'secretagent@company.gov',
  subject: msg.data.title,
//   'h:Reply-To': 'reply2this@company.com',
  //You can use "html:" to send HTML email content. It's magic!
  html: msg.payload,
  //You can use "text:" to send plain-text content. It's oldschool!
//   text: 'Mailgun rocks, pow pow!',
  attachments: [
        {
            cid: 'logo.png',
            content: base64Attachment,
            encoding: 'base64'
        },]
}, (err, info) => {
  if (err) {
    console.log(`Error: ${err}`);
  }
  else {
    console.log(`Response: ${info}`);
  }
});

return msg;