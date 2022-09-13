import React, {useContext} from "react"
import { AuthContext } from "../Context"
import { useParams, useHistory } from "react-router-dom"
import '../styles/TitlePage.css'
import categories from "../categories"

function TitlePage({currentDir}) {
    const {category, parent} = useParams()
    const history = useHistory()

    const {userData} = useContext(AuthContext)
    const categoryParams = categories.find(cat => cat.name === category)

    return (
        <div className="title_page">
            { parent !== userData.rootId && categoryParams.showBackButtonInTitle ? <div className="back_btn" onClick={() => history.goBack()}>&laquo;</div> : '' }
            <h1>
                { currentDir?._id === userData.rootId 
                    ? categoryParams.title
                    : currentDir?.name
                }
            </h1>
            
        </div>
    )
}

export default TitlePage