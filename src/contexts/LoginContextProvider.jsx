import React from "react";
import { LoginContext } from '../contexts/LoginContext';



const LoginContextProvider = ({children})=> {
  const [userId, setUserId] = React.useState(null);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [isAdmin, setIsAdmin] = React.useState(false);

    return (
        <LoginContext.Provider value={{userId, setUserId, loggedIn, setLoggedIn, isAdmin, setIsAdmin}}>
            {children}
        </LoginContext.Provider>
    )
}

export default LoginContextProvider;