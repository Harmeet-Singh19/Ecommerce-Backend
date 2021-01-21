const BookModel = require("../../Models/book");
const AdminModel = require("../../Models/admin");
const Enums =require("../../Utils/enums")


  
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
      let {yearEnum,courseEnum,handEnum}=Enums;
      let {year,course,hand}=req.body;
      //console.log(req.body)
      if (year.length===0) year=yearEnum
      if(course.length===0) course=courseEnum
      if(hand.length===0) hand=handEnum
     

     // console.log(year)
     // console.log(subject)
     // console.log(course)
      try{
       // console.log(req.query.keyword)
        if(req.query.keyword!==''){
          var result1 =await BookModel.find({
            year:{$in:[...year]},
            course:{$in:[...course]},
            hand:{$in:[...hand]},
            name: {
              $regex: req.query.keyword,
              $options: 'i',
            },
            
        })
        .populate('seller')
        var result2=await BookModel.find({
          year:{$in:[...year]},
          course:{$in:[...course]},
          hand:{$in:[...hand]},
          subject: {
            $regex: req.query.keyword,
            $options: 'i',
          },
          
      })
      .populate('seller')
      var result=result1+result2;
        }
        else{
          var result =await BookModel.find({
              year:{$in:[...year]},
              course:{$in:[...course]},
              hand:{$in:[...hand]},
          })
          .populate('seller')
        }
          res.status(200).send(result)
      }
      catch{
        console.log(e);
        res.status(404).json({ message: "Internal server error." });
      }
  }
  const getAllBooks = async (req, res) => {
    try {
      let allBooks = await BookModel.find({})
      .populate("seller")

      res.status(200).send(allBooks);
    } catch (e) {
      console.log(e);
      res.status(404).json({ message: "Internal server error" });
    }
  };

  module.exports={
      getBookById,
      queryBook,
      getAllBooks
  }