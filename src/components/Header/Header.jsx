import React, { useContext } from 'react'

import Logo from '../Logo'
import Search from '../Search'

import './Header.scss'
// import { AuthContext } from '../Context'
import ProfileAvatar from '../ProfileAvatar'
import { useSelector } from 'react-redux'

function Header(props) {
    // const {isAuth} = useContext(AuthContext)
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