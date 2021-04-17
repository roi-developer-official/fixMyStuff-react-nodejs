const Post = require("../models/Post");
const { throwError } = require("../util/throwError");
const { Op } = require("sequelize");
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
  } else res.status(201).json(post.dataValues);
};

const POST_PER_PAGE = 8;

module.exports.getPosts = async (req, res, next) => {
  let page = req.query.page;
  let order = req.query.order;
  let orderBy = order === "updatedAt" ? "DESC" : "ASC";

  let id = req.user.id;
  const { count, rows } = await Post.findAndCountAll({
    where: {
      userId: id,
    },
    order: [[order, orderBy]],
    offset: (page - 1) * POST_PER_PAGE,
    limit: POST_PER_PAGE,
  });

  let output = {
    result: {
      posts: [...rows],
      count: count,
    },
  };

  res.status(200).json(output);
};

module.exports.deletePosts = async (req, res, next) => {
  let ids = req.body.deleted;
  let id = req.user.id;
  let page = req.body.page;
  let order = req.body.order;
  let orderBy = order === "updatedAt" ? "DESC" : "ASC";

  let deleted = await Post.destroy({
    where: {
      userId: id,
      id: [...ids],
    },
  });

  if (!deleted === ids.length) {
    return next("something went wrong!, Unable to delete!");
  }

  let result = {
    count: 0,
    rows: [],
  };

  while (!result.rows.length > 0  && page > 0) {
    result = await Post.findAndCountAll({
      where: {
        userId: id,
      },
      order: [[order, orderBy]],
      offset: (page - 1) * POST_PER_PAGE,
      limit: POST_PER_PAGE,
    });
    page--;
  }

  console.log(result);

  res.status(200).json({
    results: { posts: [...result.rows], count: result.count, page: page + 1 },
  });
};
