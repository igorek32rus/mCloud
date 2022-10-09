import React from "react"

import { SelectionContext } from "../../../contexts/SelectionContext/SelectionContext"
import { DragnDropFilesContext } from "../../../contexts/DragnDropFilesContext/DragnDropFilesContext"

import useCopyPaste from "../../useCopyPaste"

export const useHandlerMouseUp = () => {
    const { selection, setSelection, 
        selected, setSelected, 
        positionSelection } = React.useContext(SelectionContext)
    const { dragStart, setDragStart, 
        dragnDropGoal, setDragnDropGoal, 
        setShiftPosition,
        setPositionStart } = React.useContext(DragnDropFilesContext)

    const [, cut, paste] = useCopyPaste()

    return (e) => {
        if (selection) {
            const posX = Math.abs(e.pageX - positionSelection.startX)
            const posY = Math.abs(e.pageY - positionSelection.startY)

            if (posX < 2 && posY < 2) setSelected([])

            setSelection(false)
            return
        }

        if (dragStart) {
            if (dragnDropGoal) {
                cut(selected)
                paste(dragnDropGoal)
                // changeParent(dragnDropGoal, selected)
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