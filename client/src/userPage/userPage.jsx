import UserDetails from "./userDetails";
import UserPosts from "./userPosts";
import UserPostsHeader from "./userPostsHeader";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deletePosts } from "../actions/postAction";
import { useAuth } from "../hooks/useAuth";
function PostsContainer({ children }) {
  return <div className="userp_posts">{children}</div>;
}

function UserPage() {
  const [showDeleteInputs, setShowDeleteInputs] = useState(false);
  const user = useAuth()[0];
  const dispatch = useDispatch();

  function toggleDeleteInputs() {
    if (showDeleteInputs) {
      dispatch(deletePosts(user.email));
    } else {
      setShowDeleteInputs(!showDeleteInputs);
    }
  }

  return (
    <div className="userp_container">
      <UserDetails />
      <PostsContainer>
        <UserPostsHeader
          deleteButtonState={showDeleteInputs}
          toggleDeleteInputs={toggleDeleteInputs}
        />
        <UserPosts
          showDeleteInputs={showDeleteInputs}
        />
      </PostsContainer>
    </div>
  );
}

export default UserPage;
