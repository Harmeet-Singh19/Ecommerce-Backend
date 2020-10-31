const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
const { v4: uuidv4 } = require("uuid");

aws.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region:'us-east-2'
});
const s3 = new aws.S3();
const storage = multerS3({
  s3: s3,
  bucket: "dubookimages",
  acl: "public-read",
  contentType: multerS3.AUTO_CONTENT_TYPE,
  metadata: function (req, file, cb) {
    cb(null, { fieldName: file.fieldname });
  },
  key: function (req, file, cb) {
    cb(null, uuidv4() + file.originalname.split(" ").join(""));
  },
});

const upload = multer({ storage: storage })

module.exports = upload;
