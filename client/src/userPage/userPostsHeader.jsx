import { Button } from "../Global_UI";
import { useHistory } from "react-router";
import { useCallback, useEffect, useState } from "react";
import V from "../assets/v.svg";
import { useDispatch } from "react-redux";
import { actionTypes, getPosts } from "../actions/postAction";

let sortItems = [
  {
    text: "Newest",
    order: "updatedAt",
  },
  {
    text: "Oldest",
    order: "createdAt",
  },
  {
    text: "Title",
    order: "title",
  },
];

function SortOptions({ hideSortOptions, activeIndex }) {
  const dispatch = useDispatch();

  const callHideOptions = useCallback(() => hideSortOptions.call(null, false), [
    hideSortOptions,
  ]);

  useEffect(() => {
    window.addEventListener("click", callHideOptions);
    return () => window.removeEventListener("click", callHideOptions);
  }, [callHideOptions]);

  function onSortClicked(orderBy, index) {
    dispatch({ type: actionTypes.POST_SET_ORDER, payload: orderBy });
    dispatch(getPosts());
    hideSortOptions(index);
  }

  function returnActiveIndexMark(index) {
    if (index === activeIndex) {
      return (
        <img
          src={V}
          alt="v"
          style={{
            marginRight: "4px",
            width: "13px",
            height: "13px",
            paddingTop: "1px",
          }}
        />
      );
    }
  }
  return (
    <div className="userp_sort_opt_wrapper">
      <div className="userp_sort_opt">Select order</div>
      {sortItems.map((item, index) => (
        <div
          key={index}
          onMouseDown={() => onSortClicked(item.order, index)}
          className="userp_sort_opt"
        >
          <div className="userp_sort_opt_text">
            {returnActiveIndexMark(index)}
            {item.text}
          </div>
        </div>
      ))}
    </div>
  );
}

function UserPostsHeader({ toggleDeleteInputs, deleteButtonState }) {
  const history = useHistory();

  const [state, setState] = useState({
    showSortOpt: false,
    activeIndex: 0,
  });

  function toggleShowSortOption(index) {
    if (typeof index === "number") {
      setState({ showSortOpt: !state.showSortOpt, activeIndex: index });
    } else {
      setState({ ...state, showSortOpt: false });
    }
  }

  return (
    <>
      <h1 className="userp_header_title">Posts</h1>
      <div className="userp_header_btns">
        <Button
          label="New"
          className="userp_new_btn"
          onClick={() => history.push("/Single-post?edit=false")}
        ></Button>
        {state.showSortOpt && (
          <SortOptions
            activeIndex={state.activeIndex}
            hideSortOptions={toggleShowSortOption}
          />
        )}
        <Button
          label="Sort"
          onClick={() => toggleShowSortOption(state.activeIndex)}
          className="userp_sort_btn"
        ></Button>
        <Button
          onClick={toggleDeleteInputs}
          label={deleteButtonState ? "Done" : "Delete"}
          className="userp_posts_delete_btn"
        ></Button>
      </div>
    </>
  );
}

export default UserPostsHeader;
