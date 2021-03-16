
import Logo from '../../Global_UI/logo/logo';
import searchIcon from '../../assets/search.png';
import Button from '../../Global_UI/button/button';
import RenderCustomNavItem from '../util/customRender';
import { useHistory } from 'react-router';
import {NavLink} from 'react-router-dom';
import Avatar from '../avatar/avatar';
export default function DesktopNav({navItems,hideAndShowAuthDialog,isAuth}){

    const history = useHistory();

    return (
    <nav className='nav'>
        <Logo></Logo>
       <div className='nav_search'>
        <input className='search_input' type="text"/>
        <img className='search_image' src={searchIcon} alt=""/>
       </div>
        <ul className='nav_items' >
            {navItems.map((i,idx)=>{
                if (idx === 1)
                    return RenderCustomNavItem(i.name,hideAndShowAuthDialog);
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
       {!isAuth && <li>
         <Button className={'desktop_login_btn'} onClick={()=>history.push('/Log-in')} label={'Login'}></Button>
        </li>}
        </ul>
     <Avatar></Avatar>
    </nav>
    )
}