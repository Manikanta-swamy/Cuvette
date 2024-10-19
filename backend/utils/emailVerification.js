const nodemailer = require("nodemailer");

const sendOtpEmail = async (email, otp) => {
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
    subject: "Your OTP for Email Verification",
    html: `<p>Your OTP for email verification is: <strong>${otp}</strong></p><p>Please enter this OTP to verify your email.</p>`,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendOtpEmail;
