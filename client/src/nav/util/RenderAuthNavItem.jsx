import { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import AuthDialog from "../authdialog/authDialog";

function UnAuthNavLink({ path }) {
  const [showDialog, setShowDialog] = useState(false);
  const history = useHistory();
  const pathname = history.location.pathname;

  function toggleDialog(e){
    e.stopPropagation();
    if(!/sign-in/i.test(pathname) && !/log-in/i.test(pathname))
      setShowDialog(!showDialog);
  }

  return (
    <div key={path}>
      <li
        onClick={toggleDialog}
        className="nav_item"
        style={{ cursor: "pointer" }}
      >
        {path}
      </li>
      {showDialog && <AuthDialog hideDialog={toggleDialog} />}
    </div>
  );
}

export default function RenderAuthNavItem({ path, isAuth }) {
  if (isAuth) {
    return (
      <li key={path}>
        <NavLink
          className="nav_item"
          to={path.replace(" ", "-")}
          activeStyle={{ color: "#08a072", fontWeight: "bold" }}
        >
          {path}
        </NavLink>
      </li>
    );
  } else return <UnAuthNavLink path={path} />;
}
