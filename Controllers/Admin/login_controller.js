const AdminModel = require("../../Models/admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function verifyAdmin(req, res) {
  res.send(req.userData);
}

async function newAdmin(req, res) {
  try {
    if (
      !req.body.email ||
      !req.body.phone ||
      !req.body.password ||
      !req.body.name ||
      !req.body.isVendor
    ) {
      return res.status(404).json({
        message: "Please send all required feilds.",
      });
    }

    /*const admin = await AdminModel.findById(req.userData._id);
    if (!admin.roles.includes("create_admin")) {
      return res
        .status(404)
        .json({ message: "Unauthorized for this operation." });
    }*/

    const existingAdmin = await AdminModel.findOne({
      $or: [{ email: req.body.email }, { phone: req.body.phone }],
    });

    if (existingAdmin) {
      return res.status(404).json({
        message: "Account with same email or phone already exists",
      });
    }
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);
    const newAdmin = new AdminModel({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      password: hashedPassword,
      isVendor: req.body.isVendor,
    });
    await newAdmin.save();
    return res.status(200).json({ message: "Admin added.." });
  } catch (e) {
    console.log(e);
    return res.status(404).json({ message: "Internal Server Error." });
  }
}

async function login(req, res) {
  try {
    if (!req.body.cred || !req.body.password) {
      console.log(req.body)
      return res.status(404).json({
        message: "Please send all required fields.",
      });
    }
    let admin,
      isVendor = false;
    if (Number(req.body.cred)) {
      admin = await AdminModel.findOne({ phone: Number(req.body.cred) });
    } else {
      admin = await AdminModel.findOne({ email: req.body.cred });
    }
    if (!admin) {
      return res.status(404).json({ message: "Invalid Credentials" });
    }
    const verify = bcrypt.compareSync(req.body.password, admin.password);
    if (!verify) {
      return res.status(404).json({ message: "Invalid Credentials" });
    }
    const token = await jwt.sign({ _id: admin._id }, process.env.ADMIN_JWT_SECRET);
    if (admin.isVendor===true) isVendor = true;
    return res
      .status(200)
      .json({
        message: "Login Succesfull",
        data: { admin, token, isVendor},
      });
  } catch (e) {
    console.log(e);
    return res.status(404).json({ message: "Internal Server Error." });
  }
}

const getAllAdmins = async (req, res) => {
  try {
    const allAdmins = await AdminModel.find(
      {},
      { name: 1, email: 1, phone: 1, isVendor: 1 }
    );
    return res.status(200).send(allAdmins);
  } catch (e) {
    console.log(e);
    return res.status(404).json({ message: "Internal Server Error." });
  }
};

const getAllVendors = async (req, res) => {
  try {
    const allVendors = await AdminModel.find(
      {
        isVendor:true
      },
      { name: 1, email: 1, phone: 1, isVendor: 1,address:1 }
    );
    return res.status(200).send(allVendors);
  } catch (e) {
    console.log(e);
    return res.status(404).json({ message: "Internal Server Error." });
  }
};
const getAdminById = async (req, res) => {
  try {
    const admin = await AdminModel.findById(req.params.id);
    return res.status(200).send(admin);
  } catch (e) {
    console.log(e);
    return res.status(404).json({ message: "Internal Server Error." });
  }
};

const updateAdmin = async (req, res) => {
  try {
    const admin = await AdminModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    return res
      .status(200)
      .json({ message: "Admin Info updated.", data: admin });
  } catch (e) {
    console.log(e);
    return res.status(404).json({ message: "Internal Server Error." });
  }
};

const removeAdmin = async (req, res) => {
  try {
    await AdminModel.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Admin Removed" });
  } catch (e) {
    console.log(e);
    res.status(404).json({ message: "internal server error" });
  }
};

const currUser = async (req, res) => {
  try {
    let admin,
      isVendor = false;
    admin = await AdminModel.findById(req.userData._id);
    if (admin.isVendor===true) isVendor = true;
    res.status(200).json({ message: "verified Admin", admin, isVendor });
  } catch (e) {
    console.log(e);
    res.status(404).json({ message: "internal server error" });
  }
};

module.exports = {
  login,
  newAdmin,
  verifyAdmin,
  getAllAdmins,
  getAdminById,
  updateAdmin,
  removeAdmin,
  currUser,
  getAllVendors
};
