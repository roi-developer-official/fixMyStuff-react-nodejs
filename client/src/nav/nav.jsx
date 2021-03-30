import React, { useContext, useEffect, useState, useRef } from "react";
import "./nav.css";
import { useHistory, withRouter } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import MobileNav from "./mobile/mobileNav";
import DesktopNav from "./desktop/desktopNav";

const navItems =  [
    { name: "Find jobs" },
    { name: "My page" },
    { name: "FAQ" },
    { name: "Contact us" },
  ];

export function formatPath(path) {
    return path.substring(1).replace("-", " ");
}

function Nav(){
    const history = useHistory();
    const formattedpath = useRef();
    const [pathname,setPathName] = useState('');
    const context = useContext(AuthContext);
    const userInfo = context.getUserInfo();
    const isAuth = context.isAuth();

    useEffect(()=>{
        formattedpath.current = formatPath(history.location.pathname);
        setPathName(formattedpath.current)
    },[history.location.pathname])

    return (
        <React.Fragment>
        {!(/my-page/i.test(pathname))  && <h2 className="path">{pathname}</h2>}

        <DesktopNav
          userInfo={userInfo}
          navItems={navItems}
          pathname={pathname}
          isAuth={isAuth}
        ></DesktopNav>

        <MobileNav 
        navItems={navItems} 
        isAuth={isAuth}></MobileNav>
      </React.Fragment>

    )

}

export default withRouter(Nav);
