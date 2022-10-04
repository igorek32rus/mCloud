import React from "react"
import { CopyCutPasteContext } from "./CopyCutPasteContext"

export const CopyCutPasteContextProvider = ({children}) => {
    const [modePaste, setModePaste] = React.useState("")
    const [itemsPaste, setItemsPaste] = React.useState([])

    const pasteItems = () => {
        if (modePaste === "copy") {
            console.log("paste --- copy")
            console.log(itemsPaste)
        }

        if (modePaste === "cut") {
            console.log("paste --- cut")
            console.log(itemsPaste)
        }

        setModePaste("")
    }

    const providerValue = {modePaste, setModePaste, itemsPaste, setItemsPaste, pasteItems}

    return (
        <CopyCutPasteContext.Provider value={providerValue}>
            {children}
        </CopyCutPasteContext.Provider>
    )
}