import React, { useContext, useState, useRef, useEffect } from "react";
import { ModalContext } from "../../Context";
import Button from "../UI/button/Button";

function Rename(props) {
    const [newName, setNewName] = useState(props.items[0].name)
    const inputRef = useRef()

    const {setModal} = useContext(ModalContext)

    useEffect(() => {
        const input = inputRef.current
        input.focus()
        input.selectionStart = 0
        input.selectionEnd = input.value.lastIndexOf('.')
    }, [])

    const handleRenameBtn = () => {
        props.renameItem(props.items[0].id, newName)
        setModal(false)
    }

    return (
        <div className="modal_content" style={{display: 'flex', flexDirection: 'column'}}>
            <h1>Переименовать</h1>
            <input type="text" 
                ref={inputRef} 
                placeholder="Новое имя" 
                value={newName} 
                onChange={(e) => setNewName(e.target.value)} 
                onKeyDown={(e) => e.key === 'Enter' ? handleRenameBtn() : false} 
            />
            <Button click={handleRenameBtn} style={{margin: 0}}>Переименовать</Button>
        </div>
    )
}

export default Rename