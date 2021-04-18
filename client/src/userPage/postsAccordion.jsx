import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { actionTypes } from "../actions/postAction";
import withAccordion from "../hoc/withAccordion";
import { Button } from "../Global_UI/";
import { useHistory } from "react-router-dom";

function Accordion({
  items,
  isOpenIndex,
  handleClick,
  isClickedIndexes,
  showDeleteInputs,
  closeAll,
}) {
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    closeAll();
  }, [items, closeAll]);

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

  function onPostDeleteClicked(e, id) {
    const isChecked = e.target.checked;
    if (isChecked) {
      dispatch({ type: actionTypes.POST_ADD_DELETE_POST, payload: id });
    } else {
      dispatch({ type: actionTypes.POST_REMOVE_DELETE_POST, payload: id });
    }
  }
  
  function onPostEditClick(id){
    history.push(`/Single-post/${id}?edit=true`)
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
              onChange={(e) => onPostDeleteClicked(e, item.id)}
            />
          )}
        </div>
        <div className={`details_container${getClassName(i)}`}>
          <div className="image">
            <img src={item.image} alt="" />
          </div>
          <p className="max-payment">
            {item.maxPayment ? item.maxPayment : 0}$
          </p>
          <p className="description">{item.description}</p>
          <p className="date">{item.updatedAt.substring(0, 10)}</p>
          <Button onClick={()=>onPostEditClick(item.id)} className="edit_btn" label="edit" />
        </div>
      </div>
    );
  });
}

export default withAccordion(Accordion);
