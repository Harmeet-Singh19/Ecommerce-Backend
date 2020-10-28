require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const PORT = process.env.PORT;
//ROUTES
const UserRoutes=require('./Routes/User/index')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set("port", PORT);
app.use(cors());

var server = app.listen(PORT, () => {
  console.log("server listening at " + PORT);
});

mongoose
  .connect(`${process.env.DATABASE}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(
    () => {
      console.log("Connected to database");
    },
    (err) => {
      console.log(err);
      console.log("Connection Failed");
    }
  );

  app.use("/api/user", UserRoutes);


//working check
app.get("/", async (req, res) => {
  return res.json({ message: "working" });
});

