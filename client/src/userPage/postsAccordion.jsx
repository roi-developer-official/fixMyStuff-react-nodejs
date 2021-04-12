import React from "react";
import withAccordion from "../hoc/withAccordion";

function Accordion({ items, isOpenIndex, handleClick, isClickedIndexes }) {
 

  return items.map((item, i) => {
    return (
      <div key={i} className="post_accordion_item">
        <div onClick={() => handleClick(i)} className="title_container">
          <p>{item.title}</p>
        </div>
        <div
          className={`details_container${
            isOpenIndex === i ? " open" : isClickedIndexes.includes(i)?  " close": ""
          }`}
        >
          <p className="description">{item.description}</p>
        </div>
      </div>
    );
  });
}

export default withAccordion(Accordion);
