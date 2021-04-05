import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export function useAuth(){
    const { user } = useSelector(state=>state.authReducer);
    const [isAuth,setIsAuth] = useState(false);
    useEffect(()=>{
        setIsAuth(Object.keys(user).length > 0)
    },[user])
    
    return [user, isAuth]
}