import React, { useContext } from 'react';
import { AuthContext } from '../Context';

function ProfileMenu(props) {
    const {setIsAuth, setUserData} = useContext(AuthContext)

    const handleLogout = () => {
        setUserData({})
        localStorage.removeItem('token')
        setIsAuth(false)
    }

    return (
        <div className="dropMenu profileMenu slideDown">
            <ul className="menu profile">
                <li><a href="/">Главная</a></li>
                <li><a href="/">Последние</a></li>
                <li><a href="/">Общие</a></li>
                <li><a href="/">Корзина</a></li>
                <li>Настройки</li>
                <li onClick={handleLogout}>Выйти</li>
            </ul>
        </div>
    )
}

export default ProfileMenu