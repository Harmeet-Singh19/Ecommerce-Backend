const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const AddressSchema = mongoose.Schema({
  //required feilds
  userId: { type: Schema.Types.ObjectId, required: true },
  phone: { type: Number, required: true },
  state: { type: String, required: true },
  lat: { type: Number, required: true },
  lng: { type: Number, required: true },
  address: { type: String, required: true },
  pincode:{type:Number},
  

});
module.exports = mongoose.model("Address", AddressSchema);
