import { createContext } from "react"

export const DirContext = createContext({
    dir: [],
    setDir: () => {},
    path: [],
    setPath: () => {},
    changeParent: () => {}
})