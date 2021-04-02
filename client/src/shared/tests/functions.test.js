import { returnFormData } from "../functions";
describe("returnFormData", () => {
  const inputs = [
    { name: "firstName", value: "Bob" },
    { name: "age", value: 12 },
  ];
  const formData = new FormData();
  formData.append("firstName", "Bob");
  formData.append("age", 12);

  test("should retun a formData files with inputs", () => {
    const form = returnFormData(inputs);
    expect(form).toEqual(formData);
  });
});
