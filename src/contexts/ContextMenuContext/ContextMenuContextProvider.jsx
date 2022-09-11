import React from "react"
import { ContextMenuContext } from "./ContextMenuContext"

export const ContextMenuContextProvider = ({ children }) => {
    const [isContextMenuOpened, setIsContextMenuOpened] = React.useState(false)
    const [typeContextMenu, setTypeContextMenu] = React.useState('item')
    const [positionContextMenu, setPositionContextMenu] = React.useState({
        left: 0, top: 0
    })

    const providerValue = {
        isContextMenuOpened, setIsContextMenuOpened, 
        typeContextMenu, setTypeContextMenu,
        positionContextMenu, setPositionContextMenu
    }

    return (
        <ContextMenuContext.Provider value={providerValue}>
            {children}
        </ContextMenuContext.Provider>
    )
}