import React, { useState, useEffect, useContext } from "react"

import DirItem from "./DirItem"
import ContextMenu from "./ContextMenu"

import '../styles/DirContent.css'

import {checkIntersectSelection, checkIntersectDragElem} from '../utils/intersects'

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
    const [contextMenu, setContextMenu] = useState(false)
    const [contextMenuParams, setContextMenuParams] = useState({items: [], left: 0, top: 0, type: 'workspace'})


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
            id: cur._id,
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
        event.preventDefault()
    }

    const handleMouseDown = (e) => {
        setContextMenu(false)

        if (e.button === 0) {   // ЛКМ
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
            return
        }
        
        if (e.button === 2) {   // ПКМ
            openContextMenu(-1, e.pageX, e.pageY, true)
            resetSelectedItems()
        }
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

            const itemGoal = dirItemsPos.find(item => item.goal)
            const idFiles = selectedItemsPos.reduce((prev, cur) => {
                return [...prev, cur.id]
            }, [])

            if (itemGoal) {
                props.changeParent(itemGoal.id, idFiles)
            }

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

    const updatePos = (itemPos) => {
        const posItems = dirItemsPos.filter(item => item.id !== itemPos.id)
        posItems.push(itemPos)
        setDirItemsPos(posItems)
    }

    useEffect(() => {
        const resetPos = props.dir.reduce((prev, cur) => {
            return [...prev, {
                id: cur._id,
                left: 0,
                top: 0,
                width: 0,
                height: 0,
                changed: false,
                selected: false,
                goal: false,
                transform: ''
            }]
        }, [])

        setDirItemsPos(resetPos)
    }, [props.dir])
    
    const openContextMenu = (id, mouseX, mouseY, state = false) => {
        if (state) {
            const itemsContext = dirItemsPos.reduce((prev, cur) => {
                if (cur.selected || cur.id === id) {
                    const item = props.dir.find(itemDir => itemDir._id === cur.id)
                    if (item) return [...prev, item]
                }
                return [...prev]
            }, [])
            setContextMenuParams({items: itemsContext, left: mouseX, top: mouseY, type: id === -1 ? 'workspace' : 'item' })
            setContextMenu(true)
            return
        }
        setContextMenu(false)
    }

    return (
        <div className="dirContent" 
            onContextMenu={(e) => handleContextMenu(e)} 
            onMouseDown={(e) => handleMouseDown(e)} 
            onMouseMove={(e) => handleMouseMove(e)} 
            onMouseUp={(e) => handleMouseUp(e)} 
            onDragStart={() => handleDragStart() } 
        >
            {console.log('dirContent updated')}
            { selection.dragstart ? 
                <div className="selection" 
                    style={{
                        width: selection.width, 
                        height: selection.height, 
                        top: selection.top + 'px', 
                        left: selection.left + 'px'
                    }}>
                </div> 
                : '' }

            { props.dir.length === 0 ? 
                <div className="message">{nullMessage(props.category)}</div>
            : '' }

            { props.dir
                .sort((a, b) => a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1)
                .map((item) => 
                // item.parent === props.currentDir.link && 
                item.type === 'folder' 
                && <DirItem 
                    item={item} 
                    key={item._id} 
                    posItem={dirItemsPos.find(itemPos => itemPos.id === item._id)} 
                    setElemDrag={setElemDrag} 
                    resetSelectedItems={resetSelectedItems} 
                    updatePos={updatePos} 
                    changeDir={props.changeDir}
                    openContextMenu={openContextMenu}
                    contextMenu={contextMenu}
                />) 
            }

            { props.dir
                .sort((a, b) => a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1)
                .map((item) => 
                // item.parent === props.currentDir.link && 
                item.type === 'file' 
                && <DirItem 
                    item={item} 
                    key={item._id} 
                    posItem={dirItemsPos.find(itemPos => itemPos.id === item._id)} 
                    setElemDrag={setElemDrag} 
                    resetSelectedItems={resetSelectedItems} 
                    updatePos={updatePos}
                    openContextMenu={openContextMenu}
                    contextMenu={contextMenu}
                />) 
            }

            { contextMenu && <ContextMenu 
                style={{left: contextMenuParams.left + 'px', top: contextMenuParams.top + 'px'}}
                items={contextMenuParams.items}
                openContextMenu={openContextMenu}
                contextType={contextMenuParams.type}
                currentDir={props.currentDir}
                changeDir={props.changeDir}
                category={props.category}
            /> }
            
        </div>
    )
}

export default DirContent