import { screen, render } from "@testing-library/react";
import { Steps } from "../steps";

test("should color the right step", () => {
  render(<Steps steps={[1, 2, 3]} currnetStep={1} />);
  const currentStep = screen.getByText("1");
  expect(currentStep.className.split(" ")[2]).toBe("current");
});

test("should not color the wrong step", () => {
  render(<Steps steps={[1, 2, 3]} currnetStep={1} />);
  const currentStep = screen.getByText("2");
  expect(currentStep.className.split(" ")[2]).toBe("");
});
