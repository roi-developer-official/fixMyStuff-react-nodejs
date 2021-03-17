import { useState } from "react"
import {Steps} from '../../Global_UI'
import './addPostPage.css'
import { useHistory } from "react-router";
import PageOne from "./pages/pageOne";
import PageTwo from "./pages/pageTwo";
import { useDispatch, useSelector} from 'react-redux';
import {addPost} from '../../store/actions/actionsCreators/post.actionCreator';
import * as actions from '../../store/actions/state.actions';

function AddPostPage(props){
    const history = useHistory();
  
    const [currentPage,setCurrentPage] = useState(1);
    let [inputsValues,setInputs] = useState(new Map());

    const {loading,error} = useSelector(state=>state);

    const dispatch = useDispatch();


    function changePage(label,inputs){
        switch (label){

            case 'Next':
                updateInputOnPageSubmitted(inputs);
                setCurrentPage(currentPage=>currentPage + 1);
            break;
            case 'Back':
                setCurrentPage(currentPage => currentPage - 1);
            break;
            case 'Cancel':
                history.push('/My-page');
                break;
            case 'Done':
                updateInputOnPageSubmitted(inputs);
                submitPage();
                break;
            default : return;
        }
    }

    function updateInputOnPageSubmitted(inputs){
        for(let input of inputs){
            setInputs(inputsValues.set(input.name, input.value));
        }
    }

    function submitPage(){
        let reqData = new FormData();
        inputsValues.forEach((key,val)=>{
            reqData.append(key, val)
        });

        dispatch({type:actions.ACTION_START});
        dispatch(addPost(reqData,postAddedSuccess));
    }


    function postAddedSuccess(){
        console.log('sucess');

    }


    return (
    <div className="add_post_page_wrapper">
        {loading && <div className="loader"></div>}
        <Steps currnetStep={currentPage} steps={[1,2]}></Steps>
            <PageOne show={currentPage === 1} changePage={changePage}/>
            <PageTwo show={currentPage === 2} changePage={changePage}/>
        </div>
    )
}



export default AddPostPage;