import PostsHead from "./PostsHead";
import React, { useEffect } from "react";
import "./userPosts.css";
import Accordion from "./postsAccordion";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../hooks/useAuth";
import { getPosts } from "../actions/postAction";
export default function UserPosts({ showDeleteInputs, page,order }) {
  const dispatch = useDispatch();
  const user = useAuth()[0];
  let { posts } = useSelector((state) => state.postReducer);

  useEffect(() => {
    if(user.email) dispatch(getPosts(user.email,page,order));
  }, [dispatch, user.email,page,order]);

  return (
    <div className="userp_posts_container">
      <PostsHead></PostsHead>
      <Accordion
        showDeleteInputs={showDeleteInputs}
        items={posts}
        multy={false}
      />
    </div>
  );
}
