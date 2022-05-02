import React from "react";
import Button from "../UI/button/Button";

function UploadFiles(props) {
    const handleUploadFilesBtn = () => {
        console.log(props.files);
    }

    return (
        <div className="modal_content" style={{display: 'flex', flexDirection: 'column'}}>
            <h1>Список файлов для загрузки</h1>
            <table>
                <tbody>
                    <tr>
                        <th>Имя файла</th>
                        <th>Размер</th>
                        <th></th>
                    </tr>
                    {Array.from(props.files).map((file) => <tr key={new Date() - file.size}><td>{file.name}</td><td>{file.size}</td><td>&times;</td></tr>)}
                </tbody>
            </table>
            <Button click={handleUploadFilesBtn} style={{margin: 0}}>Загрузить</Button>
        </div>
    )
}

export default UploadFiles