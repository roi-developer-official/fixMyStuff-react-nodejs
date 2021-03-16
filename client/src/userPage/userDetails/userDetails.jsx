import { useContext } from "react";
import { useHistory } from "react-router";
import {AuthContext} from '../../context/authContext';
import Button from '../../Global_UI/button/button';
import './userDetails.css'
function UserDetails(){

    const authContaxt = useContext(AuthContext);
    const user = authContaxt.getUserInfo();
    const history = useHistory();
    return (
        <div className='userp_details_wrapper'>
            <div className="userp_details_img">
                {user.image !== 'null' ?  <img src={user.image} alt=""/> : <p>No image</p>}
            </div>
            <div className="userp_details_info">
                <p>Roei azran</p>
                <p>Tel aviv</p>
                <p>test@test.com</p>
            <Button 
            className={'userp_details_btn'}
            label={'Edit'}
            ></Button>
            </div>
        </div>
    )


}

export default UserDetails;