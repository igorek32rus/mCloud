import { useDispatch } from "react-redux"

import { setIsContextMenuOpened, setTypeContextMenu, setPositionContextMenu } from "../../../store/contextMenuReducer"
import { setIsSelection, updatePositionSelection, resetChangedPositionFiles, clearSelected } from "../../../store/selectionReducer"

import { store } from "../../../store"

export const useHandlerMouseDown = () => {
    const dispatch = useDispatch()

    return (e) => {
        const { isContextMenuOpened } = store.getState().contextMenu
        
        if (isContextMenuOpened) dispatch(setIsContextMenuOpened(false))

        if (e.button === 0) {   // ЛКМ
            dispatch(setIsSelection(true))
            dispatch(updatePositionSelection({
                startX: e.pageX,
                startY: e.pageY,
                left: e.pageX,
                top: e.pageY,
                width: 0,
                height: 0
            }))

            dispatch(resetChangedPositionFiles())
            return
        }
        
        if (e.button === 2) {   // ПКМ
            dispatch(setPositionContextMenu({
                left: e.pageX,
                top: e.pageY
            }))
            dispatch(setTypeContextMenu('workspace'))
            dispatch(setIsContextMenuOpened(true))
            dispatch(clearSelected())
        }
    }
    
}