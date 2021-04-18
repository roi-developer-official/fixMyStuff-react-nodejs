import { useState } from "react";
import { Button, AddImage } from "./";
import { FormPage } from "./formPage";

export function AddImagePage({ show, changePage , buttons, imageSrc}) {
  let [input, setInput] = useState({ name: "image", value: null });

  function setImageValue(value) {
    setInput({ name: "image", value });
  }

  return (
    <FormPage show={show}>
      <AddImage imageSrc={imageSrc} setInputValue={setImageValue}></AddImage>
      <div className="form_buttons_wrapper">
        {buttons.map((btn, i) => (
          <Button
            key={i}
            label={btn.label}
            onClick={()=>changePage(btn.label, input)}
            style={btn.style}
          />
        ))}
      </div>
    </FormPage>
  );
}
