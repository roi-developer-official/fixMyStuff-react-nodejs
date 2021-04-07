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
    ]
};

  test("should retun a formData with right values", () => {
    const formData = new FormData();
    formData.append("firstName", "bob");
    formData.append("lastName" , "alice");
    formData.append("role"  , 1);
    formData.append("profession", "carpenter");
    const form = returnFormData(signInInputs);
    expect(form.get("firstName")).toEqual(formData.get("firstName"));
    expect(form.get("lastName")).toEqual(formData.get("lastName"));
    expect(form.get("role")).toEqual(formData.get("role"));
    expect(form.get("profession")).toEqual(formData.get("profession"));
  });

  test('should add the rest to the formData', ()=>{
    const formData = new FormData();
    formData.append("firstName", "bob");
    formData.append("lastName" , "alice");
    formData.append("role"  , 1);
    formData.append("profession", "carpenter");
    const rest = new Map();
    rest.set("email", "test@test.com");
    const form = returnFormData(signInInputs, rest);
    expect(form.get("firstName")).toEqual(formData.get("firstName"));
    expect(form.get("lastName")).toEqual(formData.get("lastName"));
    expect(form.get("role")).toEqual(formData.get("role"));
    expect(form.get("profession")).toEqual(formData.get("profession"));
    expect(form.get("email")).toEqual("test@test.com");
  })
});

describe("returnFormDataLogin", ()=>{
  const loginInputs =  [
      { name: "firstName", value: "bob", error: "" },
      { name: "lastName", value: "alice", error: "" },
    ];

  test('shold return form data with right values', ()=>{
    const formData = new FormData();
    formData.append("firstName", "bob");
    formData.append("lastName" , "alice");
    const form = returnFormData(loginInputs);
    expect(form.get("firstName")).toEqual(formData.get("firstName"));
    expect(form.get("lastName")).toEqual(formData.get("lastName"));
  })
});

