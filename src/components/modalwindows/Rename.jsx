import React, { useContext, useState, useRef, useEffect } from "react"
import { useDispatch } from "react-redux"

import Button from "../UI/button/Button"
import { URLS } from "../../constants"

import useFetch from "../../hooks/useFetch"
import useNotification from "../../hooks/useNotification"

import { dirUpdateFile } from "../../store/dirReducer"
import { closeModal } from "../../store/modalWindowReducer"

function Rename({items}) {
    const [newName, setNewName] = useState(items[0].name)
    const inputRef = useRef()
    const fetch = useFetch()

    const [createNotification] = useNotification()
    const dispatch = useDispatch()

    useEffect(() => {
        const input = inputRef.current
        input.focus()
        input.selectionStart = 0
        input.selectionEnd = input.value.length

        if (items[0].type === 'file') 
            input.selectionEnd = input.value.lastIndexOf('.')
    }, [])

    const handleRenameBtn = async () => {
        setNewName(newName.trim())
        dispatch(closeModal())

        if (!newName) {
            createNotification({
              title: `Ошибка переименования`, 
              message: `Имя не может быть пустым`
            })
            return
        }

        if (newName.length > 127) {
            createNotification({
                title: `Переименование ${ items[0].type === 'folder' ? 'папки' : 'файла'}`, 
                message: `Обшибка! Слишком длинное имя ${ items[0].type === 'folder' ? 'папки' : 'файла'}`
            })
            return
        }

        try {
            const updatedFile = await fetch({
                url: URLS.RENAME_FILE, 
                method: 'POST', 
                data: {name: newName, id: items[0]._id}
            })
            
            if (updatedFile.file) {
                dispatch(dirUpdateFile(updatedFile.file))
                createNotification({
                    title: `Переименование ${ updatedFile.file.type === 'folder' ? 'папки' : 'файла'}`, 
                    message: `Новое имя ${ updatedFile.file.type === 'folder' ? 'папки' : 'файла'} - ${updatedFile.file.name}`
                })
            }
              
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <input type="text" 
                ref={inputRef} 
                placeholder="Новое имя" 
                value={newName} 
                onChange={(e) => setNewName(e.target.value)} 
                onKeyDown={(e) => e.key === 'Enter' ? handleRenameBtn() : false} 
            />
            <div className="buttons">
                <Button click={() => dispatch(closeModal())} style={{width: '100%'}} >Отмена</Button>
                <Button click={handleRenameBtn} className="btn blue" style={{width: '100%'}}>Переименовать</Button>
            </div>
        </>
    )
}

export default Rename