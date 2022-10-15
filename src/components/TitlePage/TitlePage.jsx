import React from "react"
import './TitlePage.scss'

function TitlePage({children}) {
    return (
        <div className="title_page">
            { children }
        </div>
    )
}

export default TitlePage