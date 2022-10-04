import { createContext } from "react"

export const CopyCutPasteContext = createContext({
    modePaste: "copy",   // copy || cut
    setModePaste: () => {},
    itemsPaste: [],
    setItemsPaste: () => {},
    pasteItems: () => {}
})