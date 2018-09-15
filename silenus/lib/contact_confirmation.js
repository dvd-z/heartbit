var zoho_password = require('./password.js');
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

module.exports = function contact_confirmation(userEmail, cb){
  var sender = '"Inventure Team" <hello@meetinventure.com>';
  var recipient = userEmail;
  var subject = "Thank You For Contacting Inventure";
  var message =
  "<html><body>We have received your email and will be getting back to you shortly. In the meantime, follow us on Facebook and Instagram.</body></html>";

  let transporter = nodemailer.createTransport(smtpTransport({

    service:'Zoho',
       host: 'smtp.zoho.com',
       port:465,
       secure: true,
       auth: {
         user: 'hello@meetinventure.com',
         pass: zoho_password()
       },
  }));
  let HelperOptions = {
    from: sender,
    to: recipient,
    subject: subject,
    html: message

  };
  transporter.sendMail(HelperOptions, (error, info) => {
    if (error) {
      console.log("Unable to send mail!", userEmail, error);
      return console.log(error);
    } else {
      console.log("The message was sent!", userEmail);
      cb();
    }
  });
}
