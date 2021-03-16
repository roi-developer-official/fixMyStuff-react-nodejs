import {useState} from 'react'
import {Input, Button, Textarea, Logo} from '../../../Global_UI';

export default function PageOne({show,changePage}){
    const [input,setInpust] = useState(
        {
            label: 'Title', 
            type: 'text',
            name: 'title',
            value:'',
            validate:true,
            validations:{
                required:true
            },
            error:'',
        }
    );
    const [numberInput,setNumberInput] = useState(
        {
            label: 'Max', 
            type: 'number',
            name: 'from',
            value:'',
            error:'',
            style:{
                width:'32%',
                height:'30px',
                paddingLeft:'5px',
                marginLeft:'5px',
                marginRight: 'auto'
            }
        });
    const [desInput,setDesInput] = useState(
        {
            label: 'Description', 
            name: 'description',
            cols:30,
            rows:5,
            value:'',
            validate:true,
            validations:{
                required:true
            },
            error:'',
        }
    );
    const Buttons = [
        {
            label: 'Cancel',            
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

    return (
        <div className={`add_post_page ${show ? 'show' : ''}`}>
            <div className="logo_header">
                    <Logo></Logo>
            </div>
            <div key={input.label} className="form_input_wrapper">
                <Input
                        label={input.label}
                        type={input.type}></Input>
            </div>
            <div className="form_input_wrapper">
                <label>Peek the price you are willing to pay:</label>
            </div>
            <div className="form_number_input_wrapper">
            <Input 
            label={numberInput.label} 
            type={numberInput.type} 
            style={numberInput.style}></Input>
            </div>
            <Textarea label={desInput.label} 
            cols={desInput.cols}
            rows={desInput.rows}></Textarea>
            <div className="form_buttons_wrapper">
                {Buttons.map(btn=>{
                    return <Button 
                    label={btn.label} 
                    onClick={changePage} 
                    style={btn.style}
                    />
                })}
            </div>
    </div>
    )



}