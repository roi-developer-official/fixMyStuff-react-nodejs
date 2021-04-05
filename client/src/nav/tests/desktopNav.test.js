import { render, screen } from "@testing-library/react";
import DesktopNav from "../desktopNav";
import { Router } from "react-router";
import userEvent from "@testing-library/user-event";
import { createMemoryHistory } from "history";

let history = createMemoryHistory();
const setup = (navItems = [], user = {}, isAuth = false) => {
  return render(
    <Router history={history}>
      <DesktopNav navItems={navItems} isAuth={isAuth} user={user} />
    </Router>
  );
};

describe("Desktop nav", () => {
  test("should display a logo, input search and login button", async () => {
    setup();
    const logo = screen.getByRole("heading", {
      name: /Fix My Stuff/,
    });
    const loginBottun = screen.getByRole("button", {
      name: "Login",
    });
    const inputSearch = screen.getByRole("textbox");
    expect(logo).toBeInTheDocument();
    expect(inputSearch).toBeInTheDocument();
    expect(loginBottun).toBeInTheDocument();
  });

  test("redirect to /login when login btn is pressed", () => {
    setup();
    const loginButton = screen.getByRole("button", {
      name: "Login",
    });
    userEvent.click(loginButton);
    expect(history.location.pathname).toBe("/Log-in");
  });

  test("should not show login button when user is authnenticated", () => {
    const user = {
      name: "John",
    };
    setup([], user, true);
    const loginButton = screen.queryByRole("button", {
      name: "Login",
    });
    expect(loginButton).not.toBeInTheDocument();
  });
});
