const nodemailer = require("nodemailer");
const config = require("../config/index");

const sendEmail = (to, mailOptions) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: config.email,
      pass: config.password,
    },
  });
  transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
