import {useState} from 'react'
import {Input, Button, Textarea, Logo} from '../../../Global_UI';
import updatedInputs from '../../../util/useInputs';
import validation from '../../../validations/Validations';
import {useHistory} from 'react-router-dom'
export default function PageOne({show,changePage}){
    const [inputs,setInputs] = useState([
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
        },
        {
            label: 'Max', 
            type: 'text',
            name: 'maxPayment',
            validate: true,
            value:0,
            min: 0,
            error:'',
            style:{
                width:'32%',
                height:'30px',
                paddingLeft:'5px',
                marginLeft:'5px',
                marginRight: 'auto'
            },
            validations:{
                numeric:true
            },
            error:'',
        },
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
    ]);

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
    const history = useHistory();
    function onInputChange(e,name){

        updatedInputs(inputs,setInputs, name, e);
    }


    function validateInputOnBlur(name){
        let index = inputs.findIndex(input=>input.name === name);
        let errorMsg = validation(inputs[index].validations,inputs[index].value);
        if(errorMsg){
            let updatedInputs = inputs.slice();
            updatedInputs[index].error = errorMsg;
            setInputs(updatedInputs)
        } 
    }

    function onButtonClicked(label){
        switch(label){
            case 'Cancel':
                history.push('/My-page');
            break;
            case 'Next':
                validateInputsOnPageSubmmited(label)
                break;
        }
    }

    function validateInputsOnPageSubmmited(label){
        let isValidPage = true;
        let updatedInputs = inputs.slice();
        for(let input of updatedInputs){
            let errorMsg = validation(input.validations, input.value);
            if(errorMsg){
                isValidPage = false;
                input.error = errorMsg;
            }
        }
        if(isValidPage){
            let output = inputs.slice();
            output[1].value = output[1].value ? output[1].value : 0;
    
            changePage(label,output);
        }
        else{
            setInputs(updatedInputs);
        }
    }


    return (
        <div className={`add_post_page ${show ? 'show' : ''}`}>
            <div className="logo_header">
                    <Logo></Logo>
            </div>
            <div key={inputs[0].label} className="form_input_wrapper">
                <Input
                        label={inputs[0].label}
                        onChange={onInputChange}
                        onBlur={validateInputOnBlur}
                        name={inputs[0].name}
                        error={inputs[0].error}
                        validate={inputs[0].validate}
                        type={inputs[0].type}></Input>
            </div>
            <div className="form_input_wrapper">
                <label>Peek the price you are willing to pay:</label>
            </div>
            <div className="form_number_input_wrapper">
            <Input 
            name={inputs[1].name}
            label={inputs[1].label} 
            min={inputs[1].min}
            type={inputs[1].type} 
            onBlur={validateInputOnBlur}
            onChange={onInputChange}
            error={inputs[1].error}
            validate={inputs[1].validate}
            style={inputs[1].style}></Input>
            </div>
            <Textarea 
            label={inputs[2].label} 
            cols={inputs[2].cols}
            onBlur={validateInputOnBlur}
            onchange={onInputChange}
            name={inputs[2].name}
            validate={inputs[2].validate}
            error={inputs[2].error}
            rows={inputs[2].rows}></Textarea>
            <div className="form_buttons_wrapper">
                {Buttons.map(btn=>{
                    return <Button 
                    label={btn.label} 
                    onClick={onButtonClicked} 
                    style={btn.style}
                    />
                })}
            </div>
    </div>
    )



}