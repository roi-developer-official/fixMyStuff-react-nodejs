
export function Button({style,onClick,label,className}){
        return <button 
        data-test={`button-${label.toLowerCase()}`}
        className={className}
        name={label}
        style={{...style}} 
        onClick={()=>onClick(label)}
        type="button">{label}</button> 
}
