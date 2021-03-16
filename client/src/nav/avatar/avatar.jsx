import { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { AuthContext } from '../../context/authContext';
import './avatar.css'
import AvatarMenu from './menu/avatarMenu';
function Avatar (){

    const authContext = useContext(AuthContext);
    const history = useHistory();
    const isAuth =  authContext.isAuth();
    const user = authContext.getUserInfo();
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
            if((user.image) !== 'null'){
                return <div className="avatar_image">
                    <img className="avatar_image" src={user.image} alt=""/>
                 </div>
            } else {
                return <div className="avatar_image_alt"></div>
            }
    }


    if(isAuth && showAvatar)
        return (
        <>  
        <div className={`avatar_container ${history.location.pathname.toLowerCase() === '/my-page' ? 'my_page_avatar' : ''}`}>
            <div className="avatar_wrapper">
            <div onClick={(e)=>toggleAvatarMenu(e)} className="avatar_menu_wrapper">
                <p>&#9660;</p>
                <p className="avatar_name">{user.firstName}</p>
            </div>
            {returnImageIfExsists()}
        </div>
            {showMenu && <AvatarMenu></AvatarMenu> }
        </div>
        </>
        );
        else return null;
}

export default Avatar;