import React, { useContext } from "react"
// import { NotifyContext } from "../Context"
import '../styles/Notify.css'
import NotificationItem from "./NotificationItem"
import { useSelector } from "react-redux"

function Notify() {
    // const {notifications} = useContext(NotifyContext)
    const notifications = useSelector(state => state.notifications.notifications)

    return (
        <div id="notifications">
            { notifications?.map(item => <NotificationItem item={item} key={item.key} />) }
        </div>
        
    )
}

export default Notify