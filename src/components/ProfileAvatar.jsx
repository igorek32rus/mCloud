import React, {useContext} from "react"
import { MainMenuContext } from "../Context"

function ProfileAvatar(props) {
    const {setIsMenuOpened} = useContext(MainMenuContext)

    const handleClickProfile = () => {
        setIsMenuOpened((prev) => !prev)
    }

    return (
        <div className="profile-avatar-block" onClick={handleClickProfile}>
            <img className="profile-avatar-block profile-avatar" src="/photo.jpg" alt="avatar" />
        </div>
    )
}

export default ProfileAvatar