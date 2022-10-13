import React, { useState } from "react"
import './AuthPage.scss'

import Login from "../../components/Auth/Login"
import Registration from "../../components/Auth/Registration"
import Notify from "../../components/Notify"
import Loader from "../../components/UI/loader/Loader"

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
                    <div className="auth-page">
                        <div className="auth-window" style={{transform: `rotateY(${degRotate}deg)`}}>
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