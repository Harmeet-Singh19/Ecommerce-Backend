const BookModel = require("../../models/book");
const AdminModel = require("../../models/admin");
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
      let {yearEnum,subjectEnum,courseEnum}=Enums;
      let {year,subject,course}=req.body;
      //console.log(req.body)
      if (year.length===0) year=yearEnum
      if(subject.length===0) subject=subjectEnum
      if(course.length===0) course=courseEnum
     

     // console.log(year)
     // console.log(subject)
     // console.log(course)
      try{
       // console.log(req.query.keyword)
        if(req.query.keyword!==''){
          var result =await BookModel.find({
            year:{$in:[...year]},
            subject:{$in:[...subject]},
            course:{$in:[...course]},
            name: {
              $regex: req.query.keyword,
              $options: 'i',
            },
        })
        .populate('seller')
        }
        else{
          var result =await BookModel.find({
              year:{$in:[...year]},
              subject:{$in:[...subject]},
              course:{$in:[...course]}
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


  module.exports={
      getBookById,
      queryBook
  }