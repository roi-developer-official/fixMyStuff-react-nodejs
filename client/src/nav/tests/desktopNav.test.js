import { render, screen } from "@testing-library/react";
import { AuthProvider } from "../../context/authContext";
import DesktopNav from "../desktop/desktopNav";
import { Router } from "react-router";
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from "history";

const navItems = [
    { name: "Find jobs" },
    { name: "My page" },
    { name: "FAQ" },
    { name: "Contact us" },
  ];


describe("Desktop nav", () => {
  test("displays a logo, input search and login button", async () => {
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <DesktopNav navItems={[]} hideAndShowAuthDialog={jest.fn()} />
      </Router>
    , {
      wrapper: AuthProvider,
    });
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

  test('redirect to /login when login btn is pressed', ()=>{
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <DesktopNav isAuth={false} navItems={navItems} hideAndShowAuthDialog={jest.fn()} />
      </Router>
    );

    const loginButton = screen.getByRole('button', {
        name: 'Login'
    });
    userEvent.click(loginButton);
    expect(history.location.pathname).toBe('/Log-in');
  });

  
  test('not show login button when user is authnenticated', ()=>{
    const history = createMemoryHistory();
    render(
        <Router history={history}>
          <DesktopNav isAuth={true} navItems={navItems} hideAndShowAuthDialog={jest.fn()} />
        </Router>
      );
      const loginButton = screen.queryByRole('button', {
          name: 'Login'
      }); 
      expect(loginButton).not.toBeInTheDocument();
  });
});
