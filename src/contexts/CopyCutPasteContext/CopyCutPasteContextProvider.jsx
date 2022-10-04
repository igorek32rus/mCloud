import React from "react"
import { CopyCutPasteContext } from "./CopyCutPasteContext"
import { DirContext } from "../DirContext/DirContext"

export const CopyCutPasteContextProvider = ({children}) => {
    const [modePaste, setModePaste] = React.useState("")
    const [itemsPaste, setItemsPaste] = React.useState([])

    const { changeParent, copyFiles } = React.useContext(DirContext)

    const pasteItems = async (parent) => {
        if (modePaste === "copy") {
            copyFiles(parent, itemsPaste)
        }

        if (modePaste === "cut") {
            changeParent(parent, itemsPaste)
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