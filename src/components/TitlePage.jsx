import React, {useContext} from "react"
import { AuthContext } from "../Context"

const catToReadble = (cat) => {
    const allCat = {
        'latest': 'Последние',
        'shared': 'Общие',
        'trash': 'Корзина'
    }

    return allCat[cat]
}

function TitlePage({currentDir, category, changeDir}) {
    const {userData} = useContext(AuthContext)

    return (
        <h1 className="title_page">
            { currentDir?._id !== userData.rootId && category === 'trash' ? <div onClick={() => changeDir(currentDir.parent)}>Назад</div> : '' }
            { catToReadble(category) 
                ? catToReadble(category) 
                : (currentDir?.parent ? currentDir?.name : 'Главная')
            }
        </h1>
    )
}

export default TitlePage