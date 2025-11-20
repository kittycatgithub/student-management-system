import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

// Created Context
const AppContext = createContext()

export const AppContextProvider = ({children}) => {
    const navigate = useNavigate()
    const [showUserLogin, setShowUserLogin] = useState(false)
    const [user, setUser] = useState(null)
    
    // value variable will contain all states 
    const value = { showUserLogin, setShowUserLogin, navigate, user, setUser}

    return  <AppContext.Provider value={value}>
                {children}
            </AppContext.Provider>
}

export const useAppContext = () =>{
    return useContext(AppContext)
}






