const BookModel = require("../../Models/book");
const AdminModel = require("../../Models/admin");
const Enums =require("../../Utils/enums")


  
  const getBookById = async (req, res) => {
    try {
      let allBooks = await BookModel.findOne({ _id: req.params.id })
     
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
     
      let t=false;
     // console.log(year)
     // console.log(subject)
     // console.log(course)
      try{
       // console.log(req.query.keyword)
        if(req.query.keyword!==''){
          var result1 ;
          BookModel.find({
            year:{$in:[...year]},
            course:{$in:[...course]},
            hand:{$in:[...hand]},
            $or:[{'name': {
              $regex: req.query.keyword,
              $options: 'i',
            }},
          {
            'subject': {
              $regex: req.query.keyword,
              $options: 'i',
            }
            
          },
          {
            'author': {
              $regex: req.query.keyword,
              $options: 'i',
            }
            
          }
        ]
            
        },function(err,docs){
        //  console.log(docs.length)
          if(!err){ 
            res.status(200).send(docs);
          return}
          console.log(err)
      })
       
       // console.log("first",result1)
       
      
     // console.log("second",result2)
     
      var result=result1
     
      /*result3.forEach((t)=>{
        let str=t._id
        if(uniqueid.indexOf(str)===-1){
          console.log(str)
          
          uniqueid.push(str);
         
          result.push(t);
        }
      })*/
    //console.log(uniqueid)
     // console.log("final",result)
        }
        else{
          var result =await BookModel.find({
              year:{$in:[...year]},
              course:{$in:[...course]},
              hand:{$in:[...hand]},
          })
          res.status(200).send(result)
        }
          
      }
      catch{
        console.log(e);
        res.status(404).json({ message: "Internal server error." });
      }
  }
  const getAllBooks = async (req, res) => {
    try {
      let allBooks = await BookModel.find({})
     

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