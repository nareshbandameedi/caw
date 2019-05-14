'use strict';
const nodemailer = require('node4mailer');
const config = require('config');
const nodeMailerEmailConfig = {
    host: config.get('email').host,
    port: config.get('email').port,
    secure: config.get('email').secureConnection,
    ignoreTLS: config.get('email').ignoreTLS,
    auth: {
        user: config.get('email').user,
        pass: config.get('email').pass
    }
};
const transporter = nodemailer.createTransport(nodeMailerEmailConfig);

module.exports.sendEmail = function(message) {
    let email_temaplate = `<body>
    <p>Hi, </p>
    <br></br>
    <p> Your account name is: ${message.organizationName} </p>
    <p> Your password is: ${message.password}</p>
    </body>`;
    let mailOptions = {
        from: config.get('email').from,
        to: message.toEmail, 
        subject: 'Your password', 
        html: email_temaplate 
    };
    return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return reject(error);
            }
            console.log('kkkkkkkk ', info);
            return resolve(info);
        });
    })
};
