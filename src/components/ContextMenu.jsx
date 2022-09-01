import React, { useContext } from "react"
import { useParams } from "react-router-dom"

import '../styles/ContextMenu.css'

import { ModalContext, AuthContext } from '../Context'
import CreateFolder from "./modalwindows/CreateFolder"
import Rename from "./modalwindows/Rename"
import Share from './modalwindows/Share'
import Delete from "./modalwindows/Delete"
import PermanentDelete from "./modalwindows/PermanentDelete"
import Restore from "./modalwindows/Restore/Restore"

function ContextMenu({openContextMenu, items, contextType, style }) {
    const {openModal} = useContext(ModalContext)
    const {userData} = useContext(AuthContext)
    const {category, parent} = useParams()

    const createFolder = () => {
        openContextMenu(-1, 0, 0)   // закрыть контекстное меню
        openModal({
            title: 'Создание папки',
            children: <CreateFolder />
        })
    }

    const handlerRename = () => {
        openContextMenu(-1, 0, 0)   // закрыть контекстное меню
        openModal({
            title: 'Переименовать',
            children: <Rename items={items} />
        })
    }

    const handlerShare = () => {
        openContextMenu(-1, 0, 0)   // закрыть контекстное меню
        openModal({
            title: 'Поделиться',
            children: <Share items={items} />
        })
    }

    const handlerShareCurrentDir = () => {
        openContextMenu(-1, 0, 0)   // закрыть контекстное меню
        openModal({
            title: 'Поделиться',
            children: <Share items={items} />
        })
    }

    const handlerDelete = () => {
        openContextMenu(-1, 0, 0)   // закрыть контекстное меню
        openModal({
            title: 'Удалить в корзину',
            children: <Delete items={items} />
        })
    }

    const handlerRestore = () => {
        openContextMenu(-1, 0, 0)   // закрыть контекстное меню
        openModal({
            title: 'Восстановить',
            children: <Restore items={items} />
        })
    }

    const handlerPermanentDelete = () => {
        openContextMenu(-1, 0, 0)   // закрыть контекстное меню
        openModal({
            title: 'Удалить навсегда',
            children: <PermanentDelete items={items} />
        })
    }

    return (
        <div className="context-menu slideRight" style={style} onMouseDown={(e) => e.stopPropagation()}>
            { contextType === 'workspace' && category === 'main' 
                ? ( <ul>
                        <li onClick={createFolder}><div className="icon edit"></div>Создать папку</li>
                        <li className={parent === userData.rootId ? 'disabled' : ''} onClick={handlerShareCurrentDir}><div className="icon share"></div>Поделиться</li>
                        <li><div className="icon copy"></div>Вставить</li>
                    </ul> ) 
                : contextType === 'item' && category !== 'trash' && ( 
                    <ul>
                        <li className={items.length > 1 ? 'disabled' : ''} onClick={items.length === 1 ? handlerRename : undefined}><div className="icon edit"></div>Переименовать</li>
                        <li><div className="icon download"></div>Скачать</li>
                        <li onClick={handlerShare}><div className="icon share"></div>Поделиться</li>
                        <li><div className="icon copy"></div>Копировать</li>
                        <li onClick={handlerDelete}><div className="icon delete"></div>Удалить в корзину</li>
                    </ul> )
            }
            { category === 'trash' && contextType === 'item' &&
                ( <ul>
                    <li onClick={handlerRestore}><div className="icon restore"></div>Восстановить</li>
                    <li onClick={handlerPermanentDelete}><div className="icon delete"></div>Удалить навсегда</li>
                </ul> )
            }
        </div>
    )
}

export default ContextMenu