import React, { useEffect, useState } from "react"
import { useDispatch } from "react-redux"

import Button from "../../UI/button/Button"
import useFetch from "../../../hooks/useFetch"
import { URLS } from "../../../constants"
import Tree from "./Tree"
import Loader from "../../UI/loader/Loader"

import useNotification from "../../../hooks/useNotification"
import { dirRemoveFiles } from "../../../store/dirReducer"
import { closeModal } from "../../../store/modalWindowReducer"

function Restore({items}) {
    const [createNotification] = useNotification()
    const dispatch = useDispatch()

    const [tree, setTree] = useState(null)
    const [loading, setLoading] = useState(true)
    const [targetFolder, setTargetFolder] = useState(null)

    const fetch = useFetch()

    const handleRestoreBtn = async () => {
        dispatch(closeModal())
        try {
            const restoreDir = await fetch({
                url: URLS.RESTORE_FILE, 
                method: 'POST', 
                data: {files: items, target: targetFolder}
            })
      
            if (restoreDir.status === 'ok') {
                dispatch(dirRemoveFiles(items))
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
        setLoading(true)
        try {
            const treeFolders = await fetch({
                url: URLS.GET_TREE_FOLDERS
            })
      
            if (treeFolders.tree) {
                setTree(treeFolders.tree)
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getTreeFolders()
    }, [])

    return (
        <>
            <p style={{margin: '10px 0'}}>Выберите папку назначения для восстановления</p>
            {loading && (
                <div style={{height: 150, position: 'relative'}}>
                    <Loader />
                </div>
            ) }
            {!loading && !!tree && <Tree tree={tree} setTargetFolder={setTargetFolder} />}
            <div className="buttons">
                <Button click={() => dispatch(closeModal())} style={{width: '100%'}} >Отмена</Button>
                <Button click={handleRestoreBtn} className={"btn blue"} style={{width: '100%'}} >Восстановить</Button>
            </div>
        </>
    )
}

export default Restore