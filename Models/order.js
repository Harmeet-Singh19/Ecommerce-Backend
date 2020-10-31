const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//var uniqueValidator = require('mongoose-unique-validator');
const orderSchema = mongoose.Schema({
    //required feilds

    userId: { type: Schema.Types.ObjectId, required: true, ref: "user" },
    address: { type: Schema.Types.ObjectId, required: true, ref: "address" },
    pickupaddress:{ type: Schema.Types.ObjectId, required: true, ref: "address" },
    orderId: { type: Number, required: true },
    placedAt: { type: Date },
    placedBy: {
      type: String,
      required: true,
      enum: ["user", "automation"],
      default: "user",
    },
    books: {
        type: [
          {
            bookId: { type: Schema.Types.ObjectId, ref: "book" },
            quantity: { type: Number },
            billedPrice: { type: Number },
          },
        ],
      },
   
    //mutable feilds
    orderStatus: {
      type: String,
      enum: [
        "staged",
        "placed",
        "confirmed",
        "out_for_delivery",
        "delivered",
        "cancelled",
        "undelivered",
        "refunded",
      ],
    },

    deliveredAt: { type: Date },
    paymentMode: { type: String, enum: ["online", "cash"] },
    onlinePaymentStatus: {
      type: String,
      enum: ["incomplete", "success", "failed"],
      default: "incomplete",
    },
    cashPaymentStatus: {
      type: String,
      default: "unpaid",
      enum: ["paid", "unpaid"],
    },
    razorpayOrderId: { type: String },
    razorpayPaymentId: { type: String },
    onlinePaymentRemarks: { type: String },

    //amount
    originalAmount: { type: Number, required: true },
    billAmount: { type: Number, required: true },
    deliveryCharges: { type: Number },
    gst: { type: Number, default: 5 },
    finalAmount: { type: Number, required: true },

    //optional feilds
    remarks: { type: String },
    assignDelivery: { type: Schema.Types.ObjectId, ref: "admin" },
    unDeliveredReason: { type: String },
    cancelledBy: { type: String, enum: ["admin", "user"] },
    cancelReason: { type: String },
    dayIndex: { type: Number },
    dueDelivery: { type: Date },
  },
  {
    timestamps: true,
  }
);

//Schema.plugin(uniqueValidator);
module.exports = mongoose.model("order", orderSchema);