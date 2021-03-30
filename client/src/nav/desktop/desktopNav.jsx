
import {Logo} from '../../Global_UI';
import RenderAuthNavItem from '../util/renderAuthNavItem';
import { NavLink} from 'react-router-dom';
import Avatar from '../avatar/avatar';
import LoginButton from '../loginbutton/loginButton';
import NavSearch from './nav-search/navSearch';

export default function DesktopNav({navItems,userInfo,pathname}){

    return (
    <nav className='nav'>
        <Logo></Logo>
        <NavSearch />
        <ul className='nav_items' >
            {navItems.map((i,idx)=>{
                if (idx === 1)
                    return RenderAuthNavItem({path: i.name,userInfo});
                else 
                    return (
                    <li key={i.name}>
                        <NavLink
                        className='nav_item' 
                        to={i.name.replace(' ', '-')}
                        activeStyle={{color :'#08a072', fontWeight:'bold'}}
                        >{i.name}
                    </NavLink></li>
                    )
        })}
      <li><LoginButton isAuth={userInfo}/></li>
    </ul>
     <Avatar 
     user={userInfo}
     pathname={pathname}
     ></Avatar>
    </nav>
    )
}


