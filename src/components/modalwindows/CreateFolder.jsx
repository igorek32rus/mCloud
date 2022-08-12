import React, { useContext, useState, useRef, useEffect } from "react";
import { NotifyContext } from "../../Context";
import Button from "../UI/button/Button";

import { ModalContext } from "../../Context";
import fetchReq from "../../utils/fetchReq";
import { URLS } from "../../constants";

function CreateFolder({currentDir, changeDir}) {
    const [nameFolder, setNameFolder] = useState('')
    const {closeModal} = useContext(ModalContext)
    const {createNotification} = useContext(NotifyContext)

    const inputRef = useRef()

    useEffect(() => {
        inputRef.current.focus()
    }, [])

    const handleCreateFolder = async () => {
        setNameFolder(nameFolder.trim())
        closeModal()

        if (!nameFolder) {
            createNotification({
              title: `Ошибка создания папки`, 
              message: `Имя папки не может быть пустым`
            })
            return
        }

        if (nameFolder.length > 127) {
            createNotification({
                title: `Создание папки`, 
                message: `Обшибка! Слишком длинное имя папки`
            })
            return
        }

        try {
            const newFolder = await fetchReq({
                url: URLS.CREATE_FOLDER, 
                method: 'POST', 
                data: {name: nameFolder, parent: currentDir._id}
            })
        
            if (newFolder.file) {
                changeDir(currentDir._id)
                createNotification({title: 'Создание папки', message: `Папка (${nameFolder}) успешно создана`})
                return
            }
        
            createNotification({
                title: `Ошибка создания папки`, 
                message: `${newFolder.message}`
            })
        } catch (error) {
            console.log(error)
        }
        
    }

    return (
        <>
            <input type="text" ref={inputRef} placeholder="Новая папка" value={nameFolder} onChange={(e) => setNameFolder(e.target.value)} onKeyDown={(e) => e.key === 'Enter' ? handleCreateFolder() : false} />
            <div className="buttons">
                <Button click={closeModal} style={{width: '100%'}} >Отмена</Button>
                <Button click={handleCreateFolder} className={"btn blue"} style={{width: '100%'}} >Создать папку</Button>
            </div>
        </> 
    )
}

export default CreateFolder