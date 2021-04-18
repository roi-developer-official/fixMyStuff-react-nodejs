const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const path = require("path");
const { multer } = require("./util/storage");
const cookieParser = require("cookie-parser");
const csurf = require("csurf");
const expressJwt = require("express-jwt");
const Post = require("./models/Post");
require("../server/util/database");
require("config");
// require('./util/fillDatabase');

app.use(bodyParser.json());
app.use(cookieParser());

const csurfProtection = csurf({
  cookie: {
    httpOnly: true,
    sameSite: true,
    secure: process.env.NODE_ENV !== "development" ? true : false,
  },
});

const checkJwt = expressJwt({
  secret: process.env.TOKEN_SECRET,
  getToken: (req) => req.cookies.connect,
  algorithms: ["HS256"],
});

app.use(csurfProtection);

app.get("/api/initv", (req, res) => {
  res.status(200).json({ csrfToken: req.csrfToken() });
});

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.use(
  "/public/uploads",
  express.static(path.join(__dirname, "public/uploads"))
);
// app.use('/public',express.static(path.join(__dirname, '/public')));
app.use(multer);

app.use("/api/user", checkJwt, userRoute);
app.use("/api/auth", authRoute);

app.use((error, req, res, next) => {
  console.log("app-error", error);
  const status = error.status ? error.status : error.code ? error.code : 500;
  const message = error.message
    ? error.message
    : error.inner
    ? error.inner.message
    : "something went wrong";
  let reqError = {
    error: {
      message: message,
    },
  };
  if (error.invalidInputs && error.invalidInputs.length > 0) {
    reqError.error.invalidInputs = error.invalidInputs;
  }

  res.status(status).json(reqError);
});

const PORT = process.env.PORT || 4200;
let server;

server = app.listen(PORT, (err) => {
  if (err) {
    console.log("app-error", err);
  } else {
    Post.destroy({where: {}}, { truncate: true });
    // for (let i = 0; i < 50; i++) {
    //   Post.create({
    //     title: "title" + i,
    //     userId: 1,
    //     description:
    //       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut ducimus assumenda voluptatem autem perferendis molestias, exercitationem animi quibusdam sed veniam obcaecati, nobis rerum architecto quod! Ut reiciendis soluta voluptatum ex repellat commodi explicabo vel dolorum. Expedita quidem quibusdam illum earum beatae, maxime odio? Aliquam blanditiis, magnam saepe at vel obcaecati.",
    //     image: "public/uploads/posts/1618735783538fajMIIMG_0163.JPG",
    //     maxPayment: 100,
    //   });
    // }
    // console.log('sucess_connection_server');
  }
});

module.exports = server;
