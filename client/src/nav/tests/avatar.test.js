import { screen, render } from "@testing-library/react";
import Avatar from "../avatar/avatar";
const userInfo = {
  firstName: "John",
  lastName: "Doe",
  image: null,
};

test("avatar menu not visible by default", () => {
  render(<Avatar user={false} />);
  const firstName = screen.queryByText("John");
  expect(firstName).not.toBeInTheDocument();
  const image = screen.queryByRole("img");
  expect(image).not.toBeInTheDocument();
});

test("avatar rendered with image tag", async () => {
  userInfo.image =
    "https://images.pexels.com/photos/6615739/pexels-photo-6615739.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260";
  render(<Avatar user={userInfo} pathname={"/Find-jobs"} />);
  const firstName = await screen.findByText("John");
  expect(firstName).toBeInTheDocument();
  const image = screen.getByRole("img");
  expect(image).toBeInTheDocument();
  expect(image.src).toBe(
    "https://images.pexels.com/photos/6615739/pexels-photo-6615739.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
  );
});



