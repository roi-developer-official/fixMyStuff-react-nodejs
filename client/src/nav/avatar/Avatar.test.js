import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Router } from "react-router";
import { AuthProvider } from "../../context/authContext";
import { createMemoryHistory} from 'history';
import Avatar from "./Avatar";
const userInfo = {
  firstName: "John",
  lastName: "Doe",
  image: null,
};
test("avatar menu not visible by default", () => {
  render(<Avatar isAuth={false} userInfo={{}} />);
  const firstName = screen.queryByText("John");
  expect(firstName).not.toBeInTheDocument();
  const image = screen.queryByRole("img");
  expect(image).not.toBeInTheDocument();
});

test("avatar rendered with image tag", async () => {
  userInfo.image =
    "https://images.pexels.com/photos/6615739/pexels-photo-6615739.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260";
  render(<Avatar isAuth={true} userInfo={userInfo} pathname={"/Find-jobs"} />);
  const firstName = await screen.findByText("John");
  expect(firstName).toBeInTheDocument();
  const image = screen.getByRole("img");
  expect(image).toBeInTheDocument();
  expect(image.src).toBe(
    "https://images.pexels.com/photos/6615739/pexels-photo-6615739.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
  );
});

test("avatar menu redirect to login when user logged out", async () => {
    const history = createMemoryHistory();
    render(
        <Router history={history}>
        <Avatar isAuth={true} userInfo={userInfo} pathname={"/Find-jobs"} />
        </Router>,
        { wrapper: AuthProvider }
    );

  const firstName = await screen.findByText("John");
  userEvent.click(firstName);

  const logoutButton = screen.getByText("Logout");
  userEvent.click(logoutButton);
  expect(history.location.pathname).toBe('/Log-in');

});

