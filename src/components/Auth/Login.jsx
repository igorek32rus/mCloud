import React, {useState} from "react"
import Button from "../UI/button/Button"
import Input from "../UI/input/Input"
import useFetch from "../../hooks/useFetch"
import { URLS } from "../../constants"
import './Auth.scss'
import { useDispatch } from "react-redux"
import { authLoginAction } from "../../store/authReducer"
import useNotification from "../../hooks/useNotification"

const Login = ({setLoginWindow, setLoading}) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const fetch = useFetch()
    const dispatch = useDispatch()
    const [createNotification] = useNotification()

    const login = async () => {
        setLoading(true)
        const res = await fetch({
            url: URLS.LOGIN, 
            method: 'POST', 
            data: {email, pass: password}
        })

        setLoading(false)
        
        if (res.token) {
            dispatch(authLoginAction(res.user))
            localStorage.setItem('token', res.token)
            return
        }

        createNotification({title: 'Ошибка', message: res.message})
    }

    const handlerKeyDown = (e) => {
        if (e.key === 'Enter') login()
    }

    return (
        <>
            <div className="logo"></div>
            <div className="title">
                <span className="thin">micro</span><span className="bold">Cloud</span>
            </div>
            <div style={{margin: 'auto 0'}}>
                <form>
                    <Input type="text" placeholder='E-mail' className="input-fields" onChange={(e) => setEmail(e.target.value)} value={email} onKeyDown={(e) => handlerKeyDown(e)} />
                    <Input type="password" placeholder="Пароль" className="input-fields" onChange={(e) => setPassword(e.target.value)} value={password} onKeyDown={(e) => handlerKeyDown(e)} />
                    <div className="buttons">
                        <Button click={() => setLoginWindow(false)}>Регистрация</Button>
                        <Button click={login}>Войти</Button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Login