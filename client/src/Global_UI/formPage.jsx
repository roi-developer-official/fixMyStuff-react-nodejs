

export function FormPage({children, show}){
    return (
        <div className={`form_page${show? " show" : ""}`}>
            {children}
        </div>
    )
}