import { useContext } from "react"
import { AuthContext } from "../../context/authContext"
import {NavLink, useHistory} from 'react-router-dom';

export default function RenderCustomNavItem(path,hideAndShowAuthDialog){

    const authContext = useContext(AuthContext);
    const history = useHistory();

    if(authContext.isAuth())
    return  <li key={path}>
    <NavLink
    className='nav_item' 
    to={path.replace(' ', '-')}
    activeStyle={{color :'#08a072', fontWeight:'bold'}}
    >{path}
    </NavLink></li>
    return (
        <li 
        key={path}
        onClick={(e)=>history.location.pathname.toLowerCase() !== '/sign-in' ?
        hideAndShowAuthDialog(e,true) : null}
        className='nav_item'
        style={{cursor:'pointer'}}
        >{path}</li>
    )


}