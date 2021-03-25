import { useState } from "react";
import {Input,Button} from '../../Global_UI';
import validation from "../../validations/Validations";
function PageFour({moveBetweenPages,show}){

    let [inputs,setInputs] = useState([
        {
            label: 'Email', 
            type: 'text',
            name:'email',
            validate:true,
            validations:{
                required:true,
                email:true
            },
            value:'',
            error:''
        },
        {
            label: 'Password', 
            type: 'password',
            name:'password',
            validations:{
                required:true,
                password:true,
                minLength:8
            },
            validate:true,
            value:'',
            error:'',  
        },
        {
            label: 'Confirm password', 
            type: 'password',
            name:'confirm password',
            validate:true,
            validations:{
                required :true,
                compareTo:true
            },
            value:'',
            error:''
        }
    ]);
    let buttons = [
        {
            label: 'Back',
            style:{
                backgroundColor: '#ccc'
            }
        },
        {
            label: 'Done',
            style:{
                backgroundColor: '#08c982'
            }
        }
    ];


    function onInputChange(e, name){
        let index = inputs.findIndex(input=>input.name === name);
        let updatedInputs = inputs.slice();
        updatedInputs[index].value = e.target.value;
        updatedInputs[index].error = '';
        if(name === 'password')
            updatedInputs[index+1].error = '';
        setInputs(updatedInputs);
    }

    function validateOnBlur(name){
        let index = inputs.findIndex(input=>input.name === name);
        if(name === 'confirm password'){
            let password = inputs.find(input=>input.name === 'password');
            let errorMsg = validation(inputs[index].validations,inputs[index].value,password.value);
            if(errorMsg){
                let updatedInputs = inputs.slice();
                updatedInputs[index].error = errorMsg;
                setInputs(updatedInputs)
            }
        }
        else {
            let errorMsg = validation(inputs[index].validations,inputs[index].value);
            if(errorMsg){
                let updatedInputs = inputs.slice();
                updatedInputs[index].error = errorMsg;
                setInputs(updatedInputs)
            }
        }
    }

    function changePage(action){

        let isValidPage = true;
        let updatedInputs = inputs.slice();
    
        if(action === 'Done'){
            for(let index in Object.keys(inputs)){
                let compareTo = null;
                if(inputs[index].name === 'confirm password')
                    compareTo = inputs[index - 1].value;
                let message = validation(inputs[index].validations,inputs[index].value, compareTo);
                if(message){
                    isValidPage = false;
                    updatedInputs[index].error = message;
                }
            }
        } else{
            moveBetweenPages(action)
        }

        if(!isValidPage){
            setInputs(updatedInputs)
        } else {
            let ouput = inputs.slice();
            ouput.pop();
            moveBetweenPages(action, ouput);
        }
            
    }   

    
    return (
            <div className={`signup_wrapper_page ${show? 'show' :''}`}>
            {inputs.map((input,i)=>{
            return <div key={i} className="form_input_wrapper">
                        <Input 
                        label={input.label} 
                        name={input.name} 
                        onChange={onInputChange}
                        onBlur={validateOnBlur}
                        error={input.error}
                        type={input.type}
                        value={input.value}
                        validate={input.validate}
                    ></Input>
            </div>
                })}
            <div className="form_buttons_wrapper">
                {buttons.map((btn,i)=>{
                    return <Button key={i} label={btn.label} onClick={()=>changePage(btn.label)}
                    style={btn.style}></Button>
                })}
            </div>
            </div>
    )
}
export default PageFour;