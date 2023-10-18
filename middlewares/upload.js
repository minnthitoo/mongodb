const multer = require("multer");
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images/users/");
  },
  filename: function (req, file, cb) {
    let extension = path.extname(file.originalname);
    cb(null, Date.now() + extension);
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
