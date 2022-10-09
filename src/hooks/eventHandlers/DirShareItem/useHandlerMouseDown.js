import React from "react"
import {useDispatch} from "react-redux"

import { setIsContextMenuOpened, setTypeContextMenu, setPositionContextMenu } from "../../../store/contextMenuReducer"
import { store } from "../../../store"
import { addSelected, removeSelected, setSelected, clearSelected } from "../../../store/selectionReducer"

export const useHandlerMouseDown = () => {
    const dispatch = useDispatch()

    return (e, file, setDescription) => {
        const { selected } = store.getState().selection

        e.stopPropagation()
        dispatch(setIsContextMenuOpened(false))
        setDescription(false)   // отключить описание

        if (e.button === 0) {       // ЛКМ
            if (e.detail === 1) {    // 1 клик
                const elemSelected = selected.includes(file._id)    // начальное состояние
        
                if (e.ctrlKey) {
                    if (!elemSelected) {
                        dispatch(addSelected(file._id))
                    } else {
                        dispatch(removeSelected(file._id))
                    }
                }
        
                if (!e.ctrlKey && !elemSelected) {
                    dispatch(setSelected([file._id]))
                }
                return
            }
    
            if (e.detail > 1) {     // 2 клика
                if (file.type === 'folder') {
                    dispatch(clearSelected())
                }
                return
            }
        }
        
        if (e.button === 2) {    // ПКМ
            if (!selected.includes(file._id)) {
                dispatch(setSelected([file._id]))
            }

            dispatch(setPositionContextMenu({
                left: e.pageX,
                top: e.pageY
            }))
            dispatch(setTypeContextMenu('item'))
            dispatch(setIsContextMenuOpened(true))
        }
    }
    
}