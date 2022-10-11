import React, {useState} from "react"
import Button from "../UI/button/Button"
import useFetch from "../../hooks/useFetch"
import { URLS } from "../../constants"
import '../../styles/Auth.css'
import { useDispatch } from "react-redux"
import useNotification from "../../hooks/useNotification"

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

    const confirmPassStyle = {
        width: '100%',
        borderColor: 'rgba(70, 70, 255, 1)',
        color: 'rgba(70, 70, 255, 1)'
    }

    return (
        <div className="auth-window" style={{transform: 'rotateY(180deg)'}}>
            <div className="logo"></div>
            <div className="title">
                <span className="thin">micro</span><span className="bold">Cloud</span>
            </div>
            <div style={{margin: 'auto 0'}}>
                <form>
                    <input type="text" placeholder='E-mail' style={{width: '100%'}} onChange={(e) => setEmail(e.target.value)} value={email} onKeyDown={(e) => handlerKeyDown(e)} />
                    <input type="password" placeholder="Пароль" style={{width: '100%'}} onChange={(e) => setPassword(e.target.value)} value={password} onKeyDown={(e) => handlerKeyDown(e)} />
                    <input type="password" placeholder="Повтротие пароль"
                        style={(password === confirmPassword && confirmPassword.length > 0) ? confirmPassStyle : { width: '100%' }} 
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