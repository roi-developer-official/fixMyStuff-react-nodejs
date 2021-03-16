import { useContext, useEffect, useState } from 'react';
import validation from '../validations/Validations';
import Input from '../Global_UI/input/input';
import Button from '../Global_UI/button/button';
import * as actions from '../store/actions/auth.actions';
import {login} from '../store/actions/actionsCreators/auth.actionCreator';
import FormFeedback from '../Global_UI/formFeedback/formFeedback';
import './login.css';
import Logo from '../Global_UI/logo/logo';
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
  

    function onInputChange(e,name){
        let index = inputs.findIndex(input=>input.name === name);
        let updatedInputs = inputs.slice();
        updatedInputs[index].value = e.target.value;
        updatedInputs[index].error = '';
        setInputs(updatedInputs);
    }

    function validateOnBlur(e,name){
        let index = inputs.findIndex(input=>input.name === name);
        let errorMsg = validation(inputs[index].validations, e.target.value);
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
                    onChange={(e)=>onInputChange(e,input.name)}
                    onBlur={(e)=>validateOnBlur(e,input.name)}
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
        loginStart: ()=>dispath({type: actions.ACTION_START}),
        login: (reqData, callback)=>dispath(login(reqData,callback))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(LoginPage);