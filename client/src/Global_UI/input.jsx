import React, { Fragment } from "react";
import {validation} from '../validations/Validations';

export function Input({
    label, 
    type, 
    name,
    accept,
    style,
    ref,
    min,
    updateInput,
    validations
}){
    const [state, setState] = React.useState({
        error: '',
        value: ''
    });

     function validateOnBlur(input){
        let errorMsg = validation(validations ,input.value);
        if(errorMsg){
            setState({
                ...state,
                error: errorMsg
            })
        } 
    }
    
    const  onInputChange =(input)=>{
        console.log(input);
        const value = input.value;
        const name = input.name;
        updateInput(name,value);
        setState({
            ...state,
            value: input.value
        });
    }

    return (
        <Fragment>
            <label htmlFor={name}>{label}</label>
            <input
            id={name}
            min={min}
            ref={ref} 
            type={type} 
            name={name}
            onChange={(e)=>onInputChange(e.target)}
            onBlur={(e)=>validateOnBlur(e.target)}
            accept={accept}
            style={{...style}}
            value={state.value}/>
            {state.error && <span className='validation_text'>{state.error}</span>}
        </Fragment>
    )
}

