const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const AddressSchema = mongoose.Schema({
  //required feilds
  userId: { type: Schema.Types.ObjectId, required: true },
  phone: { type: Number, required: true },
  state: { type: String, required: true },
  address: { type: String, required: true },
  pincode:{type:Number},
  city:{type:String,required:true}
  

});
module.exports = mongoose.model("address", AddressSchema);
