import React from "react"
import '../styles/TitlePage.css'

function TitlePage({children}) {
    return (
        <div className="title_page">
            { children }
        </div>
    )
}

export default TitlePage