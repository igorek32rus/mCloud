import { createContext } from "react"

export const SelectionContext = createContext({
    selection: false,
    setSelection: () => {},
    selected: [],
    setSelected: () => {},
    positionSelection: {
        startX: 0,
        startY: 0,
        left: 0,
        top: 0,
        width: 0,
        height: 0
    },
    setPositionSelection: () => {},
    positionFiles: [],
    setPositionFiles: () => {}
})