const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//var uniqueValidator = require('mongoose-unique-validator');

const bookSchema = mongoose.Schema({
  //required fields

  name: { type: String, required: true },
  image: {
    type:
      [
        {
          type: String, default: null
        }
      ]
  },
  description: { type: String, required: true },
  weight: { type: Number },
  edition: { type: Number },
  author: { type: String },
  publisher: { type: String },
  seller: { type: Schema.Types.ObjectId, ref: 'admin' },

  countInStock: {
    type: Number,
    required: true,
    default: 0,
  },
  //filters
  price: { type: Number, required: true },
  year: { type: Number, enum: [1, 2, 3, 4] },
  subject: { type: String, required: true },
  course: { type: String, enum: ["Bms", "BcomH", "BcomP", "BaHEco", "BaHEng", "BaHPsy", "Shivdas", "BscHSta", "BscHMat"] },
  hand: { type: Number, enum: [1, 2] },
  uploadAt: { type: Date }

});

//Schema.plugin(uniqueValidator);
module.exports = mongoose.model("vbook", bookSchema);