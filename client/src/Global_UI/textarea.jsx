

export function Textarea ({cols,rows,label,style}){

    return <div className="form_textarea_wrapper">
        <label>{label}</label>
        <textarea cols={cols} rows={rows} style={{maxWidth: '294px'}}/>

    </div>
}