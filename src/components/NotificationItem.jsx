import React from "react"
import '../styles/Notify.css'

const NotificationItem = (props) => {
    const notification = props.item

    return (
        <div className="notify-block" style={notification.fadeOut ? {animation: 'fadeOut .2s linear'} : {}}>
            { !notification.time ? <div><div className="loading-circle" /></div> : '' }
            {/* { notification.progress } */}
            <div>
                <div className="notify-title">{notification.title}</div>
                <div className="notify-message">{notification.message}</div>
            </div>
        </div>
    )
}

export default NotificationItem