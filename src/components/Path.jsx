import React from "react"
import { useParams, Link } from "react-router-dom"

import '../styles/Path.css'

function Path({path}) {
    const {category} = useParams()
    
    return (
        <nav className="path">
            <ul>
                { path.map(item => (
                    <li key={item?._id}>
                        { item?.parent ? (
                            <>
                                <div className="delimiter">&#10140;</div>
                                <Link to={"/files/" + category + "/" + item._id}><div className="link">{item.name}</div></Link>
                            </>
                        ) : (
                            <Link to={"/files/" + category + "/" + item._id}>
                                <div className="link" style={{padding: 3}}>
                                    <div className="home">Главная</div>
                                </div>
                            </Link>
                        ) }
                        
                    </li>
                )) }
            </ul>
            
        </nav>
    )
}

export default Path