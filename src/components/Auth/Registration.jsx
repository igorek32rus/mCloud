import React, {useState} from "react"
import Button from "../UI/button/Button"
import useFetch from "../../hooks/useFetch"
import { URLS } from "../../constants"
import useNotification from "../../hooks/useNotification"

import './Auth.scss'
import Input from "../UI/input/Input"

const Registration = ({setLoginWindow, setLoading}) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const [createNotification] = useNotification()
    const fetch = useFetch()

    const registration = async () => {
        if (!email || !password || password !== confirmPassword) {
            createNotification({title: 'Ошибка', message: 'Проверьте правильность всех введённых Вами данных'})
            return
        }

        setLoading(true)

        const res = await fetch({
            url: URLS.REGISTRATION, 
            method: 'POST', 
            data: {email, pass: password}
        })

        setLoading(false)

        if (res.status === 'error') {
            const {errors} = {...res.errors}
            const message = errors ? errors[0].msg : res.message
            createNotification({title: 'Ошибка', message})
            return
        }

        createNotification({title: 'Регистрация', message: res.message})
    }

    const handlerKeyDown = (e) => {
        if (e.key === 'Enter') registration()
    }

    return (
        <div className="flip-content-180">
            <div className="logo"></div>
            <div className="title">
                <span className="thin">micro</span><span className="bold">Cloud</span>
            </div>
            <div style={{margin: 'auto 0'}}>
                <form>
                    <Input type="text" placeholder='E-mail' className="input-fields" onChange={(e) => setEmail(e.target.value)} value={email} onKeyDown={(e) => handlerKeyDown(e)} />
                    <Input type="password" placeholder="Пароль" className="input-fields" onChange={(e) => setPassword(e.target.value)} value={password} onKeyDown={(e) => handlerKeyDown(e)} />
                    <Input type="password" placeholder="Повтротие пароль" className="input-fields"
                        onChange={(e) => setConfirmPassword(e.target.value)} 
                        value={confirmPassword} 
                        onKeyDown={(e) => handlerKeyDown(e)} />
                    <div className="buttons">
                        <Button click={() => setLoginWindow(true)}>Вход</Button>
                        <Button click={registration}>Зарегистрироваться</Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Registration