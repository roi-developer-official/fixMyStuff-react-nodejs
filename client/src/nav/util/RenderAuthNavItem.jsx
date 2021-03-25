
import { useState } from 'react';
import {NavLink} from 'react-router-dom';
import AuthDialog from '../authdialog/authDialog';

export default function RenderAuthNavItem({path, isAuth}){

    const [showDialog, setShowDialog] = useState(false);

    if(isAuth)
    return  <li key={path}>
    <NavLink
    className='nav_item' 
    to={path.replace(' ', '-')}
    activeStyle={{color :'#08a072', fontWeight:'bold'}}
    >{path}
    </NavLink></li>
    return (
        <div key={path}>
        <li 
        onClick={(e)=> setShowDialog(!showDialog)}
        className='nav_item'
        style={{cursor:'pointer'}}
        >{path}</li>
        {showDialog && <AuthDialog 
        hideDialog={()=>setShowDialog(!showDialog)}
        />}
        </div>
    );

}