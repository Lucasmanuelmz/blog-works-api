const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, done) {
    done(null, '../src/upload')
  },
  filename: function (req, file, done) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    done(null, file.fieldname + uniqueSuffix + path.extname(file.originalname))
  }
})
const upload = multer({storage: storage});

module.exports = upload;