import React from "react"
import './Notifications.scss'
import NotificationItem from "../NotificationItem/NotificationItem"
import { useSelector } from "react-redux"

function Notifications() {
    const notifications = useSelector(state => state.notifications.notifications)

    return (
        <div id="notifications">
            { notifications?.map(item => <NotificationItem item={item} key={item.key} />) }
        </div>
        
    )
}

export default Notifications