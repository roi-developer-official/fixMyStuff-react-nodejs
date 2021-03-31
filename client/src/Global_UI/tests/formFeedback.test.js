import {  render, screen } from "@testing-library/react";
import { FormFeedback } from "../formFeedback";

test("should color red on error", () => {
  render(<FormFeedback error={true} message={"failed"} />);
  const wrappingDiv = screen.getByTestId("form-feedback-wrapper");
  expect(wrappingDiv).toHaveStyle("background-color: rgba(255, 0, 21, 0.61)");
});

test("should show the error message", () => {
  render(<FormFeedback error={true} message={"failed"} />);
  const paragraph = screen.getByText("failed");
  expect(paragraph).toBeInTheDocument();
  expect(paragraph.textContent).toBe("failed");
});

test("should color green on success", () => {
  render(<FormFeedback error={false} message={"success"} success={true} />);
  const wrappingDiv = screen.getByTestId("form-feedback-wrapper");
  expect(wrappingDiv).toHaveStyle("background-color: rgba(68, 196, 68, 0.671)");
});

test("should show suceess message on success", () => {
  render(<FormFeedback error={false} message={"success"} success={true} />);
  const paragraph = screen.getByText("success");
  expect(paragraph).toBeInTheDocument();
  expect(paragraph.textContent).toBe("success");
});
