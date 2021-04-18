import PostsHead from "./PostsHead";
import React, { useEffect } from "react";
import "./userPosts.css";
import Accordion from "./postsAccordion";
import { useDispatch, useSelector } from "react-redux";
import { actionTypes, getPosts } from "../actions/postAction";
import { Pagination } from "../Global_UI";

let activeStyle = {
  backgroundColor: "#11c58f",
  color: "white",
  border: "none",
};

const Error = ({ error }) => {
  if (error) return <p>{error}</p>;
  return null;
};
const MAX_PER_PAGE = 8;
const MAX_PAGES = 6;

function UserPosts({ showDeleteInputs }) {
  const dispatch = useDispatch();
  const { page, posts, getPostsError: error, count } = useSelector(
    (state) => state.postReducer
  );

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  function changePage(page) {
    dispatch({ type: actionTypes.POST_CHANGE_PAGE, payload: page });
    dispatch(getPosts());
  }

  return (
    <div className="userp_posts_container">
      <PostsHead></PostsHead>
      <Error error={error} />
      {posts.length > 0 ? (
        <Accordion

          showDeleteInputs={showDeleteInputs}
          items={posts}
          multy={false}
        />
      ) : (
        <p className="no_posts_text">No posts yet!</p>
      )}
      <Pagination
        changePage={changePage}
        currentPage={page}
        activeStyle={activeStyle}
        count={count}
        maxPagesToDisplay={MAX_PAGES}
        maxPerPage={MAX_PER_PAGE}
      />
    </div>
  );
}

export default UserPosts;
