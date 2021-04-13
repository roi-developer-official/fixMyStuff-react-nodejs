import UserDetails from "./userDetails";
import UserPosts from "./userPosts";
import UserPostsHeader from "./userPostsHeader";
import React, {useState} from 'react';
function PostsContainer({ children }) {
  return <div className="userp_posts">{children}</div>;
}

function UserPage() {
  const [showDeleteInputs, setShowDeleteInputs] = useState(false);

  function toggleDeleteInputs(){
    setShowDeleteInputs(!showDeleteInputs)
  }

  return (
    <div className="userp_container">
      <UserDetails />
      <PostsContainer>
        <UserPostsHeader toggleDeleteInputs={toggleDeleteInputs} />
        <UserPosts showDeleteInputs={showDeleteInputs}/>
      </PostsContainer>
    </div>
  );
}

export default UserPage;
