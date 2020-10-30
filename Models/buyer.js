const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');

const buyerSchema = mongoose.Schema({
    //required feilds
    firstName: { type: String, required: true },
    lastName: String,
    address: { type: String, required: true },
    contactNumber: { type: Number, required: true,unique:true },
    email: { type: String, required: true,unique:true },
    book: [{ type: Schema.Types.ObjectId, ref: 'Book' }]


});

Schema.plugin(uniqueValidator);
module.exports = mongoose.model("Buyer", buyerSchema);