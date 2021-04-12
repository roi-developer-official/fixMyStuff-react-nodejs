import UserDetails from "./userDetails";
import UserPosts from "./userPosts";
import UserPostsHeader from "./userPostsHeader";

function PostsContainer({ children }) {
  return <div className="userp_posts">{children}</div>;
}

function UserPage() {
  return (
    <div className="userp_container">
      <UserDetails />
      <PostsContainer>
        <UserPostsHeader />
        <UserPosts />
      </PostsContainer>
    </div>
  );
}

export default UserPage;
