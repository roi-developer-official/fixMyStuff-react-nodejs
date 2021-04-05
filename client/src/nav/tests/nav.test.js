import { screen, render } from "@testing-library/react";
import { Router } from "react-router";
import { createMemoryHistory } from "history";
import Nav, { formatPath } from "../nav";
import { storeFactory } from "../../tests/testUtils";
import { Provider } from "react-redux";

describe("Nav", () => {
  const history = createMemoryHistory();
  
  test("formatted path replcale all space with -", () => {
    let string = "/-";
    string = formatPath(string);
    expect(string).toBe(" ");
  });

  test("show pathname", () => {
    const path = "/Find-jobs";
    history.push(path);
    const store = storeFactory();
    render(
      <Provider store={store}>
        <Router history={history}>
          <Nav />
        </Router>
      </Provider>
    );
    const pathname = screen.getByRole("heading", {
      name: formatPath(path),
    });
    expect(pathname).toBeInTheDocument();
  });
});
