import React from "react";

const catToReadble = (cat) => {
    const allCat = {
        'latest': 'Последние',
        'shared': 'Общие',
        'trash': 'Корзина'
    }

    return allCat[cat]
}

function TitlePage({currentDir, category}) {
    return (
        <h1 className="title_page">
            { catToReadble(category) 
                ? catToReadble(category) 
                : (currentDir?.parent ? currentDir?.name : 'Главная')
            }
        </h1>
    )
}

export default TitlePage