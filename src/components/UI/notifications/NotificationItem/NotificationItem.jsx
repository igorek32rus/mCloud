import React from "react"
import './NotificationItem.scss'

const NotificationItem = (props) => {
    const notification = props.item
    const notificationRef = React.useRef()

    React.useEffect(() => {
        notificationRef.current.scrollIntoView({ behavior: "smooth", block: "start" })
    }, [])

    return (
        <div className="notification-item" style={notification.fadeOut ? {animation: 'fadeOut .2s linear'} : {}} ref={notificationRef}>
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