import React from "react"
import { DirContext } from "./DirContext"

import { useDispatch } from "react-redux"
import { authUpdateUserData } from "../../store/authReducer"

import useFetch from "../../hooks/useFetch"
import { URLS } from "../../constants"
import useNotification from "../../hooks/useNotification"

export const DirContextProvider = ({ children }) => {
    const [dir, setDir] = React.useState([])
    const [path, setPath] = React.useState([])

    const [ createNotification, removeNotification ] = useNotification()
    const fetch = useFetch()
    const dispatch = useDispatch()

    const changeParent = async (idNewParent, files) => {
        try {
            const updatedDir = await fetch({
                url: URLS.MOVE_FILES, 
                method: 'POST', 
                data: {idNewParent, files, curDir: path[path.length - 1]}
            })

            if (updatedDir.files) {
                setDir(updatedDir.files)
                createNotification({
                    title: `Перемещение объектов`, 
                    message: `Объекты успешно перемещены`
                })
            }

            if (updatedDir.error) {
                createNotification({
                    title: `Перемещение объектов`, 
                    message: updatedDir.error
                })
            }
        } catch (error) {
            console.log(error);
        }
    }

    const copyFiles = async (parent, files) => {
        try {
            const idNotify = createNotification({
                title: `Копирование файлов`, 
                message: `Подождите, идёт копирование файлов...`,
                time: 0
            })
            
            const updatedDir = await fetch({
                url: URLS.COPY_FILES, 
                method: 'POST', 
                data: {parent, files}
            })

            removeNotification(idNotify)

            if (updatedDir.files) {
                setDir(updatedDir.files)
                createNotification({
                    title: `Копирование файлов`, 
                    message: `Все файлы успешно скопированы`
                })
                dispatch(authUpdateUserData({usedSpace: updatedDir.usedSpace}))
            }

            if (updatedDir.error) {
                createNotification({
                    title: `Копирование файлов`, 
                    message: updatedDir.error
                })
            }
        } catch (error) {
            console.log(error);
        }
    }

    const providerValue = {
        dir, setDir,
        path, setPath,
        changeParent,
        copyFiles
    }

    return (
        <DirContext.Provider value={providerValue}>
            { children }
        </DirContext.Provider>
    )
}