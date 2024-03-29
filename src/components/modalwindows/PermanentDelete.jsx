import React from "react"
import { useDispatch } from "react-redux"

import Button from "../UI/button/Button"
import { URLS } from "../../constants"
import {getFileSize} from "../../utils/getFileSize"

import useFetch from "../../hooks/useFetch"
import useNotification from "../../hooks/useNotification"

import { authUpdateUserData } from "../../store/authReducer"
import { dirRemoveFiles } from "../../store/dirReducer"
import { removePositionFiles } from "../../store/selectionReducer"
import { closeModal } from "../../store/modalWindowReducer"

function PermanentDelete({items}) {
    const [createNotification] = useNotification()
    const fetch = useFetch()
    const dispatch = useDispatch()

    const handleDeleteBtn = async () => {
        dispatch(closeModal())
        try {
            const updatedDir = await fetch({
                url: URLS.PERMANENT_DELETE_FILES, 
                method: 'POST', 
                data: {files: items}
            })
      
            if (updatedDir.count >=0) {
                dispatch(removePositionFiles(items))
                dispatch(dirRemoveFiles(items))

                dispatch(authUpdateUserData({usedSpace: updatedDir.usedSpace}))
                createNotification({
                    title: `Удаление объектов`, 
                    message: `Объекты успешно удалены (${updatedDir.count}). Освобождено ${getFileSize(updatedDir.size)}`
                })
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <p style={{margin: '10px 0'}}>Вы действительно хотите удалить навсегда выбранные файлы? Это действие необратимо.</p>
            <div className="buttons">
                <Button click={() => dispatch(closeModal())} style={{width: '100%'}} >Отмена</Button>
                <Button click={handleDeleteBtn} className={"btn red"} style={{width: '100%'}} >Удалить</Button>
            </div>
        </>
    )
}

export default PermanentDelete