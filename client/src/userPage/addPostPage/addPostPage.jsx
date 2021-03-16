import { useState } from "react"
import Input from "../../Global_UI/input/input"
import Logo from "../../Global_UI/logo/logo"
import Textarea from "../../Global_UI/textarea/textarea";
import Button from '../../Global_UI/button/button';
import Steps from "../../Global_UI/steps/steps";
import AddImage from "../../Global_UI/addImagePage/addImage";
import './addPostPage.css'
import { useHistory } from "react-router";


export default function AddPostPage(){
    const history = useHistory();
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
    const firstPageButtons = [
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
    const [currentPage,setCurrentPage] = useState(1);

    function changePage(label){
        switch (label){
            case 'Next':
                setCurrentPage(currentPage=>currentPage + 1);
            break;
            case 'Back':
                setCurrentPage(currentPage => currentPage - 1);
            break;
            case 'Cancel':
                history.push('/My-page');
                break;
            case 'Done':
                break;
            default : return;
        }
    }




    return (
    <div className="add_post_page_wrapper">
        <Steps currnetStep={currentPage} steps={[1,2]}></Steps>
           
            <div className={`add_post_page ${currentPage === 1 ? 'show' : ''}`}>
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
                <Input label={numberInput.label} type={numberInput.type} style={numberInput.style}></Input>
                </div>
                <Textarea label={desInput.label} 
                cols={desInput.cols}
                rows={desInput.rows}></Textarea>
                <div className="form_buttons_wrapper">
                    {firstPageButtons.map(btn=>{
                        return <Button label={btn.label} onClick={changePage} style={btn.style}/>
                    })}
                </div>
            </div>
            <div className={`add_post_page ${currentPage === 2 ? 'show' : ''}`}>
                <AddImage></AddImage>
            </div>
        </div>

    )
}