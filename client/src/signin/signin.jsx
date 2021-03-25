import React from 'react';
import {Steps,FormFeedback} from '../Global_UI';
import PageOne from './pages/pageOne/PageOne';
import './signin.css'
import PageTwo from './pages/pageTwo/pageTwo';
import PageThree from './pages/pageThree/pageThree';
import PageFour from './pages/pageFour/pageFour';
import {connect} from 'react-redux';
import {signIn} from '../store/actions/actionsCreators/auth.actionCreator';
import * as actions from '../store/actions/state.actions';
import { AuthContext } from '../context/authContext';
class Signin extends React.Component{

    static contextType = AuthContext;
    state = {};
    constructor(props){
        super(props);
        this.state = {
            currentStep : 1, 
            inputsValues: new Map(),
            signupSuccess: null
        }; 
        this.steps = [1,2,3,4];
    }

    componentDidMount(){
        this.props.resetState();
    }

    moveBetweenPages(label,inputs){  
       let currentStep;
       switch(label){
            case 'Next':
               currentStep = this.state.currentStep + 1;
                this.updateInputOnPageSubmitted(inputs);
                this.setState({
                    ...this.state,
                    currentStep : currentStep
                }); 
                break;
            case 'Done':
                this.updateInputOnPageSubmitted(inputs);
                this.submitPage();
                break;
            case 'Back':
                currentStep = this.state.currentStep - 1;
                this.setState({
                    ...this.state,
                    currentStep : currentStep
                }); 
                break;
            default : return;
       }

    }

    updateInputOnPageSubmitted(inputs){
        for(let key in Object.keys(inputs)){
            if(key !== 'conifirm password')
                this.setState({
                ...this.state,
                inputsValues:  this.state.inputsValues.set(inputs[key].name, inputs[key].value)
                });
        }
    }

    submitPage(){
        let reqData = new FormData();
        this.state.inputsValues.forEach((key,value)=>{
           reqData.append(value,key)
        });

        this.props.signupStart();
        this.props.signIn(reqData,this.signupSuccess.bind(this));
    }

    signupSuccess(result){
        this.setState({
            ...this.state,
            signupSuccess : true
        });
        
        setTimeout(()=>{
            this.context.setAuthState(result);
            this.props.history.push('/');
        },700)
    }

    returnCustomFeedback(){
        if(this.props.error){
            return <FormFeedback error={true} message={this.props.error}></FormFeedback>;
        }else if(this.state.signupSuccess) {
            return <FormFeedback error={false} message={'Signup Succesfully!'}></FormFeedback>;
        } else {
            return null;
        }
    }

    render(){
        return (
        <div className='signup_page_container'>
           {this.props.loading && <div className="loader"></div>}
           <Steps steps={this.steps} currnetStep={this.state.currentStep}></Steps>
            {this.returnCustomFeedback()}
             <div className="pages_container">
            <PageOne
            show={this.state.currentStep === 1}
            pageSubmmited={this.pageSubmmited}
            moveBetweenPages={this.moveBetweenPages.bind(this)}
             />
            <PageTwo 
            pageSubmmited={this.pageSubmmited}
            show={this.state.currentStep === 2}
            moveBetweenPages={this.moveBetweenPages.bind(this)}
             />
            <PageThree 
            pageSubmmited={this.pageSubmmited}
            show={this.state.currentStep === 3}
            moveBetweenPages={this.moveBetweenPages.bind(this)}
            ></PageThree>
            <PageFour 
            pageSubmmited={this.pageSubmmited}
            show={this.state.currentStep === 4}
            moveBetweenPages={this.moveBetweenPages.bind(this)}
            ></PageFour>
           </div>
        </div>  
        )
    }
}


const mapStateToProps = (state)=>{
    return {
        error:state.error,
        loading:state.loading
    }
}

const mapDispatchToProps = (dispatch)=>{
    return{
        signupStart: ()=> dispatch({type: actions.ACTION_START}),
        signIn: (reqData,callback)=>dispatch(signIn(reqData,callback)),
        resetState:()=>dispatch({type:actions.RESET_STATE})
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Signin);