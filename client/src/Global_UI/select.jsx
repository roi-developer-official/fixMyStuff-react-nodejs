import './global.css'
export function Select({options,label,onChange,error,validate,onBlur}){

    return (
        <>
            <label htmlFor={label} className='label'>{label}</label>
            <select 
            id={label}
            className='select' 
            onChange={onChange}
            onBlur={onBlur}
            >
                {options.map((opt,i)=>{
                    return <option key={i} value={opt}>{opt}</option>
                })}
            </select>
            {validate && <span className='validation_text'>{error}</span>}
    </>
    )
}
