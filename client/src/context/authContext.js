import { createContext, useEffect, useState } from 'react';
import {Axios } from '../util/axios';
import axios from 'axios'
const AuthContext = createContext();
const { Provider } = AuthContext;

const AuthProvider = ({children}) =>{
    const [authState, setAuthState] = useState({
        expiresIn: null,
        user: {}
    });

    useEffect(()=>{
        axios.get('/api/initv')
        .then(res=>{
            const csrfToken = res.data.csrfToken;
            Axios.defaults.headers['x-csrf-token'] = csrfToken;
        }).catch(err=>{
            //do somthing with the error
        })
       

        Axios.get('/auth/refresh')
        .then(res=>{
            if(res.data.user){
                console.log(res.data);
                setAuthInfo(res.data)
            }
        })
        .catch(err=>{

        })
        
    },[]);

    const setAuthInfo = ({
        expiresIn , user
    }) =>{
        setAuthState({expiresIn: expiresIn, user: user});
    };

    const clearUserInfo = ()=>{
        setAuthState({expiresIn :null, user:{}});
        Axios.get('/auth/logout')
        .then(res=>{

        })
        .catch(err=>{

        })
    }

    const isAuth = () =>{
        return Object.keys(authState.user).length !== 0;
    }
    const getUserInfo =()=>{
        return authState.user;
    }

    return (
    <Provider
        value={{
            authState,
            setAuthState: authInfo => setAuthInfo(authInfo),
            isAuth,
            getUserInfo,
            clearUserInfo
        }}
    >
    {children}
    </Provider>
);
};

export  { AuthContext, AuthProvider };