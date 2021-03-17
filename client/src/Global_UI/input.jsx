import { Fragment } from "react";

export function Input({
    label, 
    type, 
    validate, 
    onChange,
    name,
    value,
    onBlur,
    error,
    accept,
    style,
    ref,
    min
}){


    return (
        <Fragment>
            <label>{label}</label>
            <input
            min={min}
            ref={ref} 
            type={type} 
            name={name} 
            onChange={(e)=>onChange(e,name)} 
            onBlur={()=>onBlur(name)}
            accept={accept}
            style={{...style}}
            value={value}/>
            {validate && <span className='validation_text'>{error}</span>}
        </Fragment>
    )
}

