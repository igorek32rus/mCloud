import React, { useContext, useState } from 'react';
import { AuthContext, RegistrationContext } from '../Context';

import '../styles/Auth.css'
import Button from './UI/button/Button';

function Auth() {
    const {setIsAuth} = useContext(AuthContext)
    const {reg} = useContext(RegistrationContext)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [repeatPassword, setRepeatPassword] = useState('')

    const login = () => {
        setIsAuth(true)
    }

    const registration = () => {

    }

    return (
        <div className="reg-block">
            <div className="reg-logo"></div>
            <div className="reg-title">
                <span className="thin">micro</span><span className="bold">Cloud</span>
            </div>
            <input type="text" placeholder={reg ? 'E-mail' : "Логин/E-mail"} style={{width: '100%'}} onChange={(e) => setEmail(e.target.value)} value={email} />
            <input type="password" placeholder="Пароль" style={{width: '100%'}} onChange={(e) => setPassword(e.target.value)} value={password}  />
            { reg && <input type="password" placeholder="Повтротие пароль" style={{width: '100%'}} onChange={(e) => setRepeatPassword(e.target.value)} value={repeatPassword}  /> }
            <Button style={{minWidth: 100, alignSelf: 'flex-end'}} click={reg ? registration : login}>{reg ? 'Зарегистрироваться' : 'Войти'}</Button>
        </div>
    )
}

export default Auth