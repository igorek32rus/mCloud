import React from "react";

import '../styles/Path.css'

function Path(props) {
    
    return (
        <nav className="path">
            <ul>
                <li>
                    <a href="/" style={{padding: 3}}>
                        <div className="home">Главная</div>
                    </a>
                </li>
                <li>
                    <div className="delimiter">&#10140;</div>
                    <a href="/">Папка</a>
                </li>
            </ul>
            
        </nav>
    )
}

export default Path