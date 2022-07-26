import React, { useState } from "react"
import ProfileMenu from "./ProfileMenu"

function MainMenu(props) {
    const [profileMenu, setProfileMenu] = useState(false)

    const handleClickProfile = () => {
        setProfileMenu(!profileMenu)
    }

    return (
        <div className="main-menu">
                <div className="profile" onClick={handleClickProfile}>
                    <div style={{width: 32, height: 32, marginLeft: 10}}>
                        <img className="profile" src="/photo.jpg" alt="profile" />
                    </div>
                </div>
            { profileMenu && <ProfileMenu /> }
        </div>
    )
}

export default MainMenu