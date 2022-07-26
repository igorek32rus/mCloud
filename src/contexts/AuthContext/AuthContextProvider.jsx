import React, {useState} from "react"
import { AuthContext } from "./AuthContext"

export const AuthProvider = ({ children }) => {
    const [isAuth, setIsAuth] = useState(false)
    const [userData, setUserData] = useState(null)

    const valueAuthProvider = { isAuth, setIsAuth, userData, setUserData }

    return (
        <AuthContext.Provider value={valueAuthProvider}>
            { children }
        </AuthContext.Provider>
    )
}