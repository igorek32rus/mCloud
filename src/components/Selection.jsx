import React from "react"
import { SelectionContext } from "../contexts/SelectionContext/SelectionContext"

const Selection = () => {
    const { positionSelection } = React.useContext(SelectionContext)

    return (
        <div className="selection" 
            style={{
                width: positionSelection.width, 
                height: positionSelection.height, 
                top: positionSelection.top + 'px', 
                left: positionSelection.left + 'px'
            }}>
        </div>
    )
}

export default Selection