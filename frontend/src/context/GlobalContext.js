import React, { useState } from "react";

export const GlobalContext = React.createContext();

export const GlobalProvider = ({ children }) =>{
    const [navStatusBtn, setNavStatusBtn] = useState(false); 

    console.log(navStatusBtn)

    return (
        <GlobalContext.Provider value={
            { 
                navStatusBtn, 
                setNavStatusBtn
            }}>
            {children}
        </GlobalContext.Provider>
    )
}