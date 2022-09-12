import React, { useContext } from "react"
import { useParams } from "react-router-dom"
import { DirContext } from "../contexts/DirContext/DirContext"
import { SelectionContext } from "../contexts/SelectionContext/SelectionContext"
import { ContextMenuContext } from "../contexts/ContextMenuContext/ContextMenuContext"

import DirItem from "./DirItem"
import Selection from "./Selection"

import MainContextMenu from "./contextMenus/MainContextMenu"
import TrashContextMenu from "./contextMenus/TrashContextMenu"

import { useHandlerMouseDown } from "../hooks/eventHandlers/DirContent/useHandlerMouseDown"
import { useHandlerMouseMove } from "../hooks/eventHandlers/DirContent/useHandlerMouseMove"
import { useHandlerMouseUp } from "../hooks/eventHandlers/DirContent/useHandlerMouseUp"

import '../styles/DirContent.css'

const nullMessage = (cat) => {
    if (cat === 'main')
        return 'Папка пуста. Загрузите файлы или создайте новую папку'

    if (cat === 'latest')
        return 'Вы пока ничего не загрузили'
    
    if (cat === 'shared')
        return 'Вы пока не открыли общий доступ к файлам'

    if (cat === 'trash')
        return 'Удалённых файлов нет'
}

function DirContent(props) {
    const { dir } = useContext(DirContext)
    const { selection } = useContext(SelectionContext)
    
    const { isContextMenuOpened } = useContext(ContextMenuContext)

    const handlerMouseDown = useHandlerMouseDown()
    const handlerMouseMove = useHandlerMouseMove()
    const handlerMouseUp = useHandlerMouseUp()

    const {category} = useParams()

    let ContextMenu = null
    switch (category) {
        case 'main':
            ContextMenu = <MainContextMenu />
            break;
        case 'trash':
            ContextMenu = <TrashContextMenu />
            break;
        default:
            break;
    }

    return (
        <div className="dirContent" 
            onContextMenu={ (e) => e.preventDefault() } 
            onMouseDown={ (e) => handlerMouseDown(e) } 
            onMouseMove={ (e) => handlerMouseMove(e, dir) } 
            onMouseUp={ (e) => handlerMouseUp(e, props.changeParent) } 
            onDragStart={ () => false } 
        >

            { selection && <Selection /> }

            { !dir.length && <div className="message">{nullMessage(category)}</div> }

            { 
                [...dir.filter(item => item.type === 'folder')
                    .sort((a, b) => a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1),
                ...dir.filter(item => item.type === 'file')
                    .sort((a, b) => a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1)]
                .map(item => <DirItem file={item} key={item._id} />) 
            }

            { isContextMenuOpened && ContextMenu }
        </div>
    )
}

export default DirContent