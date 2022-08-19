import React, { useContext } from 'react'
import { AuthContext } from '../Context'
import '../styles/MainMenu.css'

import { useHistory } from 'react-router-dom'

function MainMenu(props) {
    const {setIsAuth, setUserData} = useContext(AuthContext)
    const history = useHistory()

    const handleLogout = () => {
        setUserData({})
        localStorage.removeItem('token')
        setIsAuth(false)
    }

    const handleChangeCat = (cat) => {
        history.push(`/files${cat !== 'main' ? `?category=${cat}` : ''}`)
    }

    const handleClickBackdrop = () => {
        props.setIsMenuOpen(false)
    }

    return (
        <menu class="menu-backdrop" onClick={handleClickBackdrop}>
            <div className="main-menu slideDown">
                <ul>
                    <li onClick={() => handleChangeCat('main')}>Главная</li>
                    <li onClick={() => handleChangeCat('latest')}>Последние</li>
                    <li onClick={() => handleChangeCat('shared')}>Общие</li>
                    <li onClick={() => handleChangeCat('trash')}>Корзина</li>
                    <li style={{borderTop: '1px solid rgba(255, 255, 255, .3)'}}>Настройки</li>
                    <li onClick={handleLogout}>Выйти</li>
                </ul>
            </div>
        </menu>
    )
}

export default MainMenu