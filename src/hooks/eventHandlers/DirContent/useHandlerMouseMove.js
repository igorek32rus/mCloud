import React from "react"

import { SelectionContext } from "../../../contexts/SelectionContext/SelectionContext"
import { DragnDropFilesContext } from "../../../contexts/DragnDropFilesContext/DragnDropFilesContext"

import { checkIntersectSelection } from "../../../utils/intersects"
import { checkIntersectDragElem } from "../../../utils/intersects"

export const useHandlerMouseMove = () => {
    const { selection,
        positionSelection, setPositionSelection, 
        positionFiles, setPositionFiles, 
        selected, setSelected } = React.useContext(SelectionContext)
    const { dragStart, positionStart, setShiftPosition, setDragnDropGoal } = React.useContext(DragnDropFilesContext)

    return (e, dir) => {
        if (selection) {
            const posX = e.pageX - positionSelection.startX
            const posY = e.pageY - positionSelection.startY
            let left = positionSelection.left
            let top = positionSelection.top
        
            if (posX < 0) left = e.pageX
            if (posY < 0) top = e.pageY
        
            setPositionSelection(prev => {
                return {...prev, 
                    width: Math.abs(posX),
                    height: Math.abs(posY),
                    left,
                    top
                }
            })
        
            positionFiles.forEach((item) => {
                const intersect = checkIntersectSelection(item, positionSelection)
          
                if (e.ctrlKey) {
                    if (intersect && !item.changed) {
                        selected.includes(item._id) 
                            ? setSelected(prev => prev.filter(itemSel => itemSel !== item._id)) 
                            : setSelected(prev => [...prev, item._id])
                        const posItem = positionFiles.find(itemPos => itemPos._id === item._id)
                        posItem.changed = true
                        setPositionFiles(prev => [...prev.filter(itemPos => itemPos._id !== item._id), posItem])
                    }
                    return
                }
          
                if (!intersect) {
                    setSelected(prev => prev.filter(itemSel => itemSel !== item._id)) 
                    return
                }
        
                setSelected(prev => [...prev, item._id])
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