import "./editUserDetails.css";
import { useAuth } from "../hooks/useAuth";
import { NavLink, Route, Switch, useRouteMatch } from "react-router-dom";
import { useDispatch } from "react-redux";
import { actionTypes } from "../actions/authAction";
import { useEffect } from "react";
import { capitelizeFirstLetter, spaceBetweenLetters } from "../shared";
import { AddImage, AddImagePage, Button } from "../Global_UI";
let items = [
  { label: "Edit details" },
  { label: "Change password" },
  { label: "Delete account" },
];

function EditContentContainer({ children }) {
  return <div className="edit_details_content">{children}</div>;
}

function EditUserDetailsMenu({ url }) {
  return (
    <div className="edit_menu_items">
      {items.map((item) => (
        <NavLink
          activeClassName="active"
          to={`${url}/${item.label.replaceAll(" ", "-")}`}
          className="edit_menu_item"
        >
          {item.label}
        </NavLink>
      ))}
    </div>
  );
}

function UserInfoDisplay({ user }) {
  let els = [];
  for (let [key, value] of Object.entries(user)) {
    if (key === "firstName" || key === "lastName") {
      value = capitelizeFirstLetter(value);
    }
    if (key !== "image")
      els.push(
        <div className="user_info_item">
          <p>
            {spaceBetweenLetters(capitelizeFirstLetter(key))}: {value}
          </p>
          <input type="text" />
          <button>reset</button>
        </div>
      );
  }
  els.push(
    <div className="user_info_image">
      <AddImage />
    </div>
  );

  return (
    <div className="user_info_display">
      {els.map((el) => el)}
      <div className="user_info_buttons">
        <Button label="Edit" style={{}} className="user_info_edit_button" />
      </div>
    </div>
  );
}

function EditDetails() {
  const user = useAuth()[0];
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: actionTypes.AUTH_FILL_INPUTS, payload: { ...user } });
  }, [user, dispatch]);

  return (
    <EditContentContainer>
      <UserInfoDisplay user={user} />
    </EditContentContainer>
  );
}

function ChangePassword() {
  return <EditContentContainer>hello from edit password</EditContentContainer>;
}

function DeleteAccount() {
  return <EditContentContainer>hello from delete account</EditContentContainer>;
}

function PageContent({ url }) {
  return (
    <Switch>
      <Route
        path={`${url}/edit-details`}
        exact={false}
        component={EditDetails}
      />
      <Route
        path={`${url}/change-password`}
        exact={false}
        component={ChangePassword}
      />
      <Route
        path={`${url}/delete-account`}
        exact={false}
        component={DeleteAccount}
      />
    </Switch>
  );
}
export default function EditUserDetails() {
  let { url } = useRouteMatch();

  return (
    <div className="edit_user_details_wrapper">
      <EditUserDetailsMenu url={url} />
      <PageContent url={url} />
    </div>
  );
}
