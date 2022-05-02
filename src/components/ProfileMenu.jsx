import React, { useContext } from 'react';
import { AuthContext } from '../Context';

function ProfileMenu(props) {
    const {setIsAuth} = useContext(AuthContext)

    const handleLogout = () => {
        setIsAuth(false)
    }

    return (
        <div className="dropMenu profileMenu slideDown">
            <ul className="menu profile">
                <li>Настройки</li>
                <li onClick={handleLogout}>Выйти</li>
            </ul>
        </div>
    )
}

export default ProfileMenu