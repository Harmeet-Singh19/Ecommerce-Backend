const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');

const bookSchema = mongoose.Schema({
    //required feilds
    bookId: {type:String,unique:true,required:true},
    bookName: {type:String,required:true},
    weight: {type:Number}, 
    edition:{type:Number},
    author: {type:String},
    seller: {type:Schema.Types.ObjectId,ref:'Seller'},
    price: {type:Number},
    sold:{type:Boolean,default:false}


});

Schema.plugin(uniqueValidator);
module.exports = mongoose.model("Book", bookSchema);