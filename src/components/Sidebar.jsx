import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import '../styles/Sidebar.css'
import { getFileSize } from '../utils/getFileSize'

import categories from '../categories'

import SettingsIcon from "../images/settings.svg"
import LogoutIcon from "../images/logout.svg"

import { authLogoutAction } from '../store/authReducer'
import { asyncCloseMenu } from '../store/asyncActions/mainMenu'

function Sidebar() {
    const isMenuOpened = useSelector(state => state.mainMenu.opened)
    const isMenuClosing = useSelector(state => state.mainMenu.closing)

    const userData = useSelector(state => state.auth.userData)
    const dispatch = useDispatch()

    const handlerLogout = () => {
        localStorage.removeItem('token')
        dispatch(authLogoutAction())
    }

    const handlerClickBackdrop = (e) => {
        dispatch(asyncCloseMenu())
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
    const userData = useSelector(state => state.auth.userData)

    return (
        <>
            {categories.map(category => {
                return !category.hidden && <Link key={category.name} to={"/files/" + category.name + "/" + userData.rootId}><li><div className='icon' style={{backgroundImage: `url(${category.icon})`}}></div>{category.title}</li></Link>
            })}
        </>
    )
}

export default Sidebar