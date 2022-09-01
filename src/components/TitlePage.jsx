import React, {useContext} from "react"
import { AuthContext, LoaderContext } from "../Context"
import { useParams, useHistory } from "react-router-dom"
import '../styles/TitlePage.css'

const catToReadble = (cat) => {
    const allCat = {
        'main': 'Главная',
        'latest': 'Последние',
        'shared': 'Общие',
        'trash': 'Корзина'
    }

    return allCat[cat]
}

function TitlePage({currentDir}) {
    const {category, parent} = useParams()
    const history = useHistory()

    const {userData} = useContext(AuthContext)
    const {loading} = useContext(LoaderContext)

    return (
        <div className="title_page">
            { parent !== userData.rootId && category === 'trash' ? <div className="back_btn" onClick={() => history.goBack()}>&laquo;</div> : '' }
            <h1>
                { currentDir._id === userData.rootId 
                    ? catToReadble(category) 
                    : currentDir.name
                }
            </h1>
            
        </div>
    )
}

export default TitlePage