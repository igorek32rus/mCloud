import React, { useContext } from "react"
import { ModalContext, NotifyContext } from "../../Context"
import Button from "../UI/button/Button"
import useFetch from "../../hooks/useFetch"
import { URLS } from "../../constants"
import { DirContext } from "../../contexts/DirContext/DirContext"

function Delete({items}) {
    const {closeModal} = useContext(ModalContext)
    const {createNotification} = useContext(NotifyContext)
    const {setDir} = useContext(DirContext)
    const fetch = useFetch()

    const handleDeleteBtn = async () => {
        closeModal()
        try {
            const updatedDir = await fetch({
                url: URLS.DELETE_FILES, 
                method: 'POST', 
                data: {files: items}
            })
      
            if (updatedDir.count) {
                setDir(dir => {
                    return dir.filter(file => !items.find(itemDel => itemDel._id === file._id))
                })
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