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

function UserDetails() {
  const { user } = useSelector((state) => state.authReducer);
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
          onClick={()=>history.push("edit-user-details")}
          className="userp_details_btn"
          label="Edit"
        ></Button>
      </div>
    </div>
  );
}

export default UserDetails;
