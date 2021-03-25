
import { useState } from 'react';
import {Button,Input,Logo,Select} from '../../../Global_UI';
import validation from '../../../validations/Validations';
import {useHistory} from 'react-router-dom';
import updateInputs from '../../../util/useInputs';

const citiesString = ",Akko,Afula,Arad,Ashdod,Ashqelon,Bat Yam,Beersheba,Bet Sheʾan,Bet Sheʿarim,Bnei Brak,Caesarea,Dimona,Dor,Elat,En Gedi,Givʿatayim,H̱adera,Haifa,Herzliyya,H̱olon,Jerusalem,Karmiʾel,Kefar Sava,Lod,Meron,Nahariyya,Nazareth,Netanya,Petaẖ Tiqwa,Qiryat Shemona,Ramat Gan,Ramla,Reẖovot,Rishon LeẔiyyon,Sedom,Tel Aviv–Yafo,Tiberias,Ẕefat";
function PageOne({moveBetweenPages,show}){
    let [inputs,setInputs] = useState([
        {
            label: 'First name', 
            type: 'text',
            name: 'firstName',
            value:'',
            validate:true,
            validations:{
                required:true,
                minLength:2,
                alphaNumeric:true
            },
            error:'',
        },
        {
            label: 'Last name', 
            type: 'text',
            name: 'lastName',
            value:'',
            validate:true,
            validations:{
                required:true,
                minLength:2,
                alphaNumeric:true
            },
            error:'',
        }
    ]);
    let buttons = [
        {
            label: 'Cancel', 
            style:{
                backgroundColor: '#ccc',   
            }
        },
        {
            label: 'Next', 
            style:{
                backgroundColor: '#08c982'  
            }
        }
    ];

    const cities = citiesString.split(',');
    const history = useHistory();
    const [selectInput,setSelectInput] = useState({
        name: 'city',
        value:'',
        error:'',
        validate:true,
        validations:{
            required:true
        }
    });

    function changePage(action){
        let isValidPage = true;
        let updatedInputs = inputs.slice();
    
        if(action === 'Next'){
            for(let index in Object.keys(inputs)){
                let message = validation(inputs[index].validations,inputs[index].value);
                if(message){
                    isValidPage = false;
                    updatedInputs[index].error = message;
                }
            }
            let message = validation(selectInput.validations,selectInput.value);
            if(message){
                let updatedSelectedInput = {...selectInput};
                updatedSelectedInput.error = message;
                isValidPage = false;
                setSelectInput(updatedSelectedInput)
            }
        } else{
            history.push('/');
        }

        if(!isValidPage){
            setInputs(updatedInputs)
        } else {
            let groupedInputs = [...inputs, selectInput]
            moveBetweenPages(action,groupedInputs);
        }      
    }


    function onInputChange(e, name){
        updateInputs(inputs,setInputs, name, e)
    }

    function onSelectChange(e){
        setSelectInput({...selectInput, value: e.target.value,error:''});
    }

   function validateSelectOnBlur(e){
        let message = validation(selectInput.validations,selectInput.value);
        if(message){
            let updatedSelectedInput = {...selectInput};
            updatedSelectedInput.error = message;
            setSelectInput(updatedSelectedInput)
        }
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
    return (
        <div className={`signup_wrapper_page ${show? 'show' :''}`}>
                <div className="logo_header">
                    <Logo></Logo>
               </div>
            {inputs.map((input,i)=>{
                return <div  key={i} className="form_input_wrapper">
                <Input 
                label={input.label} 
                type={input.type}
                name={input.name} 
                value={input.value}
                error={input.error}
                onChange={onInputChange}
                onBlur={validateInputOnBlur}
                validate={input.validate}
                ></Input>
            </div>
            })}
            <div className="form_select_wrapper">
            <Select 
            label='City' 
            error={selectInput.error}
            validate={selectInput.validate}
            onBlur={(e)=>validateSelectOnBlur(e)}
            options={cities}
            onChange={onSelectChange}
            />
            </div>
            <div className="form_buttons_wrapper">
                {buttons.map((btn,i)=>{
                    return <Button key={i} label={btn.label} onClick={()=>changePage(btn.label)}
                    style={btn.style}></Button>
                })}
            </div>
        </div>
    )
}
export default PageOne;