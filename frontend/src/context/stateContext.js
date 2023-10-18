import { createContext, useState, useEffect } from "react";
export const stateContext = createContext()

export const StateProvider = ({children}) => {

    const [signedUser,setSignedUser]= useState(null)
    
    useEffect(() => {
      console.log(`Signed user changed ${JSON.stringify(signedUser)}`)
    }, [signedUser])
    
    return (
        <stateContext.Provider
         value={{
                signedUser,
                setSignedUser
            }} >
                {children}
            </stateContext.Provider>
    )
}