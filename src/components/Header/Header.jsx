import React from 'react'
import { useSelector } from 'react-redux'

import Logo from './components/Logo/Logo'
import Search from './components/Search/Search'
import ProfileAvatar from './components/ProfileAvatar/ProfileAvatar'

import './Header.scss'

function Header() {
    const isAuth = useSelector(state => state.auth.isAuth)

    return (
        <header>
            <Logo />
            { isAuth && (
                <>
                    <Search />
                    <ProfileAvatar />
                </>
            ) }
        </header>
    )
}

export default Header