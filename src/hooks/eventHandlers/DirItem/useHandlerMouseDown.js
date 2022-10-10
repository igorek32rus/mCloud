import { useHistory, useParams } from "react-router-dom"
import { useDispatch } from "react-redux"

import categories from "../../../categories"
import { setIsContextMenuOpened, setTypeContextMenu, setPositionContextMenu } from "../../../store/contextMenuReducer"
import { store } from "../../../store"
import { addSelected, removeSelected, setSelected, clearSelected } from "../../../store/selectionReducer"
import { setPositionStart, setDragFileID, setIsDragStart } from "../../../store/dragAndDropReducer"

export const useHandlerMouseDown = () => {
    const dispatch = useDispatch()
    const { category } = useParams()
    const history = useHistory()
    const categoryParams = categories.find(cat => cat.name === category)

    return (e, file, setDescription) => {
        const { selected } = store.getState().selection

        e.stopPropagation()
        dispatch(setIsContextMenuOpened(false))
        setDescription(false)   // отключить описание

        if (e.button === 0) {       // ЛКМ
            if (e.detail === 1) {    // 1 клик
                if (categoryParams.activeDragnDrop) {
                    dispatch(setPositionStart({
                        startX: e.pageX,
                        startY: e.pageY
                    }))
                    dispatch(setDragFileID(file._id))
        
                    if (!e.ctrlKey) {
                        dispatch(setIsDragStart(true))
                    }
                }
                
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
                    history.push(`/files/${category === "search" ? "main" : category}/${file._id}`)
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