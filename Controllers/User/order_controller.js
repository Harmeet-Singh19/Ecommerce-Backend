const OrderModel = require("../../Models/order");
const BookModel = require("../../Models/book");
const UserModel=require('../../Models/user')
const crypto = require("crypto");
const Rzp = require("razorpay");
const {orderPlaced}=require('../../Utils/mailGenerator')
const rates =require('../../Utils/rates')
const instance = new Rzp({
  key_id: process.env.RZP_ID,
  key_secret: process.env.RZP_SECRET,
});

const getAllOrders = async (req, res) => {
  try {
  
    let allOrders = await OrderModel.find({ userId: req.userData._id })
      .populate("userId")
      .populate("address")
      .populate("books.book")
      .populate("sellers.seller")
      .sort({ placedAt: -1 })
      
    res.status(200).json(allOrders);
  } catch (e) {
    console.log(e);
    res.status(404).json({ message: "Internal server error" });
  }
};

const getOrderDetails = async (req, res) => {
  try {
    let allOrders = await OrderModel.findById(req.params.id)
    .populate("userId")
    .populate("address")
    .populate("books.book")
    res.status(200).send(allOrders);
  } catch (e) {
    console.log(e);
    res.status(404).json({ message: "Internal server error" });
  }
};

const placeOrder = async (req, res) => {

  try {
    //general api validations
    if (
      !req.body.address ||
      !req.body.books ||
      !req.body.originalBill ||
      !req.body.finalAmount ||
      !req.body.deliveryCharge 
    ) {
      return res.status(440).json({ message: "Invalid request" });
    }


    
    let books = req.body.books;
    let orderedBooksSet = new Set();
    
    books.map((item) => {
     orderedBooksSet.add(item.book._id)

    });
    const orderedBooksId = Array.from(orderedBooksSet);
    
    const orderedBooksDetail = await BookModel.find({
      _id: { $in: orderedBooksId },
    }).select("price");
    const priceMap = new Map();
    orderedBooksDetail.map((book) => {
      priceMap[book._id] = book.price;
    });
   
    //order object
    let order = {
      books: [],
      sellers:[]
    };

    //price validations
    let calculatedOriginalBill = 0;
    let check= []
    books.map(async(item) => {

        order.books.push({
          book: item.book._id,
          quantity: item.quantity,
          billedPrice: priceMap[item.book._id],
          name:item.book.name
        });
        calculatedOriginalBill += priceMap[item.book._id] * item.quantity;
        if(check.indexOf(item.book.seller)===-1){
        order.sellers.push({
          seller:item.book.seller
        })
      check.push(item.book.seller)
      }
        
        let newInstock=item.book.countInStock-item.quantity
        if(newInstock<0){
          let out=await BookModel.findById(item.book._id)
          return res.status(404).json({ message: "Order couldnt be placed. One or more items out of stock", data:out });
        }
        let nbook=await BookModel.findOneAndUpdate(
          {_id:item.book._id},
          {countInStock:newInstock},
          {new:true}
        )
    });
    
    calculatedOriginalBill = parseFloat(calculatedOriginalBill.toFixed(2));
    //originalBill checkpoint
    //1 point margin for roundff fluctuations
    
    if (Math.abs(calculatedOriginalBill - +req.body.originalBill) > 1) {
      return res
        .status(404)
        .json({ message: "Invalid Order Request.(Price Mismatch)" });
    }
    order.originalAmount = calculatedOriginalBill;
    
    //bill amount validation
    let billAmount = calculatedOriginalBill;
  
    order.billAmount = parseFloat(billAmount.toFixed(2));
    
    //finalBill validations
    order.finalAmount = parseFloat(req.body.finalAmount);
    let delivery=order.finalAmount-order.originalAmount;
    
    if(req.body.discount!==0){
      order.finalAmount-=delivery;
      order.finalAmount=order.finalAmount*(100-req.body.discount);
      order.finalAmount/=100;
      order.finalAmount+=delivery;
    }
    
    order.userId = req.userData._id;
    order.address = req.body.address;
    order.orderId = getCode();
    order.placedAt = Date.now();
    order.paymentMode = req.body.paymentMode;
    order.discount=req.body.discount;
    //cash payment
    if (req.body.paymentMode === "cash") {
      order.orderStatus = "placed";

      order = new OrderModel(order);
      order = await order.save();
      orderPlaced(order);
      return res.status(200).json({ message: "Order Placed", order });
    }

    else {
      const response = await instance.orders.create({
        amount: parseInt(order.finalAmount * 100),
        currency: "INR",
        receipt: order.orderId,
        payment_capture: true,
      });
      order.razorpayOrderId = response.id;
      order.orderStatus = "staged";
      order = new OrderModel(order);
      order = await order.save();
      return res.status(200).json({
        message: "Order staged. Initiate payment to complete.",
        paymentId: response.id,
        order,
      });
    }
  } catch (e) {
    console.log(e);
    res.status(404).json({ message: "internal server error" });
  }
};

const verifyOrder = async (req, res) => {
  try {
    const hmac = crypto.createHmac("sha256", process.env.RZP_SECRET);
    const order_id = req.body.razorpay_order_id;
    const payment_signature = req.body.razorpay_signature;
    const payment_id = req.body.razorpay_payment_id;
    const data = hmac.update(order_id + "|" + payment_id);
    const generated_signature = data.digest("hex");
    if (generated_signature != payment_signature) {
      const failedOrder = await OrderModel.findOneAndUpdate(
        { razorpayOrderId: order_id },
        { onlinePaymentStatus: "failed" },
        { new: true }
      );
      return res.status(404).json({
        message: "Payment source could not be validated.",
        failedOrder,
      });
    }
    const sucessOrder = await OrderModel.findOneAndUpdate(
      { razorpayOrderId: order_id },
      {
        orderStatus: "placed",
        razorpayPaymentId: payment_id,
        onlinePaymentStatus: "success",
      },
      { new: true }
    ).populate("userId")
    .populate("address")
    .populate("books.book");
     orderPlaced(sucessOrder);
    res.status(200).json({ message: "Order Placed", sucessOrder });
  
  } catch (e) {
    console.log(e);
    res.status(404).json({ message: "internal server error" });
  }
};

module.exports = {
  getAllOrders,
  placeOrder,
  getOrderDetails,
  verifyOrder,
};

function getCode() {
  return Math.floor(Math.random() * (100000 - 999999) + 999999);
}
