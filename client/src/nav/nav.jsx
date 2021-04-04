import React, { useEffect, useState, useRef } from "react";
import "./nav.css";
import { useHistory, withRouter } from "react-router-dom";
import MobileNav from "./mobile/mobileNav";
import DesktopNav from "./desktop/desktopNav";
import { useSelector } from "react-redux";

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
    const { user } = useSelector(state=>state.authReducer);


    useEffect(()=>{
        formattedpath.current = formatPath(history.location.pathname);
        setPathName(formattedpath.current)
    },[history.location.pathname])


    return (
        <React.Fragment>
        {!(/my-page/i.test(pathname))  && <h2 className="path">{pathname}</h2>}

        <DesktopNav
          userInfo={user}
          navItems={navItems}
          pathname={pathname}
        ></DesktopNav>

        <MobileNav 
        navItems={navItems} 
        isAuth={user}>
        </MobileNav>
      </React.Fragment>

    )

}

export default withRouter(Nav);
