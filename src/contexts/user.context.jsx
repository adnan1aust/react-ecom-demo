import { createContext, useState } from "react";

//as in the actual value
export const UserContext = createContext({  //initial value for context
    currentUser: null,
    setCurrentUser: ()=> null,
});

export const UserProvider = ({children}) => { 
    const [currentUser, setCurrentUser] = useState(null); //initial value for state
    const value = {currentUser, setCurrentUser};
    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}