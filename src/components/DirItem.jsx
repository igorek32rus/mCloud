import React, { useState, useRef, useEffect } from "react";

// import ContextMenu from "./ContextMenu";

// import Checkbox from "./UI/checkbox/Checkbox";

function DirItem(props) {
    const blockEl = useRef(null);

    const updatePos = props.updatePos

    const posItem = props.posItem ? props.posItem
        : {
            id: props.item.id,
            selected: false,
            goal: false,
            transform: ''
        }

    const getExtension = (fileName) => {
        const ext = fileName.split('.').pop()
        if (ext.length > 4 || ext.length === 0) {
            return ''
        }
        return ext
    }

    const handleContextMenu = (e) => {
        e.preventDefault()
    }

    // при изменении положения элемента (пример - изменение размеров экрана) - обновление позиционирования
    useEffect(() => {
        const elem = blockEl.current

        if (!posItem.selected && (elem.offsetLeft !== posItem.left || elem.offsetTop !== posItem.top)) {
            const params = {...posItem,
                left: elem.offsetLeft,
                top: elem.offsetTop,
                width: elem.offsetWidth,
                height: elem.offsetHeight
            }
            updatePos(params)
        }   
    })

    const handleMouseDown = (e) => {
        e.stopPropagation()
        props.openContextMenu(-1, 0, 0)   // закрыть контекстное меню

        if (e.button === 0) {       // ЛКМ
            if (e.detail === 1) {    // 1 клик
                const dragParams = {
                    startX: e.pageX,
                    startY: e.pageY,
                    id: props.item.id,
                    dragstart: false
                }
        
                const tempElem = {...posItem}
                const elemSelected = tempElem.selected    // начальное состояние
        
                if (e.ctrlKey) {
                    tempElem.selected = !tempElem.selected
                }
        
                if (!e.ctrlKey && !elemSelected) {
                    props.resetSelectedItems()
                    tempElem.selected = true
                }
        
                if (!e.ctrlKey) {
                    dragParams.dragstart = true
                }
        
                props.setElemDrag(dragParams)
                props.updatePos(tempElem)
    
                return
            }
    
            if (e.detail > 1) {     // 2 клика
                if (props.item.type === 'folder') {
                    props.updateDir(props.item.link)
                }
                return
            }
        }
        
        if (e.button === 2) {    // ПКМ
            const tempElem = {...posItem}

            if (!tempElem.selected) {
                props.resetSelectedItems()
                tempElem.selected = true
                props.updatePos(tempElem)
            }

            props.openContextMenu(props.item.id, e.pageX, e.pageY, true)
        }
    }

    return (
        <div className={
                posItem.selected 
                || (props.item.type === 'folder' && posItem.goal) ? 
                'block selected' 
                : 'block'
            } ref={blockEl} style={{transform: posItem.transform}} onContextMenu={(e) => handleContextMenu(e)} onMouseDown={handleMouseDown} >
            {/* <Checkbox checked={checked} /> */}
            
            { props.item.type === 'folder' ? <div className="image folder" /> : 
                <div className="image file">
                    { getExtension(props.item.name) ? <div className="type">{getExtension(props.item.name)}</div> : '' }
                </div>
            }
            <div className="name">{props.item.name}</div>
            <div className="date">{props.item.date.toLocaleString("ru", {year: 'numeric', month: 'long', day: 'numeric'})}</div>
        </div>
    )
}

export default DirItem