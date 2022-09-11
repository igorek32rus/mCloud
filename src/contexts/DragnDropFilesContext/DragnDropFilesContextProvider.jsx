import React from "react"
import { DragnDropFilesContext } from "./DragnDropFilesContext"

export const DragnDropFilesContextProvider = ({ children }) => {
    const [dragStart, setDragStart] = React.useState(false)
    const [dragFileId, setDragFileId] = React.useState(0)
    const [positionStart, setPositionStart] = React.useState({
        startX: 0,
        startY: 0
    })
    const [shiftPosition, setShiftPosition] = React.useState({
        posX: 0,
        posY: 0
    })
    const [dragnDropGoal, setDragnDropGoal] = React.useState(0)

    const providerValue = {
        dragStart, setDragStart,
        dragFileId, setDragFileId,
        positionStart, setPositionStart,
        shiftPosition, setShiftPosition,
        dragnDropGoal, setDragnDropGoal
    }

    return (
        <DragnDropFilesContext.Provider value={providerValue}>
            { children }
        </DragnDropFilesContext.Provider>
    )
}