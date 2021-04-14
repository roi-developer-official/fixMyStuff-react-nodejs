import { Button } from "../Global_UI";
import { useHistory } from "react-router";
import { useState } from "react";

function SortOptions({ show , toggle}) {
  if (show)
    return (
      <div className="userp_sort_opt_wrapper">
        <div className="userp_sort_opt">Select order</div>
        <div onClick={toggle} className="userp_sort_opt">Date</div>
        <div onClick={toggle} className="userp_sort_opt">Name</div>
      </div>
    );
  return null;
}

export default function UserPostsHeader({toggleDeleteInputs, deleteButtonState }) {
  const history = useHistory();
  const [showSortOpt, setShowSortOpt] = useState(false);

  function toggleShowSortOption(){
    setShowSortOpt(!showSortOpt)
  }

  return (
    <>
      <h1 className="userp_header_title">Posts</h1>
      <div className="userp_header_btns">
        <Button
          label="New"
          className="userp_new_btn"
          onClick={() => history.push("/Create-post")}
        ></Button>
        <SortOptions toggle={toggleShowSortOption}  show={showSortOpt} />
        <Button label="Sort" onClick={toggleShowSortOption} className="userp_sort_btn"></Button>
        <Button onClick={toggleDeleteInputs} label={deleteButtonState?"Done" : "Delete" } className="userp_posts_delete_btn"></Button>
      </div>
    </>
  );
}
