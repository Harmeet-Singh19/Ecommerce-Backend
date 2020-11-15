const BookModel = require("../../Models/book");
const AdminModel = require("../../Models/admin");

const addImage = async (req, res) => {
    try {
      
      //console.log(req.files)
      let links=[];
      req.files.map((file,index)=>{
          links.push(file.location)
      })
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
  const deleteBook = async (req, res) => {
    try {
      
      /*const usages = await Promise.all([
        OrderModel.find({
          dishes: { $elemMatch: { dishRef: req.params.id } },
        }).countDocuments(),
        FixedSetModel.find({ dishes: { $in: [req.params.id] } }).countDocuments(),
        GoalSetDayModel.find({
          dishes: { $in: [req.params.id] },
        }).countDocuments(),
      ]);
      if (usages[0] !== 0 || usages[1] !== 0 || usages[2] !== 0) {
        return res.status(404).json({
          message: "Can not delete this dish. Deactivate it to stop orders",
          usageStats: {
            orders: usages[0],
            fixedSet: usages[1],
            goalSet: usages[2],
          },
        });
      }*/
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
      getBookByVendor
  }