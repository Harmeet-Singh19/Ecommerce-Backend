const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = mongoose.Schema({
    //required feilds

    userId: { type: Schema.Types.ObjectId, required: true, ref: 'user' },
    address: { type: Schema.Types.ObjectId, required: true, ref: 'address' },
    sellers:{
      type:[
        {
          seller:{type:Schema.Types.ObjectId,ref:"admin"}
        }
      ]
    },
    orderId: { type: Number, required: true },
    placedAt: { type: Date },
    placedBy: {
      type: String,
      required: true,
      enum: ["user", "automation"],
      default: "user",   
    },
    books:{
      type: [
        {
          book: { type: Schema.Types.ObjectId, ref: "book" },
          quantity: { type: Number },
          billedPrice: { type: Number },
          name:{type:String}
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
    gst: { type: Number, default: 0 },
    finalAmount: { type: Number, required: true },
    discount: { type :Number,default:0},
    //optional feilds
    remarks: { type: String },
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


module.exports = mongoose.model("order", orderSchema);