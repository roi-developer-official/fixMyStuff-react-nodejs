import "./App.css";
import { Route, Switch } from "react-router-dom";
import Home from "./home/home";
import Nav from "./nav/nav";
import { Fragment } from "react";
import { Redirect } from "react-router-dom";
import { useEffect } from "react";
import Signin from "./auth/signin/signin";
import LoginPage from "./auth/login/login";
import UserPage from "./userPage/userPage";
import AddPostPage from "./userPage/addPostPage";
import { useDispatch, useSelector } from "react-redux";
import { requestCsrfToken, authOnRefresh } from "./actions/authAction";

const AuthRoute = ({ children, ...rest }) => {
  const { user } = useSelector((state) => state);
  return (
    <Route
      {...rest}
      render={() => (user ? children : <Redirect to="/no" />)}
    ></Route>
  );
};

const UnAuthRoute = ({ children, ...rest }) => {
  const { user } = useSelector((state) => state);
  return (
    <Route
      {...rest}
      render={() => (!user ? children : <Redirect to="/" />)}
    ></Route>
  );
};

function App() {
  const dispatch = useDispatch();
  
  useEffect(() => {
    requestCsrfToken();
    dispatch(authOnRefresh());
  }, [dispatch]);

  return (
    <Fragment>
      <Nav></Nav>
      <main>
        <Switch>
          <Route path="/Find-jobs" component={Home}></Route>
          <UnAuthRoute path="/Log-in">
            <LoginPage></LoginPage>
          </UnAuthRoute>
          <UnAuthRoute path="/Sign-in">
            <Signin></Signin>
          </UnAuthRoute>
          <Route path="/Create-Post" component={AddPostPage}></Route>
          <Route path="/My-page" component={UserPage}></Route>
          <Redirect exact from="/" to="/Find-jobs"></Redirect>
          <Redirect from="*" to="/"></Redirect>
        </Switch>
      </main>
    </Fragment>
  );
}

export default App;
