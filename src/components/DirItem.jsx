import React, { useState } from "react";

import ContextMenu from "./ContextMenu";

import Checkbox from "./UI/checkbox/Checkbox";

function DirItem(props) {
    const [checked, setChecked] = useState(false)

    const getExtension = (fileName) => {
        const ext = fileName.split('.').pop()
        if (ext.length > 4 || ext.length === 0) {
            return ''
        }
        return ext
    }

    const handleContextMenu = (event) => {
        event.preventDefault()
        props.contextCallback(props.item.id)
        event.stopPropagation()
    }

    const handleClick = () => {
        setChecked(!checked)
        props.contextCallback(0)
    }

    return (
        <div className="block" onContextMenu={(e) => handleContextMenu(e)} onClick={() => handleClick()}>
            {/* <Checkbox checked={checked} /> */}
            
            { props.item.type === 'folder' ? <div className="image folder" /> : 
                <div className="image file">
                    { getExtension(props.item.name) ? <div className="type">{getExtension(props.item.name)}</div> : '' }
                </div>
            }
            <div className="name">{props.item.name}</div>
            <div className="date">{props.item.date.toLocaleString("ru", {year: 'numeric', month: 'long', day: 'numeric'})}</div>
            { props.context === props.item.id && <ContextMenu contextMenu={props.contextCallback} item={props.item} /> }
        </div>
    )
}

export default DirItem