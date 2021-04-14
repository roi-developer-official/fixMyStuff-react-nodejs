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
}

describe("user --get/posts", () => {
  let cookie;
  let token;
  let loginRes;

  async function createPost(){
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

  async function setCookieAndToken() {
    const res = await request(server).get("/api/initv");
    cookie = res.headers["set-cookie"];
    token = res.body.csrfToken;
  }

  function getPostsExec() {
    return request(server)
      .get(`/api/user/posts?&email=${data.email}&page=1`)
      .set("Cookie", [cookie, loginRes.headers["set-cookie"][0]])
      .send();
  }

  beforeEach(async () => {
    await createUserAndPassword();
    await setCookieAndToken();
    await loginPostExec();
    await createPost();
    await createPost();
  });

  afterEach(async () => {
    await deleteUserAndPassword();
    server.close();
  });

  test("should pass the validation with right values", async () => {
    let res = await getPostsExec();
    expect(res.status).toBe(200);
  });

  test('sholud return error when values are incorrect', async ()=>{
    data.email ="nothing";
    data.password = "no-password";
    let res = await getPostsExec();
    expect(res.status).toBe(401);
    expect(res.body.error.message).toBe("Invalid value");
    data.email = user.email;
    data.password = user.password;
  });

  test('should return post array',async ()=>{
    let res = await getPostsExec();
    let posts = res.body.result.posts;
    expect(posts).toHaveLength(2);
    expect(posts[0]).toMatchObject(post);
    expect(res.status).toBe(200);
  });

});


