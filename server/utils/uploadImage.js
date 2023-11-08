const multer = require("multer");
const path = require("path");

const createMulter = (uploadDirectory) => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const uploadPath = path.join(__dirname, uploadDirectory);
      cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + "-" + file.originalname);
    },
  });

  return multer({ storage: storage });
};

module.exports = createMulter;
