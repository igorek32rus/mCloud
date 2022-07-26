import React, {useState, useRef} from "react"
import { NotifyContext } from "./NotifyContext"

export const NotifyProvider = ({ children }) => {
    const [notifications, setNotifications] = useState([])
    const notificationsRef = useRef()
    notificationsRef.current = notifications

    const createNotification = ({title = '', message = '', time = 3}) => {
        const id = Date.now() - (Math.floor(Math.random() * 100)) + ''
        const newNotification = {
            key: id,
            title,
            message,
            time,
            fadeOut: false,
            delete: false
        }
    
        setNotifications([...notifications, newNotification])
    
        if (time > 0) {
            setTimeout(() => {
                removeNotification(newNotification.key)
            }, time * 1000);
        }
    
        return id
    }
    
    const removeNotification = (key) => {
        const notification = notificationsRef.current.find(item => item.key === key)
        notification.fadeOut = true
        setNotifications([
            ...notificationsRef.current.filter(item => item.key !== key),
            notification
        ])
        setTimeout(() => {
            setNotifications(notificationsRef.current.filter(item => item.key !== key))
        }, 150);
    }

    const valueNotifyProvider = { notifications, createNotification, removeNotification }

    return (
        <NotifyContext.Provider value={valueNotifyProvider}>
            { children }
        </NotifyContext.Provider>
    )
}