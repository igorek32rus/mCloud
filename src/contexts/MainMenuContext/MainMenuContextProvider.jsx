import React, {useState} from "react"
import { MainMenuContext } from "./MainMenuContext"

export const MainMenuProvider = ({ children }) => {
    const [isMenuOpened, setIsMenuOpened] = useState(false)
    const [isMenuClosing, setIsMenuClosing] = useState(false)

    const valueMenuProvider = { isMenuOpened, setIsMenuOpened, isMenuClosing, setIsMenuClosing }

    return (
        <MainMenuContext.Provider value={valueMenuProvider}>
            { children }
        </MainMenuContext.Provider>
    )
}