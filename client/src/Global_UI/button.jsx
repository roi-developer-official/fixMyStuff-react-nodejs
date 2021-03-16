
export function Button({style,onClick,label,className}){
    
        return <button 
        className={className}
        style={{...style}} 
        onClick={()=>onClick(label)}
        type="button">{label}</button> 
}
