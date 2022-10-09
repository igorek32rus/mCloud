import React, { useState, useRef } from "react"
import { useSelector } from "react-redux"
import { getFileSize } from '../utils/getFileSize'
import { getExtension } from '../utils/getExtension'

import { SelectionContext } from "../contexts/SelectionContext/SelectionContext"
import { DragnDropFilesContext } from "../contexts/DragnDropFilesContext/DragnDropFilesContext"
import { ContextMenuContext } from "../contexts/ContextMenuContext/ContextMenuContext"
import { WindowSizeContext } from "../contexts/WindowSizeContext/WindowSizeContext" 

import { useHandlerMouseDown } from "../hooks/eventHandlers/DirItem/useHandlerMouseDown"

function DirItem({ file }) {
    const [description, setDescription] = useState(false)
    const { setPositionFiles, selected } = React.useContext(SelectionContext)
    const { shiftPosition, dragStart, dragnDropGoal } = React.useContext(DragnDropFilesContext)
    const { isContextMenuOpened } = React.useContext(ContextMenuContext)
    const { windowSize } = React.useContext(WindowSizeContext)
    
    const dir = useSelector(state => state.dir.dir)

    const fileRef = useRef(null)

    const handlerMouseDown = useHandlerMouseDown()

    React.useEffect(() => {
        setPositionFiles(prev => {
            return [...prev.filter(item => item._id !== file._id), {
                _id: file._id,
                left: fileRef.current.offsetLeft,
                top: fileRef.current.offsetTop,
                width: fileRef.current.offsetWidth,
                height: fileRef.current.offsetHeight,
                changed: false
            }]
        })
    }, [windowSize, dir])

    const handlerMouseEnter = (e) => {
        if (!isContextMenuOpened && !e.buttons) setDescription(true)
    }

    const handlerMouseLeave = () => {
        setDescription(false)
    }

    const transformElement = dragStart && selected.includes(file._id) 
        ? `translate(${shiftPosition.posX}px, ${shiftPosition.posY}px)` 
        : `translate(0px, 0px)`
    const zIndexElement = (dragStart && selected.includes(file._id)) || description
        ? 100
        : 1

    return (
        <div className={
            selected.includes(file._id) || dragnDropGoal === file._id
                ? 'block selected' 
                : 'block'
            } ref={fileRef} style={{transform: transformElement, zIndex: zIndexElement}}
            onContextMenu={(e) => e.preventDefault()} 
            onMouseDown={(e) => handlerMouseDown(e, file, setDescription)} 
            onMouseEnter={handlerMouseEnter} 
            onMouseLeave={handlerMouseLeave}
        >
            
            { file.type === 'folder' ? <div className="image folder" /> : 
                <div className="image file">
                    { getExtension(file.name) ? <div className="type">{getExtension(file.name)}</div> : '' }
                </div>
            }
            <div className="name">{file.name}</div>
            { description ? (
                <div className="description">
                    <div className="text">Имя: {file.name}</div>
                    <div className="text">Размер: {getFileSize(file.size)}</div>
                    <div className="text">Дата {file.type === 'folder' ? "создания" : "загрузки"}: {new Date(file.date).toLocaleString("ru", {year: 'numeric', month: 'long', day: 'numeric'})}</div>
                </div>
            ) : '' }
            
        </div>
    )
}

export default DirItem