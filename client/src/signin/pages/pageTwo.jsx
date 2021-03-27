import {  useState } from 'react';
import {Button,AddImage } from '../../Global_UI';
function PageTwo({changePage,show}){
    let [input,setInput] = useState({
        name:'image',
        value:null
    });

    let buttons = [
        {
            label: 'Back',
            style:{
                backgroundColor:'#ccc'
            }
        },
        {
            label: 'Next',
            style:{
                backgroundColor: '#08c982'
            }
        }
    ];

    function setImageValue(value){
        setInput({...input,value});
    }

    
      return (
            <div className={`signup_wrapper_page ${show? 'show' :''}`}>
                <AddImage setInputValue={setImageValue}></AddImage>
                <div className="form_buttons_wrapper">
                        {buttons.map((btn,i)=>{
                            return <Button
                            key={i} label={btn.label} onClick={()=>changePage(btn.label,[{...input}])}
                            style={btn.style}></Button>
                        })}
                </div>
            </div>
    )
}
export default PageTwo;