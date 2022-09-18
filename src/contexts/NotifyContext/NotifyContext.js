import { createContext } from "react"

export const NotifyContext = createContext({
    notifications: [],
    createNotification: () => {},
    removeNotification: () => {},
    updateNotification: () => {}
})