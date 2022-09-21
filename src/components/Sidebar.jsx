import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext, MainMenuContext } from '../Context'
import '../styles/Sidebar.css'
import { getFileSize } from '../utils/getFileSize'

import categories from '../categories'

import SettingsIcon from "../images/settings.svg"
import LogoutIcon from "../images/logout.svg"

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
                                <li key={"settings"} style={{borderTop: '1px solid rgba(255, 255, 255, .3)'}}><div className='icon' style={{backgroundImage: `url(${SettingsIcon})`}}></div>Настройки</li>
                                <li key={"logout"} onClick={handlerLogout}><div className='icon' style={{backgroundImage: `url(${LogoutIcon})`}}></div>Выйти</li>
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
            {categories.map(category => {
                return !category.hidden && <Link key={category.name} to={"/files/" + category.name + "/" + userData.rootId}><li><div className='icon' style={{backgroundImage: `url(${category.icon})`}}></div>{category.title}</li></Link>
            })}
        </>
    )
}

export default Sidebar