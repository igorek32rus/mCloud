import React, {useContext, useState} from "react"
import Button from "../UI/button/Button"
import { ModalContext, NotifyContext, AuthContext } from "../../Context"
import { getFileSize } from "../../utils/getFileSize"
import { URLS } from "../../constants"

import axios from 'axios'

function UploadFiles({files, currentDir, changeDir}) {
    const [uploadFiles, setUploadFiles] = useState(files)
    const {closeModal} = useContext(ModalContext)
    const {createNotification, removeNotification} = useContext(NotifyContext)
    const {setUserData} = useContext(AuthContext)

    const handleUploadFilesBtn = async () => {
        closeModal()

        const idNotification = createNotification({
            title: `Загрузка файлов`, 
            message: `Подождите, выполняется загрузка файлов`,
            time: 0
        })
    
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            
            try {
                const formData = new FormData()
                formData.append('file', file)
                formData.append('parent', currentDir._id)
                formData.append('fileName', file.name)
                const response = await axios.post(URLS.UPLOAD_FILE, formData, {
                    headers: {
                        Authorization: `Baerer ${localStorage.getItem('token')}`
                    },
                    onUploadProgress: progressEvent => {
                    // console.log(progressEvent.loaded);
                    }
                })
                setUserData((prev) => {
                    return {...prev, usedSpace: response.data.usedSpace}
                })
            } catch (error) {
                createNotification({
                    title: `Ошибка загрузки файла`, 
                    message: `Файл: ${file.name}. ${error.response.data.message}`
                })
                return
            }
        }
    
        removeNotification(idNotification)
    
        changeDir(currentDir._id)
        createNotification({
            title: `Загрузка файлов`, 
            message: `Файлы успешно загружены`
        })
            
    }

    const handleRemoveFile = (num) => {
        let copyUploadFiles = uploadFiles.slice(0)
        copyUploadFiles.splice(num, 1)
        setUploadFiles(copyUploadFiles)

        if (!copyUploadFiles.length) closeModal()
    }

    return (
        <>
            <div className="list_upload">
                <table>
                    <tbody>
                        <tr>
                            <th>Имя файла</th>
                            <th>Размер</th>
                            <th></th>
                        </tr>
                        {uploadFiles.map((file, i) => <tr key={i}><td>{file.name}</td><td>{getFileSize(file.size)}</td><td onClick={() => handleRemoveFile(i)} className="removeUpload">&times;</td></tr> )}
                    </tbody>
                </table>
            </div>
            
            <div className="buttons">
                <Button click={closeModal} style={{width: '100%'}} >Отмена</Button>
                <Button click={handleUploadFilesBtn} className={"btn blue"} style={{width: '100%'}}>Загрузить</Button>
            </div>
        </>
    )
}

export default UploadFiles