import { screen, render } from "@testing-library/react";
import { Router } from "react-router";
import { createMemoryHistory } from "history";
import Nav, { formatPath } from "../nav";
import { storeFactory } from "../../tests/testUtils";
import { Provider } from "react-redux";

const history = createMemoryHistory();
const setup = () => {
  const store = storeFactory();
  return render(
    <Provider store={store}>
      <Router history={history}>
        <Nav />
      </Router>
    </Provider>
  );
};

describe("Nav", () => {
  test("formatted path replcale all space with -", () => {
    let string = "/-";
    string = formatPath(string);
    expect(string).toBe(" ");
  });

  test("show pathname", () => {
    const path = "/Find-jobs";
    history.push(path);
    setup();
    const pathname = screen.getByRole("heading", {
      name: formatPath(path),
    });
    expect(pathname).toBeInTheDocument();
  });
});
