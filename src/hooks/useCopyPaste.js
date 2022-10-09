import { useSelector, useDispatch } from "react-redux"
import { dirUpdateDir } from "../store/dirReducer"
import { authUpdateUserData } from "../store/authReducer"
import { copyPasteSetMode, copyPasteSetItems } from "../store/copyPasteReducer"
import useFetch from "./useFetch"
import { URLS } from "../constants"
import useNotification from "./useNotification"

export default function useCopyPaste() {
    const currentDir = useSelector(state => state.dir.currentDir)
    const { mode, items } = useSelector(state => state.copyPaste)
    const dispatch = useDispatch()
    const fetch = useFetch()
    const [createNotification, removeNotification] = useNotification()

    const moveFiles = async (idNewParent, files) => {
        try {
            const updatedDir = await fetch({
                url: URLS.MOVE_FILES, 
                method: 'POST', 
                data: {idNewParent, files, curDir: currentDir}
            })

            if (updatedDir.files) {
                // setDir(updatedDir.files)
                dispatch(dirUpdateDir(updatedDir.files))
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
                dispatch(dirUpdateDir(updatedDir.files))
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

    const copy = (items) => {
        dispatch(copyPasteSetMode("copy"))
        dispatch(copyPasteSetItems(items))
    }

    const cut = (items) => {
        dispatch(copyPasteSetMode("cut"))
        dispatch(copyPasteSetItems(items))
    }

    const paste = (parent) => {
        if (mode === "copy") {
            copyFiles(parent, items)
        }

        if (mode === "cut") {
            moveFiles(parent, items)
        }

        dispatch(copyPasteSetMode(""))
    }

    return [copy, cut, paste]
}