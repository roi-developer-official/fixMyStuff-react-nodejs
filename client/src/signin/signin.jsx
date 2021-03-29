import React from 'react';
import {Steps,FormFeedback} from '../Global_UI';
import PageOne from './pages/pageOne';
import './signin.css'
import PageTwo from './pages/pageTwo';
import PageThree from './pages/pageThree';
import PageFour from './pages/pageFour';
import {connect} from 'react-redux';
import {actionTypes ,signIn} from '../actions/authAction';
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
        <div className='signup_page_container' data-test="component-signin">
           {this.props.loading && <div className="loader"></div>}
           <Steps steps={this.steps} currnetStep={this.state.currentStep}></Steps>
            {this.returnCustomFeedback()}
             <div className="pages_container">
            <PageOne
            show={this.state.currentStep === 1}
            pageSubmmited={this.pageSubmmited}
            changePage={this.moveBetweenPages.bind(this)}
             />
            <PageTwo 
            pageSubmmited={this.pageSubmmited}
            show={this.state.currentStep === 2}
            changePage={this.moveBetweenPages.bind(this)}
             />
            <PageThree 
            pageSubmmited={this.pageSubmmited}
            show={this.state.currentStep === 3}
            changePage={this.moveBetweenPages.bind(this)}
            ></PageThree>
            <PageFour 
            pageSubmmited={this.pageSubmmited}
            show={this.state.currentStep === 4}
            changePage={this.moveBetweenPages.bind(this)}
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
        signupStart: ()=> dispatch({type: actionTypes.ACTION_START}),
        signIn: (reqData,callback)=>dispatch(signIn(reqData,callback)),
        resetState:()=>dispatch({type:actionTypes.RESET_STATE})
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Signin);