import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import RenderAuthNavItem from "../renderAuthNavItem";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";

const history = createMemoryHistory();

const setup = (path = "/my-page", isAuth = false)=>{
  return render(
    <Router history={history}>
      <RenderAuthNavItem path={path} isAuth={isAuth} />
    </Router>
  );
}
describe("renderAuthNavItem", () => {

  test("should render navitem according to auth props", () => {
    setup();
    const myPageLink = screen.queryByRole("link");
    expect(myPageLink).not.toBeInTheDocument();
  });

  test("should not show authDialog by default", () => {
    setup();
    const authDialog = screen.queryByText("You are not logged in");
    expect(authDialog).not.toBeInTheDocument();
  });

  test("should show authDialog when user is not authneticated", () => {
    setup();
    const myPageLink = screen.getByText(/My-page/i);
    userEvent.click(myPageLink);
    const signinlink = screen.getByRole("link", {
      name: "Sign-up for an account",
    });
    expect(signinlink).toBeInTheDocument();
    userEvent.click(signinlink);
    expect(signinlink).not.toBeInTheDocument();
    expect(history.location.pathname).toBe("/Sign-in");
  });

  test("redirect to my page when user authneticated", () => {
    setup("/My-page", true)
    const myPageLink = screen.getByText(/My-page/i);
    userEvent.click(myPageLink);
    expect(history.location.pathname).toBe("/My-page");
  });
});
