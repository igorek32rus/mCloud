import React, {useState, useContext, useEffect} from "react"

import { AuthContext, LoaderContext } from "../Context"
import Login from "../components/Auth/Login"
import Registration from "../components/Auth/Registration"
import '../styles/Auth.css'
import Loader from "../components/UI/loader/Loader"
import fetchReq from "../utils/fetchReq"

const AuthPage = () => {
    const [isLoginWindow, setIsLoginWindow] = useState(true)
    const [degRotate, setDegRotate] = useState(0)

    const {setIsAuth, setUserData} = useContext(AuthContext)
    const {loading, setLoading} = useContext(LoaderContext)

    useEffect(() => {
      auth()
    }, [])

    const auth = async () => {
        setLoading(true)
        const res = await fetchReq({
          url: 'http://localhost:5000/api/auth/auth',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
    
        if (res.token) {
          setUserData(res.user)
          localStorage.setItem('token', res.token)
          setIsAuth(true)
        }
    
        setLoading(false)
    }

    const setLoginWindow = (state) => {
        setDegRotate(90)
        setTimeout(() => {
            setIsLoginWindow(state)
            state ? setDegRotate(0) : setDegRotate(180)
        }, 500);
    }

    return (
        <>
            { loading ? <Loader /> : 
                <div className="page-auth">
                    <div className="rotate-window" style={{transform: `perspective(1000px) rotateY(${degRotate}deg)`}}>
                        {isLoginWindow ? <Login setLoginWindow={setLoginWindow} /> : <Registration setLoginWindow={setLoginWindow} /> }
                    </div>
                </div>
            }
        </>
    )
}

export default AuthPage