import React, {useContext} from "react"
import { AuthContext } from "../Context"
import '../styles/TitlePage.css'

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
        <div className="title_page">
            {console.log(currentDir)}
            { currentDir && currentDir?._id !== userData.rootId && category === 'trash' ? <div className="back_btn" onClick={() => changeDir(currentDir.parent)}>&laquo;</div> : '' }
            <h1>
                { catToReadble(category) 
                    ? catToReadble(category) 
                    : (currentDir?.parent ? currentDir?.name : 'Главная')
                }
            </h1>
            
        </div>
    )
}

export default TitlePage