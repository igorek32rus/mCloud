import React, {useState} from "react"
import { useDispatch } from "react-redux"
import { useParams } from "react-router-dom"

import Button from "../UI/button/Button"
import { getFileSize } from "../../utils/getFileSize"
import { URLS } from "../../constants"
import useNotification from "../../hooks/useNotification"

import { authUpdateUserData } from "../../store/authReducer"
import { dirAddFile } from "../../store/dirReducer"
import { closeModal } from "../../store/modalWindowReducer"

import axios from 'axios'

function UploadFiles({files}) {
    const [uploadFiles, setUploadFiles] = useState(files.reduce((acc, cur, i) => [...acc, {id: i, file: cur}], []))
    const [createNotification, removeNotification, updateNotification] = useNotification()
    const {parent} = useParams()
    const dispatch = useDispatch()

    const handleUploadFilesBtn = async () => {
        dispatch(closeModal())

        const idNotification = createNotification({
            title: `Загрузка файлов`, 
            message: `Подождите, выполняется загрузка файлов`,
            time: 0,
            showProgress: true,
            progress: 0
        })

        const sizeAllFiles = files.reduce((prev, cur) => prev + cur.size, 0)
        let sizeUploaded = 0
        // console.log('All size: ' + sizeAllFiles);
        const onePersent = sizeAllFiles / 100
        // console.log('1 persent: ' + onePersent);
    
        for (let i = 0; i < uploadFiles.length; i++) {
            const {file} = uploadFiles[i]
            
            updateNotification(idNotification, {
                message: 'Загрузка ' + file.name
            })
            
            try {
                const formData = new FormData()
                formData.append('file', file)
                formData.append('parent', parent)
                formData.append('fileName', file.name)
                const response = await axios.post(URLS.UPLOAD_FILE, formData, {
                    headers: {
                        Authorization: `Baerer ${localStorage.getItem('token')}`
                    },
                    onUploadProgress: progressEvent => {
                        // console.log((sizeUploaded + progressEvent.loaded) / onePersent + "%");
                        updateNotification(idNotification, {
                            // message: 'Загрузка ' + Math.round((sizeUploaded + progressEvent.loaded) / onePersent) + "%"
                            progress: Math.round((sizeUploaded + progressEvent.loaded) / onePersent)
                        })
                    }
                })
                dispatch(authUpdateUserData({usedSpace: response.data.usedSpace}))
                dispatch(dirAddFile(response.data.file))

                sizeUploaded += file.size
                // console.log(sizeUploaded / onePersent + "%");
                updateNotification(idNotification, {
                    // message: 'Загрузка ' + Math.round(sizeUploaded / onePersent) + "%"
                    progress: Math.round(sizeUploaded / onePersent)
                })
            } catch (error) {
                console.log(error)
                createNotification({
                    title: `Ошибка загрузки файла`, 
                    message: `Файл: ${file.name}. ${error.response.data.message}`
                })
            }
        }

        // console.log('Uploaded size: ' + sizeUploaded);
    
        removeNotification(idNotification)
    
        createNotification({
            title: `Загрузка файлов`, 
            message: `Загрузка завершена`
        })
            
    }

    const handleRemoveFile = (num) => {
        setUploadFiles((prev) => prev.filter((item) => item.id !== num))

        if (!uploadFiles.length) dispatch(closeModal())
    }

    return (
        <>
            <div className="list_upload">
                <div className="filename">Имя файла</div>
                <div className="filesize">Размер</div>
                <div className="filedelete"></div>

                {uploadFiles.map((item) => (
                    <React.Fragment key={item.id}>
                        <div className="filename">{item.file.name}</div>
                        <div className="filesize">{getFileSize(item.file.size)}</div>
                        <div className="filedelete"><div className="removeUpload" onClick={() => handleRemoveFile(item.id)}>&times;</div></div>
                    </React.Fragment>
                ))}
            </div>
            
            <div className="buttons">
                <Button click={() => dispatch(closeModal())} style={{width: '100%'}} >Отмена</Button>
                <Button click={handleUploadFilesBtn} className={"btn blue"} style={{width: '100%'}}>Загрузить</Button>
            </div>
        </>
    )
}

export default UploadFiles