
import userIcon from '../../../assets/user.svg';
import logoutIcon from '../../../assets/logout.svg';
import { useContext } from 'react';
import { AuthContext } from '../../../context/authContext';
import { useHistory } from 'react-router';
export default function AvatarMenu(){

    const authContext = useContext(AuthContext);
    const history = useHistory();


    function logout(){
        authContext.clearUserInfo();
        history.push('/log-in');
    }

    return (
    <div className="avatar_menu">
        <ul className='avater_menu_items'>
           <li className='avatar_menu_item' >
           Edit
               <img className='avatar_menu_icon' src={userIcon} alt=""/>
              </li>
           <li onClick={logout} className='avatar_menu_item'>
           Logout
           <img className='avatar_menu_icon' src={logoutIcon} alt=""/>
            </li>
        </ul>
    </div>
    )
}