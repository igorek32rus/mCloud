import { createContext } from "react"

export const ContextMenuContext = createContext({
    isContextMenuOpened: false,
    setIsContextMenuOpened: () => {},
    typeContextMenu: 'item',
    setTypeContextMenu: () => {},
    positionContextMenu: {
        left: 0,
        top: 0
    },
    setPositionContextMenu: () => {} 
})