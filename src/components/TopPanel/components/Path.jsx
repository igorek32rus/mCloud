import React from "react"
import { useParams, Link } from "react-router-dom"

import './Path.scss'

function Path({ path }) {
    const { category } = useParams()
    const pathRef = React.useRef()

    const handlerScrollPath = (event) => {
        let modifier = 0
        if (event.deltaMode == event.DOM_DELTA_PIXEL) {
            modifier = 1
            // иные режимы возможны в Firefox
        } else if (event.deltaMode == event.DOM_DELTA_LINE) {
            modifier = parseInt(getComputedStyle(pathRef.current).lineHeight)
        } else if (event.deltaMode == event.DOM_DELTA_PAGE) {
            modifier = pathRef.current.clientHeight
        }
        if (event.deltaY != 0) {
            // замена вертикальной прокрутки горизонтальной
            pathRef.current.scrollLeft += modifier * event.deltaY
            event.preventDefault()
        }
    }
    
    React.useEffect(() => {
        const pathElem = pathRef.current
        pathElem.addEventListener('wheel', handlerScrollPath)

        return () => pathElem.removeEventListener('wheel', handlerScrollPath)
    }, [])

    React.useEffect(() => {
        pathRef.current.scrollLeft = 9999999
    }, [path])

    return (
        <nav className="path" ref={pathRef}>
            <ul>
                {path.map(item => (
                    <li key={item?._id}>
                        {item?.parent ? (
                            <>
                                <div className="delimiter">&#10140;</div>
                                <Link to={"/files/" + category + "/" + item._id}><div className="link">{item.name}</div></Link>
                            </>
                        ) : (
                            <Link to={"/files/" + category + "/" + item._id}>
                                <div className="link" style={{ padding: 3 }}>
                                    <div className="home">Главная</div>
                                </div>
                            </Link>
                        )}

                    </li>
                ))}
            </ul>

        </nav>
    )
}

export default Path