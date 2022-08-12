import React, { useContext, useEffect, useState } from "react"
import { ModalContext, NotifyContext } from "../../../Context"
import Button from "../../UI/button/Button"
import fetchReq from "../../../utils/fetchReq"
import { URLS } from "../../../constants"
import Tree from "./Tree"

function Restore({items, changeDir, currentDir}) {
    const {closeModal} = useContext(ModalContext)
    const {createNotification} = useContext(NotifyContext)

    const [tree, setTree] = useState(null)
    const [targetFolder, setTargetFolder] = useState(null)

    const handleRestoreBtn = async () => {
        closeModal()
        try {
            const restoreDir = await fetchReq({
                url: URLS.RESTORE_FILE, 
                method: 'POST', 
                data: {files: items, target: targetFolder}
            })
      
            if (restoreDir.status === 'ok') {
                changeDir(currentDir._id)
                createNotification({
                    title: `Восстановление файлов`, 
                    message: `Файлы успешно восстановлены`
                })
                return
            }

            createNotification({
                title: `Восстановление файлов`, 
                message: restoreDir.message
            })
        } catch (error) {
            console.log(error);
        }
    }

    const getTreeFolders = async () => {
        try {
            const treeFolders = await fetchReq({
                url: URLS.GET_TREE_FOLDERS
            })
      
            if (treeFolders.tree) {
                setTree(treeFolders.tree)
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
            {tree && <Tree tree={tree} setTargetFolder={setTargetFolder} />}
            <div className="buttons">
                <Button click={closeModal} style={{width: '100%'}} >Отмена</Button>
                <Button click={handleRestoreBtn} className={"btn blue"} style={{width: '100%'}} >Восстановить</Button>
            </div>
        </>
    )
}

export default Restore