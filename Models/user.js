const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: Number },
  password: { type: String },
  googleId: { type: String },
  facebookId: { type: String },
});
module.exports = mongoose.model("user", userSchema);
