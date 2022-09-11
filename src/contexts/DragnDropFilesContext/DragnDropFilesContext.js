import { createContext } from "react"

export const DragnDropFilesContext = createContext({
    dragStart: false,
    setDragStart: () => {},
    dragFileId: 0,
    setDragFileId: () => {},
    positionStart: {
        startX: 0,
        startY: 0
    },
    setPositionStart: () => {},
    shiftPosition: {
        posX: 0,
        posY: 0
    },
    setShiftPosition: () => {},
    dragnDropGoal: 0,
    setDragnDropGoal: () => {}
})