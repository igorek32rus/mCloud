import React, { useContext, useState } from 'react';
import { AuthContext, RegistrationContext } from '../Context';

import '../styles/Auth.css'
import Button from './UI/button/Button'

import fetchReq from '../utils/fetchReq'

function Auth() {
    const {setIsAuth} = useContext(AuthContext)
    const {reg, setReg} = useContext(RegistrationContext)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const login = async () => {
        const res = await fetchReq({
            url: 'http://localhost:5000/api/auth/login', 
            method: 'POST', 
            data: {email, pass: password}
        })
        
        if (res.token) setIsAuth(true)
        console.log(res);
    }

    const registration = async () => {
        if (password !== confirmPassword) return

        const res = await fetchReq({
            url: 'http://localhost:5000/api/auth/registration', 
            method: 'POST', 
            data: {email, pass: password}
        })

        if (res.status === 'error') {
            const {errors} = {...res.errors}
            console.log(errors[0].msg);
            return
        }

        console.log(res.message);
        setReg(false)
    }

    const confirmPass = (e) => {
        setConfirmPassword(e.target.value)
        if (password !== confirmPassword) {

        }
    }

    return (
        <div className="reg-block">
            <div className="reg-logo"></div>
            <div className="reg-title">
                <span className="thin">micro</span><span className="bold">Cloud</span>
            </div>
            <input type="text" placeholder={reg ? 'E-mail' : "Логин/E-mail"} style={{width: '100%'}} onChange={(e) => setEmail(e.target.value)} value={email} />
            <input type="password" placeholder="Пароль" style={{width: '100%'}} onChange={(e) => setPassword(e.target.value)} value={password}  />
            { reg && <input type="password" placeholder="Повтротие пароль" style={{width: '100%'}} onChange={(e) => confirmPass(e)} value={confirmPassword}  /> }
            <Button style={{minWidth: 100, alignSelf: 'flex-end'}} click={reg ? registration : login}>{reg ? 'Зарегистрироваться' : 'Войти'}</Button>
        </div>
    )
}

export default Auth