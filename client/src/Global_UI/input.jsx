import React, { Fragment } from "react";
import { validation } from "../shared/";
import { PopOver } from "./popover";

export function Input({
  inputType,
  options,
  label,
  checked,
  value,
  name,
  accept,
  style,
  className,
  min,
  updateInput,
  validations,
  addToRefsArray,
  matchWith,
  popover,
  error,
  popOverMessage,
}) {
  const [state, setState] = React.useState({
    value: "",
  });
  let timerId;

  const [showPopover, setShowPopover] = React.useState(false);
  function validateOnBlur(input) {
    if (validations) {
      const name = input.name;
      let errorMsg = validation(validations, state.value, matchWith);
      if (errorMsg) {
        setState({
          ...state,
          error: errorMsg,
        });
        updateInput(name, state.value, errorMsg);
      }
    }
  }

  const onInputChange = (input) => {
    let value = input.type === "checkbox" ? input.checked : input.value;
    const name = input.name;
    setState({
      value: value,
    });
    updateInput(name, value, "");
  };

  const togglePopOver = (e) => {
    if (e.type === "mouseleave") {
      clearTimeout(timerId);
      setShowPopover(false);
    } else {
      timerId = setTimeout(() => {
        setShowPopover(!showPopover);
      }, 80);
    }
  };

  if (inputType !== "select") {
    return (
      <Fragment>
        <label
          style={{ cursor: popover ? "pointer" : "" }}
          onMouseOver={popover && togglePopOver}
          onMouseLeave={popover && togglePopOver}
          onClick={popover && togglePopOver}
          htmlFor={name}
        >
          {label}
        </label>
        <input
          className={className}
          data-test={`${name}`}
          id={name}
          min={min}
          ref={addToRefsArray}
          type={inputType}
          checked={checked}
          name={name}
          onChange={(e) => {
            onInputChange(e.target);
          }}
          onBlur={(e) => validateOnBlur(e.target)}
          accept={accept}
          style={{ ...style }}
          value={value ? value : state.value}
        />
        {(error || state.error) && <span className="validation_text">{error || state.error}</span>}
        {popover && showPopover && <PopOver message={popOverMessage} />}
      </Fragment>
    );
  } else {
    return (
      <>
        <label htmlFor={label} className="label">
          {label}
        </label>
        <select
          ref={addToRefsArray}
          id={label}
          data-test={name}
          name={name}
          className="select"
          onChange={(e) => {
            onInputChange(e.target);
          }}
          onBlur={(e) => validateOnBlur(e.target)}
        >
          {options.map((opt, i) => {
            return (
              <option key={i} value={opt}>
                {opt}
              </option>
            );
          })}
        </select>
        {state.error && <span className="validation_text">{state.error}</span>}
      </>
    );
  }
}
