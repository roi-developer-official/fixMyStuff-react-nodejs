import { useSelector } from "react-redux";
import { useState } from "react";
import { Button } from "../Global_UI/";
import { useHistory } from "react-router-dom";
import "./userDetails.css";

export function capitelizeFirstLetter(string) {
  if (string === undefined) {
    console.log(string);
    return " ";
  }
  return string
    .charAt(0)
    .toUpperCase()
    .concat(string.substring(1, string.length));
}

let items = [
  { label: "Edit details" },
  { label: "Change password" },
  { label: "Delete account" },
];
function EditMyDetailsMenu({ show }) {
  if (show)
    return (
      <div className="edit_menu_items">
        {items.map((item) => (
          <div className="edit_menu_item">{item.label}</div>
        ))}
      </div>
    );

  return null;
}

function UserDetails() {
  const { user } = useSelector((state) => state.authReducer);
  const [showMenu, setShowMenu] = useState(false);
  const history = useHistory();
  console.log(user);

  return (
    <div className="userp_details_wrapper">
      <div className="userp_details_img">
        {user.image !== null ? (
          <img src={user.image} alt="user" />
        ) : (
          <p>No image</p>
        )}
      </div>
      <div className="userp_details_info">
        <p>{capitelizeFirstLetter(user.firstName + " " + user.lastName)}</p>
        <p>{capitelizeFirstLetter(user.city)}</p>
        <p>{user.email}</p>
        <Button
          onClick={() => setShowMenu(!showMenu)}
          className="userp_details_btn"
          label="Edit"
        ></Button>
      </div>
      <EditMyDetailsMenu show={showMenu} />
    </div>
  );
}

export default UserDetails;
