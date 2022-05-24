import React, { useState } from "react";

import DirItem from "./DirItem";

import '../styles/DirContent.css'

function DirContent(props) {
    const [contextMenu, setContextMenu] = useState(0)
    const [selection, setSelection] = useState({
        dragstart: false,
        startX: 0,
        startY: 0,
        left: 0,
        top: 0,
        width: 0,
        height: 0
    })

    const handleContextMenu = (event) => {
        setContextMenu(0)
        event.preventDefault()
    }

    const contextCallback = (id) => {
        setContextMenu(id)
    }

    const handleClick = () => {
        setContextMenu(0)
    }

    const handleMouseDown = (e) => {
        setSelection({...selection,
            dragstart: true, 
            startX: e.pageX,
            startY: e.pageY,
            left: e.pageX,
            top: e.pageY,
            width: 0,
            height: 0
        })
    }

    const handleMouseMove = (e) => {
        if (selection.dragstart) {
            const posX = e.pageX - selection.startX
            const posY = e.pageY - selection.startY
            let left = selection.left
            let top = selection.top
        
            if (posX < 0) left = e.pageX
            if (posY < 0) top = e.pageY
        
            setSelection({...selection,
                width: Math.abs(posX),
                height: Math.abs(posY),
                left,
                top
            })
        
        }
    }

    const handleMouseUp = (e) => {
        if (selection.dragstart) {
            setSelection({...selection,
                dragstart: false
            })
            return
        }
    }

    const handleDragStart = () => {
        return false
    }

    return (
        <div className="dirContent" onContextMenu={(e) => handleContextMenu(e)} onClick={() => handleClick()} onMouseDown={(e) => handleMouseDown(e)} onMouseMove={(e) => handleMouseMove(e)} onMouseUp={(e) => handleMouseUp(e)} onDragStart={() => handleDragStart() } >
            { selection.dragstart ? <div className="selection" style={{width: selection.width, height: selection.height, top: selection.top + 'px', left: selection.left + 'px'}}></div> : '' }
            { props.dir.map((item) => item.type === 'folder' && <DirItem item={item} key={item.id} context={contextMenu} contextCallback={contextCallback} />) }
            { props.dir.map((item) => item.type === 'file' && <DirItem item={item} key={item.id} context={contextMenu} contextCallback={contextCallback} />) }
        </div>
    )
}

export default DirContent