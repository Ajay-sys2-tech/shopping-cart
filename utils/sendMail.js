import nodemailer from 'nodemailer';
import 'dotenv/config';

const myEmail =  process.env.EMAIL;

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: myEmail,
      pass: process.env.PASSWORD
    }
  });
  
  const mailOptions = {
    from: myEmail,
    // to: 'myfriend@yahoo.com',
    subject: 'Update from the Node.js checkout API',
    text: 'Your order has been placed successfully and will be sent shortly.'
  };

export const sendMail = (receiver) => {

    mailOptions.to = receiver;

    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
}

sendMail('kkujjawal2002@gmail.com');
  