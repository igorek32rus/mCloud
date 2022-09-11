import React, { useState, useEffect, useContext } from "react"
import { useParams } from "react-router-dom"
import { DirContext } from "../contexts/DirContext/DirContext"
import { SelectionContext } from "../contexts/SelectionContext/SelectionContext"
import { DragnDropFilesContext } from "../contexts/DragnDropFilesContext/DragnDropFilesContext"
import { ContextMenuContext } from "../contexts/ContextMenuContext/ContextMenuContext"

import DirItem from "./DirItem"

import MainContextMenu from "./contextMenus/MainContextMenu"
import TrashContextMenu from "./contextMenus/TrashContextMenu"

import Selection from "./Selection"

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
    const {dir} = useContext(DirContext)
    const {
        selection, setSelection,
        selected, setSelected,
        positionSelection, setPositionSelection,
        positionFiles, setPositionFiles } = useContext(SelectionContext)

    const {
        dragStart, setDragStart, 
        setShiftPosition, 
        positionStart, setPositionStart, 
        dragnDropGoal, setDragnDropGoal } = useContext(DragnDropFilesContext)
    
    const {
        isContextMenuOpened, setIsContextMenuOpened,
        setTypeContextMenu,
        setPositionContextMenu } = useContext(ContextMenuContext)

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

    const handleMouseDown = (e) => {
        setIsContextMenuOpened(false)

        if (e.button === 0) {   // ЛКМ
            setSelection(true)
            setPositionSelection({
                startX: e.pageX,
                startY: e.pageY,
                left: e.pageX,
                top: e.pageY,
                width: 0,
                height: 0
            })
    
            setPositionFiles(prevPos => {
                return prevPos.reduce((prev, cur) => [...prev, {...cur, changed: false}], [])
            })
            return
        }
        
        if (e.button === 2) {   // ПКМ
            setPositionContextMenu({
                left: e.pageX,
                top: e.pageY
            })
            setTypeContextMenu('workspace')
            setIsContextMenuOpened(true)
            setSelected([])
        }
    }

    const handleMouseMove = (e) => {
        if (selection) {
            const posX = e.pageX - positionSelection.startX
            const posY = e.pageY - positionSelection.startY
            let left = positionSelection.left
            let top = positionSelection.top
        
            if (posX < 0) left = e.pageX
            if (posY < 0) top = e.pageY

            setPositionSelection(prev => {
                return {...prev, 
                    width: Math.abs(posX),
                    height: Math.abs(posY),
                    left,
                    top
                }
            })
        
            positionFiles.forEach((item) => {
                const intersect = checkIntersectSelection(item, positionSelection)
          
                if (e.ctrlKey) {
                    if (intersect && !item.changed) {
                        selected.includes(item._id) 
                            ? setSelected(prev => prev.filter(itemSel => itemSel !== item._id)) 
                            : setSelected(prev => [...prev, item._id])
                        const posItem = positionFiles.find(itemPos => itemPos._id === item._id)
                        posItem.changed = true
                        setPositionFiles(prev => [...prev.filter(itemPos => itemPos._id !== item._id), posItem])
                    }
                    return
                }
          
                if (!intersect) {
                    setSelected(prev => prev.filter(itemSel => itemSel !== item._id)) 
                    return
                }

                setSelected(prev => [...prev, item._id])
            })
        }

        if (dragStart) {
            setShiftPosition({
                posX: e.pageX - positionStart.startX,
                posY: e.pageY - positionStart.startY
            })

            // проверка над каким элементом перетаскиваются
            const notSelected = positionFiles.filter(item => !selected.includes(item._id) && dir.find(itemDir => itemDir._id === item._id && itemDir.type === 'folder'))

            let someItersects = false
            for (let i = 0; i < notSelected.length; i++) {
                const item = notSelected[i];
                if (checkIntersectDragElem(item, e.pageX, e.pageY)) {
                    setDragnDropGoal(item._id)
                    someItersects = true
                }
            }

            if (!someItersects) {
                setDragnDropGoal(0)
            }
        }
    }

    const handleMouseUp = (e) => {
        if (selection) {
            const posX = Math.abs(e.pageX - positionSelection.startX)
            const posY = Math.abs(e.pageY - positionSelection.startY)

            if (posX < 2 && posY < 2) setSelected([])

            setSelection(false)
            return
        }

        if (dragStart) {
            if (dragnDropGoal) {
                props.changeParent(dragnDropGoal, selected)
            }

            // убрать цель
            setDragnDropGoal(0)
            setDragStart(false)
            setPositionStart({
                startX: 0,
                startY: 0
            })
            setShiftPosition({
                posX: 0,
                posY: 0
            })
        }
    }

    return (
        <div className="dirContent" 
            onContextMenu={ (e) => e.preventDefault() } 
            onMouseDown={ (e) => handleMouseDown(e) } 
            onMouseMove={ (e) => handleMouseMove(e) } 
            onMouseUp={ (e) => handleMouseUp(e) } 
            onDragStart={ () => false } 
        >

            { selection && <Selection /> }

            { dir.length === 0 ? 
                <div className="message">{nullMessage(category)}</div>
            : '' }

            { dir.sort((a, b) => a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1)
                .map((item) => 
                item.type === 'folder' 
                && <DirItem 
                    file={item} 
                    key={item._id} 
                />) 
            }

            { dir.sort((a, b) => a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1)
                .map((item) => 
                item.type === 'file' 
                && <DirItem 
                    file={item} 
                    key={item._id} 
                />) 
            }

            { isContextMenuOpened && ContextMenu }
            
        </div>
    )
}

export default DirContent