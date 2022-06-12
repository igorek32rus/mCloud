import React, { useContext, useState } from "react";
import { useHistory } from 'react-router-dom';
import { AuthContext } from "../Context";
import ProfileMenu from "./ProfileMenu";

function MainMenu(props) {
    const [profileMenu, setProfileMenu] = useState(false)
    const {isAuth, registration, setRegistration} = useContext(AuthContext)
    const history = useHistory();

    const handleClickProfile = () => {
        setProfileMenu(!profileMenu)
    }

    const handleRegLoginClick = (event) => {
        event.preventDefault()
        !registration ? history.push('/registration') : history.push('/login')
        setRegistration(!registration)
    }

    return (
        <div className="main-menu">
            { isAuth ?
                <ul>
                    <a href="/"><li>Главная</li></a>
                    <a href="/"><li>Последние</li></a>
                    <a href="/"><li>Общие</li></a>
                    <a href="/"><li>Корзина</li></a>
                </ul>
                : '' 
            }
            { isAuth ? 
                <div className="profile" onClick={handleClickProfile}>
                    <div style={{width: 32, height: 32, marginLeft: 10}}>
                        <img className="profile" src="/photo.jpg" alt="profile" />
                    </div>
                </div>
                :
                <ul>
                    <a href="/" onClick={(e) => handleRegLoginClick(e)}><li>{ registration ? 'Войти' : 'Зарегистрироваться' }</li></a>
                </ul>
            }
            { isAuth && profileMenu ? <ProfileMenu /> : '' }
        </div>
    )
}

export default MainMenu