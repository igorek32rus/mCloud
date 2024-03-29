import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { useParams } from "react-router-dom"

import DirItem from "../DirItem/DirItem"
import Selection from "../Selection/Selection"

import { useHandlerMouseDown } from "../../hooks/eventHandlers/DirContent/useHandlerMouseDown"
import { useHandlerMouseMove } from "../../hooks/eventHandlers/DirContent/useHandlerMouseMove"
import { useHandlerMouseUp } from "../../hooks/eventHandlers/DirContent/useHandlerMouseUp"

import categories from "../../categories"

import './DirContent.scss'

function DirContent() {
    const dir = useSelector(state => state.dir.dir)
    const { selection } = useSelector(state => state.selection)
    const dispatch = useDispatch()
    
    const { isContextMenuOpened } = useSelector(state => state.contextMenu)

    const handlerMouseDown = useHandlerMouseDown()
    const handlerMouseMove = useHandlerMouseMove()
    const handlerMouseUp = useHandlerMouseUp()

    const { category } = useParams()
    const categoryParams = categories.find(cat => cat.name === category)

    return (
        <div className="dir-content" 
            onContextMenu={ (e) => e.preventDefault() } 
            onMouseDown={ (e) => handlerMouseDown(e) } 
            onMouseMove={ (e) => handlerMouseMove(e, dir) } 
            onMouseUp={ (e) => handlerMouseUp(e) } 
            onDragStart={ () => false } 
        >

            { selection && <Selection /> }

            { !dir.length && <div className="message">{categoryParams.emptyMessage}</div> }

            { 
                [...dir.filter(item => item.type === 'folder')
                    .sort((a, b) => a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1),
                ...dir.filter(item => item.type === 'file')
                    .sort((a, b) => a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1)]
                .map(item => <DirItem file={item} key={item._id} />) 
            }

            { isContextMenuOpened && categoryParams.contextMenu }
        </div>
    )
}

export default DirContent