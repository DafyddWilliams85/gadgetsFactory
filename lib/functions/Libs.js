// name: Libs
// outputs: 1
var request = global.get('request');
var Moment = global.get('moment');
var MomentRange = global.get('momentrange');
var moment = MomentRange.extendMoment(Moment)
var crypto = global.get('crypto');
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
var nodemailer = global.get('nodemailer');
var mg = global.get('nodemailer_mailgun_transport');