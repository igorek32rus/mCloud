import React from "react"
import { DirContext } from "./DirContext"

import useFetch from "../../hooks/useFetch"
import { URLS } from "../../constants"
import { NotifyContext } from "../NotifyContext/NotifyContext"

export const DirContextProvider = ({ children }) => {
    const [dir, setDir] = React.useState([])
    const [path, setPath] = React.useState([])

    const { createNotification } = React.useContext(NotifyContext)
    const fetch = useFetch()

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

    const providerValue = {
        dir, setDir,
        path, setPath,
        changeParent
    }

    return (
        <DirContext.Provider value={providerValue}>
            { children }
        </DirContext.Provider>
    )
}