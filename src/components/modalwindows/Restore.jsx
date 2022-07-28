import React, { useContext, useEffect } from "react"
import { ModalContext, NotifyContext } from "../../Context"
import Button from "../UI/button/Button"
import fetchReq from "../../utils/fetchReq"

function Delete({items, changeDir, currentDir}) {
    const {closeModal} = useContext(ModalContext)
    const {createNotification} = useContext(NotifyContext)

    const handleRestoreBtn = async () => {
        closeModal()
        try {
            const updatedDir = await fetchReq({
                url: 'http://localhost:5000/api/files/restore', 
                method: 'POST', 
                data: {files: items}
            })
      
            if (updatedDir.files) {
                changeDir(currentDir._id)
                createNotification({
                    title: `Восстановление файлов`, 
                    message: `Файлы успешно восстановлены`
                })
            }
        } catch (error) {
            console.log(error);
        }
    }

    const getTreeFolders = async () => {
        try {
            const treeFolders = await fetchReq({
                url: 'http://localhost:5000/api/files/tree'
            })
      
            if (treeFolders.tree) {
                
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getTreeFolders()
    }, [])

    return (
        <>
            <p style={{margin: '10px 0'}}>Выберите папку назначения для восстановления</p>
            <div className="buttons">
                <Button click={closeModal} style={{width: '100%'}} >Отмена</Button>
                <Button click={handleRestoreBtn} className={"btn blue"} style={{width: '100%'}} >Восстановить</Button>
            </div>
        </>
    )
}

export default Delete