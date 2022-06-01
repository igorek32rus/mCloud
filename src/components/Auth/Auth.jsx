import React, { useContext } from 'react';
import { RegistrationContext } from '../../Context';

import Registration from './Registration'
import Login from './Login';

import '../../styles/Auth.css'


function Auth() {
    const {reg, setReg} = useContext(RegistrationContext)

    return (
        <div className="reg-block">
            <div className="reg-logo"></div>
            <div className="reg-title">
                <span className="thin">micro</span><span className="bold">Cloud</span>
            </div>
            { reg ? <Registration setReg={setReg} /> : <Login /> }
            
        </div>
    )
}

export default Auth