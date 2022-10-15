import React from "react"
import { useSelector, useDispatch } from "react-redux"

import './ContextMenu.scss'

import PermanentDelete from "../modalwindows/PermanentDelete"
import Restore from "../modalwindows/Restore/Restore"

import { setIsContextMenuOpened } from "../../store/contextMenuReducer"
import { openModal } from "../../store/modalWindowReducer"

function TrashContextMenu() {
    const { selected } = useSelector(state => state.selection)
    const { typeContextMenu, positionContextMenu } = useSelector(state => state.contextMenu)
    const { dir } = useSelector(state => state.dir)
    const { windowSize } = useSelector(state => state.windowSize)
    const dispatch = useDispatch()

    const items = dir.filter(item => selected.includes(item._id))

    const handlerRestore = () => {
        dispatch(setIsContextMenuOpened(false))
        dispatch(openModal({
            title: 'Восстановить',
            children: <Restore items={items} />
        }))
    }

    const handlerPermanentDelete = () => {
        dispatch(setIsContextMenuOpened(false))
        dispatch(openModal({
            title: 'Удалить навсегда',
            children: <PermanentDelete items={items} />
        }))
    }

    const classContext = positionContextMenu.left + 200 > windowSize.width ? "context-menu slideLeft" : "context-menu slideRight"
    const leftContext = positionContextMenu.left + 200 > windowSize.width ? positionContextMenu.left - 200 : positionContextMenu.left

    return (
        <div className={classContext} style={{ left: leftContext, top: positionContextMenu.top }} onMouseDown={(e) => e.stopPropagation()}>
            { typeContextMenu === 'workspace'
                ? ( <ul>
                        <li><div className="icon delete"></div>Очистить корзину</li>
                    </ul> ) 
                : ( <ul>
                    <li onClick={handlerRestore}><div className="icon restore"></div>Восстановить</li>
                    <li onClick={handlerPermanentDelete}><div className="icon delete"></div>Удалить навсегда</li>
                </ul> )
            }
        </div>
    )
}

export default TrashContextMenu