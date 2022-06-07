import React, { useContext } from 'react';

import Logo from './Logo';
import Search from './Search';
import MainMenu from './MainMenu';

import '../styles/Header.css'
import { AuthContext } from '../Context';

function Header(props) {
    const {isAuth} = useContext(AuthContext)

    return (
        <header>
            <Logo />
            { isAuth ? <Search /> : '' }
            <MainMenu registration={props.registration} setRegistration={props.setRegistration} />
        </header>
    )
}

export default Header