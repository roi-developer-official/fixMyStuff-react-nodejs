import PostsHead from "./PostsHead";
import React, { useEffect } from "react";
import "./userPosts.css";
import Accordion from "./postsAccordion";
import { useDispatch, useSelector } from "react-redux";
import {useAuth} from "../hooks/useAuth";
import { getPosts } from "../actions/postAction";
export default function UserPosts({ showDeleteInputs }) {

  const dispatch = useDispatch();
  const { user } = useAuth();
  let { posts } = useSelector((state) => state.postReducer);
  useEffect(() => {
    dispatch(getPosts(user.email));
  }, [dispatch, user.email]);

  useEffect(()=>{
    console.log(posts);
  },[posts])


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
