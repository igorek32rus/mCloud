import React, { useContext } from "react"
import { useDispatch } from "react-redux"

import { ModalContext } from "../../Context"

import Button from "../UI/button/Button"
import { URLS } from "../../constants"

import useFetch from "../../hooks/useFetch"
import useNotification from "../../hooks/useNotification"

import { dirRemoveFiles } from "../../store/dirReducer"
import { removePositionFiles } from "../../store/selectionReducer"

function Delete({items}) {
    const {closeModal} = useContext(ModalContext)
    const [createNotification] = useNotification()
    const fetch = useFetch()
    const dispatch = useDispatch()

    const handleDeleteBtn = async () => {
        closeModal()
        try {
            const updatedDir = await fetch({
                url: URLS.DELETE_FILES, 
                method: 'POST', 
                data: {files: items}
            })
      
            if (updatedDir.count) {
                dispatch(removePositionFiles(items))
                dispatch(dirRemoveFiles(items))
                createNotification({
                    title: `Удаление объектов`, 
                    message: `Объекты помещены в корзину`
                })
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <p style={{margin: '10px 0'}}>Вы действительно хотите удалить выбранные файлы?</p>
            <div className="buttons">
                <Button click={closeModal} style={{width: '100%'}} >Отмена</Button>
                <Button click={handleDeleteBtn} className={"btn red"} style={{width: '100%'}} >Удалить</Button>
            </div>
        </>
    )
}

export default Delete