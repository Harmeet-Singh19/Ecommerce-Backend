const BookModel = require("../../Models/book");
const AdminModel = require("../../Models/admin");

const addImage = async (req, res) => {
    try {
      
      //console.log(req.files)
      let links=[];
      req.files.map((file,index)=>{
          links.push(file.location)
      })
    // console.log(req.body)
      res.status(200).json({message:"successful",images:links})
    } catch (e) {
      console.log(e);
      res.status(404).json({ message: "Internal server error" });
    }
  };

  async function addBook(req, res) {
    //required->dish
    try {
      const admin = await AdminModel.findById(req.userData._id);
     //console.log(admin)
    // console.log(req.body)

      let newBook = new BookModel({ ...req.body });
      newBook = await newBook.save();
      res.status(200).json({ message: "Book added", data: newBook });
    } catch (e) {
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
  
  const getBookById = async (req, res) => {
    try {
      let allBooks = await BookModel.findOne({ _id: req.params.id })
      .populate("seller")
      res.status(200).send(allBooks);
    } catch (e) {
      console.log(e);
      res.status(404).json({ message: "Internal server error" });
    }
  };
  const getBookByVendor = async (req, res) => {
    try {
      let allBooks = await BookModel.find({ seller: req.params.id })
      .populate("seller")
      res.status(200).send(allBooks);
    } catch (e) {
      console.log(e);
      res.status(404).json({ message: "Internal server error" });
    }
  };

  async function modifyBook(req, res) {
    //required->dish,dishId
    try {
     
      let updatedBook = await BookModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      )
      .populate("seller")
      res.status(200).json({ message: "Book updated", data: updatedBook });
    } catch (e) {
      console.log(e);
      res.status(404).json({ message: "Internal server error." });
    }
  }
  const changeActiveStatus=async(req,res)=>{
    try{
      let book = await BookModel.findByIdAndUpdate(
        req.params.id,
        { isLive: req.body.isLive },
        { new: true }
      );
      res.status(200).json({ message: "Book updated..", data: book });
    }
    catch(e){
      console.log(e);
      res.status(404).json({ message: "Internal server error." });
    }
    }
  }
  const deleteBook = async (req, res) => {
    try {
   
      await BookModel.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "Book Deleted" });
    } catch (e) {
      console.log(e);
      res.status(404).json({ message: "Internal server error." });
    }
  };
  const updateImage = async (req, res) => {
    try {
      if (req.files) {
        let links=[];
        req.files.map((file,index)=>{
            links.push(file.location)
        })
        const updatedBook = await BookModel.findByIdAndUpdate(
          req.params.id,
          {
            image: links,
          },
          { new: true }
        )
        .populate("seller")
        res.status(200).json(updatedBook);
      } else {
        res.status(200).send("No Image uploaded");
      }
    } catch (e) {
      console.log(e);
      res.status(404).json({ message: "Internal server error" });
    }
  };

  module.exports={
      addImage,
      addBook,
      getAllBooks,
      getBookById,
      modifyBook,
      deleteBook,
      updateImage,
      getBookByVendor,
      changeActiveStatus
  }