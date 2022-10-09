import React from "react"
import { useDispatch } from "react-redux"

import { DragnDropFilesContext } from "../../../contexts/DragnDropFilesContext/DragnDropFilesContext"

import { checkIntersectSelection } from "../../../utils/intersects"
import { checkIntersectDragElem } from "../../../utils/intersects"

import { store } from "../../../store"
import { updatePositionSelection, removeSelected, addSelected, addPositionFile } from "../../../store/selectionReducer"

export const useHandlerMouseMove = () => {
    const { dragStart, positionStart, setShiftPosition, setDragnDropGoal } = React.useContext(DragnDropFilesContext)

    const dispatch = useDispatch()

    return (e, dir) => {
        const { selection, positionSelection, positionFiles, selected } = store.getState().selection

        if (selection) {
            const posX = e.pageX - positionSelection.startX
            const posY = e.pageY - positionSelection.startY
            let left = positionSelection.left
            let top = positionSelection.top
        
            if (posX < 0) left = e.pageX
            if (posY < 0) top = e.pageY
        
            dispatch(updatePositionSelection({
                width: Math.abs(posX),
                height: Math.abs(posY),
                left,
                top
            }))
            
            positionFiles.forEach((item) => {
                const intersect = checkIntersectSelection(item, positionSelection)
          
                if (e.ctrlKey) {
                    if (intersect && !item.changed) {
                        selected.includes(item._id) 
                            ? dispatch(removeSelected(item._id))
                            : dispatch(addSelected(item._id))
                        const posItem = positionFiles.find(itemPos => itemPos._id === item._id)
                        posItem.changed = true
                        dispatch(addPositionFile(posItem))
                    }
                    return
                }
          
                if (!intersect && selected.includes(item._id)) {
                    dispatch(removeSelected(item._id))
                    return
                }
        
                if (intersect && !selected.includes(item._id))
                    dispatch(addSelected(item._id))
            })
        }
        
        if (dragStart) {
            setShiftPosition({
                posX: e.pageX - positionStart.startX,
                posY: e.pageY - positionStart.startY
            })
        
            // проверка над каким элементом перетаскиваются
            const notSelected = positionFiles.filter(item => !selected.includes(item._id) && dir.find(itemDir => itemDir._id === item._id && itemDir.type === 'folder'))
        
            let someItersects = false
            for (let i = 0; i < notSelected.length; i++) {
                const item = notSelected[i];
                if (checkIntersectDragElem(item, e.pageX, e.pageY)) {
                    setDragnDropGoal(item._id)
                    someItersects = true
                }
            }
        
            if (!someItersects) {
                setDragnDropGoal(0)
            }
        }
    }
}