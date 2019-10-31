# node-red-mailgun

This module contains a Node-RED node to the mailgun api


## Pre-requisites

requires Node-RED version 0.14 or more recent.

## Install

To install the stable version upload the node-red-mailgun folder go inside the folder and  run the following command in your Node-RED user directory (typically `~/.node-red`):

    npm i 

Open your Node-RED instance and you should have the "mailgun" node available in the palette under the social tab in the
right side panel.

## Features
Sends and receive emails via mailgun API


#### The inbound msg should be formated like the example below, adjusting mydomain.com to yours
    
      
#### The email object contains the api key, the headers, the email data and the email html template


#### This is and example of a mail object for the msg with the mandatory email headers:

{
       "apiKey":"5t30caa2e664054f2add1cdf752cd5a-bd350f28-d9a37932",
       "domain":"mail.yourdomain.com",
       "emailHeaders":{
          "from":"My mail service <postmaster@mail.yourdomain.com>",
          "to":"jhondoe@yahoo.com",
          "subject":"Test with mailgun",
          "body":"Test with mailgun"
       },
       "emailData":{
          "optional key-one":"some value",
          "optional key-two":"some other value !!!"
       },
       "emailTemplate":"<html>Here you should put your HTML template</html>"
}

Thank you.

