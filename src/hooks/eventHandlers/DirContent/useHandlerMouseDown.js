import React from "react"
import { useDispatch } from "react-redux"

// import { ContextMenuContext } from "../../../contexts/ContextMenuContext/ContextMenuContext"
import { SelectionContext } from "../../../contexts/SelectionContext/SelectionContext"

import { setIsContextMenuOpened, setTypeContextMenu, setPositionContextMenu } from "../../../store/contextMenuReducer"

export const useHandlerMouseDown = () => {
    // const { setIsContextMenuOpened, setPositionContextMenu, setTypeContextMenu } = React.useContext(ContextMenuContext)
    const { setSelection, setPositionSelection, setPositionFiles, setSelected } = React.useContext(SelectionContext)

    const dispatch = useDispatch()

    return (e) => {
        // setIsContextMenuOpened(false)
        dispatch(setIsContextMenuOpened(false))

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
            dispatch(setPositionContextMenu({
                left: e.pageX,
                top: e.pageY
            }))
            // setPositionContextMenu({
            //     left: e.pageX,
            //     top: e.pageY
            // })
            dispatch(setTypeContextMenu('workspace'))
            dispatch(setIsContextMenuOpened(true))
            setSelected([])
        }
    }
    
}