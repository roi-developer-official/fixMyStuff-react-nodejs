
import './App.css';
import {  Route , Switch, withRouter } from 'react-router-dom';
import Home from './home/home';
import Nav from './nav/nav';
import { Fragment, useContext }  from 'react';
import { Redirect } from 'react-router-dom';
import Signin from './signin/signin';
import { AuthContext } from './context/authContext';
import LoginPage from './login/login';
import UserPage from './userPage/userPage';
import AddPostPage from './userPage/addPostPage/addPostPage';
const AuthRoute = ({children, ...rest})=>{
  const authContext = useContext(AuthContext);
  return (
    <Route {...rest} render={()=>
      authContext.isAuth() ? (children): 
      <Redirect to='/no'/>
    }></Route>
  );
};

const UnAuthRoute = ({children, ...rest})=>{
  const authContext = useContext(AuthContext);
  return (
    <Route {...rest} render={()=> !authContext.isAuth() ?
      (children) : 
      <Redirect to='/'/>}></Route>
  )
}

function App(props) {
  
  return (
    <Fragment>
    <Nav></Nav>
    <main>
    <Switch>
      <Route path='/Find-jobs' component={Home}></Route>
      <UnAuthRoute path='/Log-in'>
        <LoginPage></LoginPage>
      </UnAuthRoute>
      <UnAuthRoute path='/Sign-in'>
        <Signin history={props.history}></Signin>
      </UnAuthRoute>
      <Route path='/Create-Post' component={AddPostPage}></Route>
      <Route path='/My-page' component={UserPage}></Route>
      <Redirect exact from ='/'  to='/Find-jobs'></Redirect>
      <Redirect from='*' to='/'></Redirect>
    </Switch>
    </main>
  </Fragment>
  );

}

export default withRouter(App);
