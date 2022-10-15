import React from "react"
import './NotificationItem.scss'

const NotificationItem = (props) => {
    const notification = props.item

    return (
        <div className="notification-item" style={notification.fadeOut ? {animation: 'fadeOut .2s linear'} : {}}>
            { !notification.time 
                ?   <div style={{position: 'relative'}}>
                        { notification.showProgress && <div className="progress_percent">{notification.progress}%</div> }
                        <div className="loading-circle" />
                    </div> 
                : '' }
            <div>
                <div className="notification-title">{notification.title}</div>
                <div className="notification-message">{notification.message}</div>
            </div>
        </div>
    )
}

export default NotificationItem