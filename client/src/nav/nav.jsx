import React, { useEffect, useState, useRef } from "react";
import "./nav.css";
import { useHistory, withRouter } from "react-router-dom";
import MobileNav from "./mobileNav";
import DesktopNav from "./desktopNav";
import { useAuth } from "../hooks/useAuth";

export function NavPathName() {
  const history = useHistory();
  const formattedpath = useRef();
  const [path, setPath] = useState("");

  useEffect(() => {
    formattedpath.current = formatPath(history.location.pathname);
    setPath(formattedpath.current);
  }, [history.location.pathname]);

  const element = /Find jobs/i.test(path) ? (
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

function Nav() {
  const [user, isAuth] = useAuth();
  return (
    <React.Fragment>
      <NavPathName />
      <DesktopNav user={user} isAuth={isAuth} navItems={navItems}></DesktopNav>
      <MobileNav isAuth={isAuth} navItems={navItems}></MobileNav>
    </React.Fragment>
  );
}
export default withRouter(Nav);

export function formatPath(path) {
  return path.substring(1).replace("-", " ");
}
