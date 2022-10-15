import React from "react"
import { useSelector, useDispatch } from "react-redux"

import './ContextMenu.scss'

import useNotification from "../../hooks/useNotification"

import { URLS } from "../../constants"
import { setIsContextMenuOpened } from "../../store/contextMenuReducer"

function SharePageContextMenu() {
    const { selected } = useSelector(state => state.selection)
    const [ createNotification, removeNotification ] = useNotification()
    const { typeContextMenu, positionContextMenu } = useSelector(state => state.contextMenu)
    const { windowSize } = useSelector(state => state.windowSize)
    const dispatch = useDispatch()


    const isAuth = useSelector(state => state.auth.isAuth)
    const { dir } = useSelector(state => state.dir)

    const items = dir.filter(item => selected.includes(item._id))

    const handlerDownload = async ({downloadFolder = false}) => {
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