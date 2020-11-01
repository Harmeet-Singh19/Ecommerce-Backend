const AddressModel = require("../../models/address");

const getAllAddress = async (req, res) => {
  try {
    let allAddress = await AddressModel.find({
      userId: req.userData._id,
    })
    .populate("userId")
    res.status(200).send(allAddress);
  } catch (e) {
    console.log(e);
    res.status(404).json({ message: "Internal server error." });
  }
};

const addAddress = async (req, res) => {
  try {
    if (
      !req.body.phone ||
      !req.body.state ||
      !req.body.lat ||
      !req.body.lng ||
      !req.body.address
    )
      return res.status(440).json({ message: "Invalid request" });
    let newAddress = await AddressModel({
      ...req.body,
      userId: req.userData._id,
    })
    .populate("userId")
    newAddress = await newAddress.save();
    res.status(200).json({ message: "Address Added", data: newAddress });
  } catch (e) {
    console.log(e);
    res.status(404).json({ message: "Internal server error" });
  }
};

const updateAddress = async (req, res) => {
  try {
    let newAddress = await AddressModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )
    .populate("userId")
    res.status(200).json({ message: "Address Updated", data: newAddress });
  } catch (e) {
    console.log(e);
    res.status(404).json({ message: "Internal server error" });
  }
};

const removeAddress = async (req, res) => {
  try {
    await AddressModel.findByIdAndDelete(req.params.id)
    .populate("userId")
    res.status(200).json({ message: "Address Removed" });
  } catch (e) {
    console.log(e);
    res.status(404).json({ message: "internal server error" });
  }
};

module.exports = {
  getAllAddress,
  addAddress,
  updateAddress,
  removeAddress,
};
