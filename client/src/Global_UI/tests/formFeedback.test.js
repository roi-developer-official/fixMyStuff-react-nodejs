import {  render, screen } from "@testing-library/react";
import { FormFeedback } from "../formFeedback";


const setup =(error = false, message = null, success = false) =>{
  return render(<FormFeedback error={error} message={message} success={success} />);
}
test("should color red on error", () => {
  setup(true,"Failed!")
  const wrappingDiv = screen.getByTestId("form-feedback-wrapper");
  expect(wrappingDiv).toHaveStyle("background-color: rgba(255, 0, 21, 0.61)");
});

test("should show the error message", () => {
  setup(true,"Failed!")
  const paragraph = screen.getByText("Failed!");
  expect(paragraph).toBeInTheDocument();
});

test("should color green on success", () => {
  setup(false,"success", true);
  const wrappingDiv = screen.getByTestId("form-feedback-wrapper");
  expect(wrappingDiv).toHaveStyle("background-color: rgba(68, 196, 68, 0.671)");
});

test("should show suceess message on success", () => {
  setup(false,"success", true);
  const paragraph = screen.getByText("success");
  expect(paragraph).toBeInTheDocument();
  expect(paragraph.textContent).toBe("success");
});
