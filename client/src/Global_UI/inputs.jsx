import React from "react";
import { Input } from "./";
import {addToRefsArray} from '../shared/'
export function Inputs({ inputs, onChange, refs, className }) {

   return inputs.map((input, i) => {
    return (
      <div key={i} className={className}>
        <Input
          inputType={input.type}
          label={input.label}
          name={input.name}
          options={input.options}
          value={input.value}
          className={input.className}
          updateInput={onChange}
          addToRefsArray={(el) => addToRefsArray(el, refs)}
          validations={input.validations}
        ></Input>
      </div>
    );
  }) 
}
