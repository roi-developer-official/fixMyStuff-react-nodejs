

export function Textarea ({
    cols,
    rows,
    label,
    style,
    validate,
    error,
    name,
    onBlur,
    onchange
}){

    return <div className="form_textarea_wrapper">
        <label>{label}</label>
        <textarea 
        cols={cols} 
        rows={rows} 
        style={{maxWidth: '294px'}}
        onChange={e=>onchange(e,name)}
        onBlur={()=>onBlur(name)}
        />
        {validate && <span className='validation_text'>{error}</span>}
    </div>
}