import React, { useState } from "react";

import DirItem from "./DirItem";

import '../styles/DirContent.css'

import {checkIntersectSelection} from '../utils/intersects'

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

    const [dirItemsPos, setDirItemsPos] = useState(props.dir.reduce((prev, cur) => {
        return [...prev, {
            id: cur.id,
            left: 0,
            top: 0,
            width: 0,
            height: 0,
            changed: false
        }]
    }, []))

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

        const changesReset = dirItemsPos.reduce((prev, cur) => {
            cur.changed = false
            return [...prev, cur]
        }, [])
        setDirItemsPos(changesReset)
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

            let changed = []
        
            dirItemsPos.forEach((item) => {
                const intersect = checkIntersectSelection(item, selection)
          
                if (e.ctrlKey) {
                    if (intersect && !item.changed) {
                        const changeItem = props.dir.find(itemDir => itemDir.id === item.id)
                        changeItem.selected = !changeItem.selected
                        const dir = props.dir.filter(itemDir => itemDir.id !== item.id)
                        props.setDir([...dir, changeItem])

                        changed.push(item.id)
                    }
                    return
                }
          
                if (!intersect) {
                    const changeItem = props.dir.find(itemDir => itemDir.id === item.id)
                    changeItem.selected = false
                    const dir = props.dir.filter(itemDir => itemDir.id !== item.id)
                    props.setDir([...dir, changeItem])

                    return
                }
          
                const changeItem = props.dir.find(itemDir => itemDir.id === item.id)
                changeItem.selected = true
                const dir = props.dir.filter(itemDir => itemDir.id !== item.id)
                props.setDir([...dir, changeItem])
            })
            
            const changedItems = dirItemsPos.reduce((prev, cur) => {
                cur.changed = cur.id in changed
                return [...prev, cur]
            }, [])
            setDirItemsPos(changedItems)
        }
    }

    const handleMouseUp = (e) => {
        if (selection.dragstart) {
            const posX = Math.abs(e.pageX - selection.startX)
            const posY = Math.abs(e.pageY - selection.startY)

            if (posX < 2 && posY < 2) {
                const resetSelectedItems = props.dir.reduce((prev, cur) => {
                    cur.selected = false
                    return [...prev, cur]
                }, [])

                props.setDir(resetSelectedItems)
            }

            setSelection({...selection,
                dragstart: false
            })
            return
        }
    }

    const handleDragStart = () => {
        return false
    }

    const setPosItem = ({id, left, top, width, height}) => {
        const curItem = dirItemsPos.find(item => item.id === id)
        curItem.left = left
        curItem.top = top
        curItem.width = width
        curItem.height = height

        const posItems = dirItemsPos.filter(item => item.id !== id)
        setDirItemsPos([...posItems, curItem])
    }

    return (
        <div className="dirContent" onContextMenu={(e) => handleContextMenu(e)} onClick={() => handleClick()} onMouseDown={(e) => handleMouseDown(e)} onMouseMove={(e) => handleMouseMove(e)} onMouseUp={(e) => handleMouseUp(e)} onDragStart={() => handleDragStart() } >
            { selection.dragstart ? <div className="selection" style={{width: selection.width, height: selection.height, top: selection.top + 'px', left: selection.left + 'px'}}></div> : '' }
            { props.dir.map((item) => item.type === 'folder' && <DirItem item={item} key={item.id} context={contextMenu} contextCallback={contextCallback} setPosItem={setPosItem} />) }
            { props.dir.map((item) => item.type === 'file' && <DirItem item={item} key={item.id} context={contextMenu} contextCallback={contextCallback} setPosItem={setPosItem} />) }
        </div>
    )
}

export default DirContent