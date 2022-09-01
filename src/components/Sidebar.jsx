import React, { useContext } from 'react'
import { AuthContext, MainMenuContext, LoaderContext } from '../Context'
import '../styles/Sidebar.css'
import { getFileSize } from '../utils/getFileSize'

import { useHistory } from 'react-router-dom'

function Sidebar(props) {
    const {isMenuOpened, setIsMenuOpened, setIsMenuClosing, isMenuClosing} = useContext(MainMenuContext)
    const {setIsAuth, setUserData, userData} = useContext(AuthContext)
    const {setLoading} = useContext(LoaderContext)
    const history = useHistory()

    const handlerLogout = () => {
        setUserData({})
        localStorage.removeItem('token')
        setIsAuth(false)
    }

    const handlerChangeCat = (cat) => {
        setLoading(true)
        history.push(`/files/${cat}/${userData.rootId}`)
    }

    const handlerClickBackdrop = (e) => {
        setIsMenuClosing(true)
        setTimeout(() => {
            setIsMenuOpened(false)
            setIsMenuClosing(false)
        }, 200);
    }

    return (
        <>
            { isMenuOpened && 
                <div className="sidebar-backdrop" onClick={(e) => handlerClickBackdrop(e)}>
                    <div className={isMenuClosing ? "sidebar hide" : "sidebar"} onClick={(e) => e.stopPropagation()}>
                        <menu>
                            <ul>
                                <li onClick={() => handlerChangeCat('main')}>Главная</li>
                                <li onClick={() => handlerChangeCat('latest')}>Последние</li>
                                <li onClick={() => handlerChangeCat('shared')}>Общие</li>
                                <li onClick={() => handlerChangeCat('trash')}>Корзина</li>
                                <li style={{borderTop: '1px solid rgba(255, 255, 255, .3)'}}>Настройки</li>
                                <li onClick={handlerLogout}>Выйти</li>
                            </ul>
                        </menu>
                        <div className="used-disk-space">Диск: {getFileSize(userData.usedSpace)}</div>
                    </div>
                </div>
            }
        </>
    )
}

export default Sidebar