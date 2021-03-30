import { createContext, useEffect, useState } from 'react';
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
            axios.defaults.headers['x-csrf-token'] = csrfToken;
        }).catch(err=>{
            //do somthing with the error
        })
        axios.get('/api/auth/refresh')
        .then(res=>{
            if(res.data.user){
                setAuthInfo(res.data)
            }
        })
        .catch(err=>{

        })
        
    },[]);

    const setAuthInfo = ({
        expiresIn , user
    }) =>{
        if(user.image === "null"){
            user.image = null;
        }
        setAuthState({expiresIn: expiresIn, user: user});
    };

    const clearUserInfo = ()=>{
        setAuthState({expiresIn :null, user:{}});
        axios.get('api/auth/logout')
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