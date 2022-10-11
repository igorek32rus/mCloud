import React, { useState } from "react"

import Login from "../components/Auth/Login"
import Registration from "../components/Auth/Registration"
import Notify from "../components/Notify"
import '../styles/Auth.css'
import Loader from "../components/UI/loader/Loader"

const AuthPage = () => {
    const [isLoginWindow, setIsLoginWindow] = useState(true)
    const [degRotate, setDegRotate] = useState(0)
    const [loading, setLoading] = useState(false)


    const setLoginWindow = (state) => {
        setDegRotate(90)
        setTimeout(() => {
            setIsLoginWindow(state)
            state ? setDegRotate(0) : setDegRotate(180)
        }, 500);
    }

    return (
        <>
            { loading ? <Loader /> : (
                <>
                    <div className="page-auth">
                        <div className="rotate-window" style={{transform: `perspective(1000px) rotateY(${degRotate}deg)`}}>
                            { isLoginWindow 
                                ? <Login setLoginWindow={setLoginWindow} setLoading={setLoading} /> 
                                : <Registration setLoginWindow={setLoginWindow} setLoading={setLoading} /> 
                            }
                        </div>
                    </div>
                    <Notify />
                </>
            )}
        </>
    )
}

export default AuthPage