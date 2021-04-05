import PostsHead from "./PostsHead";
import Post from "./post";
import "./userPosts.css";
import { Button } from "../Global_UI";

export default function UserPosts() {
  return (
    <div className="userp_posts_container">
      <Button label={"Delete"} className={"userp_posts_delete_btn"}></Button>
      <PostsHead></PostsHead>
      <Post></Post>
    </div>
  );
}
