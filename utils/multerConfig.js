// import multer from "multer";
// import { mkdirSync, existsSync } from "fs";
const multer = require('multer');

// const createFolder = () => {
//   if (!existsSync("uploads")) {
//     mkdirSync("uploads");
//   }
// };

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // createFolder();
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    setTimeout(() => {
      const uniqueSuffix = Date.now() + 1;
      const extension = file.originalname.split(".").pop();
      cb(null, uniqueSuffix + "." + extension);
    }, 100);
  },
});

 const multerError = (error, request, response, next) => {
  if (error instanceof multer.MulterError) {
    return response.status(400).json({
        status: 'Error',
        message: error.message || error
    })
  } else if (error) {
    return response.status(400).json({
        status: 'Error',
        message: error.message || error
    })
  }
  next();
};

 const upload = multer({ storage });

module.exports = {multerError,upload}