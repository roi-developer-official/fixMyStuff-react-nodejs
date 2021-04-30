import { Logo } from "../Global_UI";
import RenderAuthNavItem from "./renderAuthNavItem";
import { NavLink, useHistory } from "react-router-dom";
import Avatar from "./avatar";
import LoginButton from "./loginButton";
import NavSearch from "./navSearch";
import { useEffect, useState } from "react";

export function NavItems({ items, isAuth }) {

  return (
    <ul className="nav_items">
      {items.map((item, idx) => {
        if (idx === 1) return <RenderAuthNavItem key={item.name} path={item.name} isAuth={isAuth}/>;
        else
          return (
            <li key={item.name}>
              <NavLink
                className="nav_item"
                to={"/" + item.name.replace(' ', '-')}
                activeStyle={{ color: "#08a072", fontWeight: "bold" }}
              >
                {item.name}
              </NavLink>
            </li>
          );
      })}
      <LoginButton isAuth={isAuth} className="desktop" />
    </ul>
  );
}

export default function DesktopNav({ navItems, user, isAuth }) {
  const history = useHistory();
  const [showAvatar, setShowAvatar] = useState("");

  useEffect(()=>{
    const showAvatar = !/My-page/i.test(history.location.pathname) && !/edit-user-details/i.test(history.location.pathname);
    setShowAvatar(showAvatar);
  }, [history.location.pathname])

  return (
    <nav className="nav">
      <Logo></Logo>
      <NavSearch />
      <NavItems items={navItems} isAuth={isAuth}/>
      {showAvatar && <Avatar isAuth={isAuth} user={user}></Avatar>}
    </nav>
  );
}
