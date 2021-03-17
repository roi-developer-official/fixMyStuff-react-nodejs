import {  useState } from 'react';
import {Button,AddImage } from '../../../Global_UI';
import './pageTwo.css';
function PageTwo({moveBetweenPages,show}){
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
                            key={i} label={btn.label} onClick={()=>moveBetweenPages(btn.label,[{...input}])}
                            style={btn.style}></Button>
                        })}
                </div>
            </div>
    )
}
export default PageTwo;