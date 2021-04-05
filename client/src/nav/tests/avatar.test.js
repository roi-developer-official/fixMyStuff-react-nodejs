import { screen, render } from "@testing-library/react";
import Avatar from "../avatar";


const setup = (user = {}, isAuth=false)=>{
  return render(<Avatar user={user} isAuth={isAuth} />);
}

test("avatar menu should not be visible by default", () => {
  setup();
  const firstName = screen.queryByText("John");
  expect(firstName).not.toBeInTheDocument();
  const image = screen.queryByRole("img");
  expect(image).not.toBeInTheDocument();
});

test("avatar rendered with image tag", async () => {
  const user = {
    firstName: "John",
    lastName: "Doe",
    image: "https://images.pexels.com/photos/6615739/pexels-photo-6615739.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  };
  setup(user, true);
  const firstName = await screen.findByText("John");
  expect(firstName).toBeInTheDocument();
  const image = screen.getByRole("img");
  expect(image).toBeInTheDocument();
  expect(image.src).toBe(
    "https://images.pexels.com/photos/6615739/pexels-photo-6615739.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
  );
});



