

module.exports = (app) => {
  'use strict';

  const nodemailer = require('nodemailer');
  const rbpw = app.models.mailer;
  // create reusable transporter object using the default SMTP transport

  rbpw.findOne({}, (err, word) => {
    if(err) console.log(err);
    else console.log(word);
    let transporter = nodemailer.createTransport({
      service: 'hotmail',
      auth: {
        user: 'samirbraga@hotmail.com.br',
        pass: word
      }
    });
  })


	return {
    index: (req, res) => {

      let body = req.body;

      let from = `${body.name} <${ body.email }>`;
      let subject = body.subject;
      let text = body.text;

      let setCapitalize = function(string){
          return string.split(" ").map(function(word){
            return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
          }).join(" ");
      }

      // setup email data with unicode symbols
      let mailOptions = {
        from: from, // sender address
        to: 'samirbraga@hotmail.com.br', // list of receivers
        subject: subject, // Subject line
        html: `
              <b>Email de: </b>${setCapitalize(body.name)} - ${ body.email }
              <br>
              <p>${text}</p>
              ` // plain text body
      };

      // send mail with defined transport object
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return console.log(error);
        }

        console.log('Message %s sent: %s', info.messageId, info.response);

        res.end()
      });
    }
  }
}
