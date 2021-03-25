import { useEffect, useState } from "react";
import "./Avatar.css";
import AvatarMenu from "./menu/AvatarMenu";


export  function returnImageIfExists(userInfo) {
    if (userInfo.image !== null) {
      return (
        <div className="avatar_image">
          <img className="avatar_image" src={userInfo.image} alt="" />
        </div>
      );
    } else {
      return <div className="avatar_image_alt"></div>;
    }
  }


function Avatar({ isAuth, userInfo, pathname}) {
  const [showMenu, setShowMenu] = useState(false);
  const [showAvatar, setShowAvatar] = useState(false);

  useEffect(() => {
    window.document.addEventListener("click", hideAvatarMenu);
    let timer = setTimeout(() => {
      setShowAvatar(true);
    }, 100);


    return () => {
        window.document.removeEventListener("click", hideAvatarMenu);
        clearTimeout(timer)
    }
  }, []);


  function hideAvatarMenu() {
    setShowMenu(false);
  }
  function toggleAvatarMenu(e) {
    e.stopPropagation();
    setShowMenu(!showMenu);
  }

  if (isAuth && showAvatar && !(/[/]my-page/i.test(pathname)))
    return (
      <div className={`avatar_wrapper`}>
        {showMenu && <AvatarMenu></AvatarMenu>}
        <div
          onClick={(e) => toggleAvatarMenu(e)}
          className="avatar_menu_wrapper"
        >
        <p>&#9660;</p>
          <p className="avatar_name">{userInfo.firstName}</p>
        </div>
        {returnImageIfExists(userInfo)}
      </div>
    );
  else return null;
}

export default Avatar;
