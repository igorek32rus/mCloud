import React from "react"
import { useDispatch } from "react-redux"

import { DragnDropFilesContext } from "../../../contexts/DragnDropFilesContext/DragnDropFilesContext"

import useCopyPaste from "../../useCopyPaste"
import { store } from "../../../store"
import { setIsSelection, clearSelected } from "../../../store/selectionReducer"

export const useHandlerMouseUp = () => {
    const { dragStart, setDragStart, 
        dragnDropGoal, setDragnDropGoal, 
        setShiftPosition,
        setPositionStart } = React.useContext(DragnDropFilesContext)

    const [, cut, paste] = useCopyPaste()
    const dispatch = useDispatch()

    return (e) => {
        const { selection, selected, positionSelection } = store.getState().selection

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