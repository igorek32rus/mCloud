import React, {useState, useRef} from "react"
import { NotifyContext } from "./NotifyContext"

export const NotifyProvider = ({ children }) => {
    const [notifications, setNotifications] = useState([])
    const notificationsRef = useRef()
    notificationsRef.current = notifications

    const createNotification = (params) => {
        const id = Date.now() - (Math.floor(Math.random() * 100)) + ''
        let newNotification = {
            key: id,
            title: '',
            message: '',
            time: 3,
            fadeOut: false,
            delete: false,
            showProgress: false,
            progress: 0
        }

        newNotification = {...newNotification, ...params}
    
        notificationsRef.current = [...notifications, newNotification]
        setNotifications([...notifications, newNotification])
    
        if (newNotification.time > 0) {
            setTimeout(() => {
                removeNotification(newNotification.key)
            }, newNotification.time * 1000);
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

    const updateNotification = (key, params = {}) => {
        const notification = notificationsRef.current.find(item => item.key === key)
        setNotifications([
            ...notificationsRef.current.filter(item => item.key !== key),
            {...notification, ...params}
        ])
    }

    const valueNotifyProvider = { notifications, createNotification, removeNotification, updateNotification }

    return (
        <NotifyContext.Provider value={valueNotifyProvider}>
            { children }
        </NotifyContext.Provider>
    )
}