import React, { useContext, useEffect } from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { SelectionContext } from "../contexts/SelectionContext/SelectionContext"
// import { ContextMenuContext } from "../contexts/ContextMenuContext/ContextMenuContext"

import DirItem from "./DirItem"
import Selection from "./Selection"

import { useHandlerMouseDown } from "../hooks/eventHandlers/DirContent/useHandlerMouseDown"
import { useHandlerMouseMove } from "../hooks/eventHandlers/DirContent/useHandlerMouseMove"
import { useHandlerMouseUp } from "../hooks/eventHandlers/DirContent/useHandlerMouseUp"

import categories from "../categories"

import '../styles/DirContent.css'

function DirContent() {
    const dir = useSelector(state => state.dir.dir)
    const { selection, setSelected } = useContext(SelectionContext)
    
    const { isContextMenuOpened } = useSelector(state => state.contextMenu)

    const handlerMouseDown = useHandlerMouseDown()
    const handlerMouseMove = useHandlerMouseMove()
    const handlerMouseUp = useHandlerMouseUp()

    const { category } = useParams()
    const categoryParams = categories.find(cat => cat.name === category)

    useEffect(() => {
        if (category !== "search") {
            setSelected([])
        }
    }, [category, setSelected])

    return (
        <div className="dirContent" 
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