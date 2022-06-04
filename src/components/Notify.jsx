import React, { useContext } from "react";
import { NotifyContext } from "../Context";
import '../styles/Notify.css'
import NotificationItem from "./NotificationItem"

function Notify() {
    const {notifications} = useContext(NotifyContext)

    return (
        <div id="notifications">
            { notifications.map(item => <NotificationItem item={item} key={item.key} />) }
        </div>
        
    )
}

export default Notify