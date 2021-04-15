import { Button } from "../Global_UI";
import { useHistory } from "react-router";
import { useCallback, useEffect, useState } from "react";
import V from "../assets/v.svg";

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

function SortOptions({ hideSortOptions, setOrderValue, activeIndex }) {

  let hideSortOptionsCalled = useCallback(
    () => hideSortOptions.call(null, activeIndex),
    [hideSortOptions, activeIndex]
  );
  useEffect(() => {
    window.addEventListener("click", hideSortOptionsCalled);
    return () => window.removeEventListener("click", hideSortOptionsCalled);
  }, [hideSortOptionsCalled]);


  function onSortClicked(orderBy, index) {
    setOrderValue(orderBy);
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
          onClick={() => onSortClicked(item.order, index)}
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

export default function UserPostsHeader({
  toggleDeleteInputs,
  deleteButtonState,
  setOrderValue,
}) {
  const history = useHistory();
  const [showSortOpt, setShowSortOpt] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  function toggleShowSortOption(index) {
    if (index !== activeIndex) setActiveIndex(index);
    setShowSortOpt(!showSortOpt);
  }

  return (
    <>
      <h1 className="userp_header_title">Posts</h1>
      <div className="userp_header_btns">
        <Button
          label="New"
          className="userp_new_btn"
          onClick={() => history.push("/Create-post")}
        ></Button>
        {showSortOpt && (
          <SortOptions
            activeIndex={activeIndex}
            hideSortOptions={toggleShowSortOption}
            setOrderValue={setOrderValue}
          />
        )}
        <Button
          label="Sort"
          onClick={() => toggleShowSortOption(activeIndex)}
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
