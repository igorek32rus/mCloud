import React, { useContext } from "react"
import { ModalContext, NotifyContext } from "../../Context"
import Button from "../UI/button/Button"
import useFetch from "../../hooks/useFetch"
import { URLS } from "../../constants"
import {getFileSize} from "../../utils/getFileSize"

function PermanentDelete({items, changeDir, currentDir}) {
    const {closeModal} = useContext(ModalContext)
    const {createNotification} = useContext(NotifyContext)
    const fetch = useFetch()

    const handleDeleteBtn = async () => {
        closeModal()
        try {
            const updatedDir = await fetch({
                url: URLS.PERMANENT_DELETE_FILES, 
                method: 'POST', 
                data: {files: items}
            })
      
            if (updatedDir.count >=0) {
                changeDir(currentDir._id)
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
                <Button click={closeModal} style={{width: '100%'}} >Отмена</Button>
                <Button click={handleDeleteBtn} className={"btn red"} style={{width: '100%'}} >Удалить</Button>
            </div>
        </>
    )
}

export default PermanentDelete