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
let page = 1;
const post = {
  title: "some title",
  maxPayment: 10,
  description: "good description",
  image: null,
  userId: 1,
};

describe("user", () => {
  let cookie;
  let token;
  let loginRes;

  async function createPost() {
    await Post.create(post);
  }
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
  }

  async function createPostExec(reqData) {
    return request(server)
      .post("/api/user/create-post")
      .set("Cookie", [cookie, loginRes.headers["set-cookie"][0]])
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

  beforeEach(async () => {
    await createUserAndPassword();
    await setCookieAndToken();
    await loginPostExec();
  });

  afterEach(async () => {
    await deleteUserAndPassword();
    server.close();
  });

  describe("user --post/create-post", () => {

    test("should pass the validation with right values", async () => {
      let reqData = {
        ...post,
        email: user.email,
      };
      const res = await createPostExec(reqData);
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
      let reqData = {
        email: user.email,
        post: {},
      };
      let res = await createPostExec(reqData);
      expect(res.status).toBe(401);
      expect(res.body.error.message).toBe("Invalid value");
    });
  });

  describe("user --get/posts", () => {
    function getPostsExec() {
      return request(server)
        .get(`/api/user/posts?&email=${data.email}&page=${page}`)
        .set("Cookie", loginRes.headers["set-cookie"][0])
        .send();
    }

    test("should pass the validation with right values", async () => {
      let res = await getPostsExec();
      expect(res.status).toBe(200);
    });

    test("sholud return error when credentials incorrect", async () => {
      data.email = "nothing";
      let res = await getPostsExec();
      expect(res.status).toBe(401);
      expect(res.body.error.message).toBe("Invalid value");
      data.email = user.email;
    });

    test("should return error when page is not currect value", async () => {
      page = "bla bla";
      let res = await getPostsExec();
      expect(res.status).toBe(401);
      expect(res.body.error.message).toBe("Invalid value");
      page = 1;
    });

    test("should return post array", async () => {
      await createPost();
      await createPost();
      let res = await getPostsExec();
      let posts = res.body.result.posts;
      expect(posts).toHaveLength(2);
      expect(posts[0]).toMatchObject(post);
      expect(res.status).toBe(200);
    });
  });
});
