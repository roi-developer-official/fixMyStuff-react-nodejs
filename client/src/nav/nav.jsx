import React from 'react';
import './nav.css';
import {withRouter} from 'react-router-dom';
import AuthDialog from './authdialog/authDialog';
import { AuthContext } from '../context/authContext';
import MobileNav from './mobile/mobileNav';
import DesktopNav from './desktop/desktopNav';
class Nav extends React.Component{

    static contextType = AuthContext;

    constructor(props){
        super();
        this.state = {
            pathname: this.formatPath(props.location.pathname),
            showAuthDialog : false
        }
        this.navItems = [
            { name : 'Find jobs'},
            { name : 'My page'},
            { name : 'FAQ'},
            { name : 'Contact us'}
        ];
        this.hideAuthDialog = this.hideAndShowAuthDialog.bind(this,null,false)
    }

    componentDidMount(){
        window.document.addEventListener('click', this.hideAuthDialog)
    }
    componentDidUpdate(prevProps){
        if(prevProps.location.pathname !== this.props.location.pathname)
             this.setState({
                 ...this.state, 
                 pathname : this.formatPath(this.props.location.pathname)
                })
        
    }
    componentWillUnmount(){
        window.document.removeEventListener('click', this.hideAuthDialog)
    } 

    formatPath(path){
        return path.substring(1).replace('-',' ');
    }

    hideAndShowAuthDialog(e,show){
        e && e.stopPropagation();
        if(this.state.showAuthDialog !== show)
            this.setState({
            ...this.state,
            showAuthDialog : show
        });
    }

    render(){

        const isAuth = this.context.isAuth();
        return (
        <React.Fragment>
            {this.props.location.pathname.toLowerCase() !== '/my-page' && <h2 className='path'>{this.state.pathname}</h2>}

            <DesktopNav 
            navItems={this.navItems} 
            isAuth={isAuth}
            hideAndShowAuthDialog={this.hideAndShowAuthDialog.bind(this)}></DesktopNav>
        
            <MobileNav 
            navItems={this.navItems} 
            isAuth={isAuth}
            hideAndShowAuthDialog={this.hideAndShowAuthDialog.bind(this)}></MobileNav>

            {this.state.showAuthDialog && <AuthDialog></AuthDialog>}
            
        </React.Fragment>
        )
    }

}

export default withRouter(Nav);