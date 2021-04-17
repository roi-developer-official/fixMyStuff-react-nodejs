import UserDetails from "./userDetails";
import UserPosts from "./userPosts";
import UserPostsHeader from "./userPostsHeader";
import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { deletePosts } from "../actions/postAction";

function PostsContainer({ children }) {
  return <div className="userp_posts">{children}</div>;
}

function UserPage() {
  const [showDeleteInputs, setShowDeleteInputs] = useState(false);
  const dispatch = useDispatch();

  const toggleDeleteInputs = useCallback(()=>{
    if (showDeleteInputs) {
      dispatch(deletePosts());
      setShowDeleteInputs(!showDeleteInputs);
    } else {
      setShowDeleteInputs(!showDeleteInputs);
    }
  },[dispatch, setShowDeleteInputs, showDeleteInputs]);

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
