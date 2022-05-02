import React, { useContext } from "react";

import '../styles/ContextMenu.css'

import { ModalContext } from '../Context'

function ContextMenu(props) {
    const modal = useContext(ModalContext)

    const handleRename = () => {
        props.contextMenu(0)
        modal.setTypeModal('rename')
        modal.setDataModal(props.item)
        modal.setModal(true)
    }

    const handleShare = () => {
        props.contextMenu(0)
        modal.setTypeModal('share')
        modal.setDataModal(props.item)
        modal.setModal(true)
    }

    const handleDelete = () => {
        props.contextMenu(0)
        modal.setTypeModal('delete')
        modal.setDataModal(props.item)
        modal.setModal(true)
    }

    return (
        <div className="dropMenu contextMenu slideRight" onClick={(e) => e.stopPropagation()}>
            <ul className="menu context">
                <li onClick={handleRename}><div className="icon edit"></div>Переименовать</li>
                <li><div className="icon download"></div>Скачать</li>
                <li onClick={handleShare}><div className="icon share"></div>Поделиться</li>
                <li><div className="icon copy"></div>Копировать</li>
                <li onClick={handleDelete}><div className="icon delete"></div>Удалить</li>
            </ul>
        </div>
    )
}

export default ContextMenu