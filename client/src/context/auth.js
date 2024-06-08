import React, { useContext, useEffect, useState } from "react";

const AuthContext = React.createContext(null);

const AuthProvider = ({ children }) => {

    const [auth, setAuth] = useState({
        token: ""
    })

    const logIn = (token) => {
        setAuth({
            ...auth,
            token: token
        })
    }

    useEffect(() => {
        const userAuth = localStorage.getItem("authItem")
        if (userAuth) {
            logIn(userAuth)
        }
        // eslint-disable-next-line
    }, [])

    return (
        <AuthContext.Provider value={{ auth, logIn }}>
            {children}
        </AuthContext.Provider>
    )
}

const useAuth = () => {
    return useContext(AuthContext);
}

export { AuthProvider, useAuth };

