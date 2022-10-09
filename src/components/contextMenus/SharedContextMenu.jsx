import React, { useContext } from "react"
import { useSelector } from "react-redux"

import '../../styles/ContextMenu.css'

import { ModalContext } from '../../Context'
import { SelectionContext } from "../../contexts/SelectionContext/SelectionContext"
import { ContextMenuContext } from "../../contexts/ContextMenuContext/ContextMenuContext"
import { WindowSizeContext } from "../../contexts/WindowSizeContext/WindowSizeContext"

import Rename from "../modalwindows/Rename"
import Share from '../modalwindows/Share'
import Delete from "../modalwindows/Delete"

function SharedContextMenu() {
    const { openModal } = useContext(ModalContext)
    const { selected } = useContext(SelectionContext)
    const { setIsContextMenuOpened, typeContextMenu, positionContextMenu } = useContext(ContextMenuContext)
    const { dir } = useSelector(state => state.dir)
    const { windowSize } = useContext(WindowSizeContext)

    const items = dir.filter(item => selected.includes(item._id))

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

    const handlerDelete = () => {
        setIsContextMenuOpened(false)   // закрыть контекстное меню
        openModal({
            title: 'Удалить в корзину',
            children: <Delete items={items} />
        })
    }

    const classContext = positionContextMenu.left + 200 > windowSize.width ? "context-menu slideLeft" : "context-menu slideRight"
    const leftContext = positionContextMenu.left + 200 > windowSize.width ? positionContextMenu.left - 200 : positionContextMenu.left

    return (
        <div className={classContext} style={{ left: leftContext, top: positionContextMenu.top }} onMouseDown={(e) => e.stopPropagation()}>
            { typeContextMenu === 'item' &&
                ( <ul>
                    <li className={selected.length > 1 ? 'disabled' : ''} onClick={selected.length === 1 ? handlerRename : undefined}><div className="icon edit"></div>Переименовать</li>
                    <li><div className="icon download"></div>Скачать</li>
                    <li className={selected.length > 1 ? 'disabled' : ''} onClick={selected.length === 1 ? handlerShare : undefined}><div className="icon share"></div>Общий доступ</li>
                    <li onClick={handlerDelete}><div className="icon delete"></div>Удалить в корзину</li>
                </ul> )
            }
        </div>
    )
}

export default SharedContextMenu