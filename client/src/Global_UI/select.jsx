import { useState } from 'react';
import './global.css'
import {validation} from '../validations/Validations';
export function Select({
    options,
    label,
    onChange,
    validate,
    validations,
    updatedInput
    }
    ){
    const [error,setError] = useState("");

    function onBlur(input){
        let errorMsg = validation(validations,input.value);
        if(errorMsg){
           setError(errorMsg)
        }
    }

    function onChange(input){
        const value = input.value;
        const name = input.name;
        updatedInput(name, value);
    }



    return (
        <>
            <label htmlFor={label} className='label'>{label}</label>
            <select 
            id={label}
            className='select' 
            onChange={onChange}
            onBlur={(e)=>onBlur(e.target)}
            >
                {options.map((opt,i)=>{
                    return <option key={i} value={opt}>{opt}</option>
                })}
            </select>
            {validate && <span className='validation_text'>{error}</span>}
    </>
    )
}
