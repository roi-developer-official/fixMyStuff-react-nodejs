import {NavLink} from 'react-router-dom';
import LoginButton from '../loginbutton/LoginButton';
import RenderAuthNavItem from '../util/RenderAuthNavItem';
function MobileNav({navItems, isAuth}){

    return (
        <>
        <nav className='mobile_nav'>
            <ul className='mobile_nav_items'>
                    {navItems.map((i,idx)=>{
                    if (idx === 1)
                        return RenderAuthNavItem({path: i.name});
                    return <li key={i.name}><NavLink 
                    className='mobile_nav_item' 
                    to={i.name.replace(' ', '-')} >{i.name}</NavLink></li>
                })}
            </ul>
     </nav>
    <LoginButton isAuth={isAuth}/>
     </>
    )

}

export default MobileNav;