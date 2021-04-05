import { Logo } from "../../Global_UI";
import RenderAuthNavItem from "../util/renderAuthNavItem";
import { NavLink } from "react-router-dom";
import Avatar from "../avatar/avatar";
import LoginButton from "../loginbutton/loginButton";
import NavSearch from "./nav-search/navSearch";

export function NavItems({ items, isAuth, pathname }) {

  return (
    <ul className="nav_items">
      {items.map((i, idx) => {
        if (idx === 1) return <RenderAuthNavItem key={i.name} path={i.name} isAuth={isAuth}/>;
        else
          return (
            <li key={i.name}>
              <NavLink
                className="nav_item"
                to={pathname}
                activeStyle={{ color: "#08a072", fontWeight: "bold" }}
              >
                {i.name}
              </NavLink>
            </li>
          );
      })}
      <LoginButton isAuth={isAuth} className="desktop" />
    </ul>
  );
}

export default function DesktopNav({ navItems, userInfo, pathname, isAuth }) {

  return (
    <nav className="nav">
      <Logo></Logo>
      <NavSearch />
      <NavItems items={navItems} isAuth={isAuth} pathname={pathname} />
      <Avatar user={userInfo}></Avatar>
    </nav>
  );
}
