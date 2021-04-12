import React from "react";
import withAccordion from "../hoc/withAccordion";

function Accordion({ items, isOpenIndex, handleClick, isClickedIndexes }) {
 
  function getClassName(i){
    if(isOpenIndex === i){
      return " open"
    } else if(isClickedIndexes.includes(i)){
      return " close";
    }
    return "";
  }

  function returnEmojy(i){
    if(isOpenIndex === i){
      return <p className="post_accordion_emoji">👇</p>;
    }
    else{
      return <p className="post_accordion_emoji">👈</p>
    }
   
  }

  return items.map((item, i) => {
    return (
      <div key={i} className="post_accordion_item">
        <div onClick={() => handleClick(i)} className="title_container">
          <p>{item.title}</p>
          {returnEmojy(i)}
        </div>
        <div
          className={`details_container${getClassName(i)}`}
        >
          <p className="description">{item.description}</p>

        </div>
      </div>
    );
  });
}

export default withAccordion(Accordion);
