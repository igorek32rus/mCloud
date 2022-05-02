import React from "react";

import '../styles/Notify.css'

function Notify() {
    return (
        <div className="notify-block">
            <div className="loading-circle" />
            <div className="notify-title">Подготовка выбранных файлов к скачиванию</div>
            <div className="notify-message">Пожалуйста подождите...</div>
        </div>
    )
}

export default Notify