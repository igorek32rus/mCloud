import React, { useContext } from "react"
import { useSelector, useDispatch } from "react-redux"

import '../../styles/ContextMenu.css'

import { ModalContext } from '../../Context'

import PermanentDelete from "../modalwindows/PermanentDelete"
import Restore from "../modalwindows/Restore/Restore"

import { setIsContextMenuOpened } from "../../store/contextMenuReducer"

function TrashContextMenu() {
    const { openModal } = useContext(ModalContext)
    const { selected } = useSelector(state => state.selection)
    const { typeContextMenu, positionContextMenu } = useSelector(state => state.contextMenu)
    const { dir } = useSelector(state => state.dir)
    const dispatch = useDispatch()

    const items = dir.filter(item => selected.includes(item._id))

    const handlerRestore = () => {
        dispatch(setIsContextMenuOpened(false))
        openModal({
            title: 'Восстановить',
            children: <Restore items={items} />
        })
    }

    const handlerPermanentDelete = () => {
        dispatch(setIsContextMenuOpened(false))
        openModal({
            title: 'Удалить навсегда',
            children: <PermanentDelete items={items} />
        })
    }

    return (
        <div className="context-menu slideRight" style={{ left: positionContextMenu.left, top: positionContextMenu.top }} onMouseDown={(e) => e.stopPropagation()}>
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