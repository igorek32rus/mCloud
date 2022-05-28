import React from "react";

import '../styles/Path.css'

function Path(props) {
    const handlerClick = (linkDir) => {
        props.updateDir(linkDir)
    }

    // написать функцию получения пути по текущей дирректории
    
    return (
        <nav className="path">
            <ul>
                <li onClick={() => handlerClick('root')}>
                    <div className="link" style={{padding: 3}}>
                        <div className="home">Главная</div>
                    </div>
                </li>
                <li>
                    <div className="delimiter">&#10140;</div>
                    <div className="link">Папка</div>
                </li>
            </ul>
            
        </nav>
    )
}

export default Path