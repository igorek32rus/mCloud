import React, { useState, useRef } from "react"
import { useHistory, useParams } from "react-router-dom"
import { getFileSize } from '../utils/getFileSize'
import { getExtension } from '../utils/getExtension'

import { SelectionContext } from "../contexts/SelectionContext/SelectionContext"
import { DragnDropFilesContext } from "../contexts/DragnDropFilesContext/DragnDropFilesContext"
import { ContextMenuContext } from "../contexts/ContextMenuContext/ContextMenuContext"

function DirItem({ file }) {
    const [description, setDescription] = useState(false)
    const { setPositionFiles, selected, setSelected } = React.useContext(SelectionContext)
    const { shiftPosition, dragStart, setDragStart, dragFileId, setDragFileId, setPositionStart, dragnDropGoal } = React.useContext(DragnDropFilesContext)
    const { isContextMenuOpened, setIsContextMenuOpened,
            setTypeContextMenu,
            setPositionContextMenu } = React.useContext(ContextMenuContext)

    const history = useHistory()
    const {category} = useParams()

    const fileRef = useRef(null);

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
    }, [window.innerHeight, window.innerWidth])

    const handleMouseDown = (e) => {
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
                 ? 
                'block selected' 
                : 'block'
            } ref={fileRef} style={{transform: transformElement, zIndex: zIndexElement}}
            onContextMenu={(e) => e.preventDefault()} 
            onMouseDown={handleMouseDown} 
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