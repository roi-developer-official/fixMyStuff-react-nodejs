import UserDetails from "./userDetails";
import UserPosts from "./userPosts";
import UserPostsHeader from "./userPostsHeader";

import React, {useState} from 'react';
function PostsContainer({ children }) {
  return <div className="userp_posts">{children}</div>;
}

function UserPage() {
  const [showDeleteInputs, setShowDeleteInputs] = useState(false);
  const [page,setPage] = useState(1);
  const [order,setOrder] = useState("updatedAt");

  function toggleDeleteInputs(){
    setShowDeleteInputs(!showDeleteInputs)
  }

  function setOrderValue(value){
    setOrder(value);
  }

  return (
    <div className="userp_container">
      <UserDetails />
      <PostsContainer>
        <UserPostsHeader setOrderValue={setOrderValue} deleteButtonState={showDeleteInputs} toggleDeleteInputs={toggleDeleteInputs} />
        <UserPosts order={order} page={page} showDeleteInputs={showDeleteInputs}/>
      </PostsContainer>
    </div>
  );
}

export default UserPage;
