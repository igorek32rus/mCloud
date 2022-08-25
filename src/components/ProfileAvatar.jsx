import React, {useContext, useEffect, useState} from "react"
import { MainMenuContext } from "../Context"

function ProfileAvatar(props) {
    const {isMenuOpened, setIsMenuOpened, isMenuClosing} = useContext(MainMenuContext)
    const [styleAva, setStyleAva] = useState({
        transform: 'translate(0, 0) scale(1)',
        opacity: 0.8
    })

    const handleClickProfile = () => {
        setIsMenuOpened((prev) => !prev)
    }

    useEffect(() => {

        if (isMenuClosing) {
            setStyleAva({
                transform: 'translate(0, 0) scale(1)',
                opacity: 0.8
            })
            return
        }

        if (isMenuOpened) {
            let widthSidebar = Math.round(document.documentElement.clientWidth * 0.2)
            if (widthSidebar < 150) widthSidebar = 150

            const center = Math.round(widthSidebar / 2)
            const scaleAvatar = 3
            const sizeAva = 35
            const paddingHeader = 20
            const transform = `translate(-${center - paddingHeader - Math.round(sizeAva / 2)}px, 100px) scale(${scaleAvatar})`
            setStyleAva({
                transform, opacity: 1
            })
            return
        }
    
    }, [isMenuOpened, isMenuClosing])

    return (
        <div className="profile-avatar-block" onClick={handleClickProfile} style={styleAva}>
            <img className="profile-avatar-block profile-avatar" src="/photo.jpg" alt="avatar" />
        </div>
    )
}

export default ProfileAvatar