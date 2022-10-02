import React, { useContext } from "react"
import { useParams } from "react-router-dom"

import '../../styles/ContextMenu.css'

import { ModalContext, AuthContext } from '../../Context'
import { SelectionContext } from "../../contexts/SelectionContext/SelectionContext"
import { ContextMenuContext } from "../../contexts/ContextMenuContext/ContextMenuContext"
import { DirContext } from "../../contexts/DirContext/DirContext"
import { WindowSizeContext } from "../../contexts/WindowSizeContext/WindowSizeContext"

import CreateFolder from "../modalwindows/CreateFolder"
import Rename from "../modalwindows/Rename"
import Share from '../modalwindows/Share'
import Delete from "../modalwindows/Delete"

import { URLS } from "../../constants"

function MainContextMenu() {
    const { openModal } = useContext(ModalContext)
    const { userData } = useContext(AuthContext)
    const { selected } = useContext(SelectionContext)
    const { setIsContextMenuOpened, typeContextMenu, positionContextMenu } = useContext(ContextMenuContext)
    const { dir } = useContext(DirContext)
    const { windowSize } = useContext(WindowSizeContext)
    const { parent } = useParams()

    const items = dir.filter(item => selected.includes(item._id))

    const createFolder = () => {
        setIsContextMenuOpened(false)   // закрыть контекстное меню
        openModal({
            title: 'Создание папки',
            children: <CreateFolder />
        })
    }

    const handlerRename = () => {
        setIsContextMenuOpened(false)   // закрыть контекстное меню
        openModal({
            title: 'Переименовать',
            children: <Rename items={items} />
        })
    }

    const handlerShare = () => {
        setIsContextMenuOpened(false)   // закрыть контекстное меню
        openModal({
            title: 'Поделиться',
            children: <Share items={items} />
        })
    }

    const handlerShareCurrentDir = () => {
        setIsContextMenuOpened(false)   // закрыть контекстное меню
        openModal({
            title: 'Поделиться',
            children: <Share items={items} />
        })
    }

    const handlerDelete = () => {
        setIsContextMenuOpened(false)   // закрыть контекстное меню
        openModal({
            title: 'Удалить в корзину',
            children: <Delete items={items} />
        })
    }

    const handlerDownload = async () => {
        setIsContextMenuOpened(false)   // закрыть контекстное меню
        
        const response = await fetch(URLS.DOWNLOAD_FILES, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                files: items
            })
        })

        if (response.ok) {
            const blob = await response.blob()
            let url = window.URL.createObjectURL(blob);
            let a = document.createElement('a');
            a.href = url;
            a.download = items[0].name;
            document.body.appendChild(a); // we need to append the element to the dom -> otherwise it will not work in firefox
            a.click();    
            a.remove();
        }

    }

    const classContext = positionContextMenu.left + 200 > windowSize.width ? "context-menu slideLeft" : "context-menu slideRight"
    const leftContext = positionContextMenu.left + 200 > windowSize.width ? positionContextMenu.left - 200 : positionContextMenu.left

    return (
        <div className={classContext} style={{ left: leftContext, top: positionContextMenu.top }} onMouseDown={(e) => e.stopPropagation()}>
            { typeContextMenu === 'workspace'
                ? ( <ul>
                        <li onClick={createFolder}><div className="icon edit"></div>Создать папку</li>
                        <li className={parent === userData.rootId ? 'disabled' : ''} onClick={handlerShareCurrentDir}><div className="icon share"></div>Поделиться</li>
                        <li><div className="icon copy"></div>Вставить</li>
                    </ul> ) 
                : ( <ul>
                        <li className={selected.length > 1 ? 'disabled' : ''} onClick={selected.length === 1 ? handlerRename : undefined}><div className="icon edit"></div>Переименовать</li>
                        <li onClick={handlerDownload}><div className="icon download"></div>Скачать</li>
                        <li className={selected.length > 1 ? 'disabled' : ''} onClick={selected.length === 1 ? handlerShare : undefined}><div className="icon share"></div>Поделиться</li>
                        <li><div className="icon copy"></div>Копировать</li>
                        <li onClick={handlerDelete}><div className="icon delete"></div>Удалить в корзину</li>
                    </ul> )
            }
        </div>
    )
}

export default MainContextMenu