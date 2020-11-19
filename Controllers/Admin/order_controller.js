const OrderModel = require("../../Models/order");
const BookModel = require("../../Models/book");


const getCountOfBooksSold=async(req,res)=>{
  try{
    const usages = await Promise.all([
      OrderModel.find({
        books: { $elemMatch: { book: req.body.bookId } },
      }).countDocuments(),
      OrderModel.find({
        books: { $elemMatch: { book: req.body.bookId } },
      })
      .populate("userId")
      .populate("address")
      .populate("books.book")
      .populate("sellers.seller")
      .sort({ placedAt: -1 })
    ]);
   
   // console.log(usages[0])
    //console.log(orders)
    res.status(200).json({message:"Succes",data:{usages}})
  }
  catch(e){
    console.log(e);
    res.status(404).json({ message: "Internal server error." });
  }
}
const getLiveOrders = async (req, res) => {
  try {
    
    let allOrders = await OrderModel.find({
      orderStatus: { $in: ["placed", "confirmed", "out_for_delivery"] },
    })
    .populate("userId")
    .populate("address")
    .populate("books.book")
    .populate("sellers.seller")
    .sort({ placedAt: -1 })
      
    let filteredOrders = { placed: [], confirmed: [], out_for_delivery: [] };
    allOrders.map((order) => {
      let { orderStatus } = order;
      filteredOrders[orderStatus] = [...filteredOrders[orderStatus], order];
    });
    res.status(200).send(filteredOrders);
  } catch (e) {
    console.log(e);
    res.status(404).json({ message: "Internal server error" });
  }
};

const getOrderHistory = async (req, res) => {
  try {
    
    let allOrders = await OrderModel.find({
      orderStatus: { $in: ["delivered", "cancelled", "undelivered"] },
    })
    .populate("userId")
    .populate("address")
    .populate("books.book")
    .populate("sellers.seller")
    .sort({ placedAt: -1 })
    res.status(200).send(allOrders);
  } catch (e) {
    console.log(e);
    res.status(404).json({ message: "Internal server error" });
  }
};



const updateStatus = async (req, res) => {
  try {
    let statusUpdate = await OrderModel.findByIdAndUpdate(
      req.params.id,
      { orderStatus: req.body.orderStatus },
      { new: true }
    );

    res.status(200).json({ message: "Status Updated", data: statusUpdate });
  } catch (e) {
    console.log(e);
    res.status(404).json({ message: "Internal server error" });
  }
};

const getOrderById = async (req, res) => {
  try {
    let order = await OrderModel.findById(req.params.id)
    .populate("userId")
    .populate("address")
    .populate("books.book")
    .populate("sellers.seller")
    res.status(200).send(order);
  } catch (e) {
    console.log(e);
    res.status(404).json({ message: "Internal server error" });
  }
};



const markDelivered = async (req, res) => {
  try {
    let statusUpdate = await OrderModel.findByIdAndUpdate(
      req.params.id,
      {
        deliveredAt: Date.now(),
        cashCollected: req.body.cashCollected,
        orderStatus: "delivered",
      },
      { new: true }
    );

    res.status(200).json({ message: "Status Updated", data: statusUpdate });
  } catch (e) {
    console.log(e);
    res.status(404).json({ message: "Internal server error" });
  }
};

const markUnDelivered = async (req, res) => {
  try {
    let statusUpdate = await OrderModel.findByIdAndUpdate(
      req.params.id,
      {
        unDeliveredReason: req.body.unDeliveredReason,
        orderStatus: "undelivered",
      },
      { new: true }
    );
    res.status(200).json({ message: "Status Updated", data: statusUpdate });
  } catch (e) {
    console.log(e);
    res.status(404).json({ message: "Internal server error" });
  }
};

const cancelOrder = async (req, res) => {
  try {
    let statusUpdate = await OrderModel.findByIdAndUpdate(
      req.params.id,
      { cancelledBy: "admin", cancelReason: req.body.cancelReason },
      { new: true }
    );
    res.status(200).json({ message: "Status Updated", data: statusUpdate });
  } catch (e) {
    console.log(e);
    res.status(404).json({ message: "internal server error" });
  }
};

const getLiveDeliveries = async (req, res) => {
  try {
    let liveDeliveries = await OrderModel.find({
      orderStatus: { $in: ["out_for_delivery", "confirmed"] }
    })
    .populate("userId")
    .populate("address")
    .populate("books.book")
    .populate("sellers.seller")
      .sort({ placedAt: -1 });

  

    res.status(200).send(liveDeliveries);
  } catch (e) {
    console.log(e);
    res.status(404).json({ message: "internal server error" });
  }
};

const getDelivered = async (req, res) => {
  try {
    let deliveries = await OrderModel.find({
      orderStatus: { $in: ["delivered", "undelivered"] },
    })
    .populate("userId")
    .populate("address")
    .populate("books.book")
    .populate("sellers.seller")
      .sort({ placedAt: -1 });
    res.status(200).send(deliveries);
  } catch (e) {
    console.log(e);
    res.status(404).json({ message: "internal server error" });
  }
};

const getOrdersByVendor =async(req,res)=>{
    try{
    let orders=await OrderModel.find({
        sellers: req.params.id
    })
    .populate("userId")
    .populate("address")
    .populate("books.book")
    .populate("sellers.seller")
      .sort({ placedAt: -1 });
    console.log(orders)
    res.status(200).send(orders)
}
catch(e){
    console.log(e)
    res.status(404).json({message:"Internal server error"})
}
}



module.exports = {
  getLiveOrders,
  getOrderHistory,
  updateStatus,
  getOrderById,
  cancelOrder,
  markDelivered,
  markUnDelivered,
  getLiveDeliveries,
  getDelivered,
  getOrdersByVendor,
  getCountOfBooksSold
};
