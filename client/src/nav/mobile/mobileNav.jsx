
import {NavLink, useHistory} from 'react-router-dom';
import {Button} from '../../Global_UI';
import RenderAuthNavItem from '../util/RenderAuthNavItem';
function MobileNav({navItems, isAuth}){
    const history = useHistory();
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
    {!isAuth && <Button className={'mobile_login_btn'} onClick={()=>history.push('/Log-in')} label={'Login'}></Button>}
     </>
    )

}

export default MobileNav;