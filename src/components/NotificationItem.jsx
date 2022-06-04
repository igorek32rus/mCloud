import React, {useState, useEffect, useContext} from "react"
import { NotifyContext } from "../Context"
import '../styles/Notify.css'

const NotificationItem = (props) => {
    const [notification, setNotification] = useState(props.item)
    const {removeNotification} = useContext(NotifyContext)

    useEffect(() => {
        if (notification.time > 0) {
            setTimeout(() => {
                removeNotification(notification.key)
            }, notification.time * 1000);
        }
    }, [])

    return (
        <div className="notify-block" style={!notification.show ? {animation: 'fadeOut .2s linear'} : {}}>
            {/* <div className="loading-circle" /> */}
            <div className="notify-title">{notification.title}</div>
            <div className="notify-message">{notification.message}</div>
        </div>
    )
}

export default NotificationItem