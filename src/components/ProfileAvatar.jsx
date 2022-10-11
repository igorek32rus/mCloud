import React, {useEffect, useState} from "react"
import { useSelector, useDispatch } from "react-redux"

import { setMenuOpened } from "../store/mainMenuReducer"

function ProfileAvatar(props) {
    const isMenuOpened = useSelector(state => state.mainMenu.opened)
    const isMenuClosing = useSelector(state => state.mainMenu.closing)

    const dispatch = useDispatch()

    const [styleAva, setStyleAva] = useState({
        transform: 'translate(0, 0) scale(1)',
        opacity: 0.8
    })

    const handleClickProfile = () => {
        dispatch(setMenuOpened(!isMenuOpened))
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
            // let widthSidebar = Math.round(document.documentElement.clientWidth * 0.2)
            // if (widthSidebar < 150) widthSidebar = 150
            const widthSidebar = 200

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