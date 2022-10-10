import React from "react"
import { useDispatch } from "react-redux"

import useCopyPaste from "../../useCopyPaste"
import { store } from "../../../store"
import { setIsSelection, clearSelected } from "../../../store/selectionReducer"
import { setIsDragStart, setDragGoal, setShiftPosition, setPositionStart } from "../../../store/dragAndDropReducer"

export const useHandlerMouseUp = () => {
    const [, cut, paste] = useCopyPaste()
    const dispatch = useDispatch()

    return (e) => {
        const { selection, selected, positionSelection } = store.getState().selection
        const { dragStart, dragnDropGoal } = store.getState().dragAndDrop

        if (selection) {
            const posX = Math.abs(e.pageX - positionSelection.startX)
            const posY = Math.abs(e.pageY - positionSelection.startY)

            if (posX < 2 && posY < 2) dispatch(clearSelected())

            dispatch(setIsSelection(false))
            return
        }

        if (dragStart) {
            if (dragnDropGoal) {
                cut(selected)
                paste(dragnDropGoal)
            }

            // убрать цель
            dispatch(setIsDragStart(false))
            dispatch(setDragGoal(0))
            dispatch(setPositionStart({
                startX: 0,
                startY: 0
            }))
            dispatch(setShiftPosition({
                posX: 0,
                posY: 0
            }))
        }
    }
    
}