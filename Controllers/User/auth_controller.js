const UserModel = require('../../Models/user');
const AdminModel=require('../../Models/admin')
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {signup,forgotPassword,vendorsignup}=require('../../Utils/mailGenerator')
const generator=require("generate-password")

async function newAdmin(req, res) {
  try {
    if (
      !req.body.email ||
      !req.body.phone ||
      !req.body.password ||
      !req.body.name 
      
    ) {
    //  console.log(req.body)
      return res.status(404).json({
        message: "Please send all required feilds.",
      });
    }

   

    const existingAdmin = await AdminModel.findOne({
      $or: [{ email: req.body.email }, { phone: req.body.phone }],
    });

    if (existingAdmin) {
      return res.status(404).json({
        message: "Account with same email or phone already exists",
      });
    }
    vendorsignup(req);
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);
    const newAdmin = new AdminModel({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      password: hashedPassword,
      isVendor: req.body.isVendor,
      isStudentVendor:req.body.isStudentVendor
    });
    await newAdmin.save();
    signup(req);
    return res.status(200).json({ message: "Admin added.." });
  } catch (e) {
    console.log(e);
    return res.status(404).json({ message: "Internal Server Error." });
  }
}
async function register(req, res) {
  //required email,phone,password
  try {
    if (
      !req.body.email ||
      !req.body.phone ||
      !req.body.password ||
      !req.body.name
    ) {
      return res.status(201).json({
        message: "Please send all required fields.",
      });
    }
    let existingAccount = await UserModel.findOne({
      $or: [{ email: req.body.email }, { phone: req.body.phone }],
    });
    if (existingAccount) {
      return res.status(202).json({
        message: "Account with same email or phone already exists",
      });
    }
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);
    let newUser = new UserModel({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      password: hashedPassword,
    });
    await newUser.save();
    signup(req);
    return res.status(200).json({ message: "Registration Completed" });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: "Internal Server Error." });
  }
}

async function login(req, res) {
  //required-> email or phone, password
  try {
    if (!req.body.cred || !req.body.password) {
      return res.status(404).json({
        message: "Please send all required feilds.",
      });
    }
    let user;
    if (Number(req.body.cred)) {
      user = await UserModel.findOne({ phone: Number(req.body.cred) });
    } else {
      user = await UserModel.findOne({ email: req.body.cred });
    }
    if (!user) {
      return res.status(201).json({ message: "User Not found!" });
    }
   // console.log(req.body.password)
    const verify = bcrypt.compareSync(req.body.password, user.password);
    if (!verify) {
      return res.status(201).json({ message: "Incorrect Password or Email!" });
    }
    const token = jwt.sign({ _id: user._id }, process.env.USER_JWT_SECRET);
    return res
      .status(200)
      .json({ message: "Login Succesfull", data: { user, token } });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: "Internal Server Error." });
  }
}

const googleAuth = async (req, res) => {
  try {
    let oldUser = true;
    let user = await UserModel.findOne({
      email: req.body.email,
      googleId: req.body.googleId,
    });
    if (!user) {
      oldUser = false;
      user = new UserModel({
        name: req.body.name,
        email: req.body.email,
        googleId: req.body.googleId,
      });
      await user.save();
      signup(req);
    }
    const token = jwt.sign({ _id: user._id }, process.env.USER_JWT_SECRET);
    res.status(200).json({
      message: "Google Authentication Successfull",
      data: { user, token, oldUser },
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Internal server error." });
  }
};


const updateUser = async (req, res) => {
  let updatedUser = await UserModel.findByIdAndUpdate(
    req.userData._id,
    req.body,
    { new: true }
  );
  res.status(200).json({ message: "User Details was updated!", data: updatedUser });
};

const recover = (req, res) => {
  try{
    let user=UserModel.findOne({email: req.body.email},{name: 1, email: 1, phone: 1})

    if (!user) return res.status(401).json({message: 'The email address ' + req.body.email + ' is not associated with any account. Double-check your email address and try again.'});

    var newpassword = generator.generate({
      length: 10,
      numbers: true
  });
  //console.log(user)
 //newpassword='pass123'
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(newpassword, salt);
 // console.log(newpassword)
  let newuser=UserModel.updateOne({email:req.body.email},{password:hashedPassword},function(
    err,
    result
  ) {
    if (err) {
      res.send(err);
    } else {
      forgotPassword(req.body.email,newpassword)
     res.status(200).json({message:"updated"})
    }
  })
  //console.log(user)
   // forgotPassword(req.body.email,newpassword)
    //res.status(200).json({message:"updated"})
  }
  catch(e){
    console.log(e)
    res.status(400).json({message:"Internal Server Error."})
  }
  };



module.exports = {
  newAdmin,
  login,
  register,
  googleAuth,
  updateUser,
  recover
};
