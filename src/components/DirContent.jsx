import React, { useState, useEffect } from "react";

import DirItem from "./DirItem";

import '../styles/DirContent.css'

import {checkIntersectSelection, checkIntersectDragElem} from '../utils/intersects'

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

    const [elemDrag, setElemDrag] = useState({
        dragstart: false,
        id: 0,
        startX: 0,
        startY: 0
    })

    const [dirItemsPos, setDirItemsPos] = useState(props.dir.reduce((prev, cur) => {
        return [...prev, {
            id: cur.id,
            left: 0,
            top: 0,
            width: 0,
            height: 0,
            changed: false,
            selected: false,
            goal: false,
            transform: ''
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

            const cloneDirItemsPos = [...dirItemsPos]
        
            cloneDirItemsPos.forEach((item) => {
                const intersect = checkIntersectSelection(item, selection)
          
                if (e.ctrlKey) {
                    if (intersect && !item.changed) {
                        item.selected = !item.selected
                        item.changed = true
                    }
                    return
                }
          
                if (!intersect) {
                    item.selected = false
                    return
                }

                item.selected = true
            })
            
            setDirItemsPos(cloneDirItemsPos)
        }

        if (elemDrag.dragstart) {
            const selectedItemsPos = dirItemsPos.filter(item => item.selected)
            const notSelected = dirItemsPos.filter(item => !item.selected)

            selectedItemsPos.forEach(item => {
                let coordX = (e.pageX - elemDrag.startX)
                let coordY = (e.pageY - elemDrag.startY)
                item.transform = 'translate(' + coordX + 'px, ' + coordY + 'px)'
            })

            // проверка над каким элементом перетаскиваются
            notSelected.forEach(item => {
                const intersect = checkIntersectDragElem(item, e.pageX, e.pageY)

                if (intersect) {
                    item.goal = true
                    return
                }
                item.goal = false
            })

            setDirItemsPos([...notSelected, ...selectedItemsPos])
        }
    }

    const resetSelectedItems = () => {
        const resetSelected = dirItemsPos.reduce((prev, cur) => {
            cur.selected = false
            return [...prev, cur]
        }, [])
        setDirItemsPos(resetSelected)
    }

    const handleMouseUp = (e) => {
        if (selection.dragstart) {
            const posX = Math.abs(e.pageX - selection.startX)
            const posY = Math.abs(e.pageY - selection.startY)

            if (posX < 2 && posY < 2) resetSelectedItems()

            setSelection({...selection,
                dragstart: false
            })
            return
        }

        if (elemDrag.dragstart) {
            const selectedItemsPos = dirItemsPos.filter(item => item.selected)
            const notSelected = dirItemsPos.filter(item => !item.selected)

            selectedItemsPos.forEach(item => {
                item.transform = 'translate(' + 0 + 'px, ' + 0 + 'px)'
            })

            // убрать цель
            notSelected.forEach(item => item.goal = false)

            setDirItemsPos([...notSelected, ...selectedItemsPos])
            setElemDrag({...elemDrag, dragstart: false})
            return
        }
    }

    const handleDragStart = () => {
        return false
    }

    let storePos = []
    const collectPos = (itemPos) => {
        storePos.push(itemPos)
    }

    const updatePos = (itemPos) => {
        const posItems = dirItemsPos.filter(item => item.id !== itemPos.id)
        posItems.push(itemPos)
        setDirItemsPos(posItems)
    }

    useEffect(() => {
        setDirItemsPos(storePos)
    }, [])

    return (
        <div className="dirContent" onContextMenu={(e) => handleContextMenu(e)} onClick={() => handleClick()} onMouseDown={(e) => handleMouseDown(e)} onMouseMove={(e) => handleMouseMove(e)} onMouseUp={(e) => handleMouseUp(e)} onDragStart={() => handleDragStart() } >
            { selection.dragstart ? <div className="selection" style={{width: selection.width, height: selection.height, top: selection.top + 'px', left: selection.left + 'px'}}></div> : '' }
            { props.dir.map((item) => item.type === 'folder' && <DirItem item={item} key={item.id} context={contextMenu} contextCallback={contextCallback} posItem={dirItemsPos.find(itemPos => itemPos.id === item.id)} collectPos={collectPos} setElemDrag={setElemDrag} resetSelectedItems={resetSelectedItems} updatePos={updatePos} />) }
            { props.dir.map((item) => item.type === 'file' && <DirItem item={item}  key={item.id} context={contextMenu} contextCallback={contextCallback} posItem={dirItemsPos.find(itemPos => itemPos.id === item.id)} collectPos={collectPos} setElemDrag={setElemDrag} resetSelectedItems={resetSelectedItems} updatePos={updatePos} />) }
        
        </div>
    )
}

export default DirContent