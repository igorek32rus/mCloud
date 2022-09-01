import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext, MainMenuContext } from '../Context'
import '../styles/Sidebar.css'
import { getFileSize } from '../utils/getFileSize'

import categories from '../categories'

function Sidebar() {
    const {isMenuOpened, setIsMenuOpened, setIsMenuClosing, isMenuClosing} = useContext(MainMenuContext)
    const {setIsAuth, setUserData, userData} = useContext(AuthContext)

    const handlerLogout = () => {
        setUserData({})
        localStorage.removeItem('token')
        setIsAuth(false)
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
                                <ListCategories />
                                <li key={"settings"} style={{borderTop: '1px solid rgba(255, 255, 255, .3)'}}>Настройки</li>
                                <li key={"logout"} onClick={handlerLogout}>Выйти</li>
                            </ul>
                        </menu>
                        <div className="used-disk-space">Диск: {getFileSize(userData.usedSpace)}</div>
                    </div>
                </div>
            }
        </>
    )
}

function ListCategories() {
    const {userData} = useContext(AuthContext)

    return (
        <>
            {Object.keys(categories).map(category => {
                return <Link key={category} to={"/files/" + category + "/" + userData.rootId}><li>{categories[category]}</li></Link>
            })}
        </>
    )
}

export default Sidebar