const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//var uniqueValidator = require('mongoose-unique-validator');

const emailSchema = mongoose.Schema({
    //required fields
    seller: {type:Schema.Types.ObjectId,ref:'admin'},
    book: {type:Schema.Types.ObjectId,ref:'book'},
    bookQty:{type:Number},
    buyerName:{type:String},
    buyerAddr:{type:String},
    buyerPhone:{type:String},
    date:{type:Date}

});

//Schema.plugin(uniqueValidator);
module.exports = mongoose.model("email", emailSchema);