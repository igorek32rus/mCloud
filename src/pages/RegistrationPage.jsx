import React, {useState, useContext} from "react"
import { NotifyContext, LoaderContext } from "../Context"
import Button from "../components/UI/button/Button"
import fetchReq from "../utils/fetchReq"
import '../styles/Auth.css'

const RegistrationPage = (props) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const {createNotification} = useContext(NotifyContext)
    const {setLoading} = useContext(LoaderContext)

    const registration = async () => {
        setLoading(true)
        if (password !== confirmPassword) return

        const res = await fetchReq({
            url: 'http://localhost:5000/api/auth/registration', 
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
        props.setReg(false)
    }

    const confirmPassStyle = {
        width: '100%',
        borderColor: password !== confirmPassword && confirmPassword.length > 0 ? 'rgba(255, 0, 0, .3)' : 'rgba(255, 255, 255, .3)',
        color: password !== confirmPassword && confirmPassword.length > 0 ? 'rgba(255, 0, 0, .8)' : '#fff'
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
                <input type="password" placeholder="Повтротие пароль" style={confirmPassStyle} onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword}  />
                <Button style={{minWidth: 100, alignSelf: 'flex-end'}} click={registration}>Зарегистрироваться</Button>
            </div>
        </div>
    )
}

export default RegistrationPage