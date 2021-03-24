import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import './avatar.css'
import AvatarMenu from './menu/avatarMenu';
function Avatar ({isAuth, userInfo}){
    
    const history = useHistory();
    const [showMenu, setShowMenu] = useState(false);
    const [showAvatar,setShowAvatar] = useState(false);

    useEffect(()=>{
        window.document.addEventListener('click', hideAvatarMenu);

        setTimeout(()=>{
            setShowAvatar(true)
        }, 100)

        return () => window.document.removeEventListener('click', hideAvatarMenu)
    },[]);

    function hideAvatarMenu(){
        setShowMenu(false)
    }

    function toggleAvatarMenu(e){
        e.stopPropagation();
        setShowMenu(!showMenu)
    }
    
    function returnImageIfExsists(){
            if((userInfo.image) !== 'null'){
                return <div className="avatar_image">
                    <img className="avatar_image" src={userInfo.image} alt=""/>
                 </div>
            } else {
                return <div className="avatar_image_alt"></div>
            }
    }


    if(isAuth && showAvatar)
        return (
        <>  
        <div className={`avatar_wrapper ${history.location.pathname.toLowerCase() === '/my-page' ? 'my_page_avatar' : ''}`}>
         {showMenu && <AvatarMenu></AvatarMenu> }

            <div onClick={(e)=>toggleAvatarMenu(e)} className="avatar_menu_wrapper">
                <p>&#9660;</p>
                <p className="avatar_name">{userInfo.firstName}</p>
            </div>
            {returnImageIfExsists()}
   
        </div>
        </>
        );
        else return null;
}

export default Avatar;