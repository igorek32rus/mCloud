import React, {useState, useContext} from "react"
import { AuthContext, NotifyContext, LoaderContext } from "../Context"
import Button from "../components/UI/button/Button"
import fetchReq from '../utils/fetchReq'
import '../styles/Auth.css'

const LoginPage = (props) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const {setIsAuth, setUserData} = useContext(AuthContext)
    const {createNotification} = useContext(NotifyContext)
    const {setLoading} = useContext(LoaderContext)

    const login = async () => {
        setLoading(true)
        const res = await fetchReq({
            url: 'http://localhost:5000/api/auth/login', 
            method: 'POST', 
            data: {email, pass: password}
        })

        setLoading(false)
        
        if (res.token) {
            setUserData(res.user)
            localStorage.setItem('token', res.token)
            setIsAuth(true)
            return
        }

        createNotification({title: 'Ошибка', message: res.message})
    }

    return (
        <div className="pageBodyAuth">
            <div className="reg-block">
                <div className="reg-logo"></div>
                <div className="reg-title">
                    <span className="thin">micro</span><span className="bold">Cloud</span>
                </div>
                <input type="text" placeholder='E-mail' style={{width: '100%'}} onChange={(e) => setEmail(e.target.value)} value={email} />
                <input type="password" placeholder="Пароль" style={{width: '100%'}} onChange={(e) => setPassword(e.target.value)} value={password}  />
                <Button style={{minWidth: 100, alignSelf: 'flex-end'}} click={login}>Войти</Button>
            </div>
        </div>
    )
}

export default LoginPage