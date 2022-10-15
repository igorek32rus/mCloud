import React, { useState, useRef } from "react"
import { useSelector, useDispatch } from "react-redux"
import { getFileSize } from '../../utils/getFileSize'
import { getExtension } from '../../utils/getExtension'

import { useHandlerMouseDown } from "../../hooks/eventHandlers/DirItem/useHandlerMouseDown"

import { addPositionFile } from "../../store/selectionReducer"

import './DirItem.scss'

function DirItem({ file }) {
    const [description, setDescription] = useState(false)
    const { selected } = useSelector(state => state.selection)
    const { shiftPosition, dragStart, dragnDropGoal } = useSelector(state => state.dragAndDrop)
    const { isContextMenuOpened } = useSelector(state => state.contextMenu)
    const { windowSize } = useSelector(state => state.windowSize)
    
    const dir = useSelector(state => state.dir.dir)
    const dispatch = useDispatch()

    const fileRef = useRef(null)

    const handlerMouseDown = useHandlerMouseDown()

    React.useEffect(() => {
        dispatch(addPositionFile({
            _id: file._id,
            left: fileRef.current.offsetLeft,
            top: fileRef.current.offsetTop,
            width: fileRef.current.offsetWidth,
            height: fileRef.current.offsetHeight,
            changed: false
        }))
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
                ? 'dir-item selected' 
                : 'dir-item'
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