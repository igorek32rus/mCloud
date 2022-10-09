import React, { useContext, useState, useRef, useEffect } from "react"
import { useDispatch } from "react-redux"
import { ModalContext } from "../../Context"
import Button from "../UI/button/Button"
import useFetch from "../../hooks/useFetch"
import { URLS } from "../../constants"
import useNotification from "../../hooks/useNotification"
import { dirUpdateFile } from "../../store/dirReducer"

function Rename({items}) {
    const [newName, setNewName] = useState(items[0].name)
    const inputRef = useRef()
    const fetch = useFetch()

    const {closeModal} = useContext(ModalContext)
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
        closeModal()

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
                // changeDir(items[0].parent)
                dispatch(dirUpdateFile(updatedFile.file))
                // setDir(dir => {
                //     return [...dir.filter(file => file._id !== items[0]._id), updatedFile.file]
                // })
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
                <Button click={closeModal} style={{width: '100%'}} >Отмена</Button>
                <Button click={handleRenameBtn} className="btn blue" style={{width: '100%'}}>Переименовать</Button>
            </div>
        </>
    )
}

export default Rename