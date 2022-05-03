import React from "react";

import '../styles/Path.css'

function Path(props) {
    
    return (
        <div className="path">
            <a href="/" style={{padding: 3}}>
                <div className="home">Главная</div>
            </a>
            <div className="delimiter">&#10140;</div>
            <a href="/">Папка</a>
        </div>
    )
}

export default Path