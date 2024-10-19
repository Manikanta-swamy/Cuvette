const nodemailer = require("nodemailer");

const sendVerificationEmail = async (email, verificationLink) => {
  let transporter = nodemailer.createTransport({
    service: "gmail", // Replace with your email service like SendGrid or Gmail
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    secure: false,
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Email Verification",
    html: `<p>Click on the following link to verify your email: <a href="${verificationLink}">Verify Email</a></p>`,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendVerificationEmail;
