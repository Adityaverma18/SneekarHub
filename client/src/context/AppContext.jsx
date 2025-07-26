import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { data, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const AppContext = createContext()

const AppContextProvider = (props)=>{
    const [user, setUser] = useState(false);
    const [showLogin, setShowLogin] = useState(false);

    
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const navigate = useNavigate()


    const logout = ()=>{
        localStorage.removeItem('token')
        setUser(null)
    }
    const value ={
        user, setUser, showLogin, setShowLogin, backendUrl,
    }

    return(
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}
export default AppContextProvider


