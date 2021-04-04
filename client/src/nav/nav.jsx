import React, { useEffect, useState, useRef } from "react";
import "./nav.css";
import { useHistory, withRouter } from "react-router-dom";
import MobileNav from "./mobile/mobileNav";
import DesktopNav from "./desktop/desktopNav";
import { useSelector } from "react-redux";

export function NavPathName({ path }) {
  const element = /My-page/i.test(path) ? (
    <h2 className="path">{path}</h2>
  ) : null;
  return element;
}

const navItems = [
  { name: "Find jobs" },
  { name: "My page" },
  { name: "FAQ" },
  { name: "Contact us" },
];

export function formatPath(path) {
  return path.substring(1).replace("-", " ");
}

function Nav() {
  const history = useHistory();
  const formattedpath = useRef();
  const [pathname, setPathName] = useState("");
  const { user } = useSelector((state) => state.authReducer);
  const isAuth = useRef();

  useEffect(() => {
    isAuth.current = Object.keys(user).length > 0;
  }, [user]);

  useEffect(() => {
    formattedpath.current = formatPath(history.location.pathname);
    setPathName(formattedpath.current);
  }, [history.location.pathname]);

  return (
    <React.Fragment>
      <NavPathName path={pathname} />
      <DesktopNav
        userInfo={user}
        isAuth={isAuth.current}
        navItems={navItems}
        pathname={pathname}
      ></DesktopNav>
      <MobileNav navItems={navItems} isAuth={isAuth.current}></MobileNav>
    </React.Fragment>
  );
}

export default withRouter(Nav);
