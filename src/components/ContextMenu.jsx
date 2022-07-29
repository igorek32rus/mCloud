import React, { useContext } from "react"

import '../styles/ContextMenu.css'

import { ModalContext } from '../Context'
import CreateFolder from "./modalwindows/CreateFolder"
import Rename from "./modalwindows/Rename"
import Share from './modalwindows/Share'
import Delete from "./modalwindows/Delete"
import Restore from "./modalwindows/Restore/Restore"

function ContextMenu({currentDir, changeDir, openContextMenu, items, contextType, style, category }) {
    const {openModal} = useContext(ModalContext)

    const createFolder = () => {
        openContextMenu(-1, 0, 0)   // закрыть контекстное меню
        openModal({
            title: 'Создание папки',
            children: <CreateFolder currentDir={currentDir} changeDir={changeDir} />
        })
    }

    const handlerRename = () => {
        openContextMenu(-1, 0, 0)   // закрыть контекстное меню
        openModal({
            title: 'Переименовать',
            children: <Rename items={items} changeDir={changeDir} />
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
            children: <Share items={[...currentDir]} />
        })
    }

    const handlerDelete = () => {
        openContextMenu(-1, 0, 0)   // закрыть контекстное меню
        openModal({
            title: 'Удалить',
            children: <Delete items={items} changeDir={changeDir} currentDir={currentDir} />
        })
    }

    const handlerRestore = () => {
        openContextMenu(-1, 0, 0)   // закрыть контекстное меню
        openModal({
            title: 'Восстановить',
            children: <Restore items={items} changeDir={changeDir} currentDir={currentDir} />
        })
    }

    return (
        <div className="dropMenu contextMenu slideRight" style={style} onMouseDown={(e) => e.stopPropagation()}>
            { contextType === 'workspace' && category === 'main' 
                ? ( <ul className="menu context">
                        <li onClick={createFolder}><div className="icon edit"></div>Создать папку</li>
                        <li className={!currentDir.parent ? 'disabled' : ''} onClick={currentDir.parent ? handlerShareCurrentDir : undefined}><div className="icon share"></div>Поделиться</li>
                        <li><div className="icon copy"></div>Вставить</li>
                    </ul> ) 
                : contextType === 'item' && category !== 'trash' && ( <ul className="menu context">
                        <li className={items.length > 1 ? 'disabled' : ''} onClick={items.length === 1 ? handlerRename : undefined}><div className="icon edit"></div>Переименовать</li>
                        <li><div className="icon download"></div>Скачать</li>
                        <li onClick={handlerShare}><div className="icon share"></div>Поделиться</li>
                        <li><div className="icon copy"></div>Копировать</li>
                        <li onClick={handlerDelete}><div className="icon delete"></div>Удалить</li>
                    </ul> )
            }
            { category === 'trash' && contextType === 'item' &&
                ( <ul className="menu context">
                    <li onClick={handlerRestore}><div className="icon restore"></div>Восстановить</li>
                </ul> )
            }
        </div>
    )
}

export default ContextMenu