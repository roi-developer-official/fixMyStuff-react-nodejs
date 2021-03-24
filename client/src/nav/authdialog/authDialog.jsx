import { NavLink } from 'react-router-dom';
import './authDialog.css';

function AuthDialog(){
    return (
        <div className='auth_dialog'>
            <p>You are not logged in</p>
            <div className='auth_links'>
                <NavLink className='link ' to='/Sign-in'>Sign-up for an account</NavLink>
            </div>
        </div>
    )
}

export default AuthDialog;