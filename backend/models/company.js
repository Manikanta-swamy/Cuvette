const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const companySchema = new mongoose.Schema({
  name: { type: String, required: true },
  companySize: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  contactNumber: { type: String, required: true },
  isEmailVerified: { type: Boolean, default: false },
  isPhoneVerified: { type: Boolean, default: false },
});

// Password hashing
companySchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

module.exports = mongoose.model("Company", companySchema);
