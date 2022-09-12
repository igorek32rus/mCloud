import React from "react"

import { SelectionContext } from "../../../contexts/SelectionContext/SelectionContext"
import { DragnDropFilesContext } from "../../../contexts/DragnDropFilesContext/DragnDropFilesContext"

export const useHandlerMouseUp = () => {
    const { selection, setSelection, 
        selected, setSelected, 
        positionSelection } = React.useContext(SelectionContext)
    const { dragStart, setDragStart, 
        dragnDropGoal, setDragnDropGoal, 
        setShiftPosition,
        setPositionStart } = React.useContext(DragnDropFilesContext)

    return (e, changeParent) => {
        if (selection) {
            const posX = Math.abs(e.pageX - positionSelection.startX)
            const posY = Math.abs(e.pageY - positionSelection.startY)

            if (posX < 2 && posY < 2) setSelected([])

            setSelection(false)
            return
        }

        if (dragStart) {
            if (dragnDropGoal) {
                changeParent(dragnDropGoal, selected)
            }

            // убрать цель
            setDragnDropGoal(0)
            setDragStart(false)
            setPositionStart({
                startX: 0,
                startY: 0
            })
            setShiftPosition({
                posX: 0,
                posY: 0
            })
        }
    }
    
}