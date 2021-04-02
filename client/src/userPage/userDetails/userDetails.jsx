import { useSelector } from "react-redux";
import { Button } from "../../Global_UI/";
import "./userDetails.css";

function UserDetails() {
  
  const { user } = useSelector((state) => state.authReducer);
  return (
    <div className="userp_details_wrapper">
      <div className="userp_details_img">
        {user.image !== null ?  <img src={user.image} alt="user"/> : <p>No image</p>}
      </div>
      <div className="userp_details_info">
        <p>Roei azran</p>
        <p>Tel aviv</p>
        <p>test@test.com</p>
        <Button className={"userp_details_btn"} label={"Edit"}></Button>
      </div>
    </div>
  );
}

export default UserDetails;
