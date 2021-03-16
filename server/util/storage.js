const multer = require('multer');

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null, 'public/uploads')
    },
    filename:(req,file,cb)=>{
        cb(null, file.filename)
    }
});

const fileFilter = (req,file,cb)=>{
    if(file.mimetype === 'image/png' || file.mimetype === 'image/jpeg' ||
    file.mimetype === 'image/jpg' ){
        cb(null, true);
    } else {
        cb(null ,false);
    }
}

module.exports.multer = multer({dest:'public/uploads', fileFilter: fileFilter}).single('image');