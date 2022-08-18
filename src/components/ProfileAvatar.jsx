import React from "react"

function ProfileAvatar(props) {
    const handleClickProfile = () => {
        props.setIsMenuOpen((prev) => !prev)
    }

    return (
        <div className="profile-avatar-block" onClick={handleClickProfile}>
            <img className="profile-avatar-block profile-avatar" src="/photo.jpg" alt="avatar" />
        </div>
    )
}

export default ProfileAvatar