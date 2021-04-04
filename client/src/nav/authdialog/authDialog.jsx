import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './authDialog.css';

function AuthDialog({hideDialog}){
   
    useEffect(()=>{
        window.addEventListener("click", hideDialog);
        return ()=> window.removeEventListener("click", hideDialog);
    },[hideDialog])

    return (
        <div className='auth_dialog'>
            <p>You are not logged in</p>
            <div className='auth_links'>
            <NavLink className='link'
              onClick={hideDialog}
              to="/Sign-in">Sign-up for an account</NavLink>
            </div>
        </div>
    );
}

export default AuthDialog;