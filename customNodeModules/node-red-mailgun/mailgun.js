module.exports = function (RED) {

    var mailcomposer = require('mailcomposer');

    function MailgunNode(n) {
        RED.nodes.createNode(this, n);
        var node = this;

        node.on('input', function (msg) {

            if (!msg.payload ||
             typeof msg.payload !== "object" ||
             !msg.payload.domain ||
             !msg.payload.apiKey ||
             !msg.payload.emailHeaders ||
             !msg.payload.emailTemplate ||
             !msg.payload.emailHeaders.to) {

                this.send({error:'the msg is not correct!',msg:msg});
                return;
            }
            else{
              // MAILGUN SETUP
              var mailgun = require('mailgun-js')({
                  apiKey:  msg.payload.apiKey,
                  domain: msg.payload.domain
              });
            }

            var mail = mailcomposer({
                from: msg.payload.emailHeaders.from,
                to: msg.payload.emailHeaders.to,
                subject: msg.payload.emailHeaders.subject,
                body: msg.payload.emailHeaders.body,
                html: msg.payload.emailTemplate
            });

            mail.build(function (mailBuildError, message) {

                var dataToSend = {
                    to: msg.payload.emailHeaders.to,
                    message: message.toString('ascii')
                };

                mailgun.messages().sendMime(dataToSend, function (sendError, body) {
                    if (sendError) {
                        node.send({send:sendError});
                        return;
                    }
                    node.send({send:'true',msg:body});
                });
            });
        }); //end
    }
    RED.nodes.registerType("mailgun", MailgunNode);
};