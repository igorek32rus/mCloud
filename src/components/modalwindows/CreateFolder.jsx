import React, { useContext, useState, useRef, useEffect } from "react"
import { useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import Button from "../UI/button/Button"

import { ModalContext } from "../../Context"
import useFetch from "../../hooks/useFetch"
import { URLS } from "../../constants"

import useNotification from "../../hooks/useNotification"
import { dirAddFile } from "../../store/dirReducer"

function CreateFolder() {
    const [nameFolder, setNameFolder] = useState('')
    const {closeModal} = useContext(ModalContext)
    const [createNotification] = useNotification()

    const {parent} = useParams()

    const fetch = useFetch()

    const inputRef = useRef()
    const dispatch = useDispatch()

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
            const newFolder = await fetch({
                url: URLS.CREATE_FOLDER, 
                method: 'POST', 
                data: {name: nameFolder, parent}
            })
        
            if (newFolder.file) {
                dispatch(dirAddFile(newFolder.file))
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