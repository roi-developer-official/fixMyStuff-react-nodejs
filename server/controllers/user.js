const Post = require("../models/Post");
const { throwError } = require("../util/throwError");
const deleteFile = require("../util/deleteFile").deleteFile;
const User = require("../models/user");

module.exports.createPost = async (req, res, next) => {
  const user = req.user;
  const id = user.id;
  const data = req.body;
  let image = null;

  if (req.file) image = req.file.path;

  const post = await Post.create({
    title: data.title,
    maxPayment: data.maxPayment,
    description: data.description,
    image: image,
    userId: id,
  });

  if (!post) {
    if (req.file) deleteFile(req.file.path);
    return throwError("somthing went wrong", 500, next);
  } else res.status(200).send("post created");
};

const POST_PER_PAGE = 8;

module.exports.getPosts = async (req, res, next) => {

  let page = req.query.page;
  const userId = await User.scope({
    method: ["findByEmail", req.user.email],
  }).findOne({ attributes: ["id"] });

  let id = userId.dataValues.id
  const posts = await Post.findAll({
    where: {
      userId: id,
    },
    offset: (page - 1)  * POST_PER_PAGE,
    limit: POST_PER_PAGE
  });
  
  let output = {
    result: {
      posts: [...posts],
    },
  };

  res.status(200).json(output);
};
