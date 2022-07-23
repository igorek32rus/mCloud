import React from "react";

function TitlePage({currentDir}) {
    return (
        <h1 className="title_page">{currentDir?.parent ? currentDir?.name : 'Главная'}</h1>
    )
}

export default TitlePage