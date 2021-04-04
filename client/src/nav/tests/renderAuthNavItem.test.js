import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import RenderAuthNavItem from "../util/renderAuthNavItem";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";

describe("renderAuthNavItem", () => {
  const path = "My-page";
  const history = createMemoryHistory();
  test("should render navitem according to auth props", () => {
    render(
      <Router history={history}>
        <RenderAuthNavItem path={path} isAuth={false} />
      </Router>
    );
    const myPageLink = screen.queryByRole("link");
    expect(myPageLink).not.toBeInTheDocument();
  });

  test("should not show authDialog by default", () => {
    render(
      <Router history={history}>
        <RenderAuthNavItem path={path} isAuth={false} />
      </Router>
    );
    const authDialog = screen.queryByText("You are not logged in");
    expect(authDialog).not.toBeInTheDocument();
  });

  test("should show authDialog when user is not authneticated", () => {
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <RenderAuthNavItem path={path} isAuth={false} />
      </Router>
    );
    const myPageLink = screen.getByText("My-page");
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
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <RenderAuthNavItem path={path} isAuth={true} />
      </Router>
    );
    const myPageLink = screen.getByText("My-page");
    userEvent.click(myPageLink);
    expect(history.location.pathname).toBe("/My-page");
  });
});
