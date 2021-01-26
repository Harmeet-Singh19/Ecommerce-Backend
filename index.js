require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoSantize = require("express-mongo-sanitize")
const PORT = process.env.PORT || 4000;
//ROUTES
const AdminRoutes = require('./Routes/Admin/index')
const UserRoutes = require('./Routes/User/index')
const DeliveryRoute = require('./Routes/Delivery/deliver')
const Mail = require('./Utils/mailGenerator')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set("port", PORT);
app.use(cors());
app.use(mongoSantize())

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
      app.use("/api/admin", AdminRoutes);
      app.use("/api/user", UserRoutes);
      app.use('/api/delivery', DeliveryRoute)
    },
    (err) => {
      console.log(err);
      console.log("Connection Failed");
    }
  );




//working check
app.get("/", async (req, res) => {
  return res.json({ message: "working" });
});

//Mail.signup()
