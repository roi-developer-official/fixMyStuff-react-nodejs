import { Fragment } from "react";

function Input({
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
    ref
}){

    return (
        <Fragment>
            <label>{label}</label>
            <input
            ref={ref} 
            type={type} 
            name={name} 
            onChange={onChange} 
            onBlur={onBlur}
            accept={accept}
            style={{...style}}
            value={value}/>
            {validate && <span className='validation_text'>{error}</span>}
        </Fragment>
    )
}

export default Input;