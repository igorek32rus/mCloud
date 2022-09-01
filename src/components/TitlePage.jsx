import React, {useContext} from "react"
import { AuthContext } from "../Context"
import { useParams, useHistory } from "react-router-dom"
import '../styles/TitlePage.css'
import categories from "../categories"

function TitlePage({currentDir}) {
    const {category, parent} = useParams()
    const history = useHistory()

    const {userData} = useContext(AuthContext)

    return (
        <div className="title_page">
            { parent !== userData.rootId && category === 'trash' ? <div className="back_btn" onClick={() => history.goBack()}>&laquo;</div> : '' }
            <h1>
                { currentDir?._id === userData.rootId 
                    ? categories[category]
                    : currentDir?.name
                }
            </h1>
            
        </div>
    )
}

export default TitlePage