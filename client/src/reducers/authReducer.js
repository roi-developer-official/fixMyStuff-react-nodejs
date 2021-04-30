import { actionTypes } from "../actions/authAction";
export const citiesString =
  ",Akko,Afula,Arad,Ashdod,Ashqelon,Bat Yam,Beersheba,Bet Sheʾan,Bet Sheʿarim,Bnei Brak,Caesarea,Dimona,Dor,Elat,En Gedi,Givʿatayim,H̱adera,Haifa,Herzliyya,H̱olon,Jerusalem,Karmiʾel,Kefar Sava,Lod,Meron,Nahariyya,Nazareth,Netanya,Petaẖ Tiqwa,Qiryat Shemona,Ramat Gan,Ramla,Reẖovot,Rishon LeẔiyyon,Sedom,Tel Aviv–Yafo,Tiberias,Ẕefat";

const initialState = {
  user: {},
  expiry: null,
  loading: false,
  error: null,
  success: false,
  signInInputs: {
    page1: [
      {
        name: "firstName",
        value: "",
        error: "",
        label: "First name",
        type: "text",
        validations: {
          required: true,
          minLength: 2,
          alphaNumeric: true,
        },
        showLabel:true
      },
      {
        name: "lastName",
        value: "",
        error: "",
        label: "Last name",
        type: "text",
        validations: {
          required: true,
          minLength: 2,
          alphaNumeric: true,
        },
        showLabel:true
      },
      {
        name: "city",
        value: "",
        error: "",
        type: "select",
        label: "City",
        validations: {
          required: true,
        },
        options: citiesString.split(","),
        showLabel:true
      },
    ],
    page2: [{ name: "image", value: "" }],
    page3: [
      {
        name: "selectedRole",
        value: "",
        style: { display: "none" }
      },
      {
        name: "role",
        value: 1,
        error: "",
        label: "Yes, I'm looking for jobs.",
        type: "radio",
        showLabel:true
      },
      {
        name: "role",
        value: 2,
        error: "",
        label: "No, I'm not looking for jobs.",
        type: "radio",
        showLabel:true
      },
      {
        name: "profession",
        value: "",
        error: "",
        showLabel:false,
        type: "select",
        label: "Profession",
        style: { "display": "none" },
        validations: {
          required: true,
        },
        options: [
          "",
          "Carpenter ",
          "Electrician",
          "Mechanic",
          "Painter",
          "Plumber",
          "Tailor",
          "Bricklayer",
          "Window cleaner",
          "Cleaner",
          "other",
        ],
      },
      {
        name: "experience",
        style: { "display": "none" },
        value: "",
        error: "",
        type: "select",
        label: "Experience",
        showLabel:false,
        validations: {
          required: true,
        },
        options: [
          "",
          "none",
          "1-2 years",
          "2-3 years",
          "3-4 years",
          "5 and more years",
        ],
      },
    ],
    page4: [
      {
        name: "email",
        value: "",
        error: "",
        label: "Email",
        showLabel:true,
        type: "text",
        validations: {
          required: true,
          email: true,
        },
      },
      {
        name: "password",
        value: "",
        error: "",
        label: "Password",
        type: "password",
        showLabel:true,
        validations: {
          required: true,
          password: true,
          minLength: 8,
        },
      },
      {
        name: "confirmPassword",
        value: "",
        error: "",
        showLabel:true,
        label: "Confirm password",
        type: "password",
        validations: {
          required: true,
          compareTo: true,
        },
      },
      {
        name: "terms",
        value: "",
        showLabel:true,
        error: "",
        label: "Terms and conditions",
        type: "checkbox",
        validations: {
          checked: true,
        },
        popover: true,
        popoverMessage:
          "This is a fake website, Please do not enter any real personal information",
      },
    ],
  },
  loginInputs: [
    { name: "email", value: "", error: "" },
    { name: "password", value: "", error: "" },
  ],
  currentStep: 1,
};

const authReducer = (state = initialState, action) => {
  let updatedInput;
  let mergedInputs;
  let index;
  switch (action.type) {
    case actionTypes.AUTH_SIGN_SET_INPUT:
      updatedInput = JSON.parse(JSON.stringify(state.signInInputs));
      mergedInputs = updatedInput.page1.concat(
        updatedInput.page2,
        updatedInput.page3,
        updatedInput.page4
      );
      if (action.name === "role") {
        action.name = "selectedRole";
        action.value = parseInt(action.value);
        let experienceInput = mergedInputs.find(
          (input) => input.name === "experience"
        );
        console.log(experienceInput);
        let profressionInput = mergedInputs.find(
          (input) => input.name === "profession"
        );
        if (action.value === 1) {
          experienceInput.style = { "display": "block" };
          profressionInput.style = { "display": "block" };
          experienceInput.showLabel = true;
          profressionInput.showLabel = true;
        } else {
          experienceInput.style = { "display": "none" };
          profressionInput.style = { "display": "none" };
          experienceInput.showLabel = false;
          profressionInput.showLabel = false;
        }
      }

      index = mergedInputs.findIndex((input) => input.name === action.name);
      mergedInputs[index].value = action.value;
      mergedInputs[index].error = action.error;

      return {
        ...state,
        signInInputs: updatedInput,
      };
    case actionTypes.AUTH_LOGIN_SET_INPUT:
      updatedInput = state.loginInputs.slice();
      index = updatedInput.findIndex((input) => input.name === action.name);
      updatedInput[index].value = action.value;
      updatedInput[index].error = action.error;
      return {
        ...state,
        loginInputs: updatedInput,
      };
    case actionTypes.AUTH_LOGOUT:
      return initialState;
    case actionTypes.AUTH_ACTION_START:
      return {
        ...state,
        loading: true,
        error: null,
        success: false,
      };
    case actionTypes.AUTH_RESET_STATE:
      return {
        ...state,
        loading: false,
        error: null,
        success: false,
        currentStep: 1,
        signInInputs: initialState.signInInputs,
        loginInputs: initialState.loginInputs,
      };
    case actionTypes.AUTH_ACTION_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        success: false,
      };
    case actionTypes.AUTH_ACTION_SUCCESS:
      return {
        ...state,
        error: null,
        loading: false,
        user: action.payload.user,
        expiry: action.payload.expiry,
        success: true,
      };
    case actionTypes.AUTH_FILL_INPUTS:
      updatedInput = JSON.parse(JSON.stringify(state.signInInputs));
      mergedInputs = updatedInput.page1.concat(
        updatedInput.page2,
        updatedInput.page4
      );
      let newInput;

      for (let [key, value] of Object.entries(action.payload)) {
        console.log(key, value);
        value = value === "null" ? null : value;
        newInput = mergedInputs.find((input) => input.name === key);
        console.log(newInput);
        if (newInput) {
          newInput.value = value;
        }
      }
      return {
        ...state,
        signInInputs: updatedInput,
      };

    default:
      return state;
  }
};
export default authReducer;
