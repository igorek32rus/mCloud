import React from "react"
import './TitlePage.scss'

function TitlePage({children, margin = "left-right-margins"}) {
    return (
        <div className={"title_page " + margin}>
            { children }
        </div>
    )
}

export default TitlePage