import {NavLink} from 'react-router-dom';
import LoginButton from './loginButton';
import RenderAuthNavItem from './renderAuthNavItem';

function MobileNav({navItems, isAuth}){
    return (
        <>
        <nav className='mobile_nav'>
            <ul className='mobile_nav_items'>
                    {navItems.map((i,idx)=>{
                    if (idx === 1)
                        return <RenderAuthNavItem key={i.name} path={i.name} isAuth={isAuth}/>;
                    return <li key={i.name}><NavLink 
                    className='mobile_nav_item' 
                    to={i.name.replace(' ', '-')} >{i.name}</NavLink></li>
                })}
            </ul>
     </nav>
        <LoginButton isAuth={isAuth} className="mobile"/>
     </>
    )
}

export default MobileNav;