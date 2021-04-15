import PostsHead from "./PostsHead";
import React, { useEffect } from "react";
import "./userPosts.css";
import Accordion from "./postsAccordion";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../hooks/useAuth";
import { getPosts } from "../actions/postAction";

const Error = ({ error }) => {
  if (error) return <p>{error}</p>;
  return null;
};

export default function UserPosts({ showDeleteInputs }) {
  const dispatch = useDispatch();
  const { page, order, posts, getPostsError: error } = useSelector(
    (state) => state.postReducer
  );
  const user = useAuth()[0];

  useEffect(() => {
    if (user.email) dispatch(getPosts(user.email, page, order));
  }, [dispatch, user.email, page, order]);

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
    </div>
  );
}
