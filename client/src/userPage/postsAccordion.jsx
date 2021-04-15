import React from "react";
import { useDispatch } from "react-redux";
import { actionTypes } from "../actions/postAction";
import withAccordion from "../hoc/withAccordion";

function Accordion({
  items,
  isOpenIndex,
  handleClick,
  isClickedIndexes,
  showDeleteInputs,
}) {
  const dispatch = useDispatch();
  function getClassName(i) {
    if (isOpenIndex === i) {
      return " open";
    } else if (isClickedIndexes.includes(i)) {
      return " close";
    }
    return "";
  }

  function returnEmojy(i) {
    if (isOpenIndex === i) {
      return <p className="post_accordion_emoji">👇</p>;
    } else {
      return <p className="post_accordion_emoji">👈</p>;
    }
  }

  function onPostClicked(e, id) {
    const isChecked = e.target.checked;
    if (isChecked) {
      dispatch({ type: actionTypes.POST_ADD_DELETE_POST, payload: id });
    } else {
      dispatch({ type: actionTypes.POST_REMOVE_DELETE_POST, payload: id });
    }
  }

  return items.map((item, i) => {
    return (
      <div key={i} className="post_accordion_item">
        <div
          onClick={() => handleClick(i, showDeleteInputs)}
          className="title_container"
        >
          <p>{item.title}</p>
          {returnEmojy(i)}
          {showDeleteInputs && (
            <input
              type="checkbox"
              name={`post${i}`}
              onChange={(e) => onPostClicked(e, item.id)}
            />
          )}
        </div>
        <div className={`details_container${getClassName(i)}`}>
          <p className="description">{item.description}</p>
        </div>
      </div>
    );
  });
}

export default withAccordion(Accordion);
