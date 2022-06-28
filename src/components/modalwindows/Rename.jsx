import React, { useContext, useState, useRef, useEffect } from "react";
import { ModalContext, NotifyContext } from "../../Context";
import Button from "../UI/button/Button";

function Rename(props) {
    const [newName, setNewName] = useState(props.items[0].name)
    const inputRef = useRef()

    const {setModal} = useContext(ModalContext)
    const {createNotification} = useContext(NotifyContext)

    useEffect(() => {
        const input = inputRef.current
        input.focus()
        input.selectionStart = 0
        input.selectionEnd = input.value.length

        if (props.items[0].type === 'file') 
            input.selectionEnd = input.value.lastIndexOf('.')
    }, [])

    const handleRenameBtn = () => {
        if (newName.length > 127) {
            createNotification({
                title: `Переименование ${ props.items[0].type === 'folder' ? 'папки' : 'файла'}`, 
                message: `Обшибка! Слишком длинное имя ${ props.items[0].type === 'folder' ? 'папки' : 'файла'}`
            })
            return
        }

        props.renameItem(props.items[0]._id, newName)
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