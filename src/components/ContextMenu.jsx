import React, { useContext } from "react";

import '../styles/ContextMenu.css'

import { ModalContext } from '../Context'

function ContextMenu(props) {
    const modal = useContext(ModalContext)

    const createFolder = () => {
        props.openContextMenu(-1, 0, 0)   // закрыть контекстное меню
        modal.setTypeModal('createFolder')
        modal.setModal(true)
    }

    const handlerRename = () => {
        props.openContextMenu(-1, 0, 0)   // закрыть контекстное меню
        modal.setTypeModal('rename')
        modal.setDataModal(props.items)
        modal.setModal(true)
    }

    const handlerShare = () => {
        props.openContextMenu(-1, 0, 0)   // закрыть контекстное меню
        modal.setTypeModal('share')
        modal.setDataModal(props.items)
        modal.setModal(true)
    }

    const handlerShareFolder = () => {
        props.openContextMenu(-1, 0, 0)   // закрыть контекстное меню
        modal.setTypeModal('share')
        modal.setDataModal([{name: props.currentDir.name, link: props.currentDir.link}])
        modal.setModal(true)
    }

    const handlerDelete = () => {
        props.openContextMenu(-1, 0, 0)   // закрыть контекстное меню
        modal.setTypeModal('delete')
        modal.setDataModal(props.items)
        modal.setModal(true)
    }

    return (
        <div className="dropMenu contextMenu slideRight" style={props.style} onMouseDown={(e) => e.stopPropagation()}>
            { props.contextType === 'workspace' ? 
                ( <ul className="menu context">
                    <li onClick={createFolder}><div className="icon edit"></div>Создать папку</li>
                    <li className={props.currentDir.link === 'root' ? 'disabled' : ''} onClick={props.currentDir.link !== 'root' ? handlerShareFolder : undefined}><div className="icon share"></div>Поделиться</li>
                    <li><div className="icon copy"></div>Вставить</li>
                </ul> ) 
                : ( <ul className="menu context">
                    <li className={props.items.length > 1 ? 'disabled' : ''} onClick={props.items.length === 1 ? handlerRename : undefined}><div className="icon edit"></div>Переименовать</li>
                    <li><div className="icon download"></div>Скачать</li>
                    <li onClick={handlerShare}><div className="icon share"></div>Поделиться</li>
                    <li><div className="icon copy"></div>Копировать</li>
                    <li onClick={handlerDelete}><div className="icon delete"></div>Удалить</li>
                </ul> )
            }
        </div>
    )
}

export default ContextMenu