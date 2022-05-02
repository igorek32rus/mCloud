import React, { useState } from "react";

import DirItem from "./DirItem";

import '../styles/DirContent.css'

function DirContent(props) {
    const [contextMenu, setContextMenu] = useState(0)

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

    return (
        <div className="dirContent" onContextMenu={(e) => handleContextMenu(e)} onClick={() => handleClick()}>
            { props.dir.map((item) => item.type === 'folder' && <DirItem item={item} key={item.id} context={contextMenu} contextCallback={contextCallback} />) }
            { props.dir.map((item) => item.type === 'file' && <DirItem item={item} key={item.id} context={contextMenu} contextCallback={contextCallback} />) }
        </div>
    )
}

export default DirContent