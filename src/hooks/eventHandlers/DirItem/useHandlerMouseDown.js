import React from "react"
import { useHistory, useParams } from "react-router-dom"

import { ContextMenuContext } from "../../../contexts/ContextMenuContext/ContextMenuContext"
import { SelectionContext } from "../../../contexts/SelectionContext/SelectionContext"
import { DragnDropFilesContext } from "../../../contexts/DragnDropFilesContext/DragnDropFilesContext"

export const useHandlerMouseDown = () => {
    const { setIsContextMenuOpened, setPositionContextMenu, setTypeContextMenu } = React.useContext(ContextMenuContext)
    const { selected, setSelected } = React.useContext(SelectionContext)
    const { setPositionStart, setDragFileId, setDragStart } = React.useContext(DragnDropFilesContext)

    const { category } = useParams()
    const history = useHistory()

    return (e, file, setDescription) => {
        e.stopPropagation()
        setIsContextMenuOpened(false)   // закрыть контекстное меню
        setDescription(false)   // отключить описание

        if (e.button === 0) {       // ЛКМ
            if (e.detail === 1) {    // 1 клик
                setPositionStart({
                    startX: e.pageX,
                    startY: e.pageY
                })
                setDragFileId(file._id)
        
                const elemSelected = selected.includes(file._id)    // начальное состояние
        
                if (e.ctrlKey) {
                    if (!elemSelected) {
                        setSelected(prev => [...prev, file._id])
                    } else {
                        setSelected(prev => prev.filter(item => item !== file._id))
                    }
                }
        
                if (!e.ctrlKey && !elemSelected) {
                    setSelected([file._id])
                }
        
                if (!e.ctrlKey) {
                    setDragStart(true)
                }
                return
            }
    
            if (e.detail > 1) {     // 2 клика
                if (file.type === 'folder') {
                    history.push(`/files/${category}/${file._id}`)
                }
                return
            }
        }
        
        if (e.button === 2) {    // ПКМ
            if (!selected.includes(file._id)) {
                setSelected([file._id])
            }

            setPositionContextMenu({
                left: e.pageX,
                top: e.pageY
            })
            setTypeContextMenu('item')
            setIsContextMenuOpened(true)
        }
    }
    
}