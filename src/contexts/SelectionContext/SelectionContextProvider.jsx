import React from "react"
import { SelectionContext } from "./SelectionContext"

export const SelectionContextProvider = ({ children }) => {
    const [selection, setSelection] = React.useState(false)
    const [selected, setSelected] = React.useState([])
    const [positionSelection, setPositionSelection] = React.useState({
        startX: 0,
        startY: 0,
        left: 0,
        top: 0,
        width: 0,
        height: 0
    })

    const providerValue = {
        selection, setSelection,
        selected, setSelected,
        positionSelection, setPositionSelection
    }

    return (
        <SelectionContext.Provider value={providerValue}>
            { children }
        </SelectionContext.Provider>
    )
}