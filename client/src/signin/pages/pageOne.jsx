import { useReducer, useState } from "react";
import { Button, Input, Logo, Select } from "../../Global_UI";
import validation from "../../validations/Validations";
import React from 'react';
import { useHistory } from "react-router-dom";
import {
  buttons,
  inputs as pageInputs,
  selects as pageSelects,
} from "./elements";

const SET_INPUT = "SET_INPUT";


const initialState = {
  inputs: [
    (pageInputs.page1[0].name = {
      value: "",
    }),
    (pageInputs.page1[1].name = {
      value: "",
    }),
    (pageSelects.page1[0].name = { value: "" }),
  ],
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_INPUT:
      const updatedInput = state.inputs.slice();
      updatedInput[action.inputName].value = action.value;
      return {
        ...state,
        inputs: updatedInput,
      };
    default:
  }
}

const citiesString =
  ",Akko,Afula,Arad,Ashdod,Ashqelon,Bat Yam,Beersheba,Bet Sheʾan,Bet Sheʿarim,Bnei Brak,Caesarea,Dimona,Dor,Elat,En Gedi,Givʿatayim,H̱adera,Haifa,Herzliyya,H̱olon,Jerusalem,Karmiʾel,Kefar Sava,Lod,Meron,Nahariyya,Nazareth,Netanya,Petaẖ Tiqwa,Qiryat Shemona,Ramat Gan,Ramla,Reẖovot,Rishon LeẔiyyon,Sedom,Tel Aviv–Yafo,Tiberias,Ẕefat";
function PageOne({ moveBetweenPages, show }) {
  const cities = citiesString.split(",");
  const history = useHistory();
  const [state, dispatch] = React.useReducer(reducer, initialState);

//   function changePage(action) {
//     let isValidPage = true;
//     let updatedInputs = inputs.slice();

//     if (action === "Next") {
//       for (let index in Object.keys(inputs)) {
//         let message = validation(
//           inputs[index].validations,
//           inputs[index].value
//         );
//         if (message) {
//           isValidPage = false;
//           updatedInputs[index].error = message;
//         }
//       }
//       let message = validation(selectInput.validations, selectInput.value);
//       if (message) {
//         let updatedSelectedInput = { ...selectInput };
//         updatedSelectedInput.error = message;
//         isValidPage = false;
//         setSelectInput(updatedSelectedInput);
//       }
//     } else {
//       history.push("/");
//     }

//     if (!isValidPage) {
//       setInputs(updatedInputs);
//     } else {
//       let groupedInputs = [...inputs, selectInput];
//       moveBetweenPages(action, groupedInputs);
//     }
//   }

  function onInputChange(name, value) {
    dispatch({ type: SET_INPUT, inputName: name, value: value });
  }

  return (
    <div className={`signup_wrapper_page ${show ? "show" : ""}`}>
      <div className="logo_header">
        <Logo></Logo>
      </div>
      {pageInputs.page1.map((input, i) => {
        return (
          <div key={i} className="form_input_wrapper">
            <Input
              label={input.label}
              type={input.type}
              name={input.name}
              value={input.value}
              error={input.error}
              onChange={onInputChange}
              validate={input.validate}
              validations={input.validations}
            ></Input>
          </div>
        );
      })}
      {/* <div className="form_select_wrapper">
        <Select
          label="City"
          error={selectInput.error}
          validate={selectInput.validate}
          onBlur={(e) => validateSelectOnBlur(e)}
          options={cities}
          onChange={onSelectChange}
        />
      </div>
      <div className="form_buttons_wrapper">
        {buttons.map((btn, i) => {
          return (
            <Button
              key={i}
              label={btn.label}
              onClick={() => changePage(btn.label)}
              style={btn.style}
            ></Button>
          );
        })}
      </div> */}
    </div>
  );
}
export default PageOne;
