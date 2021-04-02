import { useState } from "react";
import { Button, AddImage } from "../../../Global_UI";
import { buttons as pageButton } from "../elements";

export default function PageTwo({ show, changePage }) {
  let [input, setInput] = useState({ name: "image", value: "" });

  function onButtonClick(label) {
    if (label === "Back") changePage(label);
    else {
      changePage(label, [input]);
    }
  }

  function setImageValue(value) {
    setInput({ name: "image", value });
  }

  return (
    <div className={`add_post_page${show ? " show" : ""}`}>
      <AddImage setInputValue={setImageValue}></AddImage>
      <div className="form_buttons_wrapper">
        {pageButton.page2.map((btn,i) =>  (
            <Button
              key={i} 
              label={btn.label}
              onClick={onButtonClick}
              style={btn.style}
            />
          ))}
      </div>
    </div>
  );
}
