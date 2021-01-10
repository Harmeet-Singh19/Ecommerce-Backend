const EmailModel = require("../../Models/email");
const {vendor}=require('../../Utils/mailGenerator')


const sendMail =async(req,res)=>{
    try{
        req.body.date=Date.now();
        let newEmail = new EmailModel({ ...req.body });
      newEmail = await newEmail.save();
     let popEmail=await EmailModel.findOne({_id:newEmail._id})
     .populate("seller")
     .populate("book");
     vendor(popEmail)
      res.status(200).json({ message: "Email sent", data: popEmail });
    }
    catch(e){
        console.log(e);
        res.status(404).json({ message: "Internal server error." });
    }
}

const getAllMails =async(req,res)=>{
    try{
        let allEmails = await EmailModel.find({})
      .populate("seller")
      .populate("book");

      res.status(200).send(allEmails);
    }
    catch(e){
        console.log(e);
        res.status(404).json({ message: "Internal server error." });
    }
}

module.exports={
    sendMail,
    getAllMails
}