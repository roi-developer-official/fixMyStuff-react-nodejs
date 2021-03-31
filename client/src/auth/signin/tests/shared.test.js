import { returnCustomFeedback, returnFormData } from "../../shared";
import { FormFeedback } from "../../../Global_UI/formFeedback";
import React from "react";
describe("renderCustomFeedback", () => {
  test("should return null when no error or success", () => {
    const action = returnCustomFeedback(null, null, null);
    expect(action).toBeNull();
  });

  test("should return formFeedback with message on error", () => {
    const action = returnCustomFeedback(true, "some error", false);
    const el = React.cloneElement(
      <FormFeedback error={true} message={"some error"} />
    );
    expect(action).toEqual(el);
  });

  test("should return formFeedBack with message on success", () => {
    const action = returnCustomFeedback(false, "success", true);
    const el = React.cloneElement(
      <FormFeedback error={false} message={"success"} />
    );
    expect(action).toEqual(el);
  });
});

describe("returnFormData", () => {
  const inputs = new Map();
  inputs.set("name", "Bob") ;
  inputs.set("age", 12);
  const formData = new FormData()
  formData.append("name", "Bob");
  formData.append("age", 12);

  test("should retun a formData files with inputs", () => {
      const form = returnFormData(inputs);
      expect(form).toEqual(formData);
  });

});
