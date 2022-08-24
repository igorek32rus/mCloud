import React, { useContext } from 'react'
import { AuthContext, MainMenuContext, LoaderContext } from '../Context'
import '../styles/Sidebar.css'

import { useHistory } from 'react-router-dom'

function Sidebar(props) {
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
                <div className="sidebar-backdrop" onClick={handleClickBackdrop}>
                    <div className="sidebar">
                        <div className="sidebar-avatar"></div>
                        <menu>
                            <ul>
                                <li onClick={() => handleChangeCat('main')}>Главная</li>
                                <li onClick={() => handleChangeCat('latest')}>Последние</li>
                                <li onClick={() => handleChangeCat('shared')}>Общие</li>
                                <li onClick={() => handleChangeCat('trash')}>Корзина</li>
                                <li style={{borderTop: '1px solid rgba(255, 255, 255, .3)'}}>Настройки</li>
                                <li onClick={handleLogout}>Выйти</li>
                            </ul>
                        </menu>
                        <div className="used-memory"></div>
                    </div>
                </div>
            }
        </>
    )
}

export default Sidebar