import React, { useContext } from "react"
import { useParams } from "react-router-dom"

import '../../styles/ContextMenu.css'

import { ModalContext, AuthContext } from '../../Context'
import { SelectionContext } from "../../contexts/SelectionContext/SelectionContext"
import { ContextMenuContext } from "../../contexts/ContextMenuContext/ContextMenuContext"
import { DirContext } from "../../contexts/DirContext/DirContext"

import CreateFolder from "../modalwindows/CreateFolder"
import Rename from "../modalwindows/Rename"
import Share from '../modalwindows/Share'
import Delete from "../modalwindows/Delete"

function MainContextMenu() {
    const { openModal } = useContext(ModalContext)
    const { userData } = useContext(AuthContext)
    const { selected } = useContext(SelectionContext)
    const { setIsContextMenuOpened, typeContextMenu, positionContextMenu } = useContext(ContextMenuContext)
    const { dir } = useContext(DirContext)
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

    return (
        <div className="context-menu slideRight" style={{ left: positionContextMenu.left, top: positionContextMenu.top }} onMouseDown={(e) => e.stopPropagation()}>
            { typeContextMenu === 'workspace'
                ? ( <ul>
                        <li onClick={createFolder}><div className="icon edit"></div>Создать папку</li>
                        <li className={parent === userData.rootId ? 'disabled' : ''} onClick={handlerShareCurrentDir}><div className="icon share"></div>Поделиться</li>
                        <li><div className="icon copy"></div>Вставить</li>
                    </ul> ) 
                : ( <ul>
                        <li className={selected.length > 1 ? 'disabled' : ''} onClick={selected.length === 1 ? handlerRename : undefined}><div className="icon edit"></div>Переименовать</li>
                        <li><div className="icon download"></div>Скачать</li>
                        <li onClick={handlerShare}><div className="icon share"></div>Поделиться</li>
                        <li><div className="icon copy"></div>Копировать</li>
                        <li onClick={handlerDelete}><div className="icon delete"></div>Удалить в корзину</li>
                    </ul> )
            }
        </div>
    )
}

export default MainContextMenu