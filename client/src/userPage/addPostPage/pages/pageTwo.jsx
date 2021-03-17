
import { useState } from 'react';
import {Button, AddImage} from '../../../Global_UI';
export default function PageTwo({show,changePage}){

    let [input,setInput] = useState({
        name: 'image',
        value: null
    });

    const Buttons = [
        {
            label: 'Back',            
            style:{
                backgroundColor:'#ccc'
            }
        },
        {
            label: 'Done',
            style:{
                backgroundColor: '#08c982'
            }
        }
    ];

    function onBtnClick(label){
        switch(label){
            case 'Back':
                changePage(label);
                break;
            case 'Done':
                let output = [];
                output.push(input);
                changePage(label,output);
                break;
        }
    }

    function setImageValue(value){
        setInput({...input,value});
    }

    return (
        <div className={`add_post_page ${show ? 'show' : ''}`}>
        <AddImage setInputValue={setImageValue}></AddImage>
        <div className="form_buttons_wrapper">
                {Buttons.map(btn=>{
                    return <Button 
                    label={btn.label} 
                    onClick={onBtnClick} 
                    style={btn.style}
                    />
                })}
            </div>
        </div>
    )
}