import { useEffect, useRef } from "react";
import { Logo, FormFeedback, LoadingSpinner, Inputs, Buttons } from "../../Global_UI";
import { login , actionTypes} from "../../actions/authAction";
import "./login.css";
import { useHistory, NavLink } from "react-router-dom";
import { buttons as pageButtons , inputs as pageInputs} from './elements';
import { useDispatch, useSelector } from "react-redux";

function LoginPage() {
  const history = useHistory();
  const { error, loading, success, loginInputs: inputs } = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();
  let timerId  = useRef();
  const refs  =  useRef([]);

  useEffect(()=>{
    if(success){
      timerId.current = setTimeout(()=>{
        dispatch({type: actionTypes.AUTH_RESET_STATE});
        history.push("/")
      },700);
    } else {
      clearTimeout(timerId.current);
    }
  },[success, history,dispatch]);

  function onInputChange(name, value, error) {
    dispatch({ type: actionTypes.AUTH_LOGIN_SET_INPUT, name: name, value: value, error: error });
  }

  function onButtonClick(label) {
    if (label === "Login") {
      for(let i = 0 ; i < inputs.length; i++){
        if(inputs[i].error.length > 0 || inputs[i].value.length === 0) {
          refs.current[i].focus();
          return;
        }
      }
    dispatch({type: actionTypes.AUTH_ACTION_START});
    dispatch(login());
    }
    else
      history.push("/");
    }

  return (
    <div className="pages_container">
      <FormFeedback error={error} message={success ? "Login Successfuly!" : error} success={success}/>
      <div className="login_wrapper_page">
        <div className="login_header">
        <LoadingSpinner show={loading}/>
          <Logo></Logo>
          <p>
            not signed in yet? <NavLink to="/Sign-in">signup</NavLink> now!
          </p>
        </div>
        <Inputs inputs={pageInputs} className="form_input_wrapper" onChange={onInputChange} refs={refs}/>
        <Buttons buttons={pageButtons} onClick={onButtonClick} className="form_buttons_wrapper"/>
      </div>
    </div>

  );
}
      


export default LoginPage;
