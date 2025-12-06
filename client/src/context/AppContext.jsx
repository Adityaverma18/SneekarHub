import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext();

const AppContextProvider = (props) => {
    const [user, setUser] = useState(null);
    const [showLogin, setShowLogin] = useState(false);

    const [token, setToken] = useState(localStorage.getItem("token") || "");

    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
        setToken("");
    };

    const value = {
        user,
        setUser,
        token,
        setToken,
        showLogin,
        setShowLogin,
        backendUrl,
        logout,
    };

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;
