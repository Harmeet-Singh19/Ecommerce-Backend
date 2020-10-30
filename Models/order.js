const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');
const orderSchema = mongoose.Schema({
    //required feilds
    orderId: {type:String, required:true,unique:true},
    seller: { type: Schema.Types.ObjectId, ref: 'Seller', unique: true},
    buyer: { type: Schema.Types.ObjectId, ref: 'Buyer', unique: true},
    price: {type:Number, required:true},
    pickup:{type:String,required:true},
    dropoff:{type:String,required:true},
    

    //multiple books


});

Schema.plugin(uniqueValidator);
module.exports = mongoose.model("Order", orderSchema);