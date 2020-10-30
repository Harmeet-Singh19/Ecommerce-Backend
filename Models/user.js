const mongoose = require("mongoose");
var uniqueValidator = require('mongoose-unique-validator');


const userSchema = mongoose.Schema({
  firstName: { type: String, required: true },
  lastName = {type:String},
  email: { type: String, required: true,unique:true },
  phone: { type: Number, unique:true },
  password: { type: String },
  googleId: { type: String },
  facebookId: { type: String },
});
Schema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
