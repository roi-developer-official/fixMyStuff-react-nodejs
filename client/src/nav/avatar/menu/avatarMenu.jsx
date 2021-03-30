import userIcon from '../../../assets/user.svg';
import logoutIcon from '../../../assets/logout.svg';
import { useDispatch } from 'react-redux';
import {logOut} from '../../../actions/authAction';

export default function AvatarMenu(){

    const dispatch = useDispatch();
    function logout(){
        dispatch(logOut())
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