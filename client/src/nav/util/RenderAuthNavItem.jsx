import { useState } from "react";
import { NavLink } from "react-router-dom";
import AuthDialog from "../authdialog/authDialog";

function UnAuthNavLink({ path }) {
  const [showDialog, setShowDialog] = useState(false);

  function toggleDialog(e){
    e.stopPropagation();
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
