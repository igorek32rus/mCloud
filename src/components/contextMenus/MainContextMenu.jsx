import React from "react"
import { useParams } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"

import './ContextMenu.scss'

import useNotification from "../../hooks/useNotification"

import CreateFolder from "../modalwindows/CreateFolder"
import Rename from "../modalwindows/Rename"
import Share from '../modalwindows/Share'
import Delete from "../modalwindows/Delete"

import { URLS } from "../../constants"

import useCopyPaste from "../../hooks/useCopyPaste"
import { setIsContextMenuOpened } from "../../store/contextMenuReducer"
import { openModal } from "../../store/modalWindowReducer"

function MainContextMenu() {
    const { selected } = useSelector(state => state.selection)
    const dispatch = useDispatch()
    const { typeContextMenu, positionContextMenu } = useSelector(state => state.contextMenu)

    const { windowSize } = useSelector(state => state.windowSize)
    const [copy, cut, paste] = useCopyPaste()
    const modePaste = useSelector(state => state.copyPaste.mode)
    const [ createNotification, removeNotification ] = useNotification()
    const { parent } = useParams()

    const userData = useSelector(state => state.auth.userData)
    const dir = useSelector(state => state.dir.dir)

    const items = dir.filter(item => selected.includes(item._id))

    const createFolder = () => {
        dispatch(setIsContextMenuOpened(false))
        dispatch(openModal({
            title: 'Создание папки',
            children: <CreateFolder />
        }))
    }

    const handlerRename = () => {
        dispatch(setIsContextMenuOpened(false))
        dispatch(openModal({
            title: 'Переименовать',
            children: <Rename items={items} />
        }))
    }

    const handlerShare = () => {
        dispatch(setIsContextMenuOpened(false))
        dispatch(openModal({
            title: 'Поделиться',
            children: <Share items={items} />
        }))
    }

    const handlerShareCurrentDir = () => {
        dispatch(setIsContextMenuOpened(false))
        dispatch(openModal({
            title: 'Поделиться',
            children: <Share items={[{_id: parent}]} />
        }))
    }

    const handlerDelete = () => {
        dispatch(setIsContextMenuOpened(false))
        dispatch(openModal({
            title: 'Удалить в корзину',
            children: <Delete items={items} />
        }))
    }

    const handlerDownload = async () => {
        dispatch(setIsContextMenuOpened(false))

        const idNotify = createNotification({
            title: `Скачивание файлов`, 
            message: `Подготовка файлов. Пожалуйста, подождите...`,
            time: 0
        })
        
        const response = await fetch(URLS.DOWNLOAD_FILES, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                files: items
            })
        })

        const filename = response.headers.get('content-disposition')
            .split(';')
            .find(n => n.includes('filename='))
            .replace('filename=', '')
            .trim()
            .replaceAll('"', "")

        if (response.ok) {
            const blob = await response.blob()
            let url = window.URL.createObjectURL(blob);
            let a = document.createElement('a');
            a.href = url;
            a.download = filename;
            document.body.appendChild(a); // we need to append the element to the dom -> otherwise it will not work in firefox
            a.click();    
            a.remove();
        }

        removeNotification(idNotify)
    }

    const handlerCopy = () => {
        dispatch(setIsContextMenuOpened(false))
        copy(selected)
        createNotification({
            title: `Копирование файлов`, 
            message: `Скопировано`
        })
    }

    const handlerCut = () => {
        dispatch(setIsContextMenuOpened(false))
        cut(selected)
        createNotification({
            title: `Вырезать файлы`, 
            message: `Вырезано`
        })
    }

    const handlerPaste = () => {
        dispatch(setIsContextMenuOpened(false))
        paste(parent)
    }

    const classContext = positionContextMenu.left + 200 > windowSize.width ? "context-menu slideLeft" : "context-menu slideRight"
    const leftContext = positionContextMenu.left + 200 > windowSize.width ? positionContextMenu.left - 200 : positionContextMenu.left

    return (
        <div className={classContext} style={{ left: leftContext, top: positionContextMenu.top }} onMouseDown={(e) => e.stopPropagation()}>
            { typeContextMenu === 'workspace'
                ? ( <ul>
                        <li onClick={createFolder}><div className="icon edit"></div>Создать папку</li>
                        <li className={parent === userData.rootId ? 'disabled' : ''} onClick={parent !== userData.rootId ? handlerShareCurrentDir : undefined}><div className="icon share"></div>Поделиться</li>
                        <li className={!modePaste ? 'disabled' : ''} onClick={modePaste ? handlerPaste : undefined} ><div className="icon paste"></div>Вставить</li>
                    </ul> ) 
                : ( <ul>
                        <li className={selected.length > 1 ? 'disabled' : ''} onClick={selected.length === 1 ? handlerRename : undefined}><div className="icon edit"></div>Переименовать</li>
                        <li onClick={handlerDownload}><div className="icon download"></div>Скачать</li>
                        <li className={selected.length > 1 ? 'disabled' : ''} onClick={selected.length === 1 ? handlerShare : undefined}><div className="icon share"></div>Поделиться</li>
                        <li onClick={handlerCopy}><div className="icon copy"></div>Копировать</li>
                        <li onClick={handlerCut}><div className="icon cut"></div>Вырезать</li>
                        <li onClick={handlerDelete}><div className="icon delete"></div>Удалить в корзину</li>
                    </ul> )
            }
        </div>
    )
}

export default MainContextMenu