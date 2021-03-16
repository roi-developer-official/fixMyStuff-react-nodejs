import { useState } from "react"
import {Input,Logo, Textarea, Button,Steps,AddImage} from '../../Global_UI'
import './addPostPage.css'
import { useHistory } from "react-router";
import PageOne from "./pages/pageOne";
import PageTwo from "./pages/pageTwo";


export default function AddPostPage(){
    const history = useHistory();
  
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
            <PageOne show={currentPage === 1} changePage={changePage}/>
            <PageTwo show={currentPage === 2} changePage={changePage}/>
        </div>

    )
}