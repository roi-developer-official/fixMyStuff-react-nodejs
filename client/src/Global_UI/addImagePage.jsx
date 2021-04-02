import { useState } from "react";
import { Button, AddImage } from "./";
import { buttons as pageButtons } from '../auth/signin/pages/elements';

export default function AddImagePage({ show, changePage }) {
  let [input, setInput] = useState({ name: "image", value: "" });
  function setImageValue(value) {
    setInput({ name: "image", value });
  }

  return (
    <div className={`add_image_page${show ? " show" : ""}`}>
      <AddImage setInputValue={setImageValue}></AddImage>
      <div className="form_buttons_wrapper">
        {pageButtons.page3.map((btn, i) => (
          <Button
            key={i}
            label={btn.label}
            onClick={()=>changePage(btn.label, [input])}
            style={btn.style}
          />
        ))}
      </div>
    </div>
  );
}
