
import {NavLink, useHistory} from 'react-router-dom';
import RenderCustomNavItem from '../util/customRender';
import Button from '../../Global_UI/button/button';
function MobileNav({navItems,hideAndShowAuthDialog, isAuth}){
    const history = useHistory();
    return (
        <>
        <nav className='mobile_nav'>
            <ul className='mobile_nav_items'>
                    {navItems.map((i,idx)=>{
                    if (idx === 1)
                        return RenderCustomNavItem(i.name,hideAndShowAuthDialog);
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