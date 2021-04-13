import PostsHead from "./PostsHead";
import React from 'react';
import "./userPosts.css";
import Accordion from './postsAccordion';

export default function UserPosts({showDeleteInputs}) {
  let items = [
    {
      title: "My chair is broken --please help me fix it",
      description:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aut saepe error iusto reiciendis libero corrupti, unde consequuntur. Sint laborum neque, minus eos, molestias delectus sapiente natus cum dignissimos autem quia.",
    },
    {
      title: "My bed fell apart, must fix it before tommorow",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Non, alias.",
    },
  ];
 
  return (
    <div className="userp_posts_container">
      <PostsHead  ></PostsHead>
      <Accordion 
      showDeleteInputs={showDeleteInputs} 
      items={items} multy={false}
      />
    </div>
  );
}
