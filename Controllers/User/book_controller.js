const BookModel = require("../../models/book");
const AdminModel = require("../../models/admin");
const Enums =require("../../Utils/enums")

const getAllBooks = async (req, res) => {
    try {
      let allBooks = await BookModel.find({})
      .populate("seller")

      res.status(200).send(allBooks);
    } catch (e) {
      console.log(e);
      res.status(404).json({ message: "internal server error" });
    }
  };
  
  const getBookById = async (req, res) => {
    try {
      let allBooks = await BookModel.findOne({ _id: req.params.id })
      .populate("seller")
      res.status(200).send(allBooks);
    } catch (e) {
      console.log(e);
      res.status(404).json({ message: "internal server error" });
    }
  };

  const queryBook=async(req,res)=>{
      let {yearEnum,subjectEnum,courseEnum}=Enums;
      let {year,subject,course}=req.body;
      if (year.length===0) year=yearEnum
      if(subject.length===0) subject=subjectEnum
      if(course.length===0) course=courseEnum
      try{
          let result =await BookModel.find({
              year:{$in:[...year]},
              subject:{$in:[...subject]},
              course:{$in:[...course]}
          })
          res.status(200).send(result)
      }
      catch{
        console.log(e);
        res.status(404).json({ message: "Internal server error." });
      }
  }


  module.exports={
      getAllBooks,
      getBookById,
      queryBook
  }