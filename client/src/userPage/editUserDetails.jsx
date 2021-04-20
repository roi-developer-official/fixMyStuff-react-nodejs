import './editUserDetails.css';

let items = [
    { label: "Edit details" },
    { label: "Change password" },
    { label: "Delete account" },
  ];
  function EditUserDetailsMenu() {
      return (
        <div className="edit_menu_items">
          {items.map((item) => (
            <div className="edit_menu_item">{item.label}</div>
          ))}
        </div>
      );
  
  }

export default function EditUserDetails(){

    return (
        <div className="edit_user_details_wrapper">
            <EditUserDetailsMenu />
        </div>
    )
}