import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"

import { useHandlerMouseDown } from '../../hooks/eventHandlers/DirContent/useHandlerMouseDown'
import { useHandlerMouseMove } from '../../hooks/eventHandlers/DirContent/useHandlerMouseMove'
import { useHandlerMouseUp } from '../../hooks/eventHandlers/DirContent/useHandlerMouseUp'

import SharePageContextMenu from "../contextMenus/SharePageContextMenu"

import DirItem from "../DirItem/DirItem"
import Selection from "../Selection/Selection"

import '../DirContent/DirContent.scss'

import { clearSelected } from "../../store/selectionReducer"

function DirShareContent() {
    const { dir } = useSelector(state => state.dir)
    const { selection } = useSelector(state => state.selection)
    const { isContextMenuOpened } = useSelector(state => state.contextMenu)

    const handlerMouseDown = useHandlerMouseDown()
    const handlerMouseMove = useHandlerMouseMove()
    const handlerMouseUp = useHandlerMouseUp()

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(clearSelected())
    }, [])

    return (
        <div className="dir-content" 
            onContextMenu={ (e) => e.preventDefault() } 
            onDragStart={ () => false } 
            onMouseDown={handlerMouseDown}
            onMouseMove={handlerMouseMove}
            onMouseUp={handlerMouseUp}
        >

            { selection && <Selection /> }

            { 
                [...dir.filter(item => item.type === 'folder')
                    .sort((a, b) => a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1),
                ...dir.filter(item => item.type === 'file')
                    .sort((a, b) => a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1)]
                .map(item => <DirItem file={item} key={item._id} />) 
            }

            { isContextMenuOpened && <SharePageContextMenu /> }
        </div>
    )
}

export default DirShareContent