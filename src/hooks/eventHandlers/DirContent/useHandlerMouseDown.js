import React from "react"

import { ContextMenuContext } from "../../../contexts/ContextMenuContext/ContextMenuContext"
import { SelectionContext } from "../../../contexts/SelectionContext/SelectionContext"

export const useHandlerMouseDown = () => {
    const { setIsContextMenuOpened, setPositionContextMenu, setTypeContextMenu } = React.useContext(ContextMenuContext)
    const { setSelection, setPositionSelection, setPositionFiles, setSelected } = React.useContext(SelectionContext)

    return (e) => {
        setIsContextMenuOpened(false)

        if (e.button === 0) {   // ЛКМ
            setSelection(true)
            setPositionSelection({
                startX: e.pageX,
                startY: e.pageY,
                left: e.pageX,
                top: e.pageY,
                width: 0,
                height: 0
            })

            setPositionFiles(prevPos => {
                return prevPos.reduce((prev, cur) => [...prev, {...cur, changed: false}], [])
            })
            return
        }
        
        if (e.button === 2) {   // ПКМ
            setPositionContextMenu({
                left: e.pageX,
                top: e.pageY
            })
            setTypeContextMenu('workspace')
            setIsContextMenuOpened(true)
            setSelected([])
        }
    }
    
}