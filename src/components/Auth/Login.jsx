import React, {useState, useContext} from "react"
import { AuthContext, NotifyContext, LoaderContext } from "../../Context"
import Button from "../UI/button/Button"
import useFetch from "../../hooks/useFetch"
import { URLS } from "../../constants"
import '../../styles/Auth.css'

const Login = ({setLoginWindow}) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const {setIsAuth, setUserData} = useContext(AuthContext)
    const {createNotification} = useContext(NotifyContext)
    const {setLoading} = useContext(LoaderContext)
    const fetch = useFetch()

    const login = async () => {
        setLoading(true)
        const res = await fetch({
            url: URLS.LOGIN, 
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

    const handlerKeyDown = (e) => {
        if (e.key === 'Enter') login()
    }

    return (
        <div className="auth-window">
            <div className="logo"></div>
            <div className="title">
                <span className="thin">micro</span><span className="bold">Cloud</span>
            </div>
            <div style={{margin: 'auto 0'}}>
                <form>
                    <input type="text" placeholder='E-mail' style={{width: '100%'}} onChange={(e) => setEmail(e.target.value)} value={email} onKeyDown={(e) => handlerKeyDown(e)} />
                    <input type="password" placeholder="Пароль" style={{width: '100%'}} onChange={(e) => setPassword(e.target.value)} value={password} onKeyDown={(e) => handlerKeyDown(e)} />
                    <div className="buttons">
                        <Button click={() => {setLoginWindow(false)}}>Регистрация</Button>
                        <Button click={login}>Войти</Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login