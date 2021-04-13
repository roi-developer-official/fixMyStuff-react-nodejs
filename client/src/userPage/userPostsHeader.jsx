import { Button } from "../Global_UI";
import { useHistory } from "react-router";

export default function UserPostsHeader() {
  const history = useHistory();
  return (
    <>
    <h1 className="userp_header_title">Posts</h1>
    <div className="userp_header_btns">
        <Button
          label="New"
          className="userp_new_btn"
          onClick={() => history.push("/Create-post")}
        ></Button>
        <Button
          label="Sort"
          className="userp_sort_btn"
          onClick={() => history.push("/Create-post")}
        ></Button>
      <Button 
      label="Delete" 
      className="userp_posts_delete_btn"
      ></Button>
    </div>
    </>
  );
}
