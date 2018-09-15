var zoho_password = require('./password.js');
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

module.exports = function contact_register(userEmail, cb){
  var sender = '"Inventure Team" <hello@meetinventure.com>';
  var recipient = userEmail;
  var subject = "Thank You For Registering for Sparkfest 🔥";

  var message = "<html><body>Congratulations 🎉! We have received your registration for Sparkfest 2018 and are looking forward to seeing you there. We will be in touch with you shortly with regards to the schedule for the event. For more information, questions, or concerns feel free to contact hello@meetinventure.com. <br /><br /> Best,<br />Inventure 2018<br /><br />P.S. Make sure to follow us on Facebook and Instagram (@meetinventure) to participate in our contest for a chance to win a $25 gift card to Starbucks!</body></html>";

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
