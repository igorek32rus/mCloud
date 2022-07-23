import React, { useContext } from 'react'
import { AuthContext } from '../Context'

import { useHistory } from 'react-router-dom'

function ProfileMenu(props) {
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

    return (
        <div className="dropMenu profileMenu slideDown">
            <ul className="menu profile">
                <li onClick={() => handleChangeCat('main')}>Главная</li>
                <li onClick={() => handleChangeCat('latest')}>Последние</li>
                <li onClick={() => handleChangeCat('shared')}>Общие</li>
                <li onClick={() => handleChangeCat('trash')}>Корзина</li>
                <li>Настройки</li>
                <li onClick={handleLogout}>Выйти</li>
            </ul>
        </div>
    )
}

export default ProfileMenu