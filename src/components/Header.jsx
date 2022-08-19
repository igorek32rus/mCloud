import React, { useContext } from 'react'

import Logo from './Logo'
import Search from './Search'

import '../styles/Header.css'
import { AuthContext } from '../Context'
import ProfileAvatar from './ProfileAvatar'

function Header(props) {
    const {isAuth} = useContext(AuthContext)

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