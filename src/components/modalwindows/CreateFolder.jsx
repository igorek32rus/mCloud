import React, { useContext, useState, useRef, useEffect } from "react";
import { ModalContext, NotifyContext } from "../../Context";
import Button from "../UI/button/Button";

function CreateFolder(props) {
    const [nameFolder, setNameFolder] = useState('')
    const {setModal} = useContext(ModalContext)
    const {createNotification} = useContext(NotifyContext)

    const inputRef = useRef()

    useEffect(() => {
        inputRef.current.focus()
    }, [])

    const submit = () => {
        if (nameFolder.length > 127) {
            createNotification({
                title: `Создание папки`, 
                message: `Обшибка! Слишком длинное имя папки`
            })
            return
        }

        props.createFolder(nameFolder)
        setModal(false)
    }

    return (
        <div className="modal_content" style={{display: 'flex', flexDirection: 'column'}}>
            <h1>Имя новой папки</h1>
            <input type="text" ref={inputRef} placeholder="Новая папка" value={nameFolder} onChange={(e) => setNameFolder(e.target.value)} onKeyDown={(e) => e.key === 'Enter' ? submit() : false} />
            <Button click={submit} style={{margin: 0}}>Создать папку</Button>
        </div>
    )
}

export default CreateFolder