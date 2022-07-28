import React, {useState, useContext} from "react"

import { LoaderContext } from "../Context"
import Login from "../components/Auth/Login"
import Registration from "../components/Auth/Registration"
import Notify from "../components/Notify"
import '../styles/Auth.css'
import Loader from "../components/UI/loader/Loader"

const AuthPage = () => {
    const [isLoginWindow, setIsLoginWindow] = useState(true)
    const [degRotate, setDegRotate] = useState(0)

    const {loading} = useContext(LoaderContext)


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
                            {isLoginWindow ? <Login setLoginWindow={setLoginWindow} /> : <Registration setLoginWindow={setLoginWindow} /> }
                        </div>
                    </div>
                    <Notify />
                </>
            )}
        </>
    )
}

export default AuthPage