import { Button } from "../Global_UI";
import { useHistory } from "react-router";
import { useState } from "react";
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

function SortOptions({ show, hideSortOptions, setOrderValue }) {
  const [activeIndex, setActiveIndex] = useState(0);

  function setActiveSort(index) {
    setActiveIndex(index);
  }
  function onSortClicked(orderBy, index) {
    setOrderValue(orderBy);
    setActiveSort(index);
    hideSortOptions();
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
            paddingTop:"1px"
          }}
        />
      );
    }
  }

  if (show)
    return (
      <div className="userp_sort_opt_wrapper">
        <div className="userp_sort_opt">Select order</div>
        {sortItems.map((item, index) => (
          <div
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
  return null;
}

export default function UserPostsHeader({
  toggleDeleteInputs,
  deleteButtonState,
  setOrderValue,
}) {
  const history = useHistory();
  const [showSortOpt, setShowSortOpt] = useState(false);

  function toggleShowSortOption() {
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
        <SortOptions
          hideSortOptions={toggleShowSortOption}
          show={showSortOpt}
          setOrderValue={setOrderValue}
        />
        <Button
          label="Sort"
          onClick={toggleShowSortOption}
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
