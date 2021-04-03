import { returnFormData } from "./";

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

describe("returnFormData", () => {
  test("should retun a formData files with inputs", () => {
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
});