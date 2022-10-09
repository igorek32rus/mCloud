import React from "react"
import { useSelector } from "react-redux"

const Selection = () => {
    const { positionSelection } = useSelector(state => state.selection)

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