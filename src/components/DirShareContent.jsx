import React, { useContext, useEffect } from "react"
import { useParams } from "react-router-dom"
import { DirContext } from "../contexts/DirContext/DirContext"
import { SelectionContext } from "../contexts/SelectionContext/SelectionContext"
import { ContextMenuContext } from "../contexts/ContextMenuContext/ContextMenuContext"

import DirItem from "./DirItem"
import Selection from "./Selection"

import '../styles/DirContent.css'

function DirShareContent() {
    const { dir } = useContext(DirContext)
    const { selection, setSelected } = useContext(SelectionContext)
    const { isContextMenuOpened } = useContext(ContextMenuContext)


    useEffect(() => {
        setSelected([])
    }, [setSelected])

    return (
        <div className="dirContent" 
            onContextMenu={ (e) => e.preventDefault() } 
            onDragStart={ () => false } 
        >

            { selection && <Selection /> }

            { 
                [...dir.filter(item => item.type === 'folder')
                    .sort((a, b) => a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1),
                ...dir.filter(item => item.type === 'file')
                    .sort((a, b) => a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1)]
                .map(item => <DirItem file={item} key={item._id} />) 
            }

            {/* { isContextMenuOpened && categoryParams.contextMenu } */}
        </div>
    )
}

export default DirShareContent