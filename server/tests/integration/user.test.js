// require("mysql2/node_modules/iconv-lite").encodingExists("foo");
const bcrypt = require("bcrypt");
const request = require("supertest");
const Password = require("../../models/password");
const User = require("../../models/user");
const Post = require("../../models/Post");
let server = require("../../app");

const user = {
  id: 1,
  email: "test@test.com",
  password: "qwqwqwQ1",
  firstName: "Bob",
  lastName: "Alice",
  city: "Tel aviv",
  image: null,
  role: 2,
  profession: "Carpenter",
  experience: "none",
};
const data = {
  email: user.email,
  password: user.password,
};
const post = {
  title: "some title",
  maxPayment: 10,
  description: "good description",
  image: null,
  userId: 1,
};

let page = 1;

let deleteReqData = {
  deleted: [],
  email: user.email,
  page: 1,
  order: "createdAt",
};

let editReqData = {
  title: "updated title",
  maxPayment: 20,
  description: "updated description",
  image: null,
  userId: 1,
};

describe("user", () => {
  let cookie;
  let token;
  let loginRes;
  let _loginToken;

  async function createUserAndPassword() {
    await User.create(user);
    const hash = await bcrypt.hash(user.password, 12);
    await Password.create({ value: hash, userId: user.id, id: 1 });
  }

  async function deleteUserAndPassword() {
    await User.destroy({ where: { id: 1 } });
    await Password.destroy({ where: { id: 1 } });
  }

  async function loginPostExec() {
    loginRes = await request(server)
      .post("/api/auth/login")
      .set("Cookie", cookie)
      .send({
        _csrf: token,
        ...data,
      });
    _loginToken = loginRes.headers["set-cookie"][0];
  }

  function createPostExec(sendPost = post) {
    return request(server)
      .post("/api/user/create-post")
      .set("Cookie", [cookie, _loginToken])
      .send({
        _csrf: token,
        ...sendPost,
      });
  }

  function deletePostExec(reqData = deleteReqData) {
    return request(server)
      .post("/api/user/delete-posts")
      .set("Cookie", [cookie, _loginToken])
      .send({
        _csrf: token,
        ...reqData,
      });
  }

  async function setCookieAndToken() {
    const res = await request(server).get("/api/initv");
    cookie = res.headers["set-cookie"];
    token = res.body.csrfToken;
  }

  function getPostsExec() {
    return request(server)
      .get(`/api/user/posts?&page=${page}&order=createdAt`)
      .set("Cookie", _loginToken)
      .send();
  }

  function getSinglePostExec(id = 1) {
    return request(server)
      .get(`/api/user/single-post/${id}`)
      .set("Cookie", _loginToken);
  }

  function editPostExec(reqData = editReqData, id = 1) {
    return request(server)
      .post(`/api/user/edit-post/${id}`)
      .set("Cookie", [cookie, _loginToken])
      .send({
        _csrf: token,
        ...reqData,
      });
  }

  beforeEach(async () => {
    await createUserAndPassword();
    await setCookieAndToken();
    await loginPostExec();
  });

  afterEach(async () => {
    await deleteUserAndPassword();
    await Post.destroy({ where: {}, truncate: true });
    await server.close();
    deleteReqData = {
      deleted: [],
      email: user.email,
      page: 1,
      order: "createdAt",
    };
  });

  describe("user --post/create-post", () => {
    test("should pass the validation with right values", async () => {
      const res = await createPostExec();
      expect(res.status).toBe(201);
      expect(res.body).toMatchObject(post);
    });

    test("should reject the request when no values incorrect", async () => {
      let tempToken = token;
      token = "not a token";
      const res = await createPostExec();
      expect(res.body.error.message).toBe("invalid csrf token");
      token = tempToken;
    });

    test("should reject the request when values not currect", async () => {
      let res = await createPostExec(user.email, {});
      expect(res.status).toBe(401);
      expect(res.body.error.message).toBe("Invalid value");
    });
  });

  describe("user --get/posts", () => {
    test("should pass the validation with right values", async () => {
      let res = await getPostsExec();
      expect(res.status).toBe(200);
    });

    test("sholud return error when credentials incorrect", async () => {
      let tempLoginToken = _loginToken;
      _loginToken = "nothing";
      let res = await getPostsExec();
      expect(res.status).toBe(401);
      expect(res.body.error.message).toBe("No authorization token was found");
      _loginToken = tempLoginToken;
    });

    test("should return error when page is not currect value", async () => {
      page = "bla bla";
      let res = await getPostsExec();
      expect(res.status).toBe(401);
      expect(res.body.error.message).toBe("Invalid value");
      page = 1;
    });

    test("should return post array", async () => {
      await createPostExec();
      await createPostExec();
      let res = await getPostsExec();
      let posts = res.body.result.posts;
      let count = res.body.result.count;
      expect(count).toBe(2);
      expect(posts).toHaveLength(2);
      expect(posts[0]).toMatchObject(post);
      expect(res.status).toBe(200);
    });
  });

  describe("user --post/delete-posts", () => {
    test("should pass validation with right values", async () => {
      await createPostExec();
      await createPostExec();
      const deleteReqData = {
        deleted: [1, 2],
        email: user.email,
        page: 2,
        order: "createdAt",
      };
      const res = await deletePostExec(deleteReqData);
      expect(res.status).toBe(200);
    });

    async function createPosts(count) {
      for (let i = 0; i < count; i++) {
        await createPostExec();
      }
    }
    test("should retrun array of posts,count and page on page deleted", async () => {
      await createPosts(16);

      deleteReqData.deleted = [1, 2, 3, 4, 5, 6, 7, 8];
      deleteReqData.page = 1;

      const res = await deletePostExec();
      const { page, count, posts } = res.body.results;
      expect(posts).toHaveLength(8);
      expect(page).toBe(1);
      expect(count).toBe(8);
    });

    test("should retrun page 1 with 8 posts", async () => {
      await createPosts(16);
      deleteReqData.page = 2;
      deleteReqData.deleted = [8, 9, 10, 11, 12, 13, 14, 15];

      const res = await deletePostExec();
      const { page, count, posts } = res.body.results;
      expect(posts).toHaveLength(8);
      expect(page).toBe(1);
      expect(count).toBe(8);
    });

    test("should retrun the same page with less posts", async () => {
      await createPosts(16);
      deleteReqData.deleted = [8, 9, 10, 11, 12, 13, 14];
      deleteReqData.page = 2;

      const res = await deletePostExec();
      const { page, count, posts } = res.body.results;
      expect(posts).toHaveLength(1);
      expect(page).toBe(2);
      expect(count).toBe(9);
    });
  });

  describe("user --get/single-post", () => {
    test("should pass the validation when currect values given", async () => {
      await createPostExec();
      const res = await getSinglePostExec();
      expect(res.body).toMatchObject(post);
      expect(res.status).toBe(200);
    });

    test("should return 401 when invalid is given", async () => {
      await createPostExec();
      const res = await getSinglePostExec("abc");
      expect(res.status).toBe(401);
      expect(res.error.text).toMatch(/invalid|id/);
    });

    test("should return 404 when no id was given", async () => {
      await createPostExec();
      const res = await getSinglePostExec("");
      expect(res.status).toBe(404);
      expect(res.error.message).toMatch("cannot GET /api/user/single-post/");
    });
  });

  describe("user --post/edit-post", () => {
    test("should pass the validation when currect values was given", async () => {
      await createPostExec();
      let res = await editPostExec();
      console.log(res.body);
      expect(res.body).toMatchObject(editReqData);
      expect(res.status).toBe(200);
    });

    test("should retrun error when no post id is given", async () => {
      await createPostExec();
      let res = await editPostExec(editReqData, "");
      expect(res.error.message).toMatch("cannot POST /api/user/edit-post/");
      expect(res.status).toBe(404);
    });

    test("should retrun error when post id in not valid", async () => {
      await createPostExec();
      let res = await editPostExec(editReqData, "abc");
      expect(res.error.text).toMatch(/invalid|id/);
      expect(res.status).toBe(401);
    });
  });
});
