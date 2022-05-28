import React from "react";

function TitlePage(props) {
    return (
        <h1 className="title_page">{props.currentDir.name}</h1>
    )
}

export default TitlePage