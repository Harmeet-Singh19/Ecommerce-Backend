const mongoose = require("mongoose");
//var uniqueValidator = require('mongoose-unique-validator');


const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true,unique:true },
  phone: { type: Number },
  password: { type: String },
  googleId: { type: String },
  facebookId: { type: String },
});
//Schema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
