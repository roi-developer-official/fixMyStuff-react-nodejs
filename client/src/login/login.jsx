import { useContext, useEffect, useState } from 'react';
import {validation} from '../validations/Validations';
import {Input,Button,Logo,FormFeedback} from '../Global_UI';
import {login , actionTypes} from '../actions/authAction';
import './login.css';
import { NavLink, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { AuthContext } from '../context/authContext';

function LoginPage(props){
    const history = useHistory();
    const authContext = useContext(AuthContext);
    const [loginSuccess, setLoginSuccess] = useState(false);
    const [inputs,setInputs] = useState([
        {
            label: 'Email',
            name: 'email',
            type:'text',
            validate: true,
            validations:{
                required: true,
                email:true
            },
            value:'',
            error:''
        },
        {
            label: 'Password',
            name: 'password',
            type:'password',
            validate: true,
            validations:{
                required: true,
                minLength:8
            },
            value:'',
            error: ''
        },
    ]);
    const buttons = [
        {
            label: 'Cancel', 
            style:{
                backgroundColor: '#ccc',   
        }
        },
        {
            label: 'Login', 
            style:{
                backgroundColor: '#08c982'
        }
        }
    ];
  

    useEffect(()=>{
        props.resetState();
    },[]);


    function onInputChange(e,name){
        // updateInputs(inputs,setInputs, name, e);
    }

    function validateOnBlur(name){
        let index = inputs.findIndex(input=>input.name === name);
        let errorMsg = validation(inputs[index].validations, inputs[index].value);
        if(errorMsg){
            let updatedInputs = inputs.slice();
            updatedInputs[index].error = errorMsg;
            setInputs(updatedInputs)
        }
    }

    function onButtonClick(label){
        if(label === 'Login'){
            let isValidPage = true;
            let updatedInputs = inputs.slice();
            for(let input of updatedInputs){
                let errorMsg = validation(input.validations, input.value);
                if(errorMsg){
                    isValidPage = false;
                    input.error = errorMsg;
                }
            }
            if(!isValidPage)
                setInputs(updatedInputs);
            else {
                submitPage(inputs);
            }
        } 
        else {
           
            history.push('/');
        }
    }

    
    function submitPage(inputs){

        let reqData ={
            email: inputs[0].value,
            password: inputs[1].value
        }

        props.loginStart();
        props.login(reqData,onLoginSuccess);
    }
    
    
    function onLoginSuccess(result){
        
        setLoginSuccess(true);
        setTimeout(()=>{
            authContext.setAuthState(result);
            history.push('/');
        },700);

    }

    function returnCustomFeedback(){
        if(props.error){
            return <FormFeedback error={true} message={props.error}></FormFeedback>;
        }else if(loginSuccess) {
            return <FormFeedback error={false} message={'Login Succesfully!'}></FormFeedback>;
        } else {
            return null;
        }
    }

    return (
        <div className='login_page_container'>
             {returnCustomFeedback()}
        <div className="login_wrapper_page">
            <div className="login_header">
            {props.loading && <div className='loader'></div>}
            <Logo></Logo>
            <p>not signed in yet? <NavLink to='/Sign-in' >signup</NavLink> now!</p>
            </div>
            {inputs.map(input=>{
                return <div key={input.label} className="form_input_wrapper">
                    <Input label={input.label}
                    name={input.name}
                    error={input.error}
                    onChange={onInputChange}
                    onBlur={validateOnBlur}
                    type={input.type}
                    value={input.value}
                    validate={input.validate}
                    ></Input>
                </div>
            })}
            <div className="form_buttons_wrapper">
            {buttons.map(btn=>{
                return <Button 
                key={btn.label}
                label={btn.label}
                style={btn.style}
                type={'button'}
                onClick={()=>onButtonClick(btn.label)}
                ></Button>
            })}
            </div>
        </div>
    </div>
    );

};

const mapStateToProps = (state)=>{
    return {
        error:state.error,
        loading: state.loading
    }
}

const mapDispatchToProps = (dispath)=>{
    return {
        loginStart: ()=>dispath({type: actionTypes.ACTION_START}),
        login: (reqData, callback)=>dispath(login(reqData,callback)),
        resetState: ()=>dispath({type: actionTypes.RESET_STATE})
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(LoginPage);