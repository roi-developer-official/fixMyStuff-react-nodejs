const multer = require("multer");

function makeid() {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < 5; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const url = req.url;
    if (url === "/api/auth/signup") cb(null, "public/uploads/users");
    else if (url === "/api/user/create-post" || url.startsWith("/api/user/edit-post"))
      cb(null, "public/uploads/posts");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + makeid() + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/jpg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

module.exports.multer = multer({
  storage: storage,
  fileFilter: fileFilter,
}).single("image");
