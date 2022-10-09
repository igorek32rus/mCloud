import React, { useContext } from "react"
import { useSelector, useDispatch } from "react-redux"

import '../../styles/ContextMenu.css'

import { ModalContext } from '../../Context'
import { SelectionContext } from "../../contexts/SelectionContext/SelectionContext"
// import { ContextMenuContext } from "../../contexts/ContextMenuContext/ContextMenuContext"
import { WindowSizeContext } from "../../contexts/WindowSizeContext/WindowSizeContext"

import useNotification from "../../hooks/useNotification"

import { URLS } from "../../constants"
import { setIsContextMenuOpened } from "../../store/contextMenuReducer"

function SharePageContextMenu() {
    const { openModal } = useContext(ModalContext)
    const { selected } = useContext(SelectionContext)
    const [ createNotification, removeNotification ] = useNotification()
    // const { setIsContextMenuOpened, typeContextMenu, positionContextMenu } = useContext(ContextMenuContext)
    const { typeContextMenu, positionContextMenu } = useSelector(state => state.contextMenu)
    // const { dir } = useContext(DirContext)
    const { windowSize } = useContext(WindowSizeContext)
    const dispatch = useDispatch()


    const isAuth = useSelector(state => state.auth.isAuth)
    const { dir } = useSelector(state => state.dir)

    const items = dir.filter(item => selected.includes(item._id))

    const handlerDownload = async ({downloadFolder = false}) => {
        // setIsContextMenuOpened(false)   // закрыть контекстное меню
        dispatch(setIsContextMenuOpened(false))

        if (!items.length && !downloadFolder) {
            return createNotification({
                title: `Скачивание файлов`, 
                message: `Не выбрано ни одного файла для скачивания`,
            })
        }

        const idNotify = createNotification({
            title: `Скачивание файлов`, 
            message: `Подготовка файлов. Пожалуйста, подождите...`,
            time: 0
        })
        
        const response = await fetch(URLS.DOWNLOAD_FILES, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                files: downloadFolder ? dir : items
            })
        })

        if (response.ok) {

            const filename = response.headers.get('content-disposition')
                .split(';')
                .find(n => n.includes('filename='))
                .replace('filename=', '')
                .trim()
                .replaceAll('"', "")

            const blob = await response.blob()
            let url = window.URL.createObjectURL(blob);
            let a = document.createElement('a');
            a.href = url;
            a.download = filename;
            document.body.appendChild(a); // we need to append the element to the dom -> otherwise it will not work in firefox
            a.click();    
            a.remove();
        }

        removeNotification(idNotify)
    }

    const handlerAddToCloud = () => {
        // setIsContextMenuOpened(false)   // закрыть контекстное меню
        dispatch(setIsContextMenuOpened(false))
    }

    const classContext = positionContextMenu.left + 200 > windowSize.width ? "context-menu slideLeft" : "context-menu slideRight"
    const leftContext = positionContextMenu.left + 200 > windowSize.width ? positionContextMenu.left - 200 : positionContextMenu.left

    return (
        <div className={classContext} style={{ left: leftContext, top: positionContextMenu.top }} onMouseDown={(e) => e.stopPropagation()}>
            { typeContextMenu === 'item' &&
                ( <ul>
                    <li className={!isAuth ? 'disabled' : ''} onClick={!isAuth ? handlerAddToCloud : undefined}><div className="icon upload"></div>Добавить в облако</li>
                    <li onClick={handlerDownload}><div className="icon download"></div>Скачать</li>
                </ul> )
            }

            { typeContextMenu === 'workspace' &&
                ( <ul>
                    <li className={!isAuth ? 'disabled' : ''} onClick={!isAuth ? handlerAddToCloud : undefined}><div className="icon upload"></div>Добавить в облако</li>
                    <li onClick={() => handlerDownload({downloadFolder: true})}><div className="icon download"></div>Скачать папку</li>
                </ul> )
            }
        </div>
    )
}

export default SharePageContextMenu