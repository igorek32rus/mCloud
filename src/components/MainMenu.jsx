import React, { useContext } from 'react'
import { AuthContext, MainMenuContext, LoaderContext } from '../Context'
import '../styles/MainMenu.css'

import { useHistory } from 'react-router-dom'

function MainMenu(props) {
    const {isMenuOpened, setIsMenuOpened} = useContext(MainMenuContext)
    const {setIsAuth, setUserData} = useContext(AuthContext)
    const {setLoading} = useContext(LoaderContext)
    const history = useHistory()

    const handleLogout = () => {
        setUserData({})
        localStorage.removeItem('token')
        setIsAuth(false)
    }

    const handleChangeCat = (cat) => {
        setLoading(true)
        history.push(`/files${cat !== 'main' ? `?category=${cat}` : ''}`)
    }

    const handleClickBackdrop = () => {
        setIsMenuOpened(false)
    }

    return (
        <>
            { isMenuOpened && 
                <menu className="menu-backdrop" onClick={handleClickBackdrop}>
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
            }
        </>
    )
}

export default MainMenu