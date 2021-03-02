const UserModel = require("../../Models/user");

const fs = require("fs");
const { format } = require("@fast-csv/format");

const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find(
      {},
      { name: 1, email: 1, phone: 1 }
    ).lean();
    res.status(200).send(users);
  } catch (e) {
    console.log(e);
    res.status(404).json({ message: "Internal server error" });
  }
};

const downloadCSV = async (req, res) => {
  try {
    const users = UserModel.find({}, { name: 1, email: 1, phone: 1 });
    const transform = (doc) => {
      return {
        Id: doc._id,
        Name: doc.name,
        Email: doc.email,
        Phone: doc.phone,
      };
    };

    const filename = "Users.csv";

    res.setHeader("Content-disposition", `attachment; filename=${filename}`);
    res.writeHead(200, { "Content-Type": "text/csv" });

    res.flushHeaders();

    var csvStream = format({ headers: true, transform });
    users.stream().pipe(csvStream).pipe(res);
  } catch (e) {
    console.log(e);
    res.status(404).json({ message: "Internal server error" });
  }
};

module.exports = {
  getAllUsers,
  downloadCSV,
};
