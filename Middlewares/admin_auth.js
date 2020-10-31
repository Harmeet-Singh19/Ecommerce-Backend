const jwt = require("jsonwebtoken");
module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const decodedToken = await jwt.verify(token, process.env.ADMIN_JWT_SECRET);
    req.userData = { _id: decodedToken._id };
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ status: false, message: "Auth failed" });
  }
};
