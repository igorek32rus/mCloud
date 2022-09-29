import React from "react"
import { useHistory } from "react-router-dom"

function BackButton() {
    const history = useHistory()

    return (
        <div className="back_btn" onClick={() => history.goBack()}>&laquo;</div>
    )
}

export default BackButton