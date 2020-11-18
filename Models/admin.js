const mongoose = require("mongoose");
const adminSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: Number },
  password: { type: String, required: true },
  isVendor:{type:Boolean,required:true,default:false},
  isStudentVendor:{type:Boolean,required:true,default:false},
  address:{type:String}
});
module.exports = mongoose.model("admin", adminSchema);
