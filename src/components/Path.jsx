import React from "react"
import { useHistory, useParams } from "react-router-dom"

import '../styles/Path.css'

function Path({path}) {
    const history = useHistory()
    const {category} = useParams()

    const handlerClick = (dir) => {
        history.push(`/files/${category}/${dir._id}`)
    }
    
    return (
        <nav className="path">
            <ul>
                { path.map(item => (
                    <li key={item?._id} onClick={() => handlerClick(item)}>
                        { item?.parent ? (
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
            </ul>
            
        </nav>
    )
}

export default Path