import React, { useContext, useEffect } from "react"
import { useParams } from "react-router-dom"
import { DirContext } from "../contexts/DirContext/DirContext"
import { SelectionContext } from "../contexts/SelectionContext/SelectionContext"
import { ContextMenuContext } from "../contexts/ContextMenuContext/ContextMenuContext"

import { useHandlerMouseDown } from '../hooks/eventHandlers/DirContent/useHandlerMouseDown'
import { useHandlerMouseMove } from '../hooks/eventHandlers/DirContent/useHandlerMouseMove'
import { useHandlerMouseUp } from '../hooks/eventHandlers/DirContent/useHandlerMouseUp'

import SharePageContextMenu from "./contextMenus/SharePageContextMenu"

import DirItem from "./DirItem"
import Selection from "./Selection"

import '../styles/DirContent.css'

function DirShareContent() {
    const { dir } = useContext(DirContext)
    const { selection, setSelected } = useContext(SelectionContext)
    const { isContextMenuOpened } = useContext(ContextMenuContext)

    const handlerMouseDown = useHandlerMouseDown()
    const handlerMouseMove = useHandlerMouseMove()
    const handlerMouseUp = useHandlerMouseUp()


    useEffect(() => {
        setSelected([])
    }, [setSelected])

    return (
        <div className="dirContent" 
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