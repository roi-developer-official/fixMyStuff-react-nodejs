
import { useState } from 'react';
import './pageThree.css';
import {Input,Button, Select} from '../../Global_UI';
import validation from '../../validations/Validations';
import updateInputs from '../../util/useInputs';

function PageThree({moveBetweenPages,show}){

    let [inputs,setInputs] = useState([{
        label: "Yes, I'm looking for jobs.",
        type: 'radio',
        name : 'role',
        value:2
    },
    {
        label: "No, I'm not looking for jobs.",
        type: 'radio',
        name : 'role',
        validate:true,
        value:1,
        error: ''
    }]);
    const [selectInputs,setSelectInputs] = useState([
        {
            name: 'profession',
            label: 'Profession',
            value:'',
            error:'',
            validate:true,
            validations:{
                required:true
            },
            options: ['','Carpenter ','Electrician','Mechanic','Painter','Plumber','Tailor','Bricklayer','Window cleaner','Cleaner', 'other']
        },
        {
            name: 'experience',
            label: 'Experience',
            value:'',
            error:'',
            validate:true,
            validations:{
                required:true
            },
            options: ['','none', '1-2 years', '2-3 years', '3-4 years', '5 and more years']
        }
    ]);
    let [userSelction,setUserSelction] = useState({
        name:'role',
        value:'',
        validations:{
            required:true
        }
    });
    let buttons = [
        {
            label: 'Back', 
            style:{
                backgroundColor: '#ccc',   
        }
        },
        {
            label: 'Next', 
            style:{
                backgroundColor: '#08c982'
        }
        }
    ];

    function changePage(action){
        if(action === 'Next' && validateInputs()){
            let output = [];
            output.push({...userSelction});
            selectInputs.map(sel=>output.push({...sel}));
            moveBetweenPages(action, output) 
        } 
        else if(action === 'Back') {
             moveBetweenPages(action);
        }
    }

    function onInputChange(e){
        setUserSelction({
            name:'role',
            value: Number.parseInt(e.target.value)
        });
        let updatedInputs = inputs.slice();
        updatedInputs[1].error = '';
        setInputs(updatedInputs);
    }

    function validateInputs(){
        let isValidPage = true;

        if(!userSelction.value){
            let updatedInput = inputs.slice();
            updatedInput[1].error = 'you must select one';
            isValidPage = false; 
            setInputs(updatedInput)   
        }        
        if(userSelction.value === 2){
            let updatedSelects = selectInputs.slice();
            for(let i of updatedSelects){
                let message = validation(i.validations,i.value);
                if(message){
                    isValidPage = false;
                    i.error = message;
                }
            }
            setSelectInputs(updatedSelects);
        }
        return isValidPage;
    }

    function onSelectChange(e,name){
        updateInputs(selectInputs, setSelectInputs, name, e);
    }
    
    return (
        <div className={`signup_wrapper_page ${show? 'show' :''}`}>
            <p style={{marginTop: '10px', fontSize: '19px'}}>Are you looking for Jobs?</p>
            <br/>
            <div className="form_input_wrapper">
            {inputs.map((input,i)=>{
                       return <Input
                        key={i}
                        label={input.label} 
                        name={input.name} 
                        onChange={onInputChange}
                        type={input.type}
                        value={input.value}
                        validate={input.validate}
                        onBlur={()=>{}}
                        error={input.error}
                    ></Input>
                })}
            </div>
            {userSelction.value === 2 && selectInputs.map(input=>{
                return (
             <div className="form_select_wrapper">
                    <Select 
                    key={input.name}
                    label={input.label} 
                    error={input.error}
                    validate={input.validate}
                    onBlur={validateInputs}
                    options={input.options}
                    onChange={(e)=>onSelectChange(e,input.name)}
                    />
             </div>
                )
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
export default PageThree;