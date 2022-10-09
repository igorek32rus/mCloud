import React, { useContext } from "react"
import { useSelector } from "react-redux"

import '../../styles/ContextMenu.css'

import { ModalContext } from '../../Context'
import { SelectionContext } from "../../contexts/SelectionContext/SelectionContext"
import { ContextMenuContext } from "../../contexts/ContextMenuContext/ContextMenuContext"

import PermanentDelete from "../modalwindows/PermanentDelete"
import Restore from "../modalwindows/Restore/Restore"

function TrashContextMenu() {
    const { openModal } = useContext(ModalContext)
    const { selected } = useContext(SelectionContext)
    const { setIsContextMenuOpened, typeContextMenu, positionContextMenu } = useContext(ContextMenuContext)
    const { dir } = useSelector(state => state.dir)

    const items = dir.filter(item => selected.includes(item._id))

    const handlerRestore = () => {
        setIsContextMenuOpened(false)   // закрыть контекстное меню
        openModal({
            title: 'Восстановить',
            children: <Restore items={items} />
        })
    }

    const handlerPermanentDelete = () => {
        setIsContextMenuOpened(false)   // закрыть контекстное меню
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