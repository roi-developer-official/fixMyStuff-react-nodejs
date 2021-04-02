import React from 'react';
import {validation} from '../validations/Validations';
export function Textarea ({
    cols,
    rows,
    label,
    validations,
    name,
    updateInput,
    addToRefsArray
}){

    const [state, setState] = React.useState({
        error: '',
        value: ''
    });

     function validateOnBlur(input){
         if(validations){
             const name = input.name;
             let errorMsg = validation(validations ,state.value);
             if(errorMsg){
                 setState({
                     ...state,
                     error: errorMsg
                 });
                 updateInput(name,state.value,errorMsg)
             } 
         }
    }

    const onInputChange =(input)=>{
        const value = input.value;
        const name = input.name;
        setState({
            value: input.value,
            error: ""
        });
        updateInput(name,value, "");
    }

    return <div className="form_textarea_wrapper">
        <label>{label}</label>
        <textarea 
        data-test={name}
        ref={addToRefsArray}
        cols={cols} 
        name={name}
        rows={rows} 
        style={{maxWidth: '294px'}}
        onChange={(e)=>onInputChange(e.target)}
        onBlur={(e)=>validateOnBlur(e.target)}
        />
        {state.error && <span className='validation_text'>{state.error}</span>}
    </div>
}