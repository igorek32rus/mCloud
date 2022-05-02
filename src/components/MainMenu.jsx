import React, { useContext, useState } from "react";
import { AuthContext, RegistrationContext } from "../Context";
import ProfileMenu from "./ProfileMenu";

function MainMenu() {
    const [profileMenu, setProfileMenu] = useState(false)
    const {isAuth} = useContext(AuthContext)
    const {reg, setReg} = useContext(RegistrationContext)

    const handleClickProfile = () => {
        setProfileMenu(!profileMenu)
    }

    const handleRegLoginClick = (event) => {
        event.preventDefault()
        setReg(!reg)
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
                        <img className="profile" src="https://yt3.ggpht.com/-EMbaZfC1_04/AAAAAAAAAAI/AAAAAAAAAAA/E5q8rnZNAts/s108-c-k-c0x00ffffff-no-rj-mo/photo.jpg" alt="profile" />
                    </div>
                </div>
                :
                <ul>
                    <a href="/" onClick={(e) => handleRegLoginClick(e)}><li>{ reg ? 'Войти' : 'Зарегистрироваться' }</li></a>
                </ul>
            }
            { isAuth && profileMenu ? <ProfileMenu /> : '' }
        </div>
    )
}

export default MainMenu