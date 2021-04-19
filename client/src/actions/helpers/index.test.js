import { returnFormData } from "./";
describe("returnFormData", () => {
  const signInInputs = {
    page1: [
      { name: "firstName", value: "bob", error: "" },
      { name: "lastName", value: "alice", error: "" },
    ],
    page3: [
      { name: "role", value: 1, error: "" },
      { name: "profession", value: "carpenter", error: "" },
    ],
  };

  test("should retun a formData with right values", () => {
    const formData = new FormData();
    formData.append("firstName", "bob");
    formData.append("lastName", "alice");
    formData.append("role", 1);
    formData.append("profession", "carpenter");
    const form = returnFormData(signInInputs);
    expect(form.get("firstName")).toEqual(formData.get("firstName"));
    expect(form.get("lastName")).toEqual(formData.get("lastName"));
    expect(form.get("role")).toEqual(formData.get("role"));
    expect(form.get("profession")).toEqual(formData.get("profession"));
  });

  test("should add the rest to the formData", () => {
    const formData = new FormData();
    formData.append("firstName", "bob");
    formData.append("lastName", "alice");
    formData.append("role", 1);
    formData.append("profession", "carpenter");
    formData.append("email", "test@test.com");
    const rest = new Map();
    rest.set("email", "test@test.com");
    const form = returnFormData(signInInputs, rest);
    expect(form.get("firstName")).toEqual(formData.get("firstName"));
    expect(form.get("lastName")).toEqual(formData.get("lastName"));
    expect(form.get("role")).toEqual(formData.get("role"));
    expect(form.get("profession")).toEqual(formData.get("profession"));
    expect(form.get("email")).toEqual("test@test.com");
    let len = 0;

    for (let i of form.entries()) {
      len++;
      //check for values
      expect(i[1]).toEqual(formData.get(i[0])); //bob === .get("firstName")
      //check for keys
      expect(formData.has(i[0])).toBeTruthy(); //.has === "firstName"
    }

    expect(len).toBe(5);
  });

  test("shold return form data with right values", () => {
    const loginInputs = [
      { name: "firstName", value: "bob", error: "" },
      { name: "lastName", value: "alice", error: "" },
    ];
    const formData = new FormData();
    formData.append("firstName", "bob");
    formData.append("lastName", "alice");
    const form = returnFormData(loginInputs);

    let len = 0;
    for (let i of form.entries()) {
      len++;
      expect(i[1]).toEqual(formData.get(i[0]));
      expect(formData.has(i[0])).toBeTruthy();
    }

    expect(len).toBe(2);
  });
});

