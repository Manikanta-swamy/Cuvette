const twilio = require("twilio"); // Twilio module for SMS service
const Company = require("../models/company");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const sendVerificationEmail = require("../utils/emailVerification");
const otpGenerator = require("otp-generator");

// Initialize Twilio with account SID and auth token
const client = new twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

// In-memory storage for OTPs (use a proper database in production)
let otpStore = {};

// Registration
exports.registerCompany = async (req, res) => {
  try {
    const { name, companySize, email, password, contactNumber } = req.body;

    const existingCompany = await Company.findOne({ email });
    if (existingCompany) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const company = new Company({
      name,
      companySize,
      email,
      password: hashedPassword,
      contactNumber,
    });

    const verificationLink = `http://localhost:5000/verify-email/${company._id}`;
    await sendVerificationEmail(email, verificationLink);
    await company.save();
    const token = jwt.sign({ id: company._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.status(201).json({
      message: "Company registered. Verify your email to continue.",
      companyId: company._id,
      token:token
    });
  } catch (error) {
    console.log("register----" + error);
    res.status(500).json({ message: "Server error", error });
  }
};

// Email verification
exports.verifyEmail = async (req, res) => {
  try {
    const { companyId } = req.params;
    const company = await Company.findById(companyId);

    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }

    company.isEmailVerified = true;
    await company.save();

    res.status(200).json({
      message: "Email verified successfully.",
      isEmailVerified: company.isEmailVerified,
      isPhoneVerified: company.isPhoneVerified,
    });
  } catch (error) {
    console.log("email--- " + error);
    res.status(500).json({ message: "Server error", error });
  }
};

// Phone Verification using OTP
exports.sendPhoneOtp = async (req, res) => {
  try {
    const { companyId } = req.body;
    const company = await Company.findById(companyId);

    if (!company.isEmailVerified) {
      return res
        .status(400)
        .json({ message: "Please verify your email first." });
    }

    const otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      specialChars: false,
    });
    otpStore[companyId] = otp; // Store OTP temporarily

    // Send OTP using SMS service like Twilio
    await client.messages.create({
      body: `Your OTP for phone verification is ${otp}`,
      from: process.env.TWILIO_PHONE_NUMBER, // Your Twilio phone number
      to: company.contactNumber, // Company's phone number
    });

    res.status(200).json({
      message: "OTP sent to phone number.",
      isEmailVerified: company.isEmailVerified,
      isPhoneVerified: company.isPhoneVerified,
    });
  } catch (error) {
    console.log("phone otp " + error);
    res.status(500).json({ message: "Failed to send OTP", error });
  }
};

// Verify Phone OTP
exports.verifyPhoneOtp = async (req, res) => {
  try {
    const { companyId, otp } = req.body;
    const company = await Company.findById(companyId);

    if (!company) {
      return res.status(404).json({ message: "Company not found." });
    }

    if (otpStore[companyId] !== otp) {
      return res.status(400).json({ message: "Invalid OTP." });
    }

    company.isPhoneVerified = true;
    await company.save();

    // Remove OTP from store after successful verification
    delete otpStore[companyId];

    res.status(200).json({
      message: "Phone number verified successfully.",
      isEmailVerified: company.isEmailVerified,
      isPhoneVerified: company.isPhoneVerified,
    });
  } catch (error) {
    console.log("otp check phone :  " + error);
    res.status(500).json({ message: "Server error", error });
  }
};

// Login
exports.loginCompany = async (req, res) => {
  try {
    const { email } = req.body;

    const company = await Company.findOne({ email });
    if (!company || !(await bcrypt.compare(password, company.password))) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    if (!company.isEmailVerified || !company.isPhoneVerified) {
      return res
        .status(403)
        .json({ message: "Please verify your email and phone number." });
    }

    const token = jwt.sign({ id: company._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ token, company });
  } catch (error) {
    console.log("login company" + error);
    res.status(500).json({ message: "Server error", error });
  }
};

// Logout (Clear Token)
exports.logoutCompany = (req, res) => {
  try {
    // Just clear token on the client side, server doesn't handle it in stateless JWT
    res.status(200).json({ message: "Logout successful." });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
