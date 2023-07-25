import multer from 'multer';

const storage = multer.diskStorage({
  filename: function (req,file,cb) {
    cb(null, file.originalname)
  }
});

const upload = multer({storage: storage});

export default upload;

//have to give the file the name of image to be able to work