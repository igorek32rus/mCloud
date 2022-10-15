import React from "react"
import { useHistory } from "react-router-dom"
import './BackButton.scss'

function BackButton() {
    const history = useHistory()

    return (
        <div className="title-back_btn" onClick={() => history.goBack()}>&laquo;</div>
    )
}

export default BackButton