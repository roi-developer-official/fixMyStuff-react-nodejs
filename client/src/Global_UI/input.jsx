import React, { Fragment } from "react";
import {validation} from '../validations/Validations';

export function Input({
    inputType,
    options,
    label, 
    type, 
    checked,
    value,
    name,
    accept,
    style,
    min,
    updateInput,
    updateError,
    validations,
    addToRefsArray
}){

    const [state, setState] = React.useState({
        error: '',
        value: ''
    });
     function validateOnBlur(input){
         if(validations){
             const value = input.value;
             const name = input.name;
             let errorMsg = validation(validations ,value);
             if(errorMsg){
                 setState({
                     ...state,
                     error: errorMsg
                 });
                 updateError(name,errorMsg)
             } 
         }
    }

    const onInputChange =(input)=>{
        const value = input.value;
        const name = input.name;
        setState({
            ...state,
            value: input.value,
            error: ""
        });
        updateInput(name,value);
        if(validations)
            updateError(name, "");
    }

if(inputType !== 'select'){
    return (
        <Fragment>
            <label htmlFor={name}>{label}</label>
            <input
            data-test={`${name}`}
            id={name}
            min={min}
            ref={addToRefsArray} 
            type={type} 
            checked={checked}
            name={name}
            onChange={(e)=>{onInputChange(e.target)}}
            onBlur={(e)=>validateOnBlur(e.target)}
            accept={accept}
            style={{...style}}
            value={value? value : state.value}/>
            {state.error && <span className='validation_text'>{state.error}</span>}
        </Fragment>
    )
    }
    else {
        return (
            <>
            <label htmlFor={label} className='label'>{label}</label>
            <select 
            ref={addToRefsArray}
            id={label}
            data-test={name}
            name={name}
            className='select' 
            onChange={(e)=>{onInputChange(e.target)}}
            onBlur={(e)=>validateOnBlur(e.target)}
            >
                {options.map((opt,i)=>{
                    return <option key={i} value={opt}>{opt}</option>
                })}
            </select>
            {state.error && <span className='validation_text'>{state.error}</span>}
            </>
        )
    }
}

