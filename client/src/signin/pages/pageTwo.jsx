import { useState } from "react";
import { Button, AddImage } from "../../Global_UI";
import { buttons as pageButtons } from "./elements";

function PageTwo({ changePage, show }) {
  const [input, setInput] = useState({
    name: "image",
    value: "",
  });

  function setImageValue(value) {
    setInput({ ...input, value });
  }

  return (
    <div className={`signup_wrapper_page ${show ? "show" : ""}`}>
      <AddImage setInputValue={setImageValue}></AddImage>
      <div className="form_buttons_wrapper">
        {pageButtons.page3.map((btn, i) => {
          return (
            <Button
              key={i}
              label={btn.label}
              onClick={() => changePage(btn.label, [{ ...input }])}
              style={btn.style}
            ></Button>
          );
        })}
      </div>
    </div>
  );
}
export default PageTwo;
