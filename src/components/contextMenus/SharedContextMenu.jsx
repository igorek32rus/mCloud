import React from "react"
import { useSelector, useDispatch } from "react-redux"

import '../../styles/ContextMenu.css'

import Rename from "../modalwindows/Rename"
import Share from '../modalwindows/Share'
import Delete from "../modalwindows/Delete"

import { setIsContextMenuOpened } from "../../store/contextMenuReducer"
import { openModal } from "../../store/modalWindowReducer"

function SharedContextMenu() {
    const { selected } = useSelector(state => state.selection)
    const { dir } = useSelector(state => state.dir)
    const { typeContextMenu, positionContextMenu } = useSelector(state => state.contextMenu)
    const { windowSize } = useSelector(state => state.windowSize)
    const dispatch = useDispatch()

    const items = dir.filter(item => selected.includes(item._id))

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

    const handlerDelete = () => {
        dispatch(setIsContextMenuOpened(false))
        dispatch(openModal({
            title: 'Удалить в корзину',
            children: <Delete items={items} />
        }))
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