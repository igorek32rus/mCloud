import React from "react";

import '../styles/Path.css'

function Path({path, changeDir}) {
    const handlerClick = (idDir) => {
        changeDir(idDir)
    }

    // написать функцию получения пути по текущей дирректории
    
    return (
        <nav className="path">
            <ul>
                { path.map(item => (
                    <li key={item._id} onClick={() => handlerClick(item._id)}>
                        { item.parent ? (
                            <>
                                <div className="delimiter">&#10140;</div>
                                <div className="link">{item.name}</div>
                            </>
                        ) : (
                            <div className="link" style={{padding: 3}}>
                                <div className="home">Главная</div>
                            </div>
                        ) }
                        
                    </li>
                )) }
                {/* <li onClick={() => handlerClick('root')}>
                    <div className="link" style={{padding: 3}}>
                        <div className="home">Главная</div>
                    </div>
                </li>
                <li>
                    <div className="delimiter">&#10140;</div>
                    <div className="link">Папка</div>
                </li> */}
            </ul>
            
        </nav>
    )
}

export default Path